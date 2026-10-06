const root = document.documentElement;

export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const progress = document.querySelector<HTMLElement>('.scroll-progress');
  const toTop = document.querySelector<HTMLElement>('[data-to-top]');
  const mega = header.querySelector<HTMLElement>('[data-mega]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const menuToggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');

  const isMenuOpen = () => menu?.classList.contains('is-open') ?? false;
  const isMegaOpen = () => mega?.classList.contains('is-open') ?? false;

  /* ---------- Scroll: solid header, hide on scroll down, progress bar ---------- */
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = Math.max(0, window.scrollY);
    const max = root.scrollHeight - window.innerHeight;
    root.classList.toggle('header-scrolled', y > 16);
    progress?.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
    toTop?.classList.toggle('is-visible', y > 900);

    const delta = y - lastY;
    const canHide = !isMenuOpen() && !isMegaOpen() && !header.contains(document.activeElement);
    if (y < 320 || delta < -4) root.classList.remove('header-hidden');
    else if (canHide && delta > 4) root.classList.add('header-hidden');

    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();

  header.addEventListener('focusin', () => root.classList.remove('header-hidden'));

  /* ---------- Services mega menu (hover on desktop, button for keyboard/touch) ---------- */
  if (mega) {
    const toggle = mega.querySelector<HTMLButtonElement>('[data-mega-toggle]');
    let closeTimer: number | undefined;

    const open = () => {
      window.clearTimeout(closeTimer);
      mega.classList.add('is-open');
      toggle?.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      window.clearTimeout(closeTimer);
      mega.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    };

    mega.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') open();
    });
    mega.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') closeTimer = window.setTimeout(close, 160);
    });
    toggle?.addEventListener('click', () => (isMegaOpen() ? close() : open()));
    mega.addEventListener('focusout', (e) => {
      if (!mega.contains(e.relatedTarget as Node | null)) close();
    });
    document.addEventListener('click', (e) => {
      if (isMegaOpen() && !mega.contains(e.target as Node)) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMegaOpen()) {
        close();
        toggle?.focus();
      }
    });
  }

  /* ---------- Mobile menu ---------- */
  if (menu && menuToggle) {
    const label = menuToggle.querySelector('[data-menu-label]');
    const outside = [document.getElementById('main'), document.querySelector<HTMLElement>('.site-footer')];

    const setOpen = (open: boolean, restoreFocus = false) => {
      menu.classList.toggle('is-open', open);
      root.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Close menu' : 'Open menu';
      outside.forEach((el) => {
        if (el) el.inert = open;
      });
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) root.classList.remove('header-hidden');
      if (!open && restoreFocus) menuToggle.focus();
    };

    menuToggle.addEventListener('click', () => setOpen(!isMenuOpen()));
    menu.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) setOpen(false, true);
    });
    window.matchMedia('(min-width: 1080px)').addEventListener('change', (e) => {
      if (e.matches && isMenuOpen()) setOpen(false);
    });
    // Close if the page is restored from the back/forward cache with the menu open.
    window.addEventListener('pageshow', () => {
      if (isMenuOpen()) setOpen(false);
    });
  }
}
