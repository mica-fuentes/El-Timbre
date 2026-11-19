/* 12 · Buscar · 13 · Nuevas voces · 14 · Artista · 15 · Artista emergente */
(function () {
  const T = window.T, D = T.D, U = T.ui, S = T.S;
  const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  /* ── 12 · Buscar ──────────────────────────────────────────── */
  const NOTAS = [
    { t: 'La cumbia santafesina no es una sola', img: 'cov-guiro.jpg' }, { t: 'Cómo suena el perreo de barrio', img: 'cov-noche.jpg' },
    { t: 'La peña como escuela de oído', img: 'cov-pena.jpg' }, { t: 'Garage, pedales y vecinos', img: 'cov-garage.jpg' },
  ];
  let corpus;
  const build = () => {
    if (corpus) return corpus;
    corpus = [];
    NOTAS.forEach((n) => corpus.push({ k: 'notas', t: n.t, m: 'NOTA DEL DIARIO · 8 MIN', img: n.img, attr: 'data-act="soon" data-msg="La nota del diario llega en la versión final"' }));
    const tag = (h) => ({ reg: 'reguetón perreo', cum: 'cumbia', fol: 'folclore', rock: 'rock' }[h]);
    Object.values(D.playlists).filter((p) => p.dyn !== 'likes').forEach((p) => corpus.push({ k: 'playlists', t: p.name, m: `PLAYLIST · ${p.n} TEMAS`, tags: tag(p.house), img: p.cover, attr: `data-go="/playlist/${p.id}"` }));
    Object.values(D.artists).forEach((a) => corpus.push({ k: 'artistas', t: a.name, m: 'ARTISTA · ' + a.where.split(' · ')[0], tags: tag(a.house), img: a.img, attr: `data-go="/artista/${a.id}"` }));
    Object.values(D.tracks).forEach((t) => corpus.push({ k: 'temas', t: t.title, m: 'TEMA · ' + t.artist.toUpperCase(), tags: tag(t.house), img: t.img || D.coverOf(t), attr: `data-act="playTrack" data-id="${t.id}"` }));
    Object.values(D.penas).filter((p) => !p.id.startsWith('fest') && !p.id.startsWith('radio')).forEach((p) => corpus.push({ k: 'penas', t: p.name, m: `PEÑA · ${p.where} · ${p.h}`, img: D.houses[p.house].cover, attr: 'data-go="/penas"' }));
    return corpus;
  };
  const SUGG = [['MILO J', '/artista/milo'], ['PEÑAS DE HOY', '/penas'], ['NUEVAS VOCES', '/nuevas-voces'], ['COSQUÍN', '/playlist/cosquin'], ['LA DELIO VALDEZ', '/artista/delio']];
  const results = (q, f) => {
    const nq = norm(q).trim();
    let list = build().filter((r) => (f === 'todo' || r.k === f) && (!nq || nq.split(/\s+/).every((w) => norm(r.t + ' ' + r.m + ' ' + (r.tags || '')).includes(w))));
    if (!nq) list = list.filter((r) => ['La cumbia santafesina no es una sola', 'Santafesina de fierro', 'Los Palmeras', 'Milo J', 'Peña de Pancho Guevara', 'Adiós Amor'].includes(r.t));
    // prioridad: notas → playlists → artistas → temas → peñas (como en el Figma)
    const ord = { notas: 0, playlists: 1, artistas: 2, temas: 3, penas: 4 };
    list.sort((a, b) => ord[a.k] - ord[b.k]);
    return list.slice(0, 8);
  };
  const resHtml = (q, f) => {
    const r = results(q, f);
    if (!r.length) return `<div class="bu-none"><b>Sin resultados para “${T.esc(q)}”</b><small>PROBÁ CON OTRO NOMBRE</small></div>`;
    return r.map((x, i) => `<button class="bu-row hit rise" style="--i:${i * .4}" ${x.attr}><span class="bu-th"><img src="${T.img(x.img)}" alt=""></span><span class="bu-m"><b>${T.esc(x.t)}</b><small>${T.esc(x.m)}</small></span>${T.ico('chev-r')}</button>`).join('');
  };
  T.screens.buscar = {
    tabs: 'home', mini: false,
    html: () => `
      ${U.bar({ title: 'Buscar', backTo: '/inicio' })}
      <div class="scroll pad-tabs-only"><div class="bu-page">
        <label class="bu-field"><span class="bu-si">${T.ico('search')}</span><input id="bu-q" type="text" value="cumbia sant" placeholder="Buscá temas, artistas, peñas" autocomplete="off" spellcheck="false" aria-label="Buscar"><button class="bu-x" data-act="buClear" aria-label="Borrar">${T.ico('close')}</button></label>
        <div class="chips bu-chips" id="bu-chips">${[['todo', 'TODO'], ['temas', 'TEMAS'], ['artistas', 'ARTISTAS'], ['playlists', 'PLAYLISTS'], ['penas', 'PEÑAS'], ['notas', 'NOTAS']].map(([k, l], i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-act="buFilter" data-k="${k}">${l}</button>`).join('')}</div>
        <div class="bu-list" id="bu-res">${resHtml('cumbia sant', 'todo')}</div>
        <i class="bu-sep"></i>
        <div class="bu-sugg">${SUGG.map(([l, g]) => `<button class="pill" data-go="${g}">${l}</button>`).join('')}</div>
        <button class="bu-card card-line" data-act="buSend">${T.ico('search')}<b>¿No aparece lo que buscás?</b><p>Mandanos el tema o la peña y lo sumamos a la cuadra.</p></button>
      </div></div>`,
    mount: (el) => {
      const inp = T.$('#bu-q', el); let f = 'todo';
      const upd = () => { T.$('#bu-res', el).innerHTML = resHtml(inp.value, f); };
      inp.addEventListener('input', upd);
      el._f = (k) => { f = k; upd(); };
      el._clear = () => { inp.value = ''; upd(); inp.focus(); };
    },
  };
  T.acts.buFilter = (b) => { T.$$('#bu-chips .chip').forEach((c) => c.classList.toggle('on', c === b)); T.current().el._f(b.dataset.k); };
  T.acts.buClear = () => T.current().el._clear();
  T.acts.buSend = () => T.toast('¡Gracias! La cuadra lo escucha');

  /* ── 13 · Nuevas voces ────────────────────────────────────── */
  const nvRow = (n, i) => `<article class="nv-row hit rise h-${n.house}" style="--i:${i * .5}" data-go="/artista/${n.id}" role="button" tabindex="0">
    <span class="nv-th"><img src="${T.img(n.img)}" alt=""></span>
    <span class="nv-m"><b>${n.name}</b><small>${n.tag}</small></span>${U.followBtn('artist:' + n.id, 'nv-f')}</article>`;
  T.screens.nuevas = {
    tabs: 'home', mini: false,
    html: () => `
      ${U.bar({ title: 'Nuevas voces', backTo: '/inicio' })}
      <div class="scroll pad-tabs-only"><div class="nv-page">
        <div class="chips nv-chips" id="nv-chips">${[['all', 'TODAS'], ['reg', 'REGUETÓN'], ['cum', 'CUMBIA'], ['fol', 'FOLCLORE'], ['rock', 'ROCK']].map(([k, l], i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-act="nvFilter" data-k="${k}">${l}</button>`).join('')}</div>
        <p class="t-micro nv-k">ARTISTAS QUE ACABAN DE LLEGAR A LA CUADRA</p>
        <div id="nv-list">${D.nuevas.map(nvRow).join('')}</div>
        <p class="t-micro nv-fn"><i></i> ARTISTA INVENTADO, SOLO PARA ESTE PROYECTO</p>
        <section class="nv-cta"><h2>¿Hacés música?</h2><p>Inscribite y aparecé en Nuevas voces, la sección para artistas que recién empiezan.</p><button class="btn btn-dark" data-go="/artistas/sumate">Sumate a la cuadra</button></section>
      </div></div>`,
  };
  T.acts.nvFilter = (b) => {
    T.$$('#nv-chips .chip').forEach((c) => c.classList.toggle('on', c === b));
    const k = b.dataset.k;
    T.$('#nv-list').innerHTML = D.nuevas.filter((n) => k === 'all' || n.house === k).map(nvRow).join('') || '<p class="t-small" style="padding:20px 0">Todavía no hay nuevas voces en esta casa.</p>';
  };

  /* ── 14 / 15 · Artista ────────────────────────────────────── */
  T.screens.artista = {
    tabs: 'home', mini: true,
    html: ({ id }) => {
      const A = D.artists[id], H = D.houses[A.house];
      const playing = S.player.id === A.pop[0][0] && S.player.playing;
      const queue = A.pop.map((p) => p[0]);
      const meta = A.nueva ? A.where : `${A.where} · ${A.listeners}`;
      const following = !!S.follows['artist:' + id];
      const fechas = A.dates || [['VIE 17', 'Peña de apertura', 'FESTIVAL · ESCENARIO 0' + H.escenario, 'fest-apertura', 0], ['DOM 19', 'Cierre de las cuatro', 'FESTIVAL · ESCENARIO CENTRAL', 'fest-cierre', 0]];
      return `
      ${U.bar({ title: '', solid: false, backTo: '/inicio', acts: [{ ico: 'more', act: 'artMore', data: `data-id="${id}"` }, { ico: 'share', act: 'share' }] })}
      <div class="scroll pad-tabs ${H.cls}" data-id="${id}"><div class="ar-page">
        <div class="ar-photo"><img src="${T.img(A.img)}" alt=""><i class="ar-fade"></i>${A.nueva ? '<em class="ar-tag">NUEVA VOZ</em>' : ''}</div>
        <i class="ar-dia"></i><span class="ar-casa">CASA ${H.art.toUpperCase()}</span>
        <h1 class="ar-name">${T.esc(A.name)}</h1>
        <p class="ar-meta">${A.where.includes('·') || A.nueva ? A.where : A.where + ' · ' + A.listeners}</p>
        <button class="btn btn-ac ar-play" data-act="artPlay" data-id="${id}">${T.ico('play')}Escuchar</button>
        <button class="btn btn-ghost ar-follow ${following ? 'on' : ''}" data-act="follow" data-key="artist:${id}" data-name="${T.esc(A.name)}" data-long="1">${T.ico(following ? 'check' : 'plus')}<span>${following ? 'Siguiendo' : 'Seguir'}</span></button>
        <h2 class="t-h2 ar-h" style="top:510px">Populares en la cuadra</h2>
        <div class="ar-pop" data-queue="${queue.join(',')}" data-ctxname="${T.esc(A.name)}" data-ctxroute="/artista/${id}">
          ${A.pop.map(([tid, n], i) => `<div class="ar-row ${S.player.id === tid && i === 0 ? 'on' : ''}" role="button" tabindex="0" data-act="playTrack" data-id="${tid}"><span>${i + 1}</span><b>${T.esc(D.tracks[tid].title)}</b><em>${n}</em><i>${D.tracks[tid].dur}</i></div>`).join('')}
        </div>
        <h2 class="t-h2 ar-h" style="top:658px">Aparece en</h2>
        <div class="ar-pls">${A.appears.map((p) => U.plCard(p)).join('')}</div>
        <h2 class="t-h2 ar-h" style="top:911px">Próximas fechas</h2>
        ${fechas.map((f, i) => `<div class="ar-ag" style="top:${951 + i * 64}px"><span class="t-dato">${f[0]}</span><h3>${f[1]}</h3><p>${f[2]}</p>${U.goingBtn(f[3], { cls: 'cs-gbtn' })}</div>`).join('')}
      </div></div>`;
    },
  };
  T.acts.artPlay = (el) => {
    const A = D.artists[el.dataset.id];
    T.player.play(A.pop[0][0], A.pop.map((p) => p[0]), { name: A.name, route: '/artista/' + el.dataset.id });
    T.go('/player', { modal: true });
  };
  T.acts.artMore = (el) => {
    const A = D.artists[el.dataset.id];
    T.sheet(`<h3>${T.esc(A.name)}</h3><p class="t-micro" style="margin-bottom:8px">OPCIONES</p>
      <button class="sheet-row" data-act="share">${T.ico('share')}<span><b>Compartir artista</b><small>COPIAR LINK</small></span></button>
      <button class="sheet-row" data-to="/casa/${A.house}" data-act="goClose">${T.ico('home')}<span><b>Ir a la casa ${D.houses[A.house].art}</b><small>VOLVER A LA ESQUINA</small></span></button>
      <button class="sheet-row" data-act="soon" data-msg="Gracias, lo revisamos">${T.ico('bell')}<span><b>Avisarme cuando toque</b><small>PEÑAS Y FESTIVAL</small></span></button>`);
  };

  T.route('/buscar', 'buscar');
  T.route('/nuevas-voces', 'nuevas');
  T.route('/artista/:id', 'artista');
})();
