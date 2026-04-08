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

  // Typing effect for hero prompt
  const prompt = document.querySelector('.hero__prompt .type-text');
  if (prompt) {
    const text = prompt.dataset.text;
    prompt.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        prompt.textContent += text[i];
        i++;
        setTimeout(type, 40 + Math.random() * 30);
      } else {
        prompt.classList.add('cursor');
      }
    };
    setTimeout(type, 300);
  }

  // Hero name decode effect — characters scramble then resolve
  const heroName = document.querySelector('.hero__name');
  if (heroName && !heroName.querySelector('.char')) {
    const originalText = heroName.textContent;
    const glyphs = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789';
    heroName.textContent = '';
    heroName.setAttribute('aria-label', originalText);

    [...originalText].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.animationDelay = (i * 0.04) + 's';

      if (char === ' ') {
        span.innerHTML = '&nbsp;';
        span.style.animationDelay = '0s';
        span.style.opacity = '1';
      } else {
        // Scramble before resolving
        let scrambleCount = 0;
        const maxScrambles = 3 + Math.floor(Math.random() * 4);
        const scramble = () => {
          if (scrambleCount < maxScrambles) {
            span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
            scrambleCount++;
            setTimeout(scramble, 30 + Math.random() * 20);
          } else {
            span.textContent = char;
          }
        };
        setTimeout(scramble, i * 40 + 400);
        span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      heroName.appendChild(span);
    });
  }

  // Post title subtle glow pulse
  const postTitle = document.querySelector('.post-title');
  if (postTitle) {
    postTitle.classList.add('glow-green');
  }
});
