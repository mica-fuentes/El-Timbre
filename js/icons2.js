/* Íconos complementarios (misma familia: 22 px, trazo 1,65, puntas redondas) */
(function () {
  const s = 'stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"';
  const add = (n, d) => (window.ICONS[n] = { vb: '0 0 22 22', w: 22, h: 22, d });
  add('more', `<circle cx="4.5" cy="11" r="1.3" fill="currentColor"/><circle cx="11" cy="11" r="1.3" fill="currentColor"/><circle cx="17.5" cy="11" r="1.3" fill="currentColor"/>`);
  add('filter', `<path d="M3.5 6h15M6.5 11h9M9.5 16h3" ${s}/>`);
  add('chev-r', `<path d="M8.5 4.5L15 11l-6.5 6.5" ${s}/>`);
  add('chev-d', `<path d="M4.5 8.5L11 15l6.5-6.5" ${s}/>`);
  add('clock', `<circle cx="11" cy="11" r="8" ${s}/><path d="M11 6.5V11l3 2" ${s}/>`);
  add('arrow-r', `<path d="M3.5 11h15M12.5 5l6 6-6 6" ${s}/>`);
  add('lock', `<rect x="4.5" y="9.5" width="13" height="9" rx="2" ${s}/><path d="M7.5 9.5V7a3.5 3.5 0 017 0v2.5" ${s}/>`);
  add('map', `<path d="M3.5 5.5l5-2 5 2 5-2v13l-5 2-5-2-5 2v-13zM8.5 3.5v13M13.5 5.5v13" ${s}/>`);
  add('check-s', `<path d="M4.5 11.5l4.2 4.2L17.5 6.5" ${s}/>`);
  add('upload', `<path d="M11 15V4.5M6.5 9L11 4.5 15.5 9M4 17.5h14" ${s}/>`);
  add('x-s', `<path d="M5.5 5.5l11 11M16.5 5.5l-11 11" ${s}/>`);
})();
