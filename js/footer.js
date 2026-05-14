document.addEventListener('DOMContentLoaded', () => {
  const footer = document.createElement('footer');
  footer.className = 'page-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <span class="footer-brand"><i class="bi bi-controller"></i> AJ Games</span>
      <span class="footer-sep">·</span>
      <span class="footer-copy">© 2026 Aleix Auqué</span>
    </div>
  `;
  document.body.appendChild(footer);

  setupCasinoButtons();

  // Re-run when hidden containers become visible (e.g. gameContainer d-none removed)
  new MutationObserver(() => setupCasinoButtons())
    .observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
});

const CASINO_CONFIGS = [
  { selector: '.btn-salas-primary',   color1: '#facc15', color2: '#f97316' },
  { selector: '.btn-intro-secondary', color1: '#38bdf8', color2: '#06b6d4' },
];

function setupCasinoButtons() {
  CASINO_CONFIGS.forEach(({ selector, color1, color2 }) =>
    document.querySelectorAll(selector).forEach(btn => {
      if (btn.offsetWidth === 0) return;

      const existingSvg = btn.querySelector('svg');
      if (existingSvg) {
        const pad = 5;
        const expectedW = btn.offsetWidth + pad * 2;
        if (Math.abs(parseFloat(existingSvg.getAttribute('width')) - expectedW) < 1) return;
        existingSvg.remove();
      }

      buildCasinoBorder(btn, color1, color2);

      if (typeof ResizeObserver !== 'undefined' && !btn._casinoRO) {
        btn._casinoRO = new ResizeObserver(() => {
          const svg = btn.querySelector('svg');
          if (!svg) return;
          const pad = 5;
          const expectedW = btn.offsetWidth + pad * 2;
          if (Math.abs(parseFloat(svg.getAttribute('width')) - expectedW) >= 1) {
            svg.remove();
            buildCasinoBorder(btn, color1, color2);
          }
        });
        btn._casinoRO.observe(btn);
      }
    })
  );
}

function buildCasinoBorder(btn, color1, color2) {
  const ns = 'http://www.w3.org/2000/svg';
  const pad = 5;
  const gap = 4;
  const numDots = 8;
  const dotLen = 40;
  const duration = 8000;

  const bW = btn.offsetWidth;
  const bH = btn.offsetHeight;
  const W = bW + pad * 2;
  const H = bH + pad * 2;
  const rx = bH / 2 + gap;
  const perim = 2 * (bW + 2 * gap - 2 * rx) + 2 * Math.PI * rx;
  const speed = perim / duration;

  const gradId = `btnGrad_${Math.random().toString(36).slice(2)}`;

  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', W);
  svg.setAttribute('height', H);
  Object.assign(svg.style, {
    position: 'absolute',
    top: `-${pad}px`,
    left: `-${pad}px`,
    pointerEvents: 'none',
    zIndex: '2',
    overflow: 'visible'
  });

  const defs = document.createElementNS(ns, 'defs');
  const grad = document.createElementNS(ns, 'linearGradient');
  grad.setAttribute('id', gradId);
  grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '100%');
  const s1 = document.createElementNS(ns, 'stop');
  s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', color1);
  const s2 = document.createElementNS(ns, 'stop');
  s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', color2);
  grad.appendChild(s1); grad.appendChild(s2);
  defs.appendChild(grad);
  svg.appendChild(defs);

  const dots = [];
  for (let i = 0; i < numDots; i++) {
    const r = document.createElementNS(ns, 'rect');
    r.setAttribute('x', pad - gap);
    r.setAttribute('y', pad - gap);
    r.setAttribute('width', bW + gap * 2);
    r.setAttribute('height', bH + gap * 2);
    r.setAttribute('rx', rx);
    r.setAttribute('fill', 'none');
    r.setAttribute('stroke', `url(#${gradId})`);
    r.setAttribute('stroke-width', '3');
    r.setAttribute('stroke-linecap', 'round');
    const initOffset = -(i * perim / numDots);
    r.setAttribute('stroke-dasharray', `${dotLen} ${perim - dotLen}`);
    r.setAttribute('stroke-dashoffset', initOffset);
    svg.appendChild(r);
    dots.push({ el: r, offset: initOffset });
  }

  btn.appendChild(svg);

  let last = null;
  (function animate(ts) {
    if (!btn.isConnected) return;
    if (last !== null) {
      const dt = ts - last;
      for (const d of dots) {
        d.offset -= speed * dt;
        d.el.setAttribute('stroke-dashoffset', d.offset);
      }
    }
    last = ts;
    requestAnimationFrame(animate);
  })(performance.now());
}
