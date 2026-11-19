/* ───────────────────────────────────────────────────────────
   El Timbre · núcleo: estado, eventos, reproductor, router, helpers
   Scripts clásicos (sin módulos) para que la demo abra con doble click.
   ─────────────────────────────────────────────────────────── */
(function () {
  const T = (window.T = { screens: {}, routes: [], acts: {}, D: {} });

  /* ── utilidades ─────────────────────────────────────────── */
  T.$ = (s, el = document) => el.querySelector(s);
  T.$$ = (s, el = document) => [...el.querySelectorAll(s)];
  T.fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  T.sec = (mmss) => { const [m, s] = String(mmss).split(':').map(Number); return m * 60 + s; };
  T.mmss = (s) => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  T.esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  T.img = (f) => 'images/' + encodeURI(f);
  T.ico = (name, cls = '') => {
    const i = window.ICONS[name];
    if (!i) return '';
    return `<svg class="ico ${cls}" viewBox="${i.vb}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${i.d}</svg>`;
  };
  T.stagger = (arr, fn) => arr.map((x, i) => fn(x, i)).join('');

  /* ── eventos ────────────────────────────────────────────── */
  const handlers = {};
  T.on = (evt, fn) => { (handlers[evt] ||= new Set()).add(fn); return () => handlers[evt].delete(fn); };
  T.emit = (evt, data) => handlers[evt] && handlers[evt].forEach((f) => f(data));

  /* ── estado persistente ─────────────────────────────────── */
  const KEY = 'eltimbre.demo.v1';
  const defaults = () => ({
    onboarded: false,
    picked: ['reg', 'cum', 'rock'],
    know: { reg: 'know', cum: 'learn', rock: 'know', fol: 'know' },
    bell: true,
    theme: 'night',
    follows: { 'artist:delio': 0 },
    likes: { 'adios-amor': 1, 'bombon-asesino': 1, 'el-liston': 1 },
    going: { pancho: 1, ronda: 1, sonidero: 1 },
    festTickets: false,
    concurso: { status: 'none', title: 'Cuarto Propio', house: 'fol', votes: 0 },
    inscripcion: { status: 'none', nombre: '', ciudad: '', house: 'rock', demo: false, redes: '', derecho: false },
    player: { id: 'adios-amor', queue: ['adios-amor', 'bombon-asesino', 'se-te-ve-la-tanga', 'el-bombon-asesino', 'el-liston', 'corazon-mentiroso', 'como-te-voy'], idx: 0, pos: 84, playing: true, ctx: { name: 'Cumbia para la ronda', route: '/playlist/cumbia-ronda' }, shuffle: false, repeat: false },
    notices: [],
    seenNotices: 0,
  });
  let S;
  try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = defaults(); }
  T.S = S;
  T.save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  T.reset = () => { try { localStorage.removeItem(KEY); } catch (e) {} location.hash = '#/'; location.reload(); };

  /* ── reproductor simulado ───────────────────────────────── */
  const P = (T.player = {});
  P.cur = () => T.D.tracks[S.player.id];
  P.dur = () => T.sec(P.cur().dur);
  P.play = (id, queue, ctx) => {
    const p = S.player;
    if (queue) { p.queue = queue.slice(); p.idx = Math.max(0, p.queue.indexOf(id)); }
    else if (p.queue.indexOf(id) < 0) { p.queue = [id]; p.idx = 0; }
    else p.idx = p.queue.indexOf(id);
    if (ctx) p.ctx = ctx;
    p.id = id; p.pos = 0; p.playing = true;
    T.save(); T.emit('player:track'); T.emit('player');
  };
  P.toggle = () => { S.player.playing = !S.player.playing; T.save(); T.emit('player'); };
  P.next = (auto) => {
    const p = S.player;
    if (p.repeat && auto) { p.pos = 0; T.emit('player'); return; }
    let i = p.shuffle ? Math.floor(Math.random() * p.queue.length) : p.idx + 1;
    if (i >= p.queue.length) i = 0;
    p.idx = i; p.id = p.queue[i]; p.pos = 0; p.playing = true;
    T.save(); T.emit('player:track'); T.emit('player');
  };
  P.prev = () => {
    const p = S.player;
    if (p.pos > 3) { p.pos = 0; T.emit('player'); return; }
    p.idx = (p.idx - 1 + p.queue.length) % p.queue.length; p.id = p.queue[p.idx]; p.pos = 0; p.playing = true;
    T.save(); T.emit('player:track'); T.emit('player');
  };
  P.seek = (ratio) => { S.player.pos = Math.max(0, Math.min(1, ratio)) * P.dur(); T.emit('player'); };
  P.shuffle = () => { S.player.shuffle = !S.player.shuffle; T.save(); T.emit('player'); };
  P.repeat = () => { S.player.repeat = !S.player.repeat; T.save(); T.emit('player'); };
  setInterval(() => {
    const p = S.player;
    if (!p.playing || !T.D.tracks) return;
    p.pos += 0.25;
    if (p.pos >= P.dur()) P.next(true);
    else T.emit('tick');
  }, 250);
  let saveT = 0; T.on('tick', () => { if (++saveT % 20 === 0) T.save(); });

  /* ── toast y hojas ──────────────────────────────────────── */
  let toastEl, toastT;
  T.toast = (msg, dot = true) => {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; T.phone.appendChild(toastEl); }
    toastEl.innerHTML = (dot ? '<i class="dot"></i>' : '') + T.esc(msg);
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 2200);
  };
  T.sheet = (html, onMount) => {
    T.closeSheet(true);
    const w = document.createElement('div');
    w.className = 'sheet-wrap'; w.id = 'sheet';
    w.innerHTML = `<div class="sheet-bg" data-act="closeSheet"></div><div class="sheet" role="dialog"><div class="grab"></div>${html}</div>`;
    T.phone.appendChild(w);
    requestAnimationFrame(() => requestAnimationFrame(() => w.classList.add('open')));
    onMount && onMount(w);
  };
  T.closeSheet = (now) => {
    const w = T.$('#sheet'); if (!w) return;
    w.id = ''; w.classList.remove('open');
    setTimeout(() => w.remove(), now ? 0 : 420);
  };
  T.acts.closeSheet = () => T.closeSheet();

  /* ── router ─────────────────────────────────────────────── */
  let idx = 0, current = null, curPath = null;
  const TAB_PATHS = { home: '/inicio', playlists: '/playlists', live: '/radio', fest: '/festival', vos: '/vos' };
  T.route = (pattern, screenName) => T.routes.push({ re: new RegExp('^' + pattern.replace(/:(\w+)/g, '([^/]+)') + '$'), keys: [...pattern.matchAll(/:(\w+)/g)].map((m) => m[1]), screen: screenName });
  T.path = () => curPath;
  T.go = (path, opts = {}) => {
    if (path === curPath && !opts.force) return;
    if (opts.tab || opts.replace) history.replaceState({ i: idx }, '', '#' + path);
    else { idx += 1; history.pushState({ i: idx }, '', '#' + path); }
    render(path, opts.dir || (opts.tab ? 'fade' : opts.modal ? 'rise' : 'push'));
  };
  T.back = (fallback = '/inicio') => {
    if (idx > 0) history.back();
    else { history.replaceState({ i: 0 }, '', '#' + fallback); render(fallback, 'back'); }
  };
  window.addEventListener('popstate', (e) => {
    const ni = (e.state && e.state.i) || 0;
    const dir = ni < idx ? 'back' : 'push';
    idx = ni;
    render(location.hash.slice(1) || '/', dir);
  });

  function match(path) {
    for (const r of T.routes) {
      const m = path.match(r.re);
      if (m) { const params = {}; r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1]))); return { def: T.screens[r.screen], params, name: r.screen }; }
    }
    return null;
  }

  function render(path, dir) {
    const m = match(path) || match('/inicio');
    const view = T.$('#view');
    // si el usuario todavía no hizo el registro, mantenemos el flujo
    const def = m.def;
    const el = document.createElement('div');
    el.className = 'screen in-' + dir;
    el.dataset.screen = m.name;
    el.innerHTML = def.html(m.params, T.S);
    const old = current;
    if (old) {
      if (old.off) old.off.forEach((f) => f());
      const out = { push: 'out-push', back: 'out-back', fade: 'out-fade', rise: 'out-fade', down: 'out-down' }[dir] || 'out-fade';
      old.el.classList.add('out', out);
      const dead = old.el; setTimeout(() => dead.remove(), 260);
    }
    view.appendChild(el);
    curPath = path;
    current = { el, name: m.name, def, off: [] };
    el._on = (evt, fn) => current.off.push(T.on(evt, fn));
    el._off = (fn) => current.off.push(fn); // limpieza al salir de la pantalla
    T.chrome(def, m.params);
    def.mount && def.mount(el, m.params, T.S);
    T.$('.scroll', el) && (T.$('.scroll', el).scrollTop = 0);
    T.emit('route', { path, name: m.name });
  }
  T.current = () => current;
  T.rerender = () => { const sc = T.$('.scroll', current.el); const top = sc ? sc.scrollTop : 0; render(curPath, 'fade'); const n = T.$('.scroll', current.el); if (n) n.scrollTop = top; };
  T.render = render;

  /* ── chrome (status bar, tab bar, mini) ─────────────────── */
  T.chrome = (def) => {
    const tb = T.$('#tabbar'), mini = T.$('#mini');
    tb.classList.toggle('hide', !def.tabs);
    T.$$('.tab', tb).forEach((b) => b.classList.toggle('on', b.dataset.tab === def.tabs));
    mini.classList.toggle('hide', !def.mini);
    T.phone.dataset.theme = def.theme || T.S.theme;
    T.phone.classList.toggle('lock', !!def.lock);
    T.$('#sb').style.display = def.nosb ? 'none' : '';
  };
  T.updateMini = () => {
    const mini = T.$('#mini'); if (!mini) return;
    const t = P.cur(), p = S.player;
    mini.className = mini.className.replace(/\bh-\w+/g, '').trim() + ' h-' + t.house;
    T.$('.mini-thumb', mini).src = T.img(t.img || T.D.coverOf(t));
    T.$('.mini-t', mini).textContent = t.title;
    T.$('.mini-s', mini).textContent = t.artist;
    T.$('.mb-play', mini).innerHTML = T.ico(p.playing ? 'pause' : 'play');
    T.$('.mb-next', mini).innerHTML = T.ico('next');
    T.$('.prog i', mini).style.width = (p.pos / P.dur()) * 100 + '%';
    T.$('.prog i', mini).style.background = 'var(--ac)';
  };
  T.on('player', T.updateMini);
  T.on('tick', () => { const i = T.$('#mini .prog i'); if (i) i.style.width = (S.player.pos / P.dur()) * 100 + '%'; });

  /* ── delegación de eventos ──────────────────────────────── */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-act],[data-go],[data-back],[data-tab]');
    if (!t) return;
    if (t.dataset.act) { const f = T.acts[t.dataset.act]; if (f) { e.preventDefault(); f(t, e); } return; }
    if (t.dataset.tab) { T.go(TAB_PATHS[t.dataset.tab], { tab: true }); return; }
    if (t.dataset.back !== undefined) { T.back(t.dataset.back || '/inicio'); return; }
    if (t.dataset.go) { T.go(t.dataset.go, { modal: t.dataset.modal !== undefined, replace: t.dataset.replace !== undefined, dir: t.dataset.replace !== undefined ? 'fade' : undefined }); }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="button"][tabindex]')) { e.preventDefault(); e.target.click(); }
    if (e.key === 'Escape') T.closeSheet();
  });

  /* ── escalado del teléfono en pantallas chicas ──────────── */
  T.fit = () => {
    const small = window.innerWidth <= 520;
    const s = small ? Math.min(window.innerWidth / 390, window.innerHeight / 844) : Math.min(1, (window.innerHeight - 56) / 844);
    document.documentElement.style.setProperty('--s', s.toFixed(4));
  };
  window.addEventListener('resize', T.fit);
})();
