/* 26 · Vos · 27 · Vos (lo tuyo y artistas) · 28 · Sumate a la cuadra · 29 · Inscripción · 30 · Inscripción en revisión */
(function () {
  const T = window.T, D = T.D, U = T.ui, S = T.S;
  const HOUSES = ['cum', 'fol', 'reg', 'rock'];

  const lineRow = (go, act, t, s, extra = '') => `<button class="vo-row card lift press" ${go ? `data-go="${go}"` : ''} ${act ? `data-act="${act}"` : ''}><span><b>${t}</b><small>${s}</small></span>${extra || T.ico('chev-r')}</button>`;
  const likedCount = () => Object.keys(S.likes).filter((k) => D.tracks[k]).length;
  const insBlock = () => {
    const st = S.inscripcion.status;
    return `<h2 class="t-h2 vo-h sp">Para artistas</h2>
      <article class="vo-pink"><h3>Sumate a Nuevas voces</h3><p>Inscribite y aparecé para quienes escuchan tu género.</p>
        ${st === 'none' ? '<button class="btn btn-dark vo-ins" data-go="/artistas/sumate">INSCRIBIRME</button>' : '<button class="btn btn-dark vo-ins" data-go="/artistas/enviada">VER MI ESTADO</button>'}</article>
      ${st !== 'none' ? `<p class="t-dato vo-mi">MI INSCRIPCIÓN</p><button class="vo-demo card lift press" data-go="/artistas/enviada"><span><b>Tu demo</b><small>ENVIADA HOY</small></span><em>EN REVISIÓN</em></button>` : ''}`;
  };

  /* ── 26 · Vos ─────────────────────────────────────────────── */
  const years = [['Cumbia', 46, 'cum'], ['Folclore', 28, 'fol'], ['Reguetón', 17, 'reg'], ['Rock', 9, 'rock']];
  T.screens.vos = {
    tabs: 'vos', mini: true,
    html: () => `
      ${U.bar({ title: 'Vos', back: false, l20: true, acts: [{ ico: 'sun', act: 'setTheme', label: 'Cambiar modo día o noche' }] })}
      <div class="scroll pad-tabs"><div class="vo-page">
        <div class="vo-me rise" style="--i:0"><span class="vo-ring"></span><span class="vo-av">M</span><h1>Mica</h1><p>TU CASA: LA CUMBIA · DESDE 2026</p></div>
        <div class="vo-stats rise" style="--i:1">
          <div class="card"><b style="color:var(--cum-t)">418</b><small>HORAS ESTE AÑO</small></div>
          <div class="card"><b style="color:var(--fol)">7</b><small>PEÑAS</small></div>
          <div class="card"><b style="color:var(--reg)">2.104</b><small>TEMAS</small></div>
        </div>
        <h2 class="t-h2 vo-h" style="margin-top:26px">Tu año en la cuadra</h2>
        <p class="vo-sub">Esto es lo que va a decidir tu lineup de octubre.</p>
        <div class="vo-years">${years.map(([n, p, h]) => `<div class="h-${h}"><span>${n}</span><em>${p}%</em><i><b style="--w:${p}%"></b></i></div>`).join('')}</div>
        <div class="vo-sh"><h2 class="t-h2">Tus casas</h2><button class="t-dato" data-act="soon" data-msg="Tocá una casa para sumarla o sacarla">EDITAR</button></div>
        <div class="vo-pills" id="vo-pills">${HOUSES.map((h) => `<button class="pill h-${h} ${S.picked.includes(h) ? 'on' : ''}" data-act="voHouse" data-h="${h}">${D.houses[h].big}</button>`).join('')}</div>
        <div class="vo-sh"><h2 class="t-h2">Lo tuyo</h2></div>
        <div class="vo-list">
          ${lineRow('/playlist/guardados', '', 'Guardados', `<span id="vo-liked">${Math.max(214, likedCount())}</span> TEMAS · 9 LISTAS`)}
          ${lineRow('', 'voDescargas', 'Descargados', '3 LISTAS · 412 MB')}
          ${lineRow('/penas', '', 'Peñas anotadas', `${Object.values(S.going).filter(Boolean).length} ESTE MES`)}
          ${lineRow('', 'voEntradas', 'Tus entradas', S.festTickets ? 'ABONO DE TRES NOCHES' : 'TODAVÍA NO TENÉS')}
        </div>
        ${insBlock()}
        <h2 class="t-h2 vo-h" style="margin-top:34px">Cuenta</h2>
        <div class="vo-list">
          <div class="vo-row card"><span><b>Avisos</b><small>PEÑAS, TEMAS NUEVOS Y FESTIVAL</small></span><button class="switch ${S.bell ? 'on' : ''}" data-act="toggleBell" role="switch" aria-checked="${S.bell}" aria-label="Avisos"><i></i></button></div>
          ${lineRow('', 'voCalidad', 'Calidad y datos', S.calidad || 'ALTA CON WIFI')}
          <button class="vo-row card lift press" data-act="voTheme"><span><b>Modo de la app</b><small>${S.theme === 'day' ? 'DÍA' : 'NOCHE'} · TOCÁ PARA CAMBIAR</small></span>${T.ico('sun')}</button>
          <button class="vo-row card lift press" data-act="resetDemo"><span><b>Reiniciar la demo</b><small>VOLVER AL ARRANQUE</small></span>${T.ico('repeat')}</button>
        </div>
      </div></div>`,
    mount: (el) => {
      el._on('likes', () => { const n = T.$('#vo-liked', el); if (n) n.textContent = Math.max(214, likedCount()); });
    },
  };
  T.acts.voHouse = (b) => {
    const h = b.dataset.h, i = S.picked.indexOf(h);
    if (i >= 0 && S.picked.length === 1) { T.toast('Tenés que tener al menos una casa'); return; }
    if (i >= 0) S.picked.splice(i, 1); else S.picked.push(h);
    T.save(); b.classList.toggle('on', i < 0); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    T.toast(i < 0 ? 'Sumaste la casa ' + D.houses[h].art : 'Sacaste la casa ' + D.houses[h].art);
  };
  T.acts.voTheme = () => { T.acts.setTheme({ dataset: {} }); };
  T.acts.voDescargas = () => T.sheet(`<h3>Descargados</h3><p class="t-micro" style="margin-bottom:8px">PARA ESCUCHAR SIN CONEXIÓN · 412 MB</p>
    ${[['cumbia-ronda', '186 MB'], ['pena-aclare', '131 MB'], ['nuevos-rock', '95 MB']].map(([id, mb]) => `<button class="sheet-row" data-to="/playlist/${id}" data-act="goClose">${T.ico('download')}<span><b>${D.playlists[id].name}</b><small>${mb} · ${D.playlists[id].n} TEMAS</small></span></button>`).join('')}`);
  T.acts.voEntradas = () => T.acts.buyTicket();
  T.acts.voCalidad = () => T.sheet(`<h3>Calidad y datos</h3><p class="t-micro" style="margin-bottom:8px">CUÁNTO SE ESCUCHA Y CUÁNTO GASTA</p>
    ${['ALTA CON WIFI', 'SIEMPRE ALTA', 'AHORRO DE DATOS'].map((q) => `<button class="sheet-row" data-act="voQ" data-q="${q}">${T.ico('volume')}<span><b>${q.charAt(0) + q.slice(1).toLowerCase()}</b><small>${(S.calidad || 'ALTA CON WIFI') === q ? 'ELEGIDA' : 'ELEGIR'}</small></span></button>`).join('')}`);
  T.acts.voQ = (el) => { S.calidad = el.dataset.q; T.save(); T.closeSheet(); T.rerender(); T.toast('Calidad: ' + el.dataset.q.toLowerCase()); };

  /* ── 27 · Lo tuyo y artistas ──────────────────────────────── */
  T.screens.vosTuyo = {
    tabs: 'vos', mini: false,
    html: () => `
      ${U.bar({ title: 'Vos', backTo: '/vos', acts: [{ ico: 'sun', act: 'setTheme' }] })}
      <div class="scroll pad-tabs-only"><div class="vo-page" style="padding-top:104px">
        <h2 class="t-h2 vo-h" style="font-size:22px;margin-top:0">Lo tuyo</h2>
        <div class="vo-list" style="margin-top:14px">
          ${lineRow('/playlist/guardados', '', 'Guardados', `${Math.max(214, likedCount())} TEMAS · 9 LISTAS`)}
          ${lineRow('', 'voDescargas', 'Descargados', 'PARA ESCUCHAR SIN CONEXIÓN')}
          ${lineRow('/penas', '', 'Mis peñas', 'ANOTADAS Y ASISTIDAS')}
        </div>
        ${insBlock()}
      </div></div>`,
  };

  /* ── 28 · Sumate a la cuadra ──────────────────────────────── */
  T.screens.sumate = {
    tabs: null, mini: false,
    html: () => `
      ${U.bar({ title: 'Para artistas', backTo: '/vos', acts: [{ ico: 'close', go: '/vos', label: 'Cerrar' }] })}
      <div class="ob">
        <h1 class="t-display ob-h rise" style="--i:0">Sumate a<br>la cuadra</h1>
        <p class="t-small ob-p ob-p2 rise" style="--i:1;top:176px">Si hacés música en alguna de las cuatro esquinas, inscribite y aparecé en Nuevas voces.</p>
        <div class="su-steps">${[['Elegís tu casa', 'Reguetón, cumbia, folclore o rock. Ahí te escucha quien ya conoce tu género.'], ['Te revisa la cuadra', 'Escuchamos tu demo antes de publicarte. Tarda unos días.'], ['Aparecés en Nuevas voces', 'Desde ahí podés sumarte a las peñas y a la agenda del festival.']].map(([a, b], i) => `<div class="su-st card rise" style="--i:${i + 2}"><i>${i + 1}</i><b>${a}</b><p>${b}</p></div>`).join('')}</div>
        <div class="su-pills rise" style="--i:5">${['reg', 'cum', 'fol', 'rock'].map((h) => `<span class="h-${h}"><i class="hdot"></i>${D.houses[h].big}</span>`).join('')}</div>
        <p class="t-micro su-foot">SE TARDA 5 MINUTOS · NECESITÁS UN TEMA PROPIO</p>
      </div>
      <div class="cta-dock"><button class="btn btn-primary" data-go="/artistas/inscripcion">Inscribirme</button></div>`,
  };

  /* ── 29 · Inscripción ─────────────────────────────────────── */
  const insValid = () => { const d = S.inscripcion; return d.nombre.trim().length > 1 && d.ciudad.trim().length > 1 && d.demo && d.derecho; };
  T.screens.inscripcion = {
    tabs: null, mini: false,
    html: () => {
      const d = S.inscripcion;
      return `
      ${U.bar({ title: 'Inscripción', backTo: '/artistas/sumate', acts: [{ ico: 'close', go: '/vos', label: 'Cerrar' }] })}
      <div class="ob in-form"><div class="scroll pad-cta" style="top:0"><div style="padding:100px 20px 0">
        <h1 class="t-display">Contanos de vos</h1>
        <p class="t-small" style="margin-top:12px">Lo que cargues lo revisa la cuadra antes de publicarse.</p>
        <label class="fm-l">NOMBRE ARTÍSTICO</label><input class="fm-i" id="in-nombre" type="text" placeholder="Cómo te llaman en el escenario" value="${T.esc(d.nombre)}" autocomplete="off">
        <label class="fm-l">CIUDAD</label><input class="fm-i" id="in-ciudad" type="text" placeholder="Dónde vivís" value="${T.esc(d.ciudad)}" autocomplete="off">
        <label class="fm-l">TU CASA</label>
        <div class="fm-pills" id="in-house">${['reg', 'cum', 'fol', 'rock'].map((h) => `<button class="pill h-${h} ${d.house === h ? 'on' : ''}" data-act="inHouse" data-h="${h}">${D.houses[h].big}</button>`).join('')}</div>
        <label class="fm-l">UN TEMA PROPIO</label>
        <button class="fm-up ${d.demo ? 'on' : ''}" id="in-up" data-act="inUp">${d.demo ? '<b>✓ mi-demo.mp3</b><small>SUBIDO · 3:24</small>' : '<b>Subir demo o pegar un link</b><small>ARCHIVO DE AUDIO O LINK</small>'}</button>
        <label class="fm-l">REDES (OPCIONAL)</label><input class="fm-i" id="in-redes" type="text" placeholder="@usuario o link" value="${T.esc(d.redes)}" autocomplete="off">
        <button class="fm-ck" id="in-ck" data-act="inCk" role="checkbox" aria-checked="${d.derecho}"><i class="${d.derecho ? 'on' : ''}">${T.ico('check-s')}</i><span>La música es mía y tengo derecho a subirla.</span></button>
      </div></div></div>
      <div class="cta-dock"><button class="btn btn-primary ${insValid() ? '' : 'is-off'}" id="in-send" data-act="inSend">Enviar inscripción</button></div>`;
    },
    mount: (el) => {
      const d = S.inscripcion, chk = () => T.$('#in-send', el).classList.toggle('is-off', !insValid());
      [['#in-nombre', 'nombre'], ['#in-ciudad', 'ciudad'], ['#in-redes', 'redes']].forEach(([s, k]) => T.$(s, el).addEventListener('input', (e) => { d[k] = e.target.value; T.save(); chk(); }));
      el._chk = chk;
    },
  };
  T.acts.inHouse = (b) => { S.inscripcion.house = b.dataset.h; T.save(); T.$$('#in-house .pill').forEach((x) => x.classList.toggle('on', x === b)); };
  T.acts.inUp = (b) => { const d = S.inscripcion; d.demo = !d.demo; T.save(); b.classList.toggle('on', d.demo); b.innerHTML = d.demo ? '<b>✓ mi-demo.mp3</b><small>SUBIDO · 3:24</small>' : '<b>Subir demo o pegar un link</b><small>ARCHIVO DE AUDIO O LINK</small>'; T.current().el._chk(); };
  T.acts.inCk = (b) => { const d = S.inscripcion; d.derecho = !d.derecho; T.save(); T.$('i', b).classList.toggle('on', d.derecho); b.setAttribute('aria-checked', d.derecho); T.current().el._chk(); };
  T.acts.inSend = () => {
    if (!insValid()) {
      const d = S.inscripcion;
      T.toast(d.nombre.trim().length < 2 ? 'Falta tu nombre artístico' : d.ciudad.trim().length < 2 ? 'Falta tu ciudad' : !d.demo ? 'Subí tu demo o pegá un link' : 'Confirmá que la música es tuya', false);
      return;
    }
    S.inscripcion.status = 'review'; T.save();
    S.notices = (S.notices || []); T.go('/artistas/enviada', { replace: true, dir: 'fade' });
  };

  /* ── 30 · Inscripción en revisión ─────────────────────────── */
  T.screens.enviada = {
    tabs: null, mini: false,
    html: () => {
      const d = S.inscripcion, H = D.houses[d.house || 'rock'];
      return `
      ${U.bar({ title: 'Inscripción', backTo: '/vos', acts: [{ ico: 'close', go: '/vos', label: 'Cerrar' }] })}
      <div class="ob">
        <h1 class="t-display ob-h rise" style="--i:0">Recibimos<br>tu música</h1>
        <p class="t-small ob-p ob-p2 rise" style="--i:1;top:176px">La cuadra la escucha y te avisa por la app. Mientras tanto, así te vas a ver.</p>
        <div class="en-tl card rise" style="--i:2">
          <i class="en-line"></i>
          <div class="en-s"><i style="background:var(--cum)"></i><b>Inscripción enviada</b><small>HOY</small></div>
          <div class="en-s"><i style="background:var(--fol);animation:pulse 1.6s ease-in-out infinite"></i><b>La cuadra escucha tu demo</b><small style="color:var(--fol);font-weight:700">EN REVISIÓN</small></div>
          <div class="en-s dim"><i class="out"></i><b>Aparecés en Nuevas voces</b><small>CUANDO SE APRUEBE</small></div>
        </div>
        <p class="t-micro en-k rise" style="--i:3">ASÍ TE VAS A VER EN NUEVAS VOCES</p>
        <article class="nv-row en-prev card h-${H.id} rise" style="--i:4"><span class="nv-th"><img src="${T.img('tu-foto.jpg')}" alt=""></span><span class="nv-m"><b>${T.esc(d.nombre || 'Tu nombre artístico')}</b><small>${H.big} · NUEVA VOZ</small></span><button class="fbtn nv-f" data-act="soon" data-msg="Así te van a ver en la cuadra">SEGUIR</button></article>
      </div>
      <div class="cta-dock"><button class="btn btn-primary" data-go="/vos" data-replace>Volver a VOS</button></div>`;
    },
  };

  T.route('/vos', 'vos');
  T.route('/vos/lo-tuyo', 'vosTuyo');
  T.route('/artistas/sumate', 'sumate');
  T.route('/artistas/inscripcion', 'inscripcion');
  T.route('/artistas/enviada', 'enviada');
  T.route('/inscripcion/enviada', 'enviada');
})();
