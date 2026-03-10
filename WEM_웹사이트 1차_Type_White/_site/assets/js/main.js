(function () {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.querySelector('.site-nav__panel');

  if (toggle && nav && panel) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const hero = document.querySelector('[data-hero-split]');
  if (hero) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--pointer-x', `${x}%`);
      hero.style.setProperty('--pointer-y', `${y}%`);
    });
  }

  const workScope = document.querySelector('[data-filter-scope="works"]');
  if (workScope) {
    const cards = Array.from(workScope.querySelectorAll('[data-track]'));
    const groups = document.querySelectorAll('[data-filter-group]');
    const state = { track: 'all', type: 'all' };
    const emptyState = document.querySelector('[data-empty-state="works"]');

    function syncHash() {
      if (state.track === 'archive' || state.track === 'prototype') {
        history.replaceState(null, '', `#${state.track}`);
      } else {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    function applyFilters() {
      let visibleCount = 0;

      cards.forEach((card) => {
        const trackMatch = state.track === 'all' || card.dataset.track === state.track;
        const typeMatch = state.type === 'all' || card.dataset.type === state.type;
        const show = trackMatch && typeMatch;
        card.hidden = !show;
        if (show) visibleCount += 1;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
      syncHash();
    }

    groups.forEach((group) => {
      group.addEventListener('click', (event) => {
        const button = event.target.closest('.filter-btn');
        if (!button) return;

        const type = group.dataset.filterGroup;
        const value = button.dataset.filter;

        state[type] = value;

        group.querySelectorAll('.filter-btn').forEach((btn) => {
          const active = btn === button;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        applyFilters();
      });
    });

    if (window.location.hash === '#archive' || window.location.hash === '#prototype') {
      state.track = window.location.hash.replace('#', '');
      const trackGroup = document.querySelector('[data-filter-group="track"]');
      if (trackGroup) {
        trackGroup.querySelectorAll('.filter-btn').forEach((btn) => {
          const active = btn.dataset.filter === state.track;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      }
    }

    applyFilters();
  }

  const recordsScope = document.querySelector('[data-filter-scope="records"]');
  if (recordsScope) {
    const items = Array.from(recordsScope.querySelectorAll('[data-category]'));
    const group = document.querySelector('[data-filter-group="category"]');
    const emptyState = document.querySelector('[data-empty-state="records"]');

    if (group) {
      group.addEventListener('click', (event) => {
        const button = event.target.closest('.filter-btn');
        if (!button) return;

        const value = button.dataset.filter;
        let visibleCount = 0;

        group.querySelectorAll('.filter-btn').forEach((btn) => {
          const active = btn === button;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        items.forEach((item) => {
          const show = value === 'all' || item.dataset.category === value;
          item.hidden = !show;
          if (show) visibleCount += 1;
        });

        if (emptyState) emptyState.hidden = visibleCount !== 0;
      });
    }
  }
})();
