/* cdewan.me — Terminal Effects */

document.addEventListener('DOMContentLoaded', () => {
  // Mark active nav link
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.nav__links a').forEach(a => {
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

  // Staggered line-in animations for elements not yet visible
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('line-in');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => lineObserver.observe(el));

  // Scroll reveal for story sections, metric strips, etc.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.story-section, .metric-strip, .finding-item, .now-item, .project-card, .timeline-entry').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Post title subtle glow pulse
  const postTitle = document.querySelector('.post-title');
  if (postTitle) {
    postTitle.classList.add('glow-green');
  }

  // Footer tagline — rotate on each visit
  const tagline = document.querySelector('.footer__tagline');
  if (tagline) {
    const lines = [
      'see the pattern, not the content.',
      'subtraction before addition.',
      'the attack lives in the pattern.',
      'privacy by architecture, not policy.',
      'honest about failure modes.',
      'the failure in the middle is what makes it believable.',
      'baseline normal, detect deviations.',
      'every system has a story to tell.',
    ];
    tagline.textContent = '> ' + lines[Math.floor(Math.random() * lines.length)];
  }

  // Footer last-push counter from GitHub public events API
  const pushEl = document.querySelector('.footer__push');
  if (pushEl) {
    fetch('https://api.github.com/users/chirag-dewan/events/public')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(events => {
        const push = events.find(e => e.type === 'PushEvent');
        if (!push) return;
        const ms = Date.now() - new Date(push.created_at).getTime();
        const m = Math.floor(ms / 60000);
        const h = Math.floor(m / 60);
        const d = Math.floor(h / 24);
        const ago = d > 0 ? d + 'd ago' : h > 0 ? h + 'h ago' : m + 'm ago';
        pushEl.textContent = 'last push: ' + ago;
      })
      .catch(() => {});
  }
});
