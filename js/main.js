/* cdewan.me — minimal behaviour only (no decorative effects). */

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
