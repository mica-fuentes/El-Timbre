/* 01 · Arranque · 02 · Elegí tus casas · 03 · ¿Cuánto las conocés? */
(function () {
  const T = window.T, D = T.D, U = T.ui, S = T.S;

  /* ── 01 · Arranque ────────────────────────────────────────── */
  T.screens.splash = {
    nosb: false,
    html: () => `
      <div class="splash" data-go-onb>
        <div class="sp-trama"></div>
        <div class="sp-caja"></div>
        <img class="sp-aura" src="assets/ui/aura.svg" alt="">
        <img class="sp-velo" src="assets/ui/velo.svg" alt="">
        <i class="sp-line" style="top:45px"></i>
        <i class="sp-line" style="top:775.5px"></i>
        ${U.bunting(17, 'down', 40)}
        ${U.bunting(17, 'up', 761)}
        <div class="sp-logo" aria-label="El Timbre">
          <p class="sp-el"><span style="--i:0">E</span><span style="--i:1">L</span></p>
          <p class="sp-timbre">
            <span style="--i:2;color:#dc4a84">T</span><span style="--i:3;color:#e3922a">I</span><span style="--i:4;color:#2e8b72">M</span><span style="--i:5;color:#59c2c9">B</span><span style="--i:6;color:#dc4a84">R</span><span style="--i:7;color:#e3922a">E</span>
          </p>
        </div>
        <p class="sp-foot">REGUETÓN · CUMBIA · FOLCLORE · ROCK</p>
        <p class="sp-hint">TOCÁ PARA ENTRAR</p>
      </div>`,
    mount: (el) => {
      const go = () => {
        clearTimeout(timer);
        sessionStorage.setItem('timbre.splash', '1');
        T.go(S.onboarded ? '/inicio' : '/registro/casas', { replace: true, dir: 'fade' });
      };
      const timer = setTimeout(go, 3200);
      el.addEventListener('click', go, { once: true });
      el._off(() => clearTimeout(timer));
    },
  };

  /* ── 02 · Elegí tus casas ─────────────────────────────────── */
  const tile = (h, x, y) => {
    const H = D.houses[h], on = S.picked.includes(h);
    return `<button class="pick ${H.cls} ${on ? 'on' : ''}" data-act="pick" data-h="${h}" style="left:${x}px;top:${y}px" aria-pressed="${on}" aria-label="${H.name}">
      <img src="${T.img(H.cover)}" alt="">
      <i class="pick-veil"></i>
      <i class="pick-badge">${T.ico('check')}</i>
      <b class="pick-name">${H.big}</b>
      <i class="pick-bar"></i>
    </button>`;
  };
  T.screens.onb1 = {
    html: () => `
      ${U.bar({ title: 'Paso 1 de 3', back: true, backTo: '/', acts: [{ ico: 'close', act: 'skipOnb', label: 'Cerrar' }] })}
      <div class="ob">
        <h1 class="t-display ob-h rise" style="--i:0">¿Qué escuchás?</h1>
        <p class="t-small ob-p rise" style="--i:1">Elegí una o las cuatro. Con esto armamos tu cuadra: las playlists que ves primero y lo que te avisamos. Lo podés cambiar cuando quieras.</p>
        <div class="pick-grid rise" style="--i:2">
          ${tile('reg', 20, 228)}${tile('cum', 201, 228)}${tile('fol', 20, 406)}${tile('rock', 201, 406)}
        </div>
        <div class="bell card rise" style="--i:3">
          <i class="bell-i">${T.ico('bell-sm')}</i>
          <div class="bell-t"><b>Avisame de las peñas</b><small>EL DÍA ANTERIOR, UNA SOLA VEZ</small></div>
          <button class="switch ${S.bell ? 'on' : ''}" data-act="toggleBell" role="switch" aria-checked="${S.bell}" aria-label="Avisos de peñas"><i></i></button>
        </div>
        <div class="ob-foot"><span id="ob-dots">${U.steps(0)}</span><span class="t-micro" id="ob-count"></span></div>
      </div>
      <div class="cta-dock"><button class="btn btn-primary" id="ob-cta" data-act="onb1Next">Entrar a la cuadra</button></div>`,
    mount: (el) => {
      const upd = () => {
        const n = S.picked.length;
        T.$('#ob-count', el).textContent = `${n} DE 4 ELEGIDAS`;
        T.$('#ob-cta', el).classList.toggle('is-off', n === 0);
      };
      upd(); el._upd = upd;
    },
  };
  T.acts.pick = (el) => {
    const h = el.dataset.h, i = S.picked.indexOf(h);
    if (i >= 0) S.picked.splice(i, 1); else S.picked.push(h);
    T.save();
    const on = i < 0;
    el.classList.toggle('on', on); el.setAttribute('aria-pressed', on);
    el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    const cur = T.current().el; cur._upd && cur._upd();
  };
  T.acts.toggleBell = (el) => {
    S.bell = !S.bell; T.save();
    el.classList.toggle('on', S.bell); el.setAttribute('aria-checked', S.bell);
    T.toast(S.bell ? 'Te vamos a avisar de las peñas' : 'Sin avisos de peñas');
  };
  T.acts.onb1Next = () => {
    if (!S.picked.length) return;
    T.go('/registro/conocimiento');
  };
  T.acts.skipOnb = () => { if (!S.picked.length) S.picked = ['cum']; S.onboarded = true; T.save(); T.go('/inicio', { replace: true, dir: 'fade' }); };

  /* ── 03 · ¿Cuánto las conocés? ────────────────────────────── */
  const row = (h) => {
    const H = D.houses[h], k = S.know[h] || 'know';
    return `<section class="kcard card ${H.cls}" data-h="${h}">
      <h2 class="kname"><i class="hdot" style="background:var(--ac)"></i>${H.name}</h2>
      <p class="t-micro ksub">${k === 'know' ? 'TE MOSTRAMOS NUEVAS VOCES' : 'EMPEZÁS POR LOS CLÁSICOS'}</p>
      <div class="kpills">
        <button class="kpill ${k === 'know' ? 'on' : ''}" data-act="know" data-h="${h}" data-v="know">LA ESCUCHO</button>
        <button class="kpill ${k === 'learn' ? 'on' : ''}" data-act="know" data-h="${h}" data-v="learn">QUIERO CONOCERLA</button>
      </div>
    </section>`;
  };
  T.screens.onb2 = {
    html: () => {
      const picked = D.houseOrder.filter((h) => S.picked.includes(h));
      return `
      ${U.bar({ title: 'Paso 2 de 3', back: true, backTo: '/registro/casas', acts: [{ ico: 'close', act: 'skipOnb', label: 'Cerrar' }] })}
      <div class="ob ob2" style="--n:${picked.length}">
        <h1 class="t-display ob-h rise" style="--i:0">¿Cuánto las<br>conocés?</h1>
        <p class="t-small ob-p ob-p2 rise" style="--i:1">Si ya la escuchás, te mostramos voces nuevas. Si es nueva para vos, entrás por lo conocido.</p>
        <div class="kstack">${picked.map((h, i) => `<div class="rise" style="--i:${i + 2}">${row(h)}</div>`).join('')}</div>
        <div class="kbox rise" style="--i:6">
          <p class="kbox-k">LA ESCUCHO</p><p>Nuevas voces de la escena desde el arranque, junto a lo que ya conocés.</p>
          <p class="kbox-k" style="margin-top:18px">QUIERO CONOCERLA</p><p>Primero los clásicos, después lo más escuchado y recién ahí las nuevas voces.</p>
        </div>
        <div class="ob-foot"><span>${U.steps(1)}</span><span class="t-micro">${picked.length} CASAS ELEGIDAS</span></div>
      </div>
      <div class="cta-dock"><button class="btn btn-primary" data-act="onb2Next">Seguir</button></div>`;
    },
  };
  T.acts.know = (el) => {
    const h = el.dataset.h; S.know[h] = el.dataset.v; T.save();
    const card = el.closest('.kcard');
    T.$$('.kpill', card).forEach((b) => b.classList.toggle('on', b.dataset.v === el.dataset.v));
    T.$('.ksub', card).textContent = el.dataset.v === 'know' ? 'TE MOSTRAMOS NUEVAS VOCES' : 'EMPEZÁS POR LOS CLÁSICOS';
  };
  T.acts.onb2Next = () => {
    S.onboarded = true; T.save();
    T.go('/inicio', { replace: true, dir: 'fade' });
    setTimeout(() => T.toast('Listo, armamos tu cuadra'), 450);
  };

  T.route('/', 'splash');
  T.route('/registro/casas', 'onb1');
  T.route('/registro/conocimiento', 'onb2');
})();
