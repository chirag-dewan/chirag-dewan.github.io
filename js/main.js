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
});
