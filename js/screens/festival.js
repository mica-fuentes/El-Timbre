/* 20 · Festival · 21 · Lineup · 22 · Lineup Nuevas voces · 23 · El predio · 24 · Peñas · 25 · Descubrí peñas */
(function () {
  const T = window.T, D = T.D, U = T.ui, S = T.S;
  const HOUSES = ['reg', 'cum', 'fol', 'rock'];

  /* cuenta regresiva (arranca en 16 d 07 h 42 min la primera vez y sigue sola) */
  if (!S.festTarget) { S.festTarget = Date.now() + ((16 * 24 + 7) * 60 + 42) * 60000; T.save(); }
  const left = () => { let m = Math.max(0, Math.floor((S.festTarget - Date.now()) / 60000)); return [Math.floor(m / 1440), Math.floor((m % 1440) / 60), m % 60].map((n) => String(n).padStart(2, '0')); };

  /* ── 20 · Festival ────────────────────────────────────────── */
  const rowIcon = (ic, cls) => `<span class="fs-ic ${cls}">${T.ico(ic)}</span>`;
  T.screens.festival = {
    tabs: 'fest', mini: true,
    html: () => {
      const [d, h, m] = left();
      return `
      ${U.bar({ title: 'Festival', back: false, l20: true, acts: [{ ico: 'share', act: 'share' }] })}
      <div class="scroll pad-tabs"><div class="fs-page">
        <article class="fs-card rise" style="--i:0">
          <i class="fs-rhomb"></i><span class="fs-lbl">FESTIVAL DE LAS CUATRO ESQUINAS</span>
          <img class="fs-logo" src="${T.img('logo-color.png')}" alt="La Cuadra">
          <h1 class="fs-date">17, 18 y 19<br>de octubre</h1>
          <i class="fs-line"></i>
          <div class="fs-bars">${[['reg', 'REGUETÓN', 79.2], ['cum', 'CUMBIA', 66.9], ['fol', 'FOLCLORE', 79.2], ['rock', 'ROCK', 54.7]].map(([k, l, w]) => `<span class="h-${k}" style="width:${w}px"><i></i><em>${l}</em></span>`).join('')}</div>
          <button class="btn btn-primary fs-buy" data-act="buyTicket">${S.festTickets ? 'Tu entrada' : 'Sacar entrada'}</button>
          <p class="fs-where">CLUB LA ESQUINA<br>ENTRADA A LA GORRA</p>
        </article>
        <div class="fs-count card rise" style="--i:1" id="fs-count"><div><b>${d}</b><small>DÍAS</small></div><div><b>${h}</b><small>HORAS</small></div><div><b>${m}</b><small>MIN</small></div></div>
        <h2 class="t-h2 fs-h">Todo el festival</h2>
        <button class="fs-row" data-go="/festival/lineup">${rowIcon('star', 'ic-cum')}<span><b>Lineup de las tres noches</b><small>SALE DE LO MÁS ESCUCHADO EN LA CUADRA</small></span>${T.ico('chev-r')}</button>
        <button class="fs-row" data-go="/festival/predio">${rowIcon('pin', 'ic-reg')}<span><b>El predio</b><small>CUATRO ESCENARIOS, UNO POR CASA</small></span>${T.ico('chev-r')}</button>
        <button class="fs-row" data-act="buyTicket">${rowIcon('ticket', 'ic-fol')}<span><b>Entradas y abonos</b><small>A LA GORRA · ABONO DE TRES NOCHES</small></span>${T.ico('chev-r')}</button>
        <button class="fs-row" data-go="/penas">${rowIcon('calendar', 'ic-rock')}<span><b>Tu agenda del festival</b><small>4 ARTISTAS GUARDADOS</small></span>${T.ico('chev-r')}</button>
        <div class="fs-sh"><h2 class="t-h2">Se van a escuchar</h2><button class="t-dato" data-go="/festival/lineup">VER LINEUP</button></div>
        <div class="fs-arts">${[['milo', 'MILO J', 'art-milo.jpg'], ['sole', 'LA SOLE', 'art-sole.jpg'], ['joaqui', 'LA JOAQUI', 'cov-reg.jpg'], ['airbag', 'AIRBAG', 'cov-roc.jpg']].map(([id, n, im]) => `<button class="fs-art lift press" data-go="/artista/${id}"><span class="zoomwrap"><img src="${T.img(im)}" alt=""></span><em>${n}</em></button>`).join('')}</div>
      </div></div>`;
    },
    mount: (el) => {
      const iv = setInterval(() => { const c = T.$('#fs-count', el); if (!c) return; const v = left(); T.$$('b', c).forEach((b, i) => (b.textContent = v[i])); }, 15000);
      el._off(() => clearInterval(iv));
    },
  };
  T.acts.buyTicket = () => {
    if (S.festTickets) { T.sheet(`<h3>Tu entrada</h3><p class="t-micro" style="margin-bottom:12px">ABONO DE TRES NOCHES</p><div class="tk-card"><b>Festival de las cuatro esquinas</b><small>17, 18 Y 19 DE OCTUBRE · CLUB LA ESQUINA</small><i class="tk-qr"></i></div><button class="btn btn-line btn-wide" style="margin-top:16px" data-act="closeSheet">Cerrar</button>`); return; }
    T.sheet(`<h3>Entradas y abonos</h3><p class="t-micro" style="margin-bottom:8px">FESTIVAL DE LAS CUATRO ESQUINAS</p>
      <button class="sheet-row" data-act="getTicket" data-n="Abono de tres noches">${T.ico('ticket')}<span><b>Abono de tres noches</b><small>A LA GORRA · VIE 17, SÁB 18 Y DOM 19</small></span></button>
      <button class="sheet-row" data-act="getTicket" data-n="Entrada del viernes 17">${T.ico('ticket')}<span><b>Viernes 17 · Reguetón y folclore</b><small>A LA GORRA · ESCENARIOS 1 Y 3</small></span></button>
      <button class="sheet-row" data-act="getTicket" data-n="Entrada del sábado 18">${T.ico('ticket')}<span><b>Sábado 18 · Cumbia y rock</b><small>A LA GORRA · ESCENARIOS 2 Y 4</small></span></button>`);
  };
  T.acts.getTicket = (el) => { S.festTickets = true; T.save(); T.closeSheet(); T.toast('¡Listo! ' + el.dataset.n + ' está en Vos'); const b = T.$('.fs-buy'); if (b) b.textContent = 'Tu entrada'; };

  /* ── 21 · Lineup ──────────────────────────────────────────── */
  D.lineupHouse = {
    reg: [{ dia: 'VIERNES 17', esc: 'ESCENARIO 1', house: 'reg', list: D.lineup[0].list }],
    cum: [{ dia: 'SÁBADO 18', esc: 'ESCENARIO 2', house: 'cum', list: D.lineup[1].list }],
    fol: [{ dia: 'DOMINGO 19', esc: 'ESCENARIO 3', house: 'fol', list: [['Milo J', 100, 'milo'], ['Soledad Pastorutti', 86, 'sole'], ['Nabalé', 61, 'nabale']] }],
    rock: [{ dia: 'SÁBADO 18', esc: 'ESCENARIO 4', house: 'rock', list: [['Airbag', 79, 'airbag'], ['Bandalos Chinos', 66, 'bandalos'], ['Las Ligas Menores', 54, 'ligas']] }],
  };
  const lineSec = (s) => `<section class="lu-sec h-${s.house}">
    <header><i class="lu-d"></i><b>${s.dia}</b><hr><small>${s.esc}</small></header>
    ${s.list.map(([n, p, id], i) => `<div class="lu-it ${i === 0 ? 'top' : ''} ${id ? 'hit' : ''}" ${id ? `data-go="/artista/${id}" role="button" tabindex="0"` : ''}><span>${n}</span><em>${p}%</em><i class="lu-bar"><b style="--w:${p}%"></b></i></div>`).join('')}</section>`;
  const luChips = (cur) => `<div class="chips lu-chips" id="lu-chips">${[['all', 'LAS TRES NOCHES'], ['reg', 'REGUETÓN'], ['cum', 'CUMBIA'], ['fol', 'FOLCLORE'], ['rock', 'ROCK'], ['nv', 'NUEVAS VOCES']].map(([k, l]) => `<button class="chip ${k === cur ? 'on' : ''}" data-act="luChip" data-k="${k}">${l}</button>`).join('')}</div>`;
  T.screens.lineup = {
    tabs: 'fest', mini: false,
    html: () => `
      ${U.bar({ title: 'Lineup', backTo: '/festival', acts: [{ ico: 'share', act: 'share' }] })}
      <div class="scroll pad-tabs-only"><div class="lu-page">
        ${luChips('all')}
        <article class="lu-info card"><span>${T.ico('wave')}</span><div><b>El lineup lo armaste vos</b><p>El porcentaje es cuánto se escuchó cada artista en la cuadra durante el año. Los diez primeros de cada casa entran solos.</p></div></article>
        <div id="lu-body">${D.lineup.map(lineSec).join('')}</div>
      </div></div>`,
  };
  T.acts.luChip = (b) => {
    const k = b.dataset.k;
    if (k === 'nv') { T.go('/festival/nuevas-voces', { replace: true, dir: 'fade' }); return; }
    T.$$('#lu-chips .chip').forEach((c) => c.classList.toggle('on', c === b));
    const body = T.$('#lu-body');
    body.innerHTML = (k === 'all' ? D.lineup : D.lineupHouse[k]).map(lineSec).join('');
    body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap');
  };

  /* ── 22 · Lineup · Nuevas voces ───────────────────────────── */
  T.screens.lineupNv = {
    tabs: 'fest', mini: false,
    html: () => `
      ${U.bar({ title: 'Lineup', backTo: '/festival', acts: [{ ico: 'share', act: 'share' }] })}
      <div class="scroll pad-tabs-only"><div class="lu-page">
        <div class="chips lu-chips"><button class="chip on">NUEVAS VOCES</button><button class="chip" data-act="nvBack">LAS TRES NOCHES</button></div>
        <article class="lu-info card lu-arr"><div><b>Arrancan ellas</b><p>Cada escenario abre la noche con una nueva voz de su casa, una hora antes de la primera banda.</p></div></article>
        <div class="ln-list">${D.lineupNuevas.map((n, i) => `<article class="ln-card card lift h-${n.house} rise" style="--i:${i}" data-go="/artista/${n.id}" role="button" tabindex="0">
          <span class="ln-k"><i class="hdot"></i>${n.tag}</span><h3>${n.name}</h3><p>${n.cuando}</p>${U.goingBtn('nv-' + n.id, { plus: false, cls: 'ln-b' })}</article>`).join('')}</div>
        <p class="t-micro lu-fn"><i></i> ARTISTA INVENTADO, SOLO PARA ESTE PROYECTO</p>
      </div></div>`,
  };
  D.lineupNuevas.forEach((n) => { D.penas['nv-' + n.id] = { id: 'nv-' + n.id, name: n.name, house: n.house, day: '', h: '', where: '', price: '', going: 0 }; });
  T.acts.nvBack = () => T.go('/festival/lineup', { replace: true, dir: 'fade' });

  /* ── 23 · El predio ───────────────────────────────────────── */
  const ESC = [['reg', 'E1', 'Escenario reguetón', 'VIERNES 17 · DESDE LAS 23 H'], ['cum', 'E2', 'Escenario cumbia', 'SÁBADO 18 · DESDE LAS 22 H'], ['fol', 'E3', 'Escenario folclore', 'VIERNES 17 · DESDE LAS 22 H'], ['rock', 'E4', 'Escenario rock', 'SÁBADO 18 · DESDE LAS 00 H']];
  T.screens.predio = {
    tabs: 'fest', mini: false,
    html: () => `
      <header class="bar solid"><button class="back" data-back="/festival" aria-label="Volver">${T.ico('back')}</button><div class="ttl-s"><span class="t-micro">FESTIVAL · CLUB LA ESQUINA</span><span class="t-h3">El predio</span></div><button class="act" style="right:10px" data-act="soon" data-msg="Mapa guardado para usar sin conexión" aria-label="Descargar">${T.ico('download')}</button></header>
      <div class="scroll pad-tabs-only"><div class="pd-page">
        <div class="pd-map">
          <i class="pd-h"></i><i class="pd-v"></i>
          ${[['reg', 75.8, 150, 68.4, 97, 'casa-regueton-hd.png', 95, 258], ['cum', 225.2, 123, 88.5, 130, 'casa-cumbia-hd.png', 275, 261], ['fol', 71, 340, 89, 107, 'casa-folclore.png', 95, 451], ['rock', 245, 341, 85, 110, 'casa-rock.png', 272, 457]].map(([h, x, y, w, ht, im, tx, ty], i) => `
            <button class="pd-house h-${h}" data-go="/casa/${h}" style="left:${x - 20}px;top:${y - 96}px;width:${w}px;height:${ht}px;--i:${i}" aria-label="${D.houses[h].name}"><img src="${T.img(im)}" alt=""></button>
            <span class="pd-e h-${h}" style="left:${tx - 20}px;top:${ty - 96}px">E${i + 1}</span>`).join('')}
          <span class="pd-l" style="left:140px;top:24px"><i></i>BARRA</span><span class="pd-l" style="left:36px;top:206px"><i></i>BAÑOS</span><span class="pd-l" style="left:248px;top:206px"><i></i>FERIA</span><span class="pd-l" style="left:140px;top:366px"><i></i>ENTRADA</span>
        </div>
        <p class="pd-p">Las casas hacen de señalética: buscá la casa, encontrás el escenario.</p>
        <h2 class="t-h2 pd-h" style="margin-top:24px">Los cuatro escenarios</h2>
        ${ESC.map(([h, e, n, c]) => `<button class="pd-row h-${h}" data-go="/casa/${h}"><i>${e}</i><span><b>${n}</b><small>${c}</small></span>${T.ico('chev-r')}</button>`).join('')}
        <h2 class="t-h2 pd-h" style="margin-top:28px">Servicios</h2>
        <div class="pd-row nb"><i class="pd-s">•</i><span><b>Entrada y guardarropa</b><small>SOBRE LA CALLE PRINCIPAL</small></span></div>
        <div class="pd-row nb"><i class="pd-s">•</i><span><b>Feria de discos</b><small>ENTRE LOS ESCENARIOS 2 Y 4</small></span></div>
      </div></div>`,
  };

  /* ── 24 · Peñas de octubre ────────────────────────────────── */
  const DAYS = [['jueves', 'JUEVES 1 DE OCTUBRE', [['pancho', 'a'], ['perreo', 'b']]], ['viernes', 'VIERNES 2', [['ronda', 'c'], ['porteña', 'd']]], ['sábado', 'SÁBADO 3', [['guitarreada', 'e'], ['sonidero', 'f']]]];
  const penaRow = (id) => { const p = D.penas[id]; return `<div class="pn-row h-${p.house}" data-id="${id}"><span class="t-dato pn-h">${p.h}</span><div class="pn-m"><b>${p.name}</b><small>${p.where} · ${p.price}</small></div>${U.goingBtn(id, { cls: 'pn-g' })}</div>`; };
  const pnBody = (f) => {
    let out = '';
    DAYS.forEach(([k, label, rows]) => {
      const list = rows.map((r) => r[0]).filter((id) => { const p = D.penas[id]; return f === 'all' || (f === 'going' && S.going[id]) || (f === 'near' && ['pancho', 'ronda', 'guitarreada', 'perreo'].includes(id)) || (f === 'gorra' && p.price === 'A LA GORRA') || (f === 'fol' && p.house === 'fol'); });
      if (list.length) out += `<section class="pn-sec" id="pn-${k}"><h3 class="t-dato">${label}<hr></h3>${list.map(penaRow).join('')}</section>`;
    });
    return out || `<div class="empty" style="margin:20px"><span>${T.ico('empty-bell')}</span><b>No hay peñas con ese filtro</b><p>Probá con otro o mirá todas las del mes.</p></div>`;
  };
  T.screens.penas = {
    tabs: 'live', mini: true,
    html: () => {
      const n = Object.values(S.going).filter(Boolean).length;
      return `
      ${U.bar({ title: 'Peñas de octubre', backTo: '/festival', acts: [{ ico: 'filter', act: 'soon', data: 'data-msg="Más filtros en la versión final"' }, { ico: 'pin', go: '/penas/descubrir' }] })}
      <div class="scroll pad-tabs"><div class="pn-page">
        <div class="chips" id="pn-chips">${[['all', 'TODAS'], ['going', 'ANOTADO'], ['near', 'CERCA'], ['gorra', 'A LA GORRA'], ['fol', 'FOLCLORE']].map(([k, l], i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-act="pnChip" data-k="${k}">${l}</button>`).join('')}</div>
        <button class="pn-sum card lift press" data-act="pnSum"><i>${T.ico('calendar')}</i><span><b id="pn-n">Vas a ${n} peña${n === 1 ? '' : 's'} este mes</b><small>LA PRÓXIMA ES EL VIERNES 2</small></span>${T.ico('chev-r')}</button>
        <div class="pn-days" id="pn-days">${[['LUN', 28], ['MAR', 29], ['MIÉ', 30], ['JUE', '01'], ['VIE', '02'], ['SÁB', '03'], ['DOM', '04']].map(([d, n], i) => `<button class="pn-d ${d === 'JUE' ? 'on' : ''}" data-act="pnDay" data-d="${d}"><small>${d}</small><b>${n}</b></button>`).join('')}</div>
        <div id="pn-body">${pnBody('all')}</div>
        <div class="pn-org"><h2 class="t-h2">¿Organizás una peña?</h2><p>Publicala en la cuadra y aparece acá, gratis.</p><button class="btn btn-line" data-act="soon" data-msg="Publicar peñas llega en la versión final">Publicar una peña</button></div>
      </div></div>`;
    },
    mount: (el) => {
      el._on('going', () => { const n = Object.values(S.going).filter(Boolean).length; const t = T.$('#pn-n', el); if (t) t.textContent = `Vas a ${n} peña${n === 1 ? '' : 's'} este mes`; });
    },
  };
  T.acts.pnChip = (b) => { T.$$('#pn-chips .chip').forEach((c) => c.classList.toggle('on', c === b)); const bd = T.$('#pn-body'); bd.innerHTML = pnBody(b.dataset.k); bd.classList.remove('swap'); void bd.offsetWidth; bd.classList.add('swap'); };
  T.acts.pnDay = (b) => {
    T.$$('#pn-days .pn-d').forEach((c) => c.classList.toggle('on', c === b));
    const k = { JUE: 'jueves', VIE: 'viernes', SÁB: 'sábado' }[b.dataset.d], t = k && T.$('#pn-' + k);
    if (t) T.$('.scroll').scrollTo({ top: t.offsetTop - 110, behavior: 'smooth' }); else T.toast('No hay peñas cargadas ese día');
  };
  T.acts.pnSum = () => T.go('/vos/lo-tuyo');

  /* ── 25 · Descubrí peñas ──────────────────────────────────── */
  T.screens.descubrir = {
    tabs: 'live', mini: false,
    html: () => `
      ${U.bar({ title: 'Descubrí peñas', backTo: '/penas', acts: [{ ico: 'filter', act: 'soon', data: 'data-msg="Más filtros en la versión final"' }, { ico: 'pin', act: 'soon', data: 'data-msg="Ubicación activada · demo"' }] })}
      <div class="scroll pad-tabs"><div class="dp-page">
        <article class="dp-hero h-fol rise">
          <span class="dp-pill">ESTA NOCHE · 22 H</span>
          <h1>Peña de Pancho Guevara</h1><p>TALCAHUANO 949 · TRIBUNALES · A LA GORRA</p>
          <span class="dp-av"><i style="background:var(--cum)"></i><i style="background:var(--reg)"></i><i style="background:var(--rock)"></i></span><em>+84 VAN</em>
          <button class="btn btn-dark dp-voy" data-act="going" data-id="pancho" data-plus="0">${S.going.pancho ? 'VOY ✓' : 'VOY'}</button>
        </article>
        <h2 class="t-h2 dp-h">Por casa</h2>
        <div class="dp-houses">${[['reg', 4], ['cum', 7], ['fol', 9], ['rock', 3]].map(([h, n]) => `<button class="dp-hc ${D.houses[h].cls} lift press" data-act="dpHouse" data-h="${h}"><small>${D.houses[h].big}</small><b>${n}</b><em>PEÑAS</em></button>`).join('')}</div>
        <div class="dp-near"><h2 class="t-h2">Cerca tuyo</h2><small>A MENOS DE 3 KM</small></div>
        <div class="dp-map"><i class="dp-g1"></i><i class="dp-g2"></i>
          <b class="dp-pt" style="left:62px;top:27px;--c:var(--cum)"></b><b class="dp-pt" style="left:218px;top:36px;--c:var(--fol)"></b><b class="dp-pt big" style="left:186px;top:60px;--c:var(--fol)"></b><b class="dp-pt" style="left:318px;top:50px;--c:var(--cum)"></b><b class="dp-pt" style="left:134px;top:94px;--c:var(--reg)"></b><b class="dp-pt" style="left:272px;top:98px;--c:var(--rock)"></b>
          <button class="pill dp-ver" data-act="soon" data-msg="El mapa completo llega en la versión final">VER MAPA</button></div>
        <article class="dp-arma lift press" data-act="soon" data-msg="Armá tu peña llega en la versión final"><div><h2>Armá tu peña</h2><p>Invitá a la cuadra y sumá artistas de Nuevas voces.</p></div><i>${T.ico('arrow-r')}</i></article>
      </div></div>`,
  };
  T.acts.dpHouse = (el) => { T.go('/penas'); setTimeout(() => { const c = T.$$('#pn-chips .chip').find((x) => x.dataset.k === (el.dataset.h === 'fol' ? 'fol' : 'all')); c && c.click(); }, 380); };

  T.route('/festival', 'festival');
  T.route('/festival/lineup', 'lineup');
  T.route('/festival/nuevas-voces', 'lineupNv');
  T.route('/festival/predio', 'predio');
  T.route('/penas', 'penas');
  T.route('/penas/descubrir', 'descubrir');
})();
