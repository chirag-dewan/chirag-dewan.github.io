/* cdewan.me, quiet behaviour: active nav, mobile toggle, scroll reveal, push counter. */

document.addEventListener('DOMContentLoaded', () => {
  // Active nav link
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.nav__links a').forEach((a) => {
    const href = a.getAttribute('href').replace(/index\.html$/, '');
    if (path === href || (href !== '/' && path.startsWith(href))) {
      a.classList.add('active');
    }
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '×' : '≡';
    });
  }

  // Scroll reveal: hidden state is applied here, never in markup, so
  // no-JS readers (and reduced-motion users) always get the full page.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('[data-reveal]');
  if (!reduced && 'IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    const pending = [];
    targets.forEach((el, i) => {
      // Only hide elements still below the fold at load time.
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('reveal-pending');
        el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
        pending.push(el);
      }
      io.observe(el);
    });
    // Safety net: if anything is still hidden after 3s (observer never
    // fired, scroll never happened), reveal it. Content is never lost.
    window.setTimeout(() => {
      pending.forEach((el) => el.classList.add('reveal-in'));
    }, 3000);
  }

  // Footer: quiet "last push" line (real data, fails silently)
  const pushEl = document.querySelector('.footer__push');
  if (pushEl) {
    fetch('https://api.github.com/users/chirag-dewan/events/public?per_page=30')
      .then((r) => (r.ok ? r.json() : []))
      .then((events) => {
        const push = (events || []).find((e) => e.type === 'PushEvent');
        if (!push) return;
        const ms = Date.now() - new Date(push.created_at).getTime();
        const m = Math.floor(ms / 60000);
        const h = Math.floor(m / 60);
        const d = Math.floor(h / 24);
        pushEl.textContent = 'last push: ' + (d > 0 ? d + 'd ago' : h > 0 ? h + 'h ago' : m + 'm ago');
      })
      .catch(() => {});
  }
});
