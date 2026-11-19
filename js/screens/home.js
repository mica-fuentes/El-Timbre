/* 04 · La cuadra (noche) / 05 · La cuadra de día · 06 · Para vos · 07 · Avisos */
(function () {
  const T = window.T, D = T.D, U = T.ui, S = T.S;
  const HOUSE_PIX = { // posición de cada casa en la calle (px del Figma)
    reg: { x: 15.6, y: 304, w: 100.8, h: 143, sh: [22, 441, 100, 14], chip: [36.4, 69.3] },
    cum: { x: 86.6, y: 264, w: 119.8, h: 176, sh: [105, 438, 89, 12], chip: [128.8, 56.5] },
    fol: { x: 193, y: 335, w: 97, h: 116, sh: [190, 443, 88, 12], chip: [202.4, 69.3] },
    rock: { x: 270, y: 301, w: 107, h: 139, sh: [270, 435, 110, 12], chip: [305.2, 43.6] },
  };

  /* greca de rombos entre dos líneas */
  const greca = () => {
    let s = '<i class="gr-l" style="top:96px"></i><i class="gr-l" style="top:109px"></i>';
    for (let i = 0; i < 20; i++) {
      s += `<i class="gr-d" style="left:${-1 + i * 20}px;--c:var(--${['reg', 'cum', 'fol', 'rock'][i % 4]})"></i><i class="gr-p" style="left:${14 + i * 20}px"></i>`;
    }
    return s;
  };

  const pgo = (on) => (on ? `${T.ico('check')}<span>VAS A IR</span>` : `${T.ico('plus')}<span>ANOTARME</span>`);
  const penaCard = (id, num, dia, x) => {
    const p = D.penas[id], on = !!S.going[id];
    return `<article class="hm-pena card lift press h-${p.house}" style="left:${x}px" data-go="/penas">
      <div class="hm-pdate"><b>${num}</b><small>${dia}</small></div>
      <h3>${p.name}</h3><p>${p.where} · ${p.h}</p>
      <i class="hm-pline"></i>
      <button class="hm-pgo ${on ? 'on' : ''}" data-act="going" data-id="${id}" data-plus="1" data-long="hm">${pgo(on)}</button>
    </article>`;
  };

  T.screens.home = {
    tabs: 'home', mini: true,
    html: () => {
      const day = S.theme === 'day';
      const picks = S.picked.length;
      const cont = ['rara-vez', 'mafiosa', 'ojos-marrones'].map((id) => D.tracks[id]);
      return `
      <div class="scroll pad-tabs hm">
        <div class="hm-page">
          <h1 class="hm-logo">El Timbre</h1>
          <button class="hm-ic" style="left:291.5px" data-go="/buscar" aria-label="Buscar">${T.ico('search')}</button>
          <button class="hm-ic" style="left:335.5px" data-go="/avisos" aria-label="Avisos">${T.ico('bell')}${S.concursoNotice ? '<i class="hm-badge"></i>' : ''}</button>
          ${greca()}
          <div class="hm-trama"></div>
          <p class="t-dato hm-date">JUE 1 DE OCTUBRE</p><i class="hm-dateline"></i><p class="t-micro hm-open">4 CASAS ABIERTAS</p>
          <h2 class="hm-title" aria-label="Elegí tu casa"><span class="sh" aria-hidden="true">ELEGÍ<br>TU CASA</span><span>ELEGÍ<br>TU CASA</span></h2>

          <i class="hm-surface"></i><i class="hm-road"></i>
          ${['reg', 'cum', 'fol', 'rock'].map((h) => { const P = HOUSE_PIX[h], H = D.houses[h]; return `
            <i class="hm-shadow" style="left:${P.sh[0]}px;top:${P.sh[1]}px;width:${P.sh[2]}px;height:${P.sh[3]}px"></i>
            <button class="hm-house ${H.cls}" data-go="/casa/${h}" aria-label="Casa del ${H.name}" style="left:${P.x}px;top:${P.y}px;width:${P.w}px;height:${P.h}px"><img src="${T.img(H.img)}" alt=""></button>
            <a class="hm-chip ${H.cls}" data-go="/casa/${h}" style="left:${P.chip[0]}px;width:${P.chip[1]}px">${H.big}</a>`; }).join('')}

          <h2 class="t-h2 hm-h" style="top:500px">Hoy en la cuadra</h2>
          <button class="t-dato hm-more" style="top:508px;color:var(--text-3)" data-go="/para-vos">VER TODO</button>
          <div class="hm-cards">
            <article class="hm-card card lift press h-reg" data-go="/artista/joaqui" role="button" tabindex="0">
              <div class="hm-cph zoomwrap"><img src="${T.img('cov-noche.jpg')}" alt=""><i></i></div>
              <small class="hm-ctag">TEMA NUEVO</small><h3>La Joaqui volvió con disco entero</h3><p>CASA DEL REGUETÓN</p>
            </article>
            <article class="hm-card card lift press h-fol" data-go="/playlist/nuevos-fol" role="button" tabindex="0">
              <div class="hm-cph zoomwrap"><img src="${T.img('cov-bombo.jpg')}" alt=""><i></i></div>
              <small class="hm-ctag">PLAYLIST</small><h3>Los nuevos del folclore</h3><p>32 TEMAS · SE ACTUALIZA LOS LUNES</p>
            </article>
            <article class="hm-card card lift press h-cum" data-act="soon" data-msg="La nota del diario llega en la versión final" role="button" tabindex="0">
              <div class="hm-cph zoomwrap"><img src="${T.img('cov-guiro.jpg')}" alt=""><i></i></div>
              <small class="hm-ctag">DIARIO</small><h3>La cumbia santafesina no es una sola</h3><p>NOTA · 8 MIN</p>
            </article>
            <article class="hm-card card lift press h-rock" data-go="/festival" role="button" tabindex="0">
              <div class="hm-cph zoomwrap"><img src="${T.img('cov-garage.jpg')}" alt=""><i></i></div>
              <small class="hm-ctag">FESTIVAL</small><h3>Festival de las cuatro esquinas</h3><p>LAS CUATRO ESQUINAS</p>
            </article>
          </div>

          <button class="hm-radio card lift press h-cum" data-go="/radio">
            <i class="hm-rbar"></i><i class="hm-rdot"></i>
            <span class="t-micro hm-rk">RADIO DE LA CUADRA</span>
            <b>Adiós Amor · La Delio Valdez</b>
            <small>CASA DE LA CUMBIA · 1.284 ESCUCHANDO</small>
          </button>

          <h2 class="t-h2 hm-h" style="top:870px">Peñas de octubre</h2>
          <button class="t-dato hm-more" style="top:878px;color:var(--text-3)" data-go="/penas">LAS 14</button>
          <p class="t-small hm-sub" style="top:896px">Te anotás y te avisamos el día anterior.</p>
          <div class="hm-penas">${penaCard('ronda', '02', 'VIE', 20)}${penaCard('pena-jueves', '08', 'JUE', 243)}${penaCard('sonidero', '10', 'SÁB', 466)}</div>

          <h2 class="t-h2 hm-h" style="top:1060px">Seguí escuchando, Mica</h2>
          <div class="hm-rows" data-queue="${cont.map((t) => t.id).join(',')}" data-ctxname="Seguí escuchando" data-ctxroute="/inicio">
            ${cont.map((tr) => `<div class="hm-row trow h-${tr.house}" role="button" tabindex="0" data-act="playTrack" data-id="${tr.id}"><img src="${T.img(tr.img || D.coverOf(tr))}" alt=""><span class="trow-m"><b>${tr.title}</b><small>${tr.artist}</small></span><span class="trow-d">${tr.dur}</span></div>`).join('')}
          </div>
        </div>
      </div>`;
    },
  };

  /* ── 06 · Para vos ───────────────────────────────────────── */
  const unlock = () => Math.min(10, 4 + (S.likesCount || 0));
  T.screens.parati = {
    tabs: 'home', mini: false,
    html: () => {
      const nv = [['vampiros', 'Buenos Vampiros', 'UNDER NACIONAL', 'nuevavoz-buenosvampiros.jpg'], ['ldiferencias', 'Las Diferencias', 'ROCK FEDERAL', 'nuevavoz-lasdiferencias.jpg'], ['camionero', 'Camionero de Buenos Aires', 'ROCK FEDERAL', 'nuevavoz-camionero.jpg']];
      return `
      ${U.bar({ title: 'Para vos', backTo: '/inicio' })}
      <div class="scroll pad-tabs-only"><div class="pv-page">
        <p class="t-dato pv-k" style="top:104px;color:var(--rock-t)">ROCK · LA ESCUCHÁS</p>
        <h2 class="t-h2" style="position:absolute;left:20px;top:120px">Nuevas voces del rock</h2>
        ${nv.map((n, i) => `<article class="pv-nv lift press h-rock" style="left:${20 + i * 120}px" data-go="/artista/${n[0]}" role="button" tabindex="0">
          <div class="pv-ph zoomwrap"><img src="${T.img(n[3])}" alt=""><em>NUEVA VOZ</em></div><h3>${n[1]}</h3><p>${n[2]}</p></article>`).join('')}
        <p class="t-dato pv-k" style="top:346px;color:var(--cum-t)">CUMBIA · RECIÉN LLEGÁS</p>
        <h2 class="t-h2" style="position:absolute;left:20px;top:362px">Entrando a la cumbia</h2>
        <article class="pv-step card lift press h-cum" style="top:398px" data-go="/playlist/santafesina" role="button" tabindex="0"><i class="pv-c">1</i><h3>Los clásicos</h3><p>LOS PALMERAS · LOS ÁNGELES AZULES</p></article>
        <article class="pv-step card lift press h-cum" style="top:484px" data-go="/playlist/nuevos-cum" role="button" tabindex="0"><i class="pv-c">2</i><h3>Lo que suena hoy</h3><p>LA DELIO VALDEZ · KARINA</p></article>
        <article class="pv-step card h-cum locked" style="top:570px"><i class="pv-c">3</i><h3>Nuevas voces</h3><p>SE ABREN CON TUS PRIMEROS 10 TEMAS</p><span class="pv-bar"><b style="width:${(unlock() / 10) * 100}%"></b></span><em class="t-micro" style="color:var(--cum-t)" id="pv-n">${unlock()} DE 10</em></article>
        <p class="pv-foot">Con los primeros temas, la escalera se abre sola.</p>
      </div></div>`;
    },
  };

  /* ── 07 · Avisos ─────────────────────────────────────────── */
  T.screens.avisos = {
    tabs: 'home', mini: false,
    html: () => {
      S.concursoNotice = false; T.save();
      const hoy = (S.notices || []).concat(D.avisos.hoy);
      const card = (a, i, dotCls) => `<article class="av-card card lift press h-${a.house} rise" style="--i:${i}" data-go="${a.go}" role="button" tabindex="0">
        <i class="hdot ${dotCls || ''}" style="background:var(--ac)"></i><h3>${a.t}</h3><p>${a.s}</p></article>`;
      return `
      ${U.bar({ title: 'Avisos', backTo: '/inicio' })}
      <div class="scroll pad-tabs-only"><div class="av-page">
        <p class="t-dato" style="color:var(--text-3);margin:0 0 8px">HOY</p>
        <div class="av-list">${hoy.map((a, i) => card(a, i)).join('')}</div>
        <p class="t-dato" style="color:var(--text-3);margin:16px 0 8px">ANTES</p>
        <div class="av-list">${D.avisos.antes.map((a, i) => card(a, hoy.length + i)).join('')}</div>
      </div></div>`;
    },
  };

  T.route('/inicio', 'home');
  T.route('/para-vos', 'parati');
  T.route('/avisos', 'avisos');
})();
