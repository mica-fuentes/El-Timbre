/* ───────────────────────────────────────────────────────────
   El Timbre · arranque: chrome del teléfono, paneles de la demo y router
   ─────────────────────────────────────────────────────────── */
(function () {
  const T = window.T, S = T.S;
  T.phone = T.$('#phone');

  /* status bar */
  ['sig:sb-signal', 'wifi:sb-wifi', 'bat:sb-battery'].forEach((k) => {
    const [cls, name] = k.split(':');
    T.$('.sb-i.' + cls).innerHTML = T.ico(name);
  });

  /* tab bar */
  const TABS = [['home', 'tab-home', 'Cuadra'], ['playlists', 'tab-playlists', 'Playlists'], ['live', 'tab-wave', 'En vivo'], ['fest', 'tab-star', 'Festival'], ['vos', 'tab-user', 'Vos']];
  T.$('#tabbar nav').innerHTML = TABS.map(([k, i, l]) => `<button class="tab" data-tab="${k}" aria-label="${l}">${T.ico(i)}<span>${l}</span></button>`).join('');

  /* acciones del chrome */
  T.acts.openPlayer = () => T.go('/player', { modal: true });
  T.acts.miniToggle = () => T.player.toggle();
  T.acts.miniNext = () => T.player.next();
  T.acts.setTheme = (el) => {
    S.theme = el.dataset.v || (S.theme === 'day' ? 'night' : 'day'); T.save();
    T.phone.dataset.theme = S.theme;
    document.documentElement.dataset.theme = 'night';
    T.rerender(); drawSide();
  };
  T.acts.resetDemo = () => T.reset();
  T.acts.jump = (el) => {
    const [path, theme] = [el.dataset.path, el.dataset.theme];
    if (path === '/sistema') { window.open('sistema.html', '_blank'); return; }
    if (theme) { S.theme = theme; T.save(); }
    if (!S.onboarded && !path.startsWith('/registro') && path !== '/') { S.onboarded = true; T.save(); }
    T.go(path, { force: true, dir: 'fade' });
  };

  /* catálogo de pantallas (mismo orden y numeración que el Figma) */
  const CAT = [
    ['A · Registro', [['01 Arranque', '/'], ['02 Elegí tus casas', '/registro/casas'], ['03 ¿Cuánto las conocés?', '/registro/conocimiento']]],
    ['B · Inicio', [['04 La cuadra', '/inicio', 'night'], ['05 De día', '/inicio', 'day'], ['06 Para vos', '/para-vos'], ['07 Avisos', '/avisos']]],
    ['C · Casas', [['08 Cumbia', '/casa/cum'], ['09 Reguetón', '/casa/reg'], ['10 Folclore', '/casa/fol'], ['11 Rock', '/casa/rock']]],
    ['D · Descubrir', [['12 Buscar', '/buscar'], ['13 Nuevas voces', '/nuevas-voces'], ['14 Artista', '/artista/milo'], ['15 Artista emergente', '/artista/faroles']]],
    ['E · Escuchar', [['16 Playlists', '/playlists'], ['17 Dentro de una lista', '/playlist/cumbia-ronda'], ['18 Reproductor', '/player'], ['19 Radio de la cuadra', '/radio']]],
    ['F · Festival', [['20 Festival', '/festival'], ['21 Lineup', '/festival/lineup'], ['22 Lineup · Nuevas voces', '/festival/nuevas-voces'], ['23 El predio', '/festival/predio'], ['24 Peñas', '/penas'], ['25 Descubrí peñas', '/penas/descubrir']]],
    ['G · Vos y artistas', [['26 Vos', '/vos'], ['27 Lo tuyo y artistas', '/vos/lo-tuyo'], ['28 Sumate a la cuadra', '/artistas/sumate'], ['29 Inscripción', '/artistas/inscripcion'], ['30 En revisión', '/artistas/enviada']]],
    ['I · Concurso', [['32 Notificación', '/notificacion'], ['33 Concurso', '/concurso'], ['34 Presentá tu tema', '/concurso/presentar'], ['35 Participación enviada', '/concurso/enviado'], ['36 ¡Ganaste!', '/concurso/ganaste'], ['37 En vivo', '/concurso/en-vivo']]],
    ['H · Sistema', [['31 Sistema de diseño', '/sistema']]],
  ];
  function drawSide() {
    const cur = T.path();
    T.$('#side-l').innerHTML = `
      <div class="brand"><b>El Timbre</b><span>prototipo</span></div>
      <p class="lead">Demo navegable de la app de La Cuadra. Tocá dentro del teléfono o saltá a cualquier pantalla desde acá.</p>
      ${CAT.map(([sec, items]) => `<div class="side-sec"><h4><i></i>${sec}</h4><div class="side-list">${items.map(([l, p, th]) => `<button data-act="jump" data-path="${p}" ${th ? `data-theme="${th}"` : ''} class="${p === cur && (!th || th === S.theme) ? 'on' : ''}">${l}</button>`).join('')}</div></div>`).join('')}`;
    T.$('#side-r').innerHTML = `
      <div class="side-k">Opciones</div>
      <div class="side-btns">
        <button class="side-btn" data-act="setTheme">${T.ico(S.theme === 'day' ? 'sun' : 'sun')}<span>${S.theme === 'day' ? 'Pasar a noche' : 'Pasar a día'}</span></button>
        <button class="side-btn" data-act="resetDemo">${T.ico('repeat')}<span>Reiniciar demo</span></button>
      </div>
      <p class="side-note">Los artistas con * son inventados, solo para este proyecto.<br><br>El estado (likes, seguidos, peñas) se guarda en este navegador.</p>`;
  }
  T.on('route', drawSide);

  const q = new URLSearchParams(location.search);
  if (q.get('theme')) { S.theme = q.get('theme'); }
  T.fit();
  T.updateMini();

  /* primer render */
  let start = location.hash.slice(1);
  if (!start || start === '/') {
    start = sessionStorage.getItem('timbre.splash') ? (S.onboarded ? '/inicio' : '/registro/casas') : '/';
  }
  history.replaceState({ i: 0 }, '', '#' + start);
  T.render(start, 'fade');
})();
