/* ───────────────────────────────────────────────────────────
   El Timbre · fragmentos de UI compartidos
   ─────────────────────────────────────────────────────────── */
(function () {
  const T = window.T;
  const D = T.D;
  const U = (T.ui = {});
  const HOUSE_COLORS = ['reg', 'cum', 'fol', 'rock'];

  /** Cabecera de pantalla: volver, título y acciones (derecha → izquierda) */
  U.bar = ({ title, back = true, backTo = '/inicio', acts = [], l20 = false, sub = '', solid = true } = {}) => {
    const actHtml = acts
      .map((a, i) => `<button class="act" style="right:${10 + i * 44}px" aria-label="${a.label || a.ico}" ${a.act ? `data-act="${a.act}"` : ''} ${a.go ? `data-go="${a.go}"` : ''} ${a.data || ''}>${T.ico(a.ico)}</button>`)
      .join('');
    const t = sub
      ? `<div class="ttl-s"><span class="t-micro">${sub}</span><span class="t-h3">${title}</span></div>`
      : `<h1 class="ttl ${l20 ? 'l20' : ''}">${title}</h1>`;
    return `<header class="bar ${solid ? 'solid' : ''}">${back ? `<button class="back" data-back="${backTo}" aria-label="Volver">${T.ico('back')}</button>` : ''}${t}${actHtml}</header>`;
  };

  /** Banderines: triángulos de colores colgando (down) o parados (up) */
  U.bunting = (n = 17, dir = 'down', top = 40) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const c = HOUSE_COLORS[i % 4];
      s += `<i class="bn bn-${dir}" style="left:${5 + i * 24.13}px;top:${top}px;--c:var(--${c});--d:${(i % 5) * -0.37}s"></i>`;
    }
    return s;
  };

  /** Onda de barras (para el scrubber, la radio y el hero de las casas) */
  U.wave = (n, seed = 1, max = 40, min = 4) => {
    let s = '', x = seed * 9301;
    for (let i = 0; i < n; i++) {
      x = (x * 9301 + 49297) % 233280;
      const r = x / 233280;
      const env = 0.55 + 0.45 * Math.sin(i * 0.31 + seed) * Math.sin(i * 0.07 + 2);
      s += `<i style="height:${Math.round(min + r * (max - min) * env)}px"></i>`;
    }
    return s;
  };

  U.eq = (live) => `<span class="eq ${live ? 'live' : ''}"><i></i><i></i><i></i><i></i></span>`;

  U.dot = (house, size = 10) => `<i class="hdot h-${house}" style="width:${size}px;height:${size}px"></i>`;

  /** Fila de tema para listas: número, título, artista, equalizer, corazón, duración */
  U.trackRow = (tr, i, { ctx, queue, hearts = true, playing = false, num = true, thumb = false } = {}) => {
    const liked = !!T.S.likes[tr.id];
    return `<div class="trow ${playing ? 'is-playing' : ''} h-${tr.house}" role="button" tabindex="0" data-act="playTrack" data-id="${tr.id}" data-ctx="${ctx || ''}">
      ${thumb ? `<img class="trow-thumb" src="${T.img(tr.img || D.coverOf(tr))}" alt="">` : ''}
      ${num ? `<span class="trow-n">${i + 1}</span>` : ''}
      <span class="trow-m"><b>${T.esc(tr.title)}</b><small>${T.esc(tr.artist)}</small></span>
      ${playing ? `<span class="trow-eq">${U.eq(T.S.player.playing)}</span>` : ''}
      ${hearts ? `<button class="trow-h ${liked ? 'on' : ''}" data-act="like" data-id="${tr.id}" aria-label="Guardar">${T.ico('heart')}</button>` : ''}
      <span class="trow-d">${tr.dur}</span>
    </div>`;
  };

  /** Tarjeta cuadrada de playlist (132px): foto con barra de color arriba, título y datos */
  U.plCard = (id, { w = 132 } = {}) => {
    const p = D.playlists[id];
    return `<article class="plcard lift press h-${p.house}" role="button" tabindex="0" data-go="/playlist/${id}" style="width:${w}px">
      <div class="plcard-img zoomwrap" style="height:${w}px"><img src="${T.img(p.cover)}" alt=""><i class="plcard-bar"></i></div>
      <h3>${T.esc(p.name)}</h3>
      <p>${p.n} TEMAS${p.upd ? ' · ' + p.upd : ''}</p>
    </article>`;
  };

  /** Pastilla de seguimiento reutilizable */
  U.followBtn = (key, cls = '') => {
    const on = !!T.S.follows[key];
    return `<button class="fbtn ${on ? 'on' : ''} ${cls}" data-act="follow" data-key="${key}">${on ? 'SIGUIENDO' : 'SEGUIR'}</button>`;
  };

  /** Mini barra de pasos (puntitos) del registro */
  U.steps = (active, total = 3) => {
    let s = '';
    for (let i = 0; i < total; i++) s += `<i class="${i === active ? 'on' : ''}"></i>`;
    return `<div class="steps">${s}</div>`;
  };

  /* ── acciones globales ──────────────────────────────────── */
  T.acts.playTrack = (el) => {
    const id = el.dataset.id;
    const ctx = el.dataset.ctx || '';
    let queue = null, c = null;
    const row = el.closest('[data-queue]');
    if (row) queue = row.dataset.queue.split(',');
    if (row && row.dataset.ctxname) c = { name: row.dataset.ctxname, route: row.dataset.ctxroute || '' };
    if (T.S.player.id === id && T.path() !== '/player' && !queue) { T.go('/player', { modal: true }); return; }
    T.player.play(id, queue, c);
    T.go('/player', { modal: true });
  };
  T.acts.like = (el, e) => {
    e.stopPropagation();
    const id = el.dataset.id;
    if (T.S.likes[id]) delete T.S.likes[id]; else T.S.likes[id] = 1;
    T.save();
    el.classList.toggle('on', !!T.S.likes[id]);
    el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    T.toast(T.S.likes[id] ? 'Guardado en tus temas' : 'Quitado de guardados');
    T.emit('likes');
  };
  T.acts.follow = (el, e) => {
    e.stopPropagation();
    const k = el.dataset.key;
    T.S.follows[k] = T.S.follows[k] ? 0 : 1;
    T.save();
    const on = !!T.S.follows[k];
    // actualiza todos los botones de ese artista en pantalla
    T.$$(`[data-act="follow"][data-key="${k}"]`).forEach((b) => {
      b.classList.toggle('on', on);
      const label = b.dataset.long ? (on ? 'Siguiendo' : 'Seguir') : (on ? 'SIGUIENDO' : 'SEGUIR');
      const sp = b.querySelector('span');
      if (sp) { sp.textContent = label; const ic = b.querySelector('.ico'); if (ic) ic.outerHTML = T.ico(on ? 'check' : 'plus'); } else b.textContent = label;
      b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    });
    T.toast(on ? 'Ahora seguís a ' + (el.dataset.name || 'este artista') : 'Dejaste de seguir');
  };
  T.acts.going = (el, e) => {
    e.stopPropagation();
    const id = el.dataset.id;
    T.S.going[id] = T.S.going[id] ? 0 : 1;
    T.save();
    const on = !!T.S.going[id];
    T.$$(`[data-act="going"][data-id="${id}"]`).forEach((b) => { b.innerHTML = U.goingInner(b, on); b.classList.toggle('on', on); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); });
    const p = D.penas[id];
    T.toast(on ? 'Anotado: ' + (p ? p.name : 'peña') + '. Te avisamos el día anterior' : 'Quitamos tu anotación');
    T.emit('going');
  };
  U.goingInner = (b, on) => (b.dataset.long === 'hm' ? (on ? `${T.ico('check')}<span>VAS A IR</span>` : `${T.ico('plus')}<span>ANOTARME</span>`) : on ? `${T.ico('check')}<span>VOY</span>` : `${b.dataset.plus === '0' ? '' : T.ico('plus')}<span>ANOTARME</span>`);
  U.goingBtn = (id, { plus = true, cls = '' } = {}) => {
    const on = !!T.S.going[id];
    const p = D.penas[id];
    return `<button class="gbtn h-${p ? p.house : 'cum'} ${on ? 'on' : ''} ${cls}" data-act="going" data-id="${id}" data-plus="${plus ? 1 : 0}">${U.goingInner({ dataset: { plus: plus ? '1' : '0' } }, on)}</button>`;
  };
  T.acts.goClose = (el) => { T.closeSheet(); T.go(el.dataset.to); };
  T.acts.share = () => T.toast('Link copiado · demo');
  T.acts.soon = (el) => T.toast(el.dataset.msg || 'Esto queda para la versión final', false);
  T.acts.back = (el) => T.back(el.dataset.to || '/inicio');
})();
