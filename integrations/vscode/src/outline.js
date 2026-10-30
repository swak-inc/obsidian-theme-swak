const headingSelector = 'h1, h2, h3, h4, h5, h6';

export function createOutline({ getRoot, onNavigate }) {
  const layout = document.getElementById('document-layout');
  const sidebar = document.getElementById('outline');
  const list = document.getElementById('outline-list');
  const empty = document.getElementById('outline-empty');
  const toggle = document.getElementById('outline-toggle');
  const toolbar = document.getElementById('toolbar');
  const narrow = matchMedia('(max-width: 800px)');
  let desktopOpen = true, mobileOpen = false, headings = [], buttons = [], signature = '', active = -1;
  let refreshFrame = 0, scrollFrame = 0;

  function updateVisibility() {
    const open = narrow.matches ? mobileOpen : desktopOpen;
    sidebar.hidden = !open;
    layout.classList.toggle('outline-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('selected', open);
    scheduleCurrent();
  }
  function setOpen(open) {
    if (narrow.matches) mobileOpen = open;
    else desktopOpen = open;
    updateVisibility();
  }
  function updateCurrent() {
    scrollFrame = 0;
    // scrollIntoViewとsticky領域のサブピクセル丸めを吸収する。
    const threshold = toolbar.getBoundingClientRect().bottom + 28;
    let next = -1;
    for (let index = 0; index < headings.length; index++) {
      const heading = headings[index];
      if (!heading.getClientRects().length) continue;
      if (next < 0) next = index;
      if (heading.getBoundingClientRect().top <= threshold) next = index;
      else break;
    }
    if (next === active) return;
    active = next;
    buttons.forEach((button, index) => {
      if (index === active) button.setAttribute('aria-current', 'location');
      else button.removeAttribute('aria-current');
    });
    list.querySelectorAll('.outline-branch-active').forEach(branch => branch.classList.remove('outline-branch-active'));
    const button = buttons[active];
    for (let branch = button?.parentElement.parentElement; branch && branch !== list; branch = branch.parentElement.parentElement) {
      branch.classList.add('outline-branch-active');
    }
    if (button && !sidebar.hidden) {
      const bounds = button.getBoundingClientRect(), viewport = list.getBoundingClientRect();
      if (bounds.top < viewport.top) list.scrollTop += bounds.top - viewport.top;
      else if (bounds.bottom > viewport.bottom) list.scrollTop += bounds.bottom - viewport.bottom;
    }
  }
  function scheduleCurrent() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateCurrent);
  }
  function expandAncestors(heading) {
    for (let parent = heading.parentElement; parent; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS') parent.open = true;
      if (parent.classList.contains('callout-content') && parent.hidden) {
        parent.previousElementSibling?.querySelector('.swak-fold')?.click();
      }
    }
  }
  function navigate(index) {
    const heading = headings[index];
    if (!heading) return;
    expandAncestors(heading);
    onNavigate(heading);
    heading.scrollIntoView({ block: 'start', behavior: 'instant' });
    if (narrow.matches) setOpen(false);
    scheduleCurrent();
  }
  function refresh() {
    if (refreshFrame) return;
    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = 0;
      headings = [...(getRoot()?.querySelectorAll(headingSelector) || [])];
      const nextSignature = JSON.stringify(headings.map(heading => [heading.tagName, heading.textContent]));
      if (nextSignature !== signature) {
        signature = nextSignature;
        active = -1;
        const fragment = document.createDocumentFragment();
        const parents = [];
        buttons = headings.map((heading, index) => {
          const level = Number(heading.tagName.slice(1));
          while (parents.length && parents.at(-1).level >= level) parents.pop();
          const parent = parents.at(-1);
          // 見出しレベルが飛んでも、直前の上位見出しの子としてまとめる。
          const container = parent
            ? (parent.children ||= parent.item.appendChild(document.createElement('ol')))
            : fragment;
          const item = document.createElement('li');
          const button = item.appendChild(document.createElement('button'));
          const title = heading.textContent.trim() || '無題の見出し';
          button.type = 'button'; button.textContent = title; button.title = title;
          button.addEventListener('click', () => navigate(index));
          container.appendChild(item);
          parents.push({ level, item });
          return button;
        });
        list.replaceChildren(fragment);
        empty.hidden = headings.length > 0;
      }
      scheduleCurrent();
    });
  }
  toggle.addEventListener('click', () => setOpen(sidebar.hidden));
  document.getElementById('outline-close').addEventListener('click', () => { setOpen(false); toggle.focus(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && narrow.matches && mobileOpen) { setOpen(false); toggle.focus(); }
  });
  narrow.addEventListener('change', updateVisibility);
  window.addEventListener('scroll', scheduleCurrent, { passive: true });
  window.addEventListener('resize', scheduleCurrent);
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--toolbar-height', `${toolbar.offsetHeight}px`);
    scheduleCurrent();
  }).observe(toolbar);
  updateVisibility();
  return { refresh };
}
