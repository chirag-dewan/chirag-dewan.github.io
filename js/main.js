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

  // GitHub activity: push counter + sparkline + heatmap (single data fetch)
  const API = 'https://api.github.com/users/chirag-dewan/events/public?per_page=100';
  Promise.all([
    fetch(API).then(r => r.ok ? r.json() : []),
    fetch(API + '&page=2').then(r => r.ok ? r.json() : []),
    fetch(API + '&page=3').then(r => r.ok ? r.json() : []),
  ]).then(pages => {
    const events = pages.flat();
    if (!events.length) return;

    const pushEvents = events.filter(e => e.type === 'PushEvent');
    if (!pushEvents.length) return;

    // ---- Footer push counter ----
    const pushEl = document.querySelector('.footer__push');
    if (pushEl) {
      const ms = Date.now() - new Date(pushEvents[0].created_at).getTime();
      const m = Math.floor(ms / 60000);
      const h = Math.floor(m / 60);
      const d = Math.floor(h / 24);
      pushEl.textContent = 'last push: ' + (d > 0 ? d + 'd ago' : h > 0 ? h + 'h ago' : m + 'm ago');
    }

    // ---- Aggregate commit data ----
    const dayMap = {};      // 'YYYY-MM-DD' → commit count
    const repos = new Set();
    let totalCommits = 0;

    pushEvents.forEach(e => {
      const day = e.created_at.slice(0, 10);
      const n = e.payload.size || e.payload.commits?.length || 1;
      dayMap[day] = (dayMap[day] || 0) + n;
      totalCommits += n;
      repos.add(e.repo.name);
    });

    // ---- Activity panel (homepage only) ----
    const panel = document.getElementById('activity');
    if (!panel) return;
    panel.classList.add('loaded');

    // Build 12-week calendar (84 days)
    const today = new Date();
    const days = [];
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ key, dow: d.getDay(), commits: dayMap[key] || 0 });
    }

    // ---- Sparkline (commits per week, 12 bars) ----
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7).reduce((s, d) => s + d.commits, 0));
    }
    const maxWeek = Math.max(...weeks, 1);
    const sparkline = document.getElementById('sparkline');
    if (sparkline) {
      weeks.forEach((w, i) => {
        const bar = document.createElement('div');
        bar.className = 'spark-bar';
        const pct = Math.max((w / maxWeek) * 100, w > 0 ? 8 : 2);
        const intensity = w / maxWeek;
        const g = Math.round(80 + intensity * 175);
        bar.style.height = pct + '%';
        bar.style.background = `rgb(0, ${g}, ${Math.round(intensity * 65)})`;
        if (intensity > 0.5) bar.style.boxShadow = `0 0 ${Math.round(intensity * 8)}px rgba(0, 255, 65, ${intensity * 0.3})`;
        setTimeout(() => bar.classList.add('animate'), 80 + i * 60);
        sparkline.appendChild(bar);
      });
    }

    // ---- Heatmap (7 rows × 12 cols) ----
    const heatmap = document.getElementById('heatmap');
    if (heatmap) {
      // Align to start on Sunday: pad front
      const firstDow = days[0].dow;
      const padded = Array(firstDow).fill({ commits: 0, pad: true }).concat(days);
      // Fill to complete last column
      while (padded.length % 7 !== 0) padded.push({ commits: 0, pad: true });

      const maxDay = Math.max(...days.map(d => d.commits), 1);
      padded.forEach((d, i) => {
        const cell = document.createElement('div');
        cell.className = 'hm-cell';
        if (!d.pad && d.commits > 0) {
          const ratio = d.commits / maxDay;
          if (ratio > 0.75) cell.classList.add('l4');
          else if (ratio > 0.45) cell.classList.add('l3');
          else if (ratio > 0.15) cell.classList.add('l2');
          else cell.classList.add('l1');
        }
        cell.style.transitionDelay = (i * 8) + 'ms';
        heatmap.appendChild(cell);
      });
    }

    // ---- Stats ----
    const statsEl = document.getElementById('activity-stats');
    if (statsEl) {
      // Streak: consecutive days with commits ending today (or yesterday)
      let streak = 0;
      for (let i = days.length - 1; i >= 0; i--) {
        if (days[i].commits > 0) streak++;
        else if (streak > 0) break;
        // Allow today to be zero if yesterday had commits
        else if (i === days.length - 1) continue;
        else break;
      }
      statsEl.innerHTML =
        `<span><span class="val">${totalCommits}</span> commits</span>` +
        `<span><span class="val">${repos.size}</span> repos</span>` +
        (streak > 1 ? `<span><span class="val">${streak}d</span> streak</span>` : '');
    }
  }).catch(() => {});

  // ============================================
  // ENHANCED INTERACTIVE FEATURES
  // ============================================

  // ---- Copy Button Functionality ----
  function initCopyButtons() {
    document.querySelectorAll('.copy-button').forEach(button => {
      button.addEventListener('click', async () => {
        const codeContent = button.closest('.terminal-window').querySelector('.code-content');
        const textContent = codeContent.textContent || codeContent.innerText;

        try {
          await navigator.clipboard.writeText(textContent);
          button.textContent = 'copied!';
          button.classList.add('copied');

          setTimeout(() => {
            button.textContent = 'copy';
            button.classList.remove('copied');
          }, 2000);
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = textContent;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);

          button.textContent = 'copied!';
          button.classList.add('copied');
          setTimeout(() => {
            button.textContent = 'copy';
            button.classList.remove('copied');
          }, 2000);
        }
      });
    });
  }

  // ---- Progress Bar Animations ----
  function animateProgressBars() {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.progress-fill');
          progressBars.forEach((bar, index) => {
            setTimeout(() => {
              const targetWidth = bar.dataset.progress || '0%';
              bar.style.width = targetWidth;
            }, index * 200);
          });
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.progress-bar').forEach(el => {
      progressObserver.observe(el);
    });
  }

  // ---- Chart Bar Animations ----
  function animateChartBars() {
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chartBars = entry.target.querySelectorAll('.chart-bar-fill');
          chartBars.forEach((bar, index) => {
            setTimeout(() => {
              const targetWidth = bar.dataset.value || '0%';
              bar.style.width = targetWidth;
            }, index * 150);
          });
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.chart-container').forEach(el => {
      chartObserver.observe(el);
    });
  }

  // ---- Terminal Loading Animation ----
  function createTerminalLoading(container, steps) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'terminal-loading';

    steps.forEach((step, index) => {
      const line = document.createElement('div');
      line.className = 'loading-line';
      line.innerHTML = `
        <span class="loading-prompt">$</span>
        <span class="loading-text">${step}</span>
        <span class="loading-dots"></span>
      `;
      loadingDiv.appendChild(line);
    });

    container.appendChild(loadingDiv);

    // Remove loading after animation completes
    setTimeout(() => {
      loadingDiv.style.opacity = '0';
      setTimeout(() => loadingDiv.remove(), 500);
    }, steps.length * 300 + 1000);
  }

  // ---- Enhanced Project Card Interactions ----
  function enhanceProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
      // Add keyboard navigation
      card.setAttribute('tabindex', '0');

      // Enhanced keyboard events
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const primaryLink = card.querySelector('.project-card__link, a[href]');
          if (primaryLink && primaryLink.href) {
            window.location.href = primaryLink.href;
          }
        }
      });

      // Sophisticated mouse tracking for 3D effects
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        // Set CSS custom properties for the mouse position
        const mouseX = (x / rect.width) * 100;
        const mouseY = (y / rect.height) * 100;

        card.style.setProperty('--mouse-x', mouseX + '%');
        card.style.setProperty('--mouse-y', mouseY + '%');

        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
          scale(1.02)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });

      // Add ripple effect on click and handle navigation
      card.addEventListener('click', (e) => {
        // Don't interfere with actual links
        if (e.target.tagName === 'A' || e.target.closest('a')) {
          return;
        }

        // Find the primary link in the card
        const primaryLink = card.querySelector('.project-card__link, a[href]');

        if (primaryLink) {
          // Add ripple effect
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 65, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x - 50}px;
            top: ${y - 50}px;
            width: 100px;
            height: 100px;
            pointer-events: none;
            z-index: 1;
          `;

          card.style.position = 'relative';
          card.appendChild(ripple);

          // Navigate after ripple animation starts
          setTimeout(() => {
            if (primaryLink.href) {
              window.location.href = primaryLink.href;
            }
          }, 100);

          setTimeout(() => ripple.remove(), 600);
        }
      });
    });

    // Add ripple animation
    if (!document.querySelector('#ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ---- Floating Particles System ----
  function createFloatingParticles() {
    if (window.innerWidth < 768) return; // Skip on mobile for performance

    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random starting position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';

      container.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 8000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Create initial batch
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 400);
    }
  }

  // ---- Enhanced Scroll Effects ----
  function enhanceScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
      const scrollY = window.pageYOffset;

      // Subtle header background opacity based on scroll
      const nav = document.querySelector('.nav');
      if (nav) {
        const opacity = Math.min(scrollY / 100, 0.95);
        nav.style.background = `rgba(10, 10, 10, ${opacity})`;
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });
  }

  // ---- Typewriter Effect ----
  function addTypewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    element.style.borderRight = '2px solid var(--green)';

    let i = 0;
    function typeChar() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      } else {
        // Blinking cursor
        setInterval(() => {
          element.style.borderRight = element.style.borderRight === 'none'
            ? '2px solid var(--green)'
            : 'none';
        }, 530);
      }
    }
    typeChar();
  }

  // ---- Advanced Terminal Effects ----
  function enhanceTerminalEffects() {
    // Add terminal boot sequence on page load
    const hero = document.querySelector('.home-hero__name');
    if (hero && !hero.dataset.typed) {
      hero.dataset.typed = 'true';
      const originalText = hero.textContent;
      addTypewriterEffect(hero, originalText, 80);
    }

    // Enhanced CRT flicker on specific elements
    document.querySelectorAll('.ctf-results, .section-header span').forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.animation = 'crt-flicker 0.1s 3';
      });
    });
  }

  // ---- Syntax Highlighting ----
  function applySyntaxHighlighting() {
    document.querySelectorAll('.code-content').forEach(block => {
      if (block.dataset.highlighted) return;

      let content = block.innerHTML;

      // Simple syntax highlighting patterns
      content = content
        // Keywords
        .replace(/\b(function|const|let|var|if|else|for|while|return|import|export|class|async|await)\b/g, '<span class="syntax-keyword">$1</span>')
        // Strings
        .replace(/"([^"\\]|\\.)*"/g, '<span class="syntax-string">$&</span>')
        .replace(/'([^'\\]|\\.)*'/g, '<span class="syntax-string">$&</span>')
        // Comments
        .replace(/\/\/.*$/gm, '<span class="syntax-comment">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="syntax-comment">$&</span>')
        // Functions
        .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="syntax-function">$1</span>(')
        // Numbers
        .replace(/\b\d+(\.\d+)?\b/g, '<span class="syntax-number">$&</span>')
        // Operators
        .replace(/[+\-*/%=<>!&|]+/g, '<span class="syntax-operator">$&</span>');

      block.innerHTML = content;
      block.dataset.highlighted = 'true';
    });
  }

  // ---- Terminal Glitch Effect ----
  function addGlitchEffect(element, text) {
    element.classList.add('glitch-effect');
    element.setAttribute('data-text', text || element.textContent);
  }

  // ---- ASCII Art Animation ----
  function animateASCII() {
    const asciiElements = document.querySelectorAll('.ascii-art');
    asciiElements.forEach(el => {
      const originalOpacity = el.style.opacity || 0.6;

      const flickerInterval = setInterval(() => {
        if (Math.random() < 0.05) { // 5% chance to flicker
          el.style.opacity = '0.2';
          setTimeout(() => {
            el.style.opacity = originalOpacity;
          }, 50);
        }
      }, 100);

      // Clean up interval on hover
      el.addEventListener('mouseenter', () => {
        clearInterval(flickerInterval);
        el.style.opacity = '1';
      });

      el.addEventListener('mouseleave', () => {
        el.style.opacity = originalOpacity;
      });
    });
  }

  // ---- Matrix Effect (very subtle) ----
  function createMatrixEffect() {
    if (document.querySelector('.matrix-bg')) return; // Already exists

    const matrix = document.createElement('div');
    matrix.className = 'matrix-bg';
    document.body.appendChild(matrix);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 12);

    for (let i = 0; i < columns; i++) {
      const span = document.createElement('span');
      span.style.position = 'absolute';
      span.style.left = i * 12 + 'px';
      span.style.animationDuration = (Math.random() * 3 + 2) + 's';
      span.style.animationDelay = Math.random() * 2 + 's';

      let text = '';
      for (let j = 0; j < 20; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '\n';
      }
      span.textContent = text;

      matrix.appendChild(span);
    }
  }

  // ---- Initialize Timeline Animations ----
  function initTimelineAnimations() {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 100);
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.timeline-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      timelineObserver.observe(item);
    });
  }

  // ---- Enhanced Focus Management ----
  function enhanceFocusManagement() {
    // Skip to main content link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--green);
      color: var(--bg);
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
      transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
      main.id = 'main';
    }
  }

  // Initialize all enhancements
  initCopyButtons();
  animateProgressBars();
  animateChartBars();
  enhanceProjectCards();
  applySyntaxHighlighting();
  animateASCII();
  initTimelineAnimations();
  enhanceFocusManagement();
  enhanceTerminalEffects();
  enhanceScrollEffects();

  // Create visual effects
  createFloatingParticles();

  // Create matrix effect only on larger screens
  if (window.innerWidth > 1024) {
    createMatrixEffect();
  }

  // Initialize glitch effects on specific elements
  document.querySelectorAll('[data-glitch]').forEach(el => {
    addGlitchEffect(el, el.dataset.glitch);
  });

  // Enhanced performance monitoring with visual feedback
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (loadTime < 2000) {
          console.log('⚡ Blazing fast load: ' + (loadTime / 1000).toFixed(1) + 's');
          // Add subtle success indicator
          document.body.style.setProperty('--load-success', '1');
        } else if (loadTime > 3000) {
          console.log('🐌 Slow load detected: ' + (loadTime / 1000).toFixed(1) + 's');
        }
      }, 0);
    });
  }

  // Add smooth scrolling enhancement
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add subtle easter egg
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > 10) konamiCode.shift();

    if (konamiCode.join(',') === konamiSequence.join(',')) {
      document.body.style.setProperty('--easter-egg', '1');
      const msg = document.createElement('div');
      msg.textContent = '🚀 PARALLAX ACTIVATED';
      msg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--green);
        color: var(--bg);
        padding: 1rem;
        border-radius: 4px;
        font-family: var(--font);
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.5s ease;
      `;
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
      konamiCode = [];
    }
  });

  // Add slideIn animation for easter egg
  if (!document.querySelector('#easter-style')) {
    const style = document.createElement('style');
    style.id = 'easter-style';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
});
