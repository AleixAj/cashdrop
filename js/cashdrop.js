'use strict';

function goTo(page) { window.location.href = page; }
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ═══════════════════════════════════════════════════════
//  QUESTION POOL  (Cultura general + Actualidad + Geografía)
// ═══════════════════════════════════════════════════════
const qPool = {
  facil: [
    { p: "¿Cuál es el animal terrestre más rápido del mundo?",         o: ["León","Guepardo","Tigre","Antílope"],                                    c: 1, e: "El guepardo alcanza hasta 110 km/h en carreras cortas, más que cualquier otro animal terrestre." },
    { p: "¿Quién pintó la 'Mona Lisa'?",                               o: ["Pablo Picasso","Vincent van Gogh","Leonardo da Vinci","Miguel Ángel"],   c: 2, e: "Leonardo da Vinci la pintó en el siglo XVI. Hoy se expone en el Museo del Louvre, en París." },
    { p: "¿Cómo se llama el ratón más famoso de Disney?",              o: ["Donald","Goofy","Mickey","Pluto"],                                      c: 2, e: "Mickey Mouse fue creado en 1928 por Walt Disney. Su primer nombre iba a ser Mortimer, pero cambió." },
    { p: "¿Qué planeta es conocido como el 'Planeta Rojo'?",           o: ["Mercurio","Marte","Júpiter","Venus"],                                   c: 1, e: "Marte recibe ese apodo por el óxido de hierro de su superficie, que le da un tono rojizo." },
    { p: "¿Qué red social cambió su logo por una 'X'?",                o: ["Twitter","Facebook","Instagram","TikTok"],                              c: 0, e: "Twitter pasó a llamarse X tras el rebranding impulsado por Elon Musk en 2023." },
    { p: "¿Qué empresa fabrica los iPhone?",                           o: ["Apple","Google","Samsung","Huawei"],                                    c: 0, e: "Apple lanzó el primer iPhone en 2007 y es desde entonces el mayor fabricante de teléfonos premium." },
    { p: "¿En qué ciudad se celebraron los JJ.OO. de verano de 2024?", o: ["París","Londres","Tokio","Berlín"],                                     c: 0, e: "París acogió los Juegos Olímpicos de 2024, siendo la tercera vez que organiza los Juegos de verano." },
    { p: "¿Cuál es la capital de Brasil?",                             o: ["Río de Janeiro","São Paulo","Brasilia","Salvador"],                     c: 2, e: "Brasilia es la capital desde 1960. Fue construida de cero para evitar concentrar el poder en Río." },
    { p: "¿Qué país tiene forma de bota en el mapa?",                  o: ["Grecia","Italia","Chile","Portugal"],                                   c: 1, e: "Italia es famosa por su forma de bota, que parece patear la isla de Sicilia hacia el sur." },
    { p: "¿En qué continente se encuentra Egipto?",                    o: ["Asia","Europa","África","Oceanía"],                                     c: 2, e: "Egipto está en el noreste de África, aunque la Península del Sinaí conecta geográficamente con Asia." },
    { p: "¿Cuál es la capital oficial de Turquía?",                    o: ["Estambul","Ankara","Esmirna","Bursa"],                                  c: 1, e: "Desde 1923, la capital de Turquía es Ankara. Mucha gente confunde con Estambul, que es la más grande." },
    { p: "¿Qué océano separa América de Europa?",                      o: ["Índico","Pacífico","Atlántico","Ártico"],                               c: 2, e: "El océano Atlántico es el segundo más grande del mundo y separa América de Europa y África." },
  ],
  media: [
    { p: "¿De qué color es realmente una 'caja negra' de avión?",      o: ["Naranja","Gris","Azul","Negra"],                                       c: 0, e: "Son naranja brillante para facilitar su localización tras un accidente. El nombre viene de su función." },
    { p: "¿Cuántos meses tienen exactamente 30 días?",                 o: ["3","4","2","5"],                                                       c: 1, e: "Abril, junio, septiembre y noviembre. Los otros meses tienen 31, excepto febrero con 28 o 29." },
    { p: "¿Qué civilización construyó Machu Picchu?",                  o: ["Azteca","Maya","Inca","Olmeca"],                                       c: 2, e: "El Imperio Inca construyó Machu Picchu en el siglo XV. Fue descubierta por el mundo en 1911." },
    { p: "¿Qué ciudad tiene el metro más antiguo del mundo?",          o: ["París","Nueva York","Londres","Berlín"],                               c: 2, e: "El metro de Londres abrió en 1863. París en 1900, Berlín en 1902 y Nueva York en 1904." },
    { p: "¿Qué empresa es propietaria de WhatsApp?",                   o: ["Meta","Google","Apple","Telegram"],                                    c: 0, e: "Facebook (ahora Meta) compró WhatsApp en 2014 por unos 19.000 millones de dólares." },
    { p: "¿Cuál es la película más taquillera de la historia?",        o: ["Avengers: Endgame","Titanic","Avatar","Star Wars VII"],                c: 2, e: "Avatar supera los 2.900M$ y recuperó el 1er puesto tras varios reestrenos. Endgame lo superó brevemente." },
    { p: "¿Qué país es conocido como 'la tierra del sol naciente'?",   o: ["China","Japón","Corea del Sur","Tailandia"],                           c: 1, e: "Nippon (Japón en japonés) significa 'origen del sol'. Se debe a su posición al este de China." },
    { p: "¿Qué país tiene mayor población actualmente?",               o: ["China","Estados Unidos","India","Indonesia"],                          c: 2, e: "India superó a China recientemente como el país más poblado, con más de 1.400 millones de habitantes." },
    { p: "¿Cuál es el país más pequeño del mundo?",                    o: ["Mónaco","San Marino","Liechtenstein","Vaticano"],                      c: 3, e: "El Vaticano, con menos de 1 km², es el país más pequeño del mundo, enclavado en Roma." },
    { p: "¿En qué país está situado el Taj Mahal?",                    o: ["Pakistán","Bangladés","India","Nepal"],                               c: 2, e: "El Taj Mahal está en Agra, India. Fue construido por el emperador Shah Jahan en honor a su esposa." },
    { p: "¿Qué franquicia tecnológica domina el streaming global?",    o: ["Disney+","Netflix","Prime Video","HBO Max"],                          c: 1, e: "Netflix supera los 260 millones de suscriptores y sigue siendo líder indiscutible del streaming." },
    { p: "¿Cuál es la capital de Australia?",                          o: ["Sídney","Melbourne","Canberra","Perth"],                              c: 2, e: "Canberra fue elegida como capital en 1908 como punto intermedio entre Sídney y Melbourne para evitar rivalidades." },
  ],
  dificil: [
    { p: "¿Qué planeta del sistema solar tiene más satélites naturales?", o: ["Júpiter","Saturno","Urano","Neptuno"],                             c: 1, e: "Saturno lidera con más de 270 lunas conocidas. Su luna Titán incluso tiene atmósfera propia." },
    { p: "¿Qué país tiene más pirámides en su territorio?",            o: ["Egipto","México","Sudán","Perú"],                                     c: 2, e: "Sudán supera las 200 pirámides de la antigua civilización nubia, más del doble que Egipto." },
    { p: "¿Cuál es el órgano más grande del cuerpo humano?",           o: ["Hígado","Piel","Pulmones","Intestino delgado"],                       c: 1, e: "La piel cubre unos 2 m² en un adulto promedio. Es el órgano más grande y pesa entre 3 y 5 kg." },
    { p: "¿Cuál es el metal más valioso del mundo por peso?",          o: ["Oro","Platino","Rodio","Paladio"],                                    c: 2, e: "El rodio puede superar los 10.000 $/onza por su rareza y su uso en catalizadores de coches." },
    { p: "¿Qué país lidera la producción mundial de chips avanzados?", o: ["Taiwán","Corea del Sur","Estados Unidos","China"],                   c: 0, e: "TSMC (Taiwán) fabrica los chips más avanzados del mundo, haciendo a Taiwán estratégicamente crucial." },
    { p: "¿Qué franquicia ha generado más dinero en la historia?",     o: ["Marvel","Star Wars","Pokémon","Harry Potter"],                       c: 2, e: "Pokémon supera los 100.000M€ en total contando juegos, cartas, series y merchandising global." },
    { p: "¿Cuál es el desierto más grande del mundo?",                 o: ["Antártida","Gobi","Sahara","Kalahari"],                              c: 0, e: "La Antártida es el desierto más grande: recibe menos de 50 mm de precipitación anual. Un desierto frío." },
    { p: "¿Qué país tiene el mayor número de islas del mundo?",        o: ["Filipinas","Indonesia","Suecia","Canadá"],                           c: 2, e: "Suecia tiene más de 200.000 islas, superando a países tropicales como Indonesia o Filipinas." },
    { p: "¿Cuál es la capital de gobierno más alta del mundo?",        o: ["Quito (Ecuador)","La Paz (Bolivia)","Bogotá (Colombia)","Adís Abeba"], c: 1, e: "La Paz, sede del gobierno boliviano, está a 3.640 m sobre el nivel del mar. Los visitantes notan el aire." },
    { p: "¿Con cuántos países hace frontera España?",                  o: ["2","3","4","5"],                                                     c: 3, e: "Portugal, Francia, Andorra, Marruecos (Ceuta y Melilla) y Reino Unido (Gibraltar). Son 5 países." },
  ],
};

// ═══════════════════════════════════════════════════════
//  GAME STATE
// ═══════════════════════════════════════════════════════
const BUNDLES_TOTAL = 20;
const BUNDLE_VALUE  = 50000;

let game = {
  questions : [],
  qIndex    : 0,
  bundles   : BUNDLES_TOTAL,
  placed    : [0, 0, 0, 0],
  phase     : 'start',   // 'start' | 'betting' | 'revealing' | 'end'
};

// ═══════════════════════════════════════════════════════
//  START
// ═══════════════════════════════════════════════════════
function startGame() {
  const faciles   = shuffle(qPool.facil).slice(0, 2).map(q => ({ ...q, diff: 'facil'  }));
  const medias    = shuffle(qPool.media).slice(0, 2).map(q => ({ ...q, diff: 'media'  }));
  const dificiles = shuffle(qPool.dificil).slice(0, 2).map(q => ({ ...q, diff: 'dificil' }));

  game.questions = [...faciles, ...medias, ...dificiles];
  game.qIndex    = 0;
  game.bundles   = BUNDLES_TOTAL;
  game.placed    = [0, 0, 0, 0];
  game.phase     = 'betting';

  hide('introScreen');
  show('gameScreen');
  renderQuestion();
}

// ═══════════════════════════════════════════════════════
//  RENDER QUESTION
// ═══════════════════════════════════════════════════════
const SCREEN_COLORS = [
  { col: 'var(--option-a)', alpha: 'rgba(239,68,68,0.28)'   },
  { col: 'var(--option-b)', alpha: 'rgba(59,130,246,0.28)'  },
  { col: 'var(--option-c)', alpha: 'rgba(16,185,129,0.28)'  },
  { col: 'var(--option-d)', alpha: 'rgba(245,158,11,0.28)'  },
];
const LETTERS = ['A', 'B', 'C', 'D'];

function renderQuestion() {
  const q = game.questions[game.qIndex];
  game.placed = [0, 0, 0, 0];
  game.phase  = 'betting';

  // ── Top bar ──
  renderDots();
  document.getElementById('qNum').textContent  = `Pregunta ${game.qIndex + 1} / 6`;
  const diffLabels = { facil: '🟢 Fácil', media: '🟡 Media', dificil: '🔴 Difícil' };
  document.getElementById('qDiff').textContent = diffLabels[q.diff];

  // ── Question text ──
  document.getElementById('qText').textContent = q.p;

  // ── Build 4 screen panels ──
  const grid = document.getElementById('screensGrid');
  grid.innerHTML = LETTERS.map((letter, i) => {
    const { col, alpha } = SCREEN_COLORS[i];
    return `
      <div class="screen-panel" id="panel-${i}">
        <div class="screen-tv" id="tv-${i}"
             style="--scol:${col};--scol-a:${alpha}"
             onclick="clickScreen(${i})"
             title="Haz clic para añadir un fajo">
          <span class="opt-letter">${letter}</span>
          <span class="opt-text">${escapeHtml(q.o[i])}</span>
        </div>
        <div class="glass-table" id="glass-${i}" style="--scol:${col}">
          <div class="glass-bundles-area" id="gbundles-${i}"></div>
          <div class="glass-footer">
            <span class="glass-amount" id="gamount-${i}">0 €</span>
            <div class="glass-controls">
              <button class="gc-btn minus" id="gminus-${i}" onclick="adjustBundle(${i}, -1)">−</button>
              <span  class="gc-count"      id="gcount-${i}" onclick="editCount(${i})" title="Clic para escribir cantidad">0</span>
              <button class="gc-btn plus"  id="gplus-${i}"  onclick="adjustBundle(${i},  1)">+</button>
            </div>
          </div>
          <div class="gc-quick-btns">
            <button class="gc-btn-allin"  id="gallin-${i}"  onclick="allIn(${i})">All in</button>
            <button class="gc-btn-clear"  id="gclear-${i}"  onclick="clearScreen(${i})">Quitar todo</button>
          </div>
        </div>
      </div>`;
  }).join('');

  // ── Setup drag & drop zones ──
  for (let i = 0; i < 4; i++) {
    [document.getElementById(`glass-${i}`), document.getElementById(`tv-${i}`)].forEach(zone => {
      if (!zone) return;
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', e => { if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over'); });
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const raw = e.dataTransfer.getData('text/plain');
        if (raw === 'mesa') {
          adjustBundle(i, 1);
        } else {
          const src = parseInt(raw, 10);
          if (isNaN(src) || src === i) return;
          dragTransfer(src, i);
        }
      });
    });
  }

  // ── Mesa central como zona de drop (devolver fajos) ──
  const mesaZone = document.getElementById('mesaCentral');
  if (mesaZone) {
    mesaZone.addEventListener('dragover', e => { e.preventDefault(); mesaZone.classList.add('drag-over'); });
    mesaZone.addEventListener('dragleave', e => { if (!mesaZone.contains(e.relatedTarget)) mesaZone.classList.remove('drag-over'); });
    mesaZone.addEventListener('drop', e => {
      e.preventDefault();
      mesaZone.classList.remove('drag-over');
      const raw = e.dataTransfer.getData('text/plain');
      if (raw === 'mesa') return;
      const src = parseInt(raw, 10);
      if (!isNaN(src)) adjustBundle(src, -1);
    });
  }

  // ── Reset UI ──
  hide('revealPanel');
  document.getElementById('confirmBtn').disabled = true;

  refreshAllGlass();
  refreshMesa();
  refreshStatus();
  refreshTotal();
}

// ═══════════════════════════════════════════════════════
//  REFRESH HELPERS
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
//  TOUCH DRAG SUPPORT
// ═══════════════════════════════════════════════════════
let _td = null; // active touch drag state

function getDropZoneAt(x, y) {
  for (let i = 0; i < 4; i++) {
    for (const id of [`glass-${i}`, `tv-${i}`]) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return el;
    }
  }
  const mesa = document.getElementById('mesaCentral');
  if (mesa) {
    const r = mesa.getBoundingClientRect();
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return mesa;
  }
  return null;
}

function handleTouchDrop(zone, src) {
  for (let i = 0; i < 4; i++) {
    if (zone.id === `glass-${i}` || zone.id === `tv-${i}`) {
      if (src === 'mesa') { adjustBundle(i, 1); return; }
      const s = parseInt(src, 10);
      if (!isNaN(s) && s !== i) dragTransfer(s, i);
      return;
    }
  }
  if (zone.id === 'mesaCentral' && src !== 'mesa') {
    const s = parseInt(src, 10);
    if (!isNaN(s)) adjustBundle(s, -1);
  }
}

document.addEventListener('touchmove', e => {
  if (!_td) return;
  e.preventDefault();
  const t = e.touches[0];
  _td.ghost.style.left = (t.clientX - _td.ghost.offsetWidth  / 2) + 'px';
  _td.ghost.style.top  = (t.clientY - _td.ghost.offsetHeight / 2) + 'px';
  document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  const zone = getDropZoneAt(t.clientX, t.clientY);
  if (zone) zone.classList.add('drag-over');
}, { passive: false });

document.addEventListener('touchend', e => {
  if (!_td) return;
  const t = e.changedTouches[0];
  _td.ghost.remove();
  if (_td.origin) _td.origin.style.opacity = '1';
  document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  const zone = getDropZoneAt(t.clientX, t.clientY);
  if (zone) handleTouchDrop(zone, _td.src);
  _td = null;
});

function addTouchDrag(img, src) {
  img.addEventListener('touchstart', e => {
    e.preventDefault();
    const t = e.touches[0];
    const ghost = img.cloneNode(true);
    Object.assign(ghost.style, {
      position: 'fixed',
      pointerEvents: 'none',
      opacity: '0.75',
      zIndex: '9999',
      width:  img.offsetWidth  + 'px',
      height: img.offsetHeight + 'px',
      left: (t.clientX - img.offsetWidth  / 2) + 'px',
      top:  (t.clientY - img.offsetHeight / 2) + 'px',
      transform: 'scale(1.25)',
      transition: 'none',
    });
    document.body.appendChild(ghost);
    img.style.opacity = '0.3';
    _td = { ghost, origin: img, src };
  }, { passive: false });
}

function makeBundleImg(size) {
  const img = document.createElement('img');
  img.src = 'img/fajo.png';
  img.className = `bundle-img-${size}`;
  img.alt = '50.000€';
  return img;
}

function refreshDot(i) {
  const el = document.getElementById(`gbundles-${i}`);
  if (!el) return;
  el.innerHTML = '';
  const n = game.placed[i];
  for (let j = 0; j < n; j++) {
    const img = makeBundleImg('sm');
    img.draggable = true;
    img.style.cursor = 'grab';
    img.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', String(i));
      e.dataTransfer.effectAllowed = 'move';
      img.style.opacity = '0.5';
    });
    img.addEventListener('dragend', () => {
      img.style.opacity = '1';
      document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });
    addTouchDrag(img, String(i));
    el.appendChild(img);
  }
}

function refreshAllGlass() {
  const unplaced = unplacedCount();
  for (let i = 0; i < 4; i++) {
    const n = game.placed[i];
    const countEl  = document.getElementById(`gcount-${i}`);
    const amountEl = document.getElementById(`gamount-${i}`);
    const plusBtn  = document.getElementById(`gplus-${i}`);
    const minusBtn = document.getElementById(`gminus-${i}`);
    if (!countEl) continue;

    countEl.textContent  = n;
    amountEl.textContent = n > 0 ? fmt(n * BUNDLE_VALUE) : '0 €';
    refreshDot(i);

    if (plusBtn)  plusBtn.disabled  = unplaced === 0;
    if (minusBtn) minusBtn.disabled = n === 0;
  }
}

function buildPyramidRows(n) {
  if (n === 0) return [];
  // Find base width: smallest b where b*(b+1)/2 >= n
  let base = Math.round((-1 + Math.sqrt(1 + 8 * n)) / 2);
  while (base * (base + 1) / 2 < n) base++;
  // Fill rows from bottom (widest) to top
  const rows = [];
  let remaining = n;
  for (let r = base; r >= 1 && remaining > 0; r--) {
    const count = Math.min(r, remaining);
    rows.push(count);
    remaining -= count;
  }
  return rows; // rows[0] = bottom row (widest), CSS column-reverse renders it at bottom
}

function refreshMesa() {
  const container = document.getElementById('mesaBundles');
  if (!container) return;
  container.innerHTML = '';
  const unplaced = unplacedCount();

  buildPyramidRows(unplaced).forEach(count => {
    const rowEl = document.createElement('div');
    rowEl.className = 'mesa-bundle-row';
    for (let i = 0; i < count; i++) {
      const img = makeBundleImg('md');
      if (game.phase === 'betting') {
        img.draggable = true;
        img.style.cursor = 'grab';
        img.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', 'mesa');
          e.dataTransfer.effectAllowed = 'move';
          img.style.opacity = '0.5';
        });
        img.addEventListener('dragend', () => {
          img.style.opacity = '1';
          document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        });
        addTouchDrag(img, 'mesa');
      }
      rowEl.appendChild(img);
    }
    container.appendChild(rowEl);
  });

  document.getElementById('mesaTotal').textContent = fmt(unplaced * BUNDLE_VALUE);
}

function refreshTotal() {
  const el = document.getElementById('totalAmount');
  if (el) el.textContent = fmt(game.bundles * BUNDLE_VALUE);
}

let _errorTimer = null;
function showPlacementError(screenIdx) {
  if (_errorTimer) clearTimeout(_errorTimer);
  let popup = document.getElementById('placementErrorPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'placementErrorPopup';
    document.body.appendChild(popup);
  }
  popup.innerHTML = `<i class="bi bi-x-circle-fill"></i> No se pueden colocar billetes en todas las opciones`;

  const panel = document.getElementById(`panel-${screenIdx}`);
  if (panel) {
    const rect = panel.getBoundingClientRect();
    popup.style.top  = `${rect.top + window.scrollY - 12}px`;
    popup.style.left = `${rect.left + rect.width / 2}px`;
    popup.style.transform = 'translate(-50%, -100%)';
  }

  popup.classList.remove('fade-out');
  popup.classList.add('visible');
  _errorTimer = setTimeout(() => {
    popup.classList.add('fade-out');
    popup.addEventListener('animationend', () => popup.classList.remove('visible', 'fade-out'), { once: true });
    _errorTimer = null;
  }, 2200);
}

function refreshStatus() {
  if (_errorTimer) return;
  const un   = unplacedCount();
  const btn  = document.getElementById('confirmBtn');
  const st   = document.getElementById('unplacedStatus');
  const grid = document.getElementById('screensGrid');
  if (btn)  btn.disabled = un !== 0;
  if (grid) grid.classList.toggle('has-placed', game.placed.some(p => p > 0));
  if (!st) return;
  if (un === 0) {
    st.innerHTML = `<i class="bi bi-check-circle-fill"></i> Todo colocado — listo para confirmar`;
    st.className = 'unplaced-status ok';
  } else {
    st.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${un} fajo${un !== 1 ? 's' : ''} sin colocar`;
    st.className = 'unplaced-status warn';
  }
}

function renderDots() {
  const container = document.getElementById('progressDots');
  if (!container) return;
  container.innerHTML = game.questions.map((_, i) => {
    let cls = 'dot';
    if (i < game.qIndex) cls += ' done';
    else if (i === game.qIndex) cls += ' active';
    return `<span class="${cls}"></span>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════
//  INTERACTION
// ═══════════════════════════════════════════════════════
function clickScreen(screenIdx) {
  if (game.phase !== 'betting') return;
  const unplaced = unplacedCount();

  if (unplaced > 0) {
    adjustBundle(screenIdx, 1);
    return;
  }

  // Todo colocado: si solo hay UNA pantalla distinta con fajos, coge 1 de ella
  const others = game.placed
    .map((p, i) => ({ p, i }))
    .filter(({ p, i }) => p > 0 && i !== screenIdx);

  if (others.length === 1) {
    game.placed[others[0].i]--;
    game.placed[screenIdx]++;
    refreshAllGlass();
    refreshMesa();
    refreshStatus();
  }
}

function dragTransfer(srcIdx, dstIdx) {
  if (game.phase !== 'betting') return;
  if (game.placed[srcIdx] === 0) return;
  if (game.placed[dstIdx] === 0 && game.placed[srcIdx] > 1 && game.placed.filter(p => p > 0).length === 3) {
    showPlacementError(dstIdx); return;
  }
  game.placed[srcIdx]--;
  game.placed[dstIdx]++;
  refreshAllGlass();
  refreshMesa();
  refreshStatus();
}

function adjustBundle(screenIdx, delta) {
  if (game.phase !== 'betting') return;
  const un = unplacedCount();
  if (delta < 0 && game.placed[screenIdx] === 0) return;
  if (delta > 0 && game.placed[screenIdx] === 0 && game.placed.filter(p => p > 0).length === 3) {
    showPlacementError(screenIdx); return;
  }
  if (delta > 0 && un === 0) return;
  game.placed[screenIdx] += delta;
  refreshAllGlass();
  refreshMesa();
  refreshStatus();
}

function allIn(screenIdx) {
  if (game.phase !== 'betting') return;
  game.placed = [0, 0, 0, 0];
  game.placed[screenIdx] = game.bundles;
  refreshAllGlass();
  refreshMesa();
  refreshStatus();
}

function clearScreen(screenIdx) {
  if (game.phase !== 'betting') return;
  game.placed[screenIdx] = 0;
  refreshAllGlass();
  refreshMesa();
  refreshStatus();
}

function editCount(screenIdx) {
  if (game.phase !== 'betting') return;
  const countEl   = document.getElementById(`gcount-${screenIdx}`);
  if (!countEl) return;

  const current    = game.placed[screenIdx];
  const maxAllowed = current + unplacedCount();

  const input = document.createElement('input');
  input.type      = 'number';
  input.value     = current;
  input.min       = 0;
  input.max       = maxAllowed;
  input.className = 'gc-count-input';
  countEl.replaceWith(input);
  input.focus();
  input.select();

  const commit = () => {
    let val = parseInt(input.value, 10);
    if (isNaN(val) || val < 0) val = 0;
    if (val > maxAllowed)      val = maxAllowed;
    if (val > 0 && current === 0 && game.placed.filter(p => p > 0).length === 3) {
      showPlacementError(screenIdx); val = 0;
    }
    game.placed[screenIdx] = val;

    const span = document.createElement('span');
    span.className = 'gc-count';
    span.id        = `gcount-${screenIdx}`;
    span.textContent = val;
    span.title     = 'Clic para escribir cantidad';
    span.onclick   = () => editCount(screenIdx);
    input.replaceWith(span);

    refreshAllGlass();
    refreshMesa();
    refreshStatus();
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  input.blur();
    if (e.key === 'Escape') { input.value = current; input.blur(); }
  });
  input.addEventListener('blur', commit);
}

function confirmBet() {
  if (game.phase !== 'betting') return;
  if (unplacedCount() !== 0) return;
  game.phase = 'revealing';

  // Disable all controls
  document.querySelectorAll('.gc-btn, .gc-btn-allin, .gc-btn-clear, #confirmBtn').forEach(el => el.disabled = true);

  const q           = game.questions[game.qIndex];
  const correctIdx  = q.c;
  const keptBundles = game.placed[correctIdx];
  const lostBundles = game.bundles - keptBundles;

  // ── Panel reveal states ──
  for (let i = 0; i < 4; i++) {
    const panel = document.getElementById(`panel-${i}`);
    if (!panel) continue;
    panel.classList.add(i === correctIdx ? 'panel-correct' : 'panel-wrong');
  }

  // ── Update game state ──
  game.bundles = keptBundles;
  refreshTotal();
  refreshMesa();

  // ── Fill reveal card ──
  const letter = LETTERS[correctIdx];

  const badge = document.getElementById('revealBadge');
  if (keptBundles > 0) {
    badge.textContent = '✅ ¡Correcto!';
    badge.className   = 'reveal-badge correct';
  } else {
    badge.textContent = '❌ ¡Incorrecto!';
    badge.className   = 'reveal-badge wrong';
  }

  document.getElementById('revealAnswer').textContent     = `${letter} — ${q.o[correctIdx]}`;
  document.getElementById('revealKept').textContent       = `+${fmt(keptBundles * BUNDLE_VALUE)}`;
  document.getElementById('revealKeptFajos').textContent  = `${keptBundles} fajo${keptBundles !== 1 ? 's' : ''}`;
  document.getElementById('revealLost').textContent       = `−${fmt(lostBundles * BUNDLE_VALUE)}`;
  document.getElementById('revealLostFajos').textContent  = `${lostBundles} fajo${lostBundles !== 1 ? 's' : ''}`;
  document.getElementById('revealExpl').textContent       = q.e;

  const gameOverEl = document.getElementById('gameOverMsg');
  if (gameOverEl) gameOverEl.classList.toggle('d-none', game.bundles !== 0);

  const isLast = game.qIndex >= 5 || game.bundles === 0;
  document.getElementById('nextBtn').innerHTML = isLast
    ? 'Ver resultado <i class="bi bi-trophy-fill"></i>'
    : 'Siguiente pregunta <i class="bi bi-arrow-right"></i>';

  show('revealPanel');
  document.getElementById('revealPanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextQuestion() {
  game.qIndex++;
  if (game.qIndex >= 6 || game.bundles === 0) {
    showEnd();
    return;
  }
  // Clean panel classes
  for (let i = 0; i < 4; i++) {
    const panel = document.getElementById(`panel-${i}`);
    if (panel) panel.classList.remove('panel-correct', 'panel-wrong');
  }
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════
//  END SCREEN
// ═══════════════════════════════════════════════════════
function showEnd() {
  hide('gameScreen');
  show('endScreen');

  const finalMoney = game.bundles * BUNDLE_VALUE;
  document.getElementById('finalAmount').textContent = fmt(finalMoney);

  const tiers = [
    { min: 950001, emoji: '🏆', msg: '¡Increíble! Casi intacto. Eres un maestro.' },
    { min: 700001, emoji: '🥇', msg: '¡Excelente resultado! Muy bien jugado.' },
    { min: 500001, emoji: '🥈', msg: 'Buen juego, conservaste más de la mitad.' },
    { min: 300001, emoji: '👍', msg: 'Resultado decente. Se puede mejorar.' },
    { min: 100001, emoji: '😅', msg: 'Las dudas te pasaron factura...' },
    { min: 1,      emoji: '😬', msg: 'Por los pelos. Casi sin dinero.' },
    { min: 0,      emoji: '😢', msg: '¡Sin dinero! Suerte la próxima vez.' },
  ];
  const tier = tiers.find(t => finalMoney >= t.min) ?? tiers[tiers.length - 1];
  document.getElementById('endEmoji').textContent = tier.emoji;
  document.getElementById('endMsg').textContent   = tier.msg;

  const endBundles = document.getElementById('endBundles');
  endBundles.innerHTML = '';
  for (let i = 0; i < game.bundles; i++) {
    endBundles.appendChild(makeBundleImg('lg'));
  }
}

// ═══════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════
function unplacedCount() {
  return game.bundles - game.placed.reduce((a, b) => a + b, 0);
}

function fmt(n) {
  return n.toLocaleString('es-ES') + ' €';
}

function show(id) { document.getElementById(id)?.classList.remove('d-none'); }
function hide(id) { document.getElementById(id)?.classList.add('d-none'); }
