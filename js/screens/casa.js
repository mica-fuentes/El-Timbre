/* 08–11 · Casa de la cumbia / reguetón / folclore / rock */
(function () {
  const T = window.T, D = T.D, U = T.ui, S = T.S;
  const HERO = { // posición de la casa dentro del hero (px del Figma)
    cum: [251.2, 132, 126.6, 186], reg: [239.2, 149, 117.7, 167], fol: [247, 149, 140, 168], rock: [250, 154, 128, 166],
  };

  T.screens.casa = {
    tabs: 'home', mini: true,
    html: ({ id }) => {
      const H = D.houses[id], hp = HERO[id];
      const top = H.top.map((t) => D.tracks[t]);
      const live = S.player.playing && S.player.id === top[0].id;
      const lines = H.big === 'REGUETÓN' ? ['CASA', 'DEL', 'REGUETÓN'] : H.big === 'CUMBIA' ? ['CASA', 'DE LA', 'CUMBIA'] : ['CASA', 'DEL', H.big];
      const following = !!S.follows['house:' + id];
      return `
      <div class="${H.cls}" style="display:contents">
      ${U.bar({ title: 'Casa ' + H.art, backTo: '/inicio', acts: [{ ico: 'more', act: 'casaMore', data: `data-h="${id}"` }] })}
      <div class="scroll pad-tabs cs ${H.cls}" data-h="${id}">
        <div class="cs-page">
          <div class="cs-hero">
            <div class="cs-trama"></div><i class="cs-glow"></i>
            <img class="cs-house" src="${T.img(H.img)}" alt="" style="left:${hp[0]}px;top:${hp[1] - 94}px;width:${hp[2]}px;height:${hp[3]}px">
            <i class="cs-acc"></i>
            <h1 class="cs-name">${lines.join('<br>')}</h1>
            <p class="cs-lead">${H.lead}</p>
          </div>
          <div class="cs-wave ${S.player.playing ? 'live' : ''}" aria-hidden="true">${U.wave(88, id.charCodeAt(0), 38, 4)}</div>
          <button class="btn btn-ac cs-radio" data-act="casaRadio" data-h="${id}">${T.ico('play')}Escuchar la radio</button>
          <button class="btn btn-ghost cs-follow ${following ? 'on' : ''}" data-act="follow" data-key="house:${id}" data-name="${H.name}" data-long="1">${following ? 'Siguiendo' : 'Seguir'}</button>
          <p class="cs-now"><i class="hdot"></i><span class="t-micro">${T.fmt(H.people)} PERSONAS EN LA CASA AHORA</span></p>

          <div class="cs-tabs">
            ${[['sonando', 'SONANDO'], ['playlists', 'PLAYLISTS'], ['artistas', 'ARTISTAS'], ['agenda', 'AGENDA'], ['diario', 'DEL DIARIO']].map(([k, l], i) => `<button class="pill ${i === 0 ? 'on' : ''}" data-act="csTab" data-k="${k}">${l}</button>`).join('')}
          </div>

          <section id="cs-sonando">
            <h2 class="t-h2 cs-h" style="top:530px">Sonando en la casa</h2>
            <button class="t-dato cs-more" style="top:538px" data-go="/playlist/${H.pls[0]}">VER TODO</button>
            <div class="cs-list" data-queue="${top.map((t) => t.id).join(',')}" data-ctxname="${D.playlists[H.pls[0]].name}" data-ctxroute="/playlist/${H.pls[0]}">
              ${top.map((tr, i) => U.trackRow(tr, i, { hearts: false, playing: i === 0 && S.player.id === tr.id || i === 0 && live })).join('')}
            </div>
          </section>

          <section id="cs-playlists">
            <h2 class="t-h2 cs-h" style="top:687px">Playlists de la casa</h2>
            <div class="cs-pls">${H.pls.map((p) => U.plCard(p)).join('')}</div>
          </section>

          <section id="cs-artistas">
            <h2 class="t-h2 cs-h" style="top:940px">Nuevas voces</h2>
            <button class="t-dato cs-more" style="top:948px" data-go="/nuevas-voces">LAS 24</button>
            <p class="cs-sub" style="top:966px">Artistas que entraron a la cuadra este año.</p>
            <div class="cs-arts">${H.arts.map((a) => `<button class="cs-art lift press" data-go="/artista/${a[0]}"><span class="zoomwrap"><img src="${T.img(a[2])}" alt=""></span><b>${a[1]}</b></button>`).join('')}</div>
          </section>

          <section id="cs-agenda">
            <h2 class="t-h2 cs-h" style="top:1119px">Agenda de la casa</h2>
            <button class="t-dato cs-more" style="top:1127px" data-go="/penas">OCTUBRE</button>
            ${H.agenda.map((a, i) => `<div class="cs-ag" style="top:${1160 + i * 64}px">
              <span class="t-dato cs-agd">${a[0]}</span><h3>${a[1]}</h3><p>${a[2]}</p>${U.goingBtn(a[3], { cls: 'cs-gbtn' })}</div>`).join('')}
          </section>

          <section id="cs-diario">
            <h2 class="t-h2 cs-h" style="top:1296px">Del diario</h2>
            <button class="cs-nota card lift press" data-act="soon" data-msg="La nota del diario llega en la versión final">
              <span class="photo"><img src="${T.img(H.cover)}" alt=""></span><b>${H.id === 'cum' ? 'La cumbia santafesina no es una sola' : H.id === 'reg' ? 'Cómo suena el perreo de barrio' : H.id === 'fol' ? 'La peña como escuela de oído' : 'Garage, pedales y vecinos'}</b><small>NOTA · 8 MIN</small>
            </button>
          </section>
        </div>
      </div>
      </div>`;
    },
    mount: (el, { id }) => {
      // el equalizer y la onda siguen al reproductor
      el._on('player', () => { const w = T.$('.cs-wave', el); w && w.classList.toggle('live', T.S.player.playing); });
    },
  };

  T.acts.casaRadio = (el) => {
    const H = D.houses[el.dataset.h];
    const q = H.top.concat(...H.pls.map((p) => D.playlists[p].tracks)).filter((v, i, a) => a.indexOf(v) === i);
    T.player.play(H.radio, q, { name: 'Radio · Casa ' + H.art, route: '/radio' });
    T.go('/radio');
  };
  T.acts.csTab = (el) => {
    const sc = el.closest('.scroll'), k = el.dataset.k;
    T.$$('.cs-tabs .pill', sc).forEach((b) => b.classList.toggle('on', b === el));
    const sec = T.$('#cs-' + k, sc);
    const y = { sonando: 520, playlists: 677, artistas: 930, agenda: 1109, diario: 1286 }[k];
    sc.scrollTo({ top: y - 110, behavior: 'smooth' });
  };
  T.acts.casaMore = (el) => {
    const H = D.houses[el.dataset.h];
    T.sheet(`<h3>Casa ${H.art}</h3><p class="t-micro" style="margin-bottom:8px">OPCIONES DE LA CASA</p>
      <button class="sheet-row" data-act="share">${T.ico('share')}<span><b>Compartir la casa</b><small>COPIAR LINK</small></span></button>
      <button class="sheet-row" data-act="casaBell" data-h="${H.id}">${T.ico('bell')}<span><b>Avisos de esta casa</b><small>PEÑAS Y TEMAS NUEVOS</small></span></button>
      <button class="sheet-row" data-to="/radio" data-act="goClose">${T.ico('wave')}<span><b>Ir a la radio de la cuadra</b><small>EN VIVO AHORA</small></span></button>`);
  };
  T.acts.casaBell = (el) => { T.closeSheet(); T.toast('Avisos de la casa ' + D.houses[el.dataset.h].art + ' activados'); };

  T.route('/casa/:id', 'casa');
})();
