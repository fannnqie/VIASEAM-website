(() => {
  'use strict';

  const TOTAL_PAGES = 28;
  const STORAGE_KEY = 'viaseam-magazine-last-page-v2';
  const clampPage = value => Math.max(0, Math.min(TOTAL_PAGES - 1, Number(value) || 0));
  const imagePath = index => `assets/pages/page-${String(index + 1).padStart(2, '0')}.jpg`;
  const savedPage = clampPage(localStorage.getItem(STORAGE_KEY));
  const PAGE_RATIO = 849 / 600;
  const compactViewport = window.innerWidth <= 760;
  const safeWidth = Math.max(240, window.innerWidth - (compactViewport ? 28 : 132));
  const safeHeight = Math.max(340, window.innerHeight - (compactViewport ? 118 : 142));
  const fittedPageWidth = Math.floor(Math.min(
    650,
    safeHeight / PAGE_RATIO,
    compactViewport ? safeWidth : safeWidth / 2
  ));
  const fittedPageHeight = Math.floor(fittedPageWidth * PAGE_RATIO);

  if (!window.St || typeof window.St.PageFlip !== 'function') {
    console.error('[VIASEAM] PageFlip library did not load.');
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'engine-reader';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="engine-backdrop" aria-hidden="true"></div>
    <button class="engine-close" type="button" aria-label="关闭杂志" title="关闭">×</button>
    <div class="engine-stage" role="dialog" aria-modal="true" aria-label="VIASEAM A4 互动杂志">
      <div class="engine-book" aria-label="VIASEAM A4 杂志，可拖动页角翻页"></div>
    </div>
    <div class="engine-status">
      <span data-engine-page></span>
      <i aria-hidden="true"><b></b></i>
      <small>拖动页角 · 点击页边 · 滑动 · 方向键</small>
    </div>`;
  document.body.appendChild(overlay);

  const book = overlay.querySelector('.engine-book');
  const pages = [];
  for (let index = 0; index < TOTAL_PAGES; index += 1) {
    const page = document.createElement('div');
    page.className = 'engine-page';
    // Interior pages remain soft and use the library's continuous fold geometry.
    // showCover keeps the front/back cover as actual covers with correct opening logic.
    page.dataset.density = 'soft';
    page.innerHTML = `<div class="engine-trim"><img src="${imagePath(index)}" alt="VIASEAM 杂志第 ${index + 1} 页" draggable="false"></div>`;
    book.appendChild(page);
    pages.push(page);
  }

  const flip = new window.St.PageFlip(book, {
    width: 600,
    height: 849,
    size: 'stretch',
    minWidth: Math.min(220, fittedPageWidth),
    maxWidth: fittedPageWidth,
    minHeight: Math.min(311, fittedPageHeight),
    maxHeight: fittedPageHeight,
    startPage: savedPage,
    drawShadow: true,
    flippingTime: 1180,
    usePortrait: true,
    autoSize: true,
    maxShadowOpacity: 0.42,
    showCover: true,
    mobileScrollSupport: false,
    useMouseEvents: true,
    swipeDistance: 22,
    showPageCorners: true,
    disableFlipByClick: false
  });
  flip.loadFromHTML(pages);

  const pageLabel = overlay.querySelector('[data-engine-page]');
  const progress = overlay.querySelector('.engine-status b');

  const update = pageIndex => {
    const current = clampPage(pageIndex);
    localStorage.setItem(STORAGE_KEY, String(current));
    pageLabel.textContent = current === 0
      ? 'FRONT COVER · 01 / 28'
      : current === TOTAL_PAGES - 1
        ? 'BACK COVER · 28 / 28'
        : `P. ${String(current + 1).padStart(2, '0')} / 28`;
    progress.style.width = `${((current + 1) / TOTAL_PAGES) * 100}%`;
  };

  flip.on('flip', event => update(event.data));
  flip.on('init', event => update(event.data.page));

  const open = () => {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('reader-open');
    window.setTimeout(() => flip.update(), 80);
    window.setTimeout(() => overlay.querySelector('.engine-close').focus(), 160);
  };

  const close = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('reader-open');
  };

  document.querySelector('#enterButton')?.addEventListener('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, { capture: true });

  overlay.querySelector('.engine-close').addEventListener('click', close);
  overlay.querySelector('.engine-backdrop').addEventListener('dblclick', close);

  document.addEventListener('keydown', event => {
    if (!overlay.classList.contains('is-open')) return;
    if (event.key === 'ArrowLeft') flip.flipPrev('bottom');
    if (event.key === 'ArrowRight') flip.flipNext('bottom');
    if (event.key === 'Escape') close();
  });

  window.openViaseamReader = open;
  window.closeViaseamReader = close;
  window.viaseamPageFlip = flip;

  // Allows a magazine page to be shared directly and provides a deterministic QA route.
  const query = new URLSearchParams(window.location.search);
  document.body.classList.toggle('official-site-mode', query.get('site') === '1');
  if (query.get('site') === '1') {
    const menu = document.querySelector('.official-mobile-menu');
    const toggle = document.querySelector('.official-menu-toggle');
    const closeMenu = document.querySelector('.official-menu-close');
    const setMenu = openMenu => { menu?.classList.toggle('is-open', openMenu); menu?.setAttribute('aria-hidden', String(!openMenu)); toggle?.setAttribute('aria-expanded', String(openMenu)); };
    toggle?.addEventListener('click', () => setMenu(!menu?.classList.contains('is-open')));
    closeMenu?.addEventListener('click', () => setMenu(false));
    menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    const note = document.querySelector('.official-service-note');
    document.querySelectorAll('[data-official-unavailable]').forEach(button => button.addEventListener('click', () => { note?.classList.add('is-visible'); window.clearTimeout(window.officialServiceTimer); window.officialServiceTimer = window.setTimeout(() => note?.classList.remove('is-visible'), 1800); }));
  }
  if (query.get('reader') === 'open') {
    const requestedPage = clampPage((Number(query.get('page')) || 1) - 1);
    window.setTimeout(() => {
      flip.turnToPage(requestedPage);
      open();
    }, 120);
  }
})();
