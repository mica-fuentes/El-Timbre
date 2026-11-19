/* 32 · Notificación · 33 · Concurso · 34 · Presentá tu tema · 35 · Participación enviada · 36 · ¡Ganaste! · 37 · En vivo */
(function () {
  const T = window.T, D = T.D, U = T.ui, S = T.S;

  /* ── 32 · Notificación (pantalla bloqueada) ───────────────── */
  T.screens.notif = {
    tabs: null, mini: false, lock: true, theme: 'night',
    html: () => `
      <div class="lk">
        <i class="lk-glow"></i>
        <p class="lk-date">DOMINGO 12 DE OCTUBRE</p>
        <h1 class="lk-time">9:41</h1>
        <button class="lk-n rise" style="--i:3" data-go="/concurso" aria-label="Abrir notificación">
          <span class="lk-app">LC</span><em>EL TIMBRE</em><i>AHORA</i>
          <b>Participá en la próxima peña</b><p>Si ganás, estás en el próximo festival de La Cuadra.</p>
        </button>
        <span class="lk-c" style="left:40px"></span><span class="lk-c" style="left:302px"></span>
        <p class="lk-hint">TOCÁ LA NOTIFICACIÓN</p>
      </div>`,
  };

  /* ── 33 · Concurso ────────────────────────────────────────── */
  T.screens.concurso = {
    tabs: 'fest', mini: false,
    html: () => {
      const sent = S.concurso.status !== 'none';
      return `
      ${U.bar({ title: 'Concurso', backTo: '/festival', acts: [{ ico: 'share', act: 'share' }] })}
      <div class="scroll pad-tabs-only"><div class="cc-page">
        <article class="cc-hero rise" style="--i:0"><span class="cc-pill">PEÑA CONCURSO · CIERRA EN 2 DÍAS</span>
          <h1>Ganá tu lugar<br>en el festival</h1><p>Presentá un tema propio. Vota el público, decide el jurado y quien gana toca en La Cuadra.</p>
          <button class="btn btn-dark cc-go" data-go="${sent ? '/concurso/enviado' : '/concurso/presentar'}">${sent ? 'VER MI PARTICIPACIÓN' : 'PARTICIPAR'}</button></article>
        <h2 class="t-h2 cc-h">Cómo se elige</h2>
        ${['Presentás tu tema', 'Vota el público', 'Decide el jurado'].map((t, i) => `<div class="cc-st card rise" style="--i:${i + 1}"><i>${i + 1}</i><b>${t}</b></div>`).join('')}
        <article class="cc-prize card-line"><small>PREMIO</small><b>Tocar en el festival de La Cuadra</b><p>Un lugar entre las nuevas voces, en el escenario de tu casa.</p></article>
        <button class="cc-bases" data-act="bases">BASES Y CONDICIONES</button>
      </div></div>`;
    },
  };
  T.acts.bases = () => T.sheet(`<h3>Bases y condiciones</h3><p class="t-micro" style="margin-bottom:10px">PEÑA CONCURSO · DEMO</p>
    <p class="t-small" style="margin-bottom:10px">1. Pueden participar artistas con un tema propio de hasta 4 minutos.</p><p class="t-small" style="margin-bottom:10px">2. Vota el público durante tres días y después decide el jurado.</p><p class="t-small" style="margin-bottom:16px">3. La persona ganadora toca entre las nuevas voces de su casa en el festival.</p><button class="btn btn-line btn-wide" data-act="closeSheet">Entendido</button>`);

  /* ── 34 / 34b · Presentá tu tema ──────────────────────────── */
  const C = () => S.concurso;
  const cValid = () => { const c = C(); return (c.titulo || '').trim().length > 1 && c.tema && c.derecho && c.bases; };
  T.screens.presentar = {
    tabs: null, mini: false,
    html: () => {
      const c = C();
      return `
      ${U.bar({ title: 'Concurso', backTo: '/concurso', acts: [{ ico: 'close', go: '/concurso', label: 'Cerrar' }] })}
      <div class="ob"><div class="scroll pad-cta" style="top:0"><div style="padding:100px 20px 0">
        <h1 class="t-display">Presentá tu tema</h1>
        <p class="t-small" style="margin-top:12px">Un tema propio. Lo escucha el público y decide el jurado.</p>
        <label class="fm-l" style="margin-top:28px">TÍTULO DEL TEMA</label><input class="fm-i" id="cc-t" type="text" placeholder="Cómo se llama" value="${T.esc(c.titulo || '')}" autocomplete="off">
        <label class="fm-l">TU CASA</label>
        <div class="fm-pills" id="cc-house">${['reg', 'cum', 'fol', 'rock'].map((h) => `<button class="pill h-${h} ${c.house === h ? 'on' : ''}" data-act="ccHouse" data-h="${h}">${D.houses[h].big}</button>`).join('')}</div>
        <label class="fm-l">TU TEMA</label>
        <button class="fm-up ${c.tema ? 'on' : ''}" id="cc-up" data-act="ccUp">${c.tema ? '<b>✓ cuarto-propio.mp3</b><small>SUBIDO · 3:12</small>' : '<b>Subir el tema</b><small>ARCHIVO DE AUDIO · HASTA 4 MIN</small>'}</button>
        <button class="fm-ck" data-act="ccCk" data-k="derecho" role="checkbox" aria-checked="${!!c.derecho}"><i class="${c.derecho ? 'on' : ''}">${T.ico('check-s')}</i><span>La música es mía y tengo derecho a subirla.</span></button>
        <button class="fm-ck" data-act="ccCk" data-k="bases" role="checkbox" aria-checked="${!!c.bases}" style="margin-top:14px"><i class="${c.bases ? 'on' : ''}">${T.ico('check-s')}</i><span>Acepto las bases y condiciones del concurso.</span></button>
      </div></div></div>
      <div class="cta-dock"><button class="btn btn-primary ${cValid() ? '' : 'is-off'}" id="cc-send" data-act="ccSend">Presentar tema</button></div>`;
    },
    mount: (el) => {
      T.$('#cc-t', el).addEventListener('input', (e) => { C().titulo = e.target.value; T.save(); T.$('#cc-send', el).classList.toggle('is-off', !cValid()); });
    },
  };
  T.acts.ccHouse = (b) => { C().house = b.dataset.h; T.save(); T.$$('#cc-house .pill').forEach((x) => x.classList.toggle('on', x === b)); };
  T.acts.ccUp = (b) => { const c = C(); c.tema = !c.tema; T.save(); b.classList.toggle('on', c.tema); b.innerHTML = c.tema ? '<b>✓ cuarto-propio.mp3</b><small>SUBIDO · 3:12</small>' : '<b>Subir el tema</b><small>ARCHIVO DE AUDIO · HASTA 4 MIN</small>'; T.$('#cc-send').classList.toggle('is-off', !cValid()); };
  T.acts.ccCk = (b) => { const c = C(), k = b.dataset.k; c[k] = !c[k]; T.save(); T.$('i', b).classList.toggle('on', c[k]); b.setAttribute('aria-checked', !!c[k]); T.$('#cc-send').classList.toggle('is-off', !cValid()); };
  T.acts.ccSend = () => {
    if (!cValid()) { const c = C(); T.toast(!(c.titulo || '').trim() ? 'Falta el título del tema' : !c.tema ? 'Subí tu tema' : 'Aceptá las dos casillas', false); return; }
    C().status = 'sent'; T.save();
    T.go('/concurso/enviado', { replace: true, dir: 'fade' });
    // más tarde llega el resultado (demo): aviso en la campanita y toast
    clearTimeout(T._win);
    T._win = setTimeout(() => {
      if (C().status !== 'sent') return;
      S.notices = [{ house: 'fol', t: '¡Ganaste el concurso!', s: 'TOCÁ PARA VER TU LUGAR · AHORA', go: '/concurso/ganaste' }].concat(S.notices || []);
      S.concursoNotice = true; T.save();
      T.toast('Resultado del concurso: tocá la campanita'); const bell = T.$('.hm-ic[data-go="/avisos"]'); bell && bell.insertAdjacentHTML('beforeend', '<i class="hm-badge"></i>');
    }, 9000);
  };

  /* ── 35 · Participación enviada ───────────────────────────── */
  T.screens.enviado = {
    tabs: null, mini: false,
    html: () => {
      const c = C(), H = D.houses[c.house || 'fol'];
      return `
      ${U.bar({ title: 'Concurso', backTo: '/concurso', acts: [{ ico: 'close', go: '/concurso', label: 'Cerrar' }] })}
      <div class="ob">
        <h1 class="t-display ob-h rise" style="--i:0">Ya estás<br>en carrera</h1>
        <p class="t-small ob-p ob-p2 rise" style="--i:1;top:176px">Tu tema entró al concurso. Compartilo para sumar votos.</p>
        <article class="ce-card card rise h-${H.id}" style="--i:2"><span class="ce-art"><img src="${T.img('tema-cuartopropio.jpg')}" alt=""></span><div><b>${T.esc(c.titulo || 'Cuarto Propio')}</b><small>LUNA FERRARI* · ${H.big}</small><em>EN CARRERA</em></div></article>
        <div class="ce-stats rise" style="--i:3"><div class="card"><small>CIERRA EN</small><b>2 DÍAS</b></div><div class="card"><small>VOTOS</small><b id="ce-v">${c.votes || 0}</b></div></div>
        <button class="btn btn-line ce-share rise" style="--i:4" data-act="ccShare">Compartir mi tema</button>
        <p class="t-micro ce-fn"><i></i> ARTISTA INVENTADO, SOLO PARA ESTE PROYECTO</p>
      </div>
      <div class="cta-dock"><button class="btn btn-primary" data-go="/concurso">Ver el concurso</button></div>`;
    },
    mount: (el) => {
      // los votos suben solos mientras mirás (demo)
      const iv = setInterval(() => { if (C().status !== 'sent') return; C().votes = (C().votes || 0) + (Math.random() < .6 ? 1 : 0); const v = T.$('#ce-v', el); if (v) v.textContent = C().votes; T.save(); }, 2200);
      el._off(() => clearInterval(iv));
    },
  };
  T.acts.ccShare = () => T.toast('Link de tu tema copiado · demo');

  /* ── 36 · ¡Ganaste! ───────────────────────────────────────── */
  T.screens.ganaste = {
    tabs: null, mini: false,
    html: () => `
      <div class="gn">
        <p class="gn-k rise" style="--i:0">GANASTE EL CONCURSO</p>
        <div class="gn-orb"><i class="r r3"></i><i class="r r2"></i><i class="r r1"></i><b>1°</b>
          ${[[-86, 8, 'reg', 8], [78, -66, 'rock', 12], [-36, -102, 'cum', 8], [112, 28, 'fol', 14], [-118, -30, 'fol', 8], [-62, 82, 'cum', 10], [98, -108, 'cum', 9], [-150, 34, 'reg', 10], [132, 62, 'reg', 9]].map(([x, y, h, s], i) => `<em style="left:calc(50% + ${x}px);top:calc(50% + ${y}px);width:${s}px;height:${s}px;background:var(--${h});--d:${i * -.5}s"></em>`).join('')}
        </div>
        <h1 class="gn-t rise" style="--i:2">Estás en<br>el festival</h1>
        <article class="gn-card card lift rise" style="--i:3" data-go="/concurso/en-vivo" role="button" tabindex="0"><small>TU LUGAR</small><b>Domingo 19 · 20 H</b><span>ESCENARIO 3 · CASA DEL FOLCLORE</span><p>Tocás entre las nuevas voces de tu casa.</p></article>
      </div>
      <div class="cta-dock"><button class="btn btn-primary" data-go="/festival/lineup">Ver mi lugar en el lineup</button></div>`,
    mount: () => { C().status = 'won'; T.save(); },
  };

  /* ── 37 · En vivo · tema de la ganadora ───────────────────── */
  T.screens.envivoW = {
    tabs: 'live', mini: false,
    html: () => {
      const c = C(), following = !!S.follows['artist:luna'];
      return `
      ${U.bar({ title: 'Radio de la cuadra', back: false, l20: true, acts: [{ ico: 'clock', act: 'soon', data: 'data-msg="Historial de la radio · próximamente"' }] })}
      <div class="ev h-fol">
        <div class="ev-tabs"><span class="pill on">EN VIVO</span><small>FESTIVAL · DOMINGO 19</small></div>
        <div class="ev-art"><img src="${T.img('tema-cuartopropio.jpg')}" alt=""></div>
        <h1 class="ev-t">${T.esc(c.titulo || 'Cuarto Propio')}</h1>
        <p class="ev-m">LUNA FERRARI* · NUEVA VOZ · ESCENARIO 3</p>
        <div class="ev-wave live" id="ev-wave">${U.wave(44, 7, 44, 6)}</div>
        <button class="btn btn-primary ev-f ${following ? 'on' : ''}" data-act="follow" data-key="artist:luna" data-name="Luna Ferrari*" data-long="1" style="${following ? 'background:var(--fol)' : ''}"><span>${following ? 'SIGUIENDO A LUNA FERRARI*' : 'SEGUIR A LUNA FERRARI*'}</span></button>
        <div class="ev-l card"><span class="ev-av"><i style="background:var(--cum)"></i><i style="background:var(--reg)"></i><i style="background:var(--rock)"></i><i style="background:var(--fol)"></i></span><b>2.314 ESCUCHANDO AHORA</b><small>DESDE LA CUADRA Y DESDE CASA</small></div>
        <p class="t-micro ev-fn"><i></i> ARTISTA INVENTADO, SOLO PARA ESTE PROYECTO</p>
      </div>`;
    },
    mount: (el) => {
      // la onda avanza: barras "reproducidas" en ámbar y el resto gris
      const bars = T.$$('#ev-wave i', el); let k = 0;
      const iv = setInterval(() => { k = (k + 1) % (bars.length + 1); bars.forEach((b, i) => b.classList.toggle('past', i < k)); }, 450);
      el._off(() => clearInterval(iv));
    },
  };
  // el botón "seguir a Luna" usa el mismo acto global; ajusta su rótulo largo
  const _follow = T.acts.follow;
  T.acts.follow = (el, e) => {
    if (el.dataset.key === 'artist:luna') {
      e.stopPropagation(); const k = 'artist:luna'; S.follows[k] = S.follows[k] ? 0 : 1; T.save();
      const on = !!S.follows[k]; el.querySelector('span').textContent = on ? 'SIGUIENDO A LUNA FERRARI*' : 'SEGUIR A LUNA FERRARI*'; el.style.background = on ? 'var(--fol)' : '';
      T.toast(on ? 'Ahora seguís a Luna Ferrari*' : 'Dejaste de seguir'); return;
    }
    _follow(el, e);
  };

  T.route('/notificacion', 'notif');
  T.route('/concurso', 'concurso');
  T.route('/concurso/presentar', 'presentar');
  T.route('/concurso/enviado', 'enviado');
  T.route('/concurso/ganaste', 'ganaste');
  T.route('/concurso/en-vivo', 'envivoW');
})();
