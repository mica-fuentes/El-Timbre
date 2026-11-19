/* 16 · Playlists · 17 · Dentro de una lista · 18 · Reproductor · 19 · Radio de la cuadra */
(function () {
  const T = window.T, D = T.D, U = T.ui, S = T.S, P = T.player;
  const HOUSES = ['reg', 'cum', 'fol', 'rock'];

  /* ── 16 · Playlists ───────────────────────────────────────── */
  const momentCard = (id) => {
    const p = D.playlists[id];
    return `<article class="mo-card card lift press h-${p.house}" data-go="/playlist/${id}" role="button" tabindex="0">
      <span class="mo-th zoomwrap"><img src="${T.img(p.cover)}" alt=""></span><i class="mo-bar"></i>
      <span class="mo-t"><b>${p.name}</b><small>${p.n} TEMAS</small></span></article>`;
  };
  const listsRows = () => (S.lists || []).concat([{ id: 'guardados', name: 'Guardados', sub: Object.keys(S.likes).filter((k) => D.tracks[k]).length + ' temas', cover: 'cov-gente.jpg' }, { id: 'cosquin', name: 'Para el viaje a Cosquín', sub: '38 temas', cover: 'cov-acorde.jpg' }])
    .map((l) => `<button class="tl-row hit" data-go="/playlist/${l.id}"><span class="tl-th"><img src="${T.img(l.cover)}" alt=""></span><span class="tl-m"><b>${l.name}</b><small>${l.sub}</small></span></button>`).join('');
  const plBody = (f) => {
    const houses = f === 'all' || f === 'mine' ? HOUSES : [f];
    const showAll = f === 'all' || f === 'mine';
    const casas = showAll ? D.plHome : Object.values(D.playlists).filter((p) => p.house === f && p.id !== 'mas-escuchado' && p.dyn !== 'likes' && p.id !== 'cosquin' && p.id !== 'nuevas-voces-cumbia').map((p) => p.id);
    const mom = showAll ? D.plMoment : casas.filter((p) => !D.plHome.includes(p));
    return `
      ${showAll ? `<article class="pl-hero lift" data-go="/playlist/mas-escuchado"><img src="${T.img('hero-final.jpg')}" alt=""><i></i>
        <h2>Lo más escuchado de la cuadra</h2><p>Las 100 que más suenan. De acá sale el lineup del festival de octubre.</p>
        <button class="pl-esc" data-act="plHero">${T.ico('play')}<span>ESCUCHAR</span></button><small>SE ACTUALIZA LOS LUNES</small></article>` : `<p class="t-micro pl-fk">TODAS LAS PLAYLISTS · CASA ${D.houses[f].art.toUpperCase()}</p>`}
      <h2 class="t-h2 pl-h" style="${showAll ? '' : 'margin-top:14px'}">${showAll ? 'Las cuatro casas' : 'Las de la casa'}</h2>
      <div class="pl-row">${(casas.length ? casas : []).map((p) => U.plCard(p)).join('')}</div>
      ${mom.length ? `<h2 class="t-h2 pl-h">Para cada momento</h2><div class="mo-grid">${mom.map(momentCard).join('')}</div>` : ''}
      ${showAll ? `<div class="pl-lh" id="pl-lists"><h2 class="t-h2">Tus listas</h2><button class="t-dato" data-act="newList">+ NUEVA</button></div><div class="tl-list">${listsRows()}</div>` : ''}`;
  };
  T.screens.playlists = {
    tabs: 'playlists', mini: true,
    html: () => `
      ${U.bar({ title: 'Playlists', back: false, l20: true, acts: [{ ico: 'filter', act: 'plFilter' }, { ico: 'search', go: '/buscar' }] })}
      <div class="scroll pad-tabs"><div class="pl-page">
        <div class="chips pl-chips" id="pl-chips">${[['all', 'TODAS'], ['reg', 'REGUETÓN'], ['cum', 'CUMBIA'], ['fol', 'FOLCLORE'], ['rock', 'ROCK'], ['mine', 'TUYAS']].map(([k, l], i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-act="plChip" data-k="${k}">${l}</button>`).join('')}</div>
        <div id="pl-body">${plBody('all')}</div>
      </div></div>`,
  };
  T.acts.plChip = (b) => {
    T.$$('#pl-chips .chip').forEach((c) => c.classList.toggle('on', c === b));
    const k = b.dataset.k, body = T.$('#pl-body');
    body.innerHTML = plBody(k);
    body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap');
    if (k === 'mine') { const t = T.$('#pl-lists'); t && T.$('.scroll').scrollTo({ top: t.offsetTop - 120, behavior: 'smooth' }); }
  };
  T.acts.plHero = (el, e) => { e.stopPropagation(); const p = D.playlists['mas-escuchado']; P.play(p.tracks[0], p.tracks, { name: p.name, route: '/playlist/mas-escuchado' }); T.go('/player', { modal: true }); };
  T.acts.plFilter = () => T.sheet(`<h3>Ordenar</h3><p class="t-micro" style="margin-bottom:8px">PLAYLISTS</p>${['Las más escuchadas', 'Las más nuevas', 'Por casa'].map((l, i) => `<button class="sheet-row" data-act="closeSheet"><span><b>${l}</b><small>${i === 0 ? 'ORDEN ACTUAL' : 'DISPONIBLE'}</small></span></button>`).join('')}`);
  T.acts.newList = () => {
    S.lists = S.lists || [];
    const n = S.lists.length + 1;
    S.lists.unshift({ id: 'mi-lista-' + n, name: 'Mi lista ' + n, sub: '0 temas', cover: 'cov-salon2.jpg' }); T.save();
    T.$('.tl-list').innerHTML = listsRows();
    T.toast('Lista nueva creada');
  };

  /* ── 17 · Dentro de una lista ─────────────────────────────── */
  const plObj = (id) => {
    if (D.playlists[id]) {
      const p = D.playlists[id];
      if (p.dyn === 'likes') { const t = Object.keys(S.likes).filter((k) => D.tracks[k]); return Object.assign({}, p, { tracks: t, n: Math.max(214, t.length), min: '12 H 18 MIN' }); }
      return p;
    }
    const l = (S.lists || []).find((x) => x.id === id);
    return { id, name: l ? l.name : 'Lista nueva', house: 'cum', n: 0, cover: 'cov-salon2.jpg', min: '0 MIN', plays: 0, desc: 'Tu lista, armada a tu manera. Sumá temas con el corazón.', tracks: [], user: true };
  };
  T.screens.lista = {
    tabs: 'playlists', mini: true,
    html: ({ id }) => {
      const p = plObj(id), H = D.houses[p.house];
      const liked = !!S.likes['pl:' + id], dl = !!S.likes['dl:' + id];
      const queue = p.tracks.join(',');
      const tr = p.tracks.map((t) => D.tracks[t]);
      const playingHere = S.player.playing && p.tracks.includes(S.player.id);
      return `
      ${U.bar({ title: '', backTo: '/playlists', acts: [{ ico: 'share', act: 'share' }] })}
      <div class="scroll pad-tabs ${H.cls}"><div class="li-page" style="height:${440 + Math.max(tr.length, 3) * 38.4 + 120}px">
        <div class="li-cover zoomwrap"><img src="${T.img(p.cover)}" alt=""><i></i></div>
        <h1 class="li-t">${p.name}</h1><span class="li-k">CASA ${H.art.toUpperCase()}</span>
        <p class="li-d">${p.desc}</p>
        <button class="li-a ${liked ? 'on' : ''}" style="left:20px" data-act="plLike" data-id="${id}" aria-label="Guardar lista">${T.ico('heart')}</button>
        <button class="li-a ${dl ? 'on' : ''}" style="left:68px" data-act="plDl" data-id="${id}" aria-label="Descargar">${T.ico('download')}</button>
        <button class="li-a" style="left:116px" data-act="plMore" data-id="${id}" aria-label="Más">${T.ico('more')}</button>
        <button class="li-a ${S.player.shuffle ? 'on' : ''}" style="left:266px" data-act="plShuffle" data-id="${id}" aria-label="Aleatorio">${T.ico('shuffle')}</button>
        <button class="li-play" data-act="plPlay" data-id="${id}" aria-label="Reproducir">${T.ico(playingHere ? 'pause' : 'play')}</button>
        <p class="li-s">${p.n} TEMAS · ${p.min}${p.plays ? ' · ' + T.fmt(p.plays) + ' ESCUCHAS ESTA SEMANA' : ''}</p>
        <div class="li-rows" data-queue="${queue}" data-ctxname="${T.esc(p.name)}" data-ctxroute="/playlist/${id}">
          ${tr.length ? tr.map((t, i) => U.trackRow(t, i, { playing: S.player.id === t.id && S.player.playing })).join('') : `<div class="empty li-empty"><span>${T.ico('empty-playlists')}</span><b>Todavía no guardaste nada</b><p>Tocá el corazón en cualquier tema y aparece acá.</p></div>`}
        </div>
      </div></div>`;
    },
    mount: (el, { id }) => {
      const refresh = () => {
        const p = plObj(id), rows = T.$('.li-rows', el);
        if (!rows || !p.tracks.length) return;
        T.$$('.trow', rows).forEach((r) => { const on = S.player.id === r.dataset.id; r.classList.toggle('is-playing', on); const old = T.$('.trow-eq', r); if (on && !old) { r.insertBefore(Object.assign(document.createElement('span'), { className: 'trow-eq', innerHTML: U.eq(S.player.playing) }), T.$('.trow-h', r)); } else if (!on && old) old.remove(); else if (old) T.$('.eq', old).classList.toggle('live', S.player.playing); });
        const pb = T.$('.li-play', el); if (pb) pb.innerHTML = T.ico(S.player.playing && p.tracks.includes(S.player.id) ? 'pause' : 'play');
      };
      el._on('player', refresh);
    },
  };
  T.acts.plPlay = (el) => {
    const id = el.dataset.id, p = plObj(id);
    if (!p.tracks.length) { T.toast('Esta lista está vacía'); return; }
    if (p.tracks.includes(S.player.id) && S.player.ctx.route === '/playlist/' + id) { P.toggle(); return; }
    P.play(p.tracks[0], p.tracks, { name: p.name, route: '/playlist/' + id }); T.toast('Reproduciendo ' + p.name);
  };
  T.acts.plShuffle = (el) => { P.shuffle(); el.classList.toggle('on', S.player.shuffle); T.toast(S.player.shuffle ? 'Aleatorio activado' : 'Aleatorio apagado'); };
  T.acts.plLike = (el) => { const k = 'pl:' + el.dataset.id; if (S.likes[k]) delete S.likes[k]; else S.likes[k] = 1; T.save(); el.classList.toggle('on', !!S.likes[k]); el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); T.toast(S.likes[k] ? 'Lista guardada' : 'Lista quitada'); };
  T.acts.plDl = (el) => { const k = 'dl:' + el.dataset.id; if (S.likes[k]) delete S.likes[k]; else S.likes[k] = 1; T.save(); el.classList.toggle('on', !!S.likes[k]); T.toast(S.likes[k] ? 'Descargando para escuchar sin conexión' : 'Descarga eliminada'); };
  T.acts.plMore = (el) => {
    const p = plObj(el.dataset.id);
    T.sheet(`<h3>${p.name}</h3><p class="t-micro" style="margin-bottom:8px">OPCIONES DE LA LISTA</p>
      <button class="sheet-row" data-act="share">${T.ico('share')}<span><b>Compartir lista</b><small>COPIAR LINK</small></span></button>
      <button class="sheet-row" data-to="/casa/${p.house}" data-act="goClose">${T.ico('home')}<span><b>Ir a la casa ${D.houses[p.house].art}</b><small>VOLVER A LA ESQUINA</small></span></button>`);
  };

  /* ── 18 · Reproductor ─────────────────────────────────────── */
  const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const waveBars = (id) => {
    let x = hash(id), s = '';
    for (let i = 0; i < 88; i++) { x = (x * 1103515245 + 12345) >>> 0; const r = (x >>> 8) % 1000 / 1000; const env = .45 + .55 * Math.abs(Math.sin(i * .21 + (hash(id) % 7))); s += `<i style="height:${Math.round(6 + r * 52 * env)}px"></i>`; }
    return s;
  };
  T.screens.player = {
    tabs: null, mini: false, nosb: false,
    html: () => {
      return `
      <div class="pl-bg"><i class="pl-grad"></i><div class="pl-trama"></div></div>
      <header class="bar"><button class="back" data-back="/inicio" aria-label="Cerrar reproductor">${T.ico('chev-d')}</button>
        <div class="ttl-s"><span class="t-micro" style="color:rgba(239,231,218,.6)">REPRODUCIENDO DESDE LA LISTA</span><span class="t-h3" id="pl-ctx"></span></div>
        <button class="act" style="right:10px" data-act="plrMore" aria-label="Más">${T.ico('more')}</button></header>
      <div class="plr">
        <div class="plr-art"><img id="pl-art" alt=""></div>
        <h1 class="plr-t" id="pl-title"></h1>
        <p class="plr-s" id="pl-sub"></p>
        <button class="plr-i" style="left:280px" id="pl-like" data-act="plrLike" aria-label="Guardar">${T.ico('heart')}</button>
        <button class="plr-i" style="left:326px" data-act="plrAdd" aria-label="Agregar a una lista">${T.ico('plus')}</button>
        <div class="plr-wave" id="pl-wave" role="slider" aria-label="Posición" tabindex="0"><div class="w-dim"></div><div class="w-on"></div><i class="w-cur"></i></div>
        <span class="plr-time" id="pl-cur" style="left:20px"></span><span class="plr-time" id="pl-dur" style="right:20px"></span>
        <button class="plr-c" style="left:19px" id="pl-shuf" data-act="plrShuffle" aria-label="Aleatorio">${T.ico('shuffle')}</button>
        <button class="plr-c" style="left:91px" data-act="plrPrev" aria-label="Anterior"><span style="display:block;transform:scaleX(-1)">${T.ico('next')}</span></button>
        <button class="plr-play" id="pl-play" data-act="plrToggle" aria-label="Pausar o reproducir"></button>
        <button class="plr-c" style="left:255px" data-act="plrNext" aria-label="Siguiente">${T.ico('next')}</button>
        <button class="plr-c" style="left:325px" id="pl-rep" data-act="plrRepeat" aria-label="Repetir">${T.ico('repeat')}</button>
        <button class="plr-vol" id="pl-vol" data-act="plrVol" aria-label="Volumen">${T.ico('volume')}</button>
        <span class="plr-eq" id="pl-eq"></span>
        <button class="plr-q" data-act="plrQueue"><span>EN COLA</span>${T.ico('playlists')}</button>
      </div>`;
    },
    mount: (el) => {
      const eq = T.$('#pl-eq', el);
      eq.innerHTML = Array.from({ length: 12 }, (_, i) => `<i style="--h:${[8, 16, 10, 24, 14, 30, 18, 12, 22, 9, 15, 7][i]}px;--d:${(i % 5) * -.18}s"></i>`).join('');
      let lastId = null;
      const fillTrack = () => {
        const t = P.cur(), p = S.player;
        ['reg', 'cum', 'fol', 'rock'].forEach((h) => el.classList.remove('h-' + h)); el.classList.add('h-' + t.house);
        T.$('#pl-ctx', el).textContent = p.ctx.name;
        const art = T.$('#pl-art', el); art.src = T.img(t.img || D.coverOf(t));
        const wrap = art.parentNode; wrap.classList.remove('swap'); void wrap.offsetWidth; wrap.classList.add('swap');
        T.$('#pl-title', el).textContent = t.title;
        T.$('#pl-sub', el).textContent = t.artist + ' · Casa ' + D.houses[t.house].art;
        T.$('#pl-wave .w-dim', el).innerHTML = waveBars(t.id); T.$('#pl-wave .w-on', el).innerHTML = waveBars(t.id);
        T.$('#pl-dur', el).textContent = t.dur;
        T.$('#pl-like', el).classList.toggle('on', !!S.likes[t.id]);
        lastId = t.id; fillState(); fillTick();
      };
      const fillState = () => {
        T.$('#pl-play', el).innerHTML = T.ico(S.player.playing ? 'pause' : 'play');
        T.$('#pl-shuf', el).classList.toggle('on', S.player.shuffle);
        T.$('#pl-rep', el).classList.toggle('on', S.player.repeat);
        el.classList.toggle('is-playing', S.player.playing);
        T.$('#pl-art', el).parentNode.classList.toggle('breathe', S.player.playing);
      };
      const fillTick = () => {
        const r = S.player.pos / P.dur();
        T.$('#pl-wave', el).style.setProperty('--p', (r * 100).toFixed(2) + '%');
        T.$('#pl-cur', el).textContent = T.mmss(S.player.pos);
      };
      el._on('player:track', fillTrack);
      el._on('player', () => { fillState(); fillTick(); });
      el._on('tick', fillTick);
      el._on('likes', () => T.$('#pl-like', el).classList.toggle('on', !!S.likes[P.cur().id]));
      fillTrack();
      // scrubber: tocar o arrastrar
      const w = T.$('#pl-wave', el); let down = false;
      const at = (e) => { const r = w.getBoundingClientRect(); P.seek((e.clientX - r.left) / r.width); };
      w.addEventListener('pointerdown', (e) => { down = true; w.setPointerCapture(e.pointerId); at(e); w.classList.add('drag'); });
      w.addEventListener('pointermove', (e) => down && at(e));
      w.addEventListener('pointerup', () => { down = false; w.classList.remove('drag'); });
      w.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') P.seek(S.player.pos / P.dur() + .03); if (e.key === 'ArrowLeft') P.seek(S.player.pos / P.dur() - .03); });
    },
  };
  T.acts.plrToggle = () => P.toggle();
  T.acts.plrNext = () => P.next();
  T.acts.plrPrev = () => P.prev();
  T.acts.plrShuffle = () => { P.shuffle(); T.toast(S.player.shuffle ? 'Aleatorio activado' : 'Aleatorio apagado'); };
  T.acts.plrRepeat = () => { P.repeat(); T.toast(S.player.repeat ? 'Repetir este tema' : 'Repetir apagado'); };
  T.acts.plrLike = (el) => { const id = P.cur().id; if (S.likes[id]) delete S.likes[id]; else S.likes[id] = 1; T.save(); el.classList.toggle('on', !!S.likes[id]); el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); T.toast(S.likes[id] ? 'Guardado en tus temas' : 'Quitado de guardados'); };
  T.acts.plrAdd = () => T.sheet(`<h3>Agregar a una lista</h3><p class="t-micro" style="margin-bottom:8px">TUS LISTAS</p>
    ${[['Guardados', '214 temas'], ['Para el viaje a Cosquín', '38 temas']].concat((S.lists || []).map((l) => [l.name, l.sub])).map(([a, b]) => `<button class="sheet-row" data-act="plrAdded" data-n="${a}">${T.ico('playlists')}<span><b>${a}</b><small>${b.toUpperCase()}</small></span></button>`).join('')}`);
  T.acts.plrAdded = (el) => { T.closeSheet(); T.toast('Agregado a ' + el.dataset.n); };
  T.acts.plrVol = (el) => { el.classList.toggle('mute'); T.toast(el.classList.contains('mute') ? 'Sonido apagado' : 'Sonido encendido'); };
  T.acts.plrMore = () => { const t = P.cur(); T.sheet(`<h3>${T.esc(t.title)}</h3><p class="t-micro" style="margin-bottom:8px">${T.esc(t.artist.toUpperCase())}</p>
      <button class="sheet-row" data-to="/casa/${t.house}" data-act="goClose">${T.ico('home')}<span><b>Ir a la casa ${D.houses[t.house].art}</b><small>VOLVER A LA ESQUINA</small></span></button>
      <button class="sheet-row" data-act="share">${T.ico('share')}<span><b>Compartir tema</b><small>COPIAR LINK</small></span></button>
      <button class="sheet-row" data-act="plrAdd">${T.ico('plus')}<span><b>Agregar a una lista</b><small>TUS LISTAS</small></span></button>`); };
  T.acts.plrQueue = () => {
    const p = S.player, rows = p.queue.map((id, i) => ({ t: D.tracks[id], i }));
    T.sheet(`<h3>En cola</h3><p class="t-micro" style="margin-bottom:8px">${T.esc(p.ctx.name.toUpperCase())}</p>
      ${rows.map(({ t, i }) => `<button class="sheet-row q-row ${i === p.idx ? 'on' : ''} h-${t.house}" data-act="qJump" data-id="${t.id}"><span class="q-n">${i === p.idx ? U.eq(p.playing) : i + 1}</span><span><b>${T.esc(t.title)}</b><small>${T.esc(t.artist.toUpperCase())}</small></span><em>${t.dur}</em></button>`).join('')}`);
  };
  T.acts.qJump = (el) => { P.play(el.dataset.id); T.closeSheet(); };

  /* ── 19 · Radio de la cuadra ──────────────────────────────── */
  const LIVE = { reg: 2107, fol: 948, rock: 1560, cum: 1284 };
  T.screens.radio = {
    tabs: 'live', mini: true,
    html: () => {
      const t = P.cur(), H = D.houses[t.house];
      const others = HOUSES.filter((h) => h !== t.house && h !== 'cum').slice(0, 3);
      const rest = HOUSES.filter((h) => h !== t.house);
      return `
      ${U.bar({ title: 'Radio de la cuadra', back: false, l20: true, acts: [{ ico: 'clock', act: 'soon', data: 'data-msg="Historial de la radio · próximamente"' }] })}
      <div class="scroll pad-tabs"><div class="rd-page">
        <article class="rd-live h-${t.house}" id="rd-live">
          <img class="rd-bg" src="${T.img('hero-salon.jpg')}" alt=""><i class="rd-tint"></i>
          <span class="rd-badge"><i></i>EN VIVO</span>
          <span class="rd-casa" id="rd-casa">CASA ${H.art.toUpperCase()}</span>
          <h2 class="rd-t" id="rd-t">${T.esc(t.title)}</h2>
          <p class="rd-a" id="rd-a">${T.esc(t.artist)} · <span id="rd-n">${T.fmt(LIVE[t.house])}</span> escuchando</p>
          <button class="rd-pp" id="rd-pp" data-act="plrToggle" aria-label="Pausar o reproducir">${T.ico(S.player.playing ? 'pause' : 'play')}</button>
          <div class="rd-wave ${S.player.playing ? 'live' : ''}" id="rd-wave">${U.wave(34, 4, 40, 4)}</div>
          <span class="rd-vol">${T.ico('volume')}</span>
        </article>
        <h2 class="t-h2 rd-h" style="top:422px">En las otras casas</h2>
        <p class="rd-sub" style="top:448px">Tocá una y te cambiás de esquina sin cortar.</p>
        <div class="rd-others" id="rd-others">${rest.map((h) => other(h)).join('')}</div>
        <h2 class="t-h2 rd-h" style="top:703px">Peñas de hoy</h2><button class="t-dato rd-more" style="top:711px" data-go="/penas">LAS 5</button>
        ${[['pancho', '22 H', 'TALCAHUANO 949 · TRIBUNALES'], ['porteña', '23 H', 'AV. SANTA FE 4389 · PALERMO']].map((x, i) => `<div class="rd-pena h-${D.penas[x[0]].house}" style="top:${744 + i * 64}px"><span class="t-dato">${x[1]}</span><h3>${D.penas[x[0]].name}</h3><p>${x[2]}</p>${U.goingBtn(x[0], { cls: 'rd-g' })}</div>`).join('')}
        <h2 class="t-h2 rd-h" style="top:881px">Lo que viene</h2>
        ${[['radio-viernes', 'VIE 02'], ['radio-domingo', 'DOM 19']].map((x, i) => `<div class="rd-pena h-cum" style="top:${922 + i * 64}px"><span class="t-dato">${x[1]}</span><h3>${D.penas[x[0]].name}</h3><p>${D.penas[x[0]].where}</p>${U.goingBtn(x[0], { cls: 'rd-g' })}</div>`).join('')}
      </div></div>`;
    },
    mount: (el) => {
      const upd = () => {
        const t = P.cur(), H = D.houses[t.house];
        const live = T.$('#rd-live', el); live.className = 'rd-live h-' + t.house;
        T.$('#rd-casa', el).textContent = 'CASA ' + H.art.toUpperCase();
        T.$('#rd-t', el).textContent = t.title;
        T.$('#rd-a', el).innerHTML = `${T.esc(t.artist)} · <span id="rd-n">${T.fmt(LIVE[t.house])}</span> escuchando`;
        T.$('#rd-pp', el).innerHTML = T.ico(S.player.playing ? 'pause' : 'play');
        T.$('#rd-wave', el).classList.toggle('live', S.player.playing);
        T.$('#rd-others', el).innerHTML = HOUSES.filter((h) => h !== t.house).map(other).join('');
      };
      el._on('player:track', upd); el._on('player', () => { T.$('#rd-pp', el).innerHTML = T.ico(S.player.playing ? 'pause' : 'play'); T.$('#rd-wave', el).classList.toggle('live', S.player.playing); });
      // oyentes en vivo: se mueven de a poco
      const iv = setInterval(() => { const n = T.$('#rd-n', el); if (!n) return; const h = P.cur().house; LIVE[h] += Math.round((Math.random() - .45) * 6); n.textContent = T.fmt(LIVE[h]); }, 1800);
      el._off(() => clearInterval(iv));
    },
  };
  function other(h) {
    const H = D.houses[h], id = H.radio, t = D.tracks[id];
    return `<button class="rd-oth ${H.cls}" data-act="radioSwitch" data-h="${h}"><span class="rd-ic">${U.eq(true)}</span><span class="rd-om"><em>${H.name.toUpperCase()} · ${t.artist.toUpperCase()}</em><b>${t.title}</b></span><i>${T.fmt(LIVE[h])}</i></button>`;
  }
  T.acts.radioSwitch = (el) => {
    const H = D.houses[el.dataset.h], q = H.top.concat(...H.pls.map((p) => D.playlists[p].tracks)).filter((v, i, a) => a.indexOf(v) === i);
    P.play(H.radio, q, { name: 'Radio · Casa ' + H.art, route: '/radio' });
    T.toast('Te cambiaste a la casa ' + H.art);
  };

  T.route('/playlists', 'playlists');
  T.route('/playlist/:id', 'lista');
  T.route('/player', 'player');
  T.route('/radio', 'radio');
})();
