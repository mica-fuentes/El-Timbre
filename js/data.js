/* ───────────────────────────────────────────────────────────
   El Timbre · contenido de la demo (sale del Figma)
   * = artista inventado, solo para este proyecto
   ─────────────────────────────────────────────────────────── */
(function () {
  const D = window.T.D;

  /* ── Casas ───────────────────────────────────────────────── */
  D.houses = {
    reg: { id: 'reg', name: 'Reguetón', art: 'del reguetón', cls: 'h-reg', hex: '#59C2C9', lead: 'La esquina que empieza más tarde y no termina nunca.', people: 2107, img: 'casa-regueton-hd.png', cover: 'cov-reg.jpg', tema: 'tema-regueton.jpg', know: 'TE MOSTRAMOS NUEVAS VOCES', learn: 'EMPEZÁS POR LOS CLÁSICOS', big: 'REGUETÓN', escenario: 1,
      top: ['guaya-guaya', 'mafiosa', 'dos-mil-16'], pls: ['nuevos-reg', 'perreo', 'despues-de-las-tres'], arts: [['joaqui', 'LA JOAQUI', 'cov-noche.jpg'], ['trueno', 'TRUENO', 'cov-gente.jpg'], ['nicki', 'NICKI', 'cov-reg.jpg']],
      agenda: [['JUE 08', 'Noche de perreo', 'CLUB LA ESQUINA · 23 H', 'perreo', true], ['SÁB 10', 'Set de las nuevas', 'PATIO DE LA CANCHA · 00 H', 'setnuevas', false]], radio: 'guaya-guaya' },
    cum: { id: 'cum', name: 'Cumbia', art: 'de la cumbia', cls: 'h-cum', hex: '#D62A6E', lead: 'Acordeón, güiro y ronda hasta que cierran.', people: 1284, img: 'casa-cumbia-hd.png', cover: 'cov-cum.jpg', tema: 'tema-cumbia.jpg', know: 'EMPEZÁS POR LOS CLÁSICOS', learn: 'EMPEZÁS POR LOS CLÁSICOS', big: 'CUMBIA', escenario: 2,
      top: ['adios-amor', 'bombon-asesino', 'se-te-ve-la-tanga'], pls: ['nuevos-cum', 'cumbia-ronda', 'santafesina'], arts: [['delio', 'LA DELIO VALDEZ', 'cov-orq2.jpg'], ['marilina', 'MARILINA', 'cov-acorde.jpg'], ['palmeras', 'LOS PALMERAS', 'cov-guiro.jpg']],
      agenda: [['VIE 02', 'Ronda con orquesta', 'PLAZA DEL ÁNGEL · 22 H', 'ronda', true], ['SÁB 10', 'Baile sonidero', 'SALÓN LA ESTRELLA · 23 H', 'sonidero', false]], radio: 'adios-amor' },
    fol: { id: 'fol', name: 'Folclore', art: 'del folclore', cls: 'h-fol', hex: '#E3922A', lead: 'Se aprende a palmear antes que a bailar.', people: 948, img: 'casa-folclore.png', cover: 'cov-fol.jpg', tema: 'tema-folclore.jpg', know: 'TE MOSTRAMOS NUEVAS VOCES', learn: 'EMPEZÁS POR LOS CLÁSICOS', big: 'FOLCLORE', escenario: 3,
      top: ['rara-vez', 'jangadero', 'a-don-ata'], pls: ['nuevos-fol', 'pena-aclare', 'chacareras'], arts: [['milo', 'MILO J', 'art-milo.jpg'], ['sole', 'LA SOLE', 'art-sole.jpg'], ['nabale', 'NABALÉ', 'cov-pena.jpg']],
      agenda: [['JUE 01', 'Peña de los jueves', 'CASA DEL FOLCLORE · 22 H', 'pena-jueves', true], ['SÁB 11', 'Guitarreada abierta', 'EL PATIO · 21 H', 'guitarreada', false]], radio: 'rara-vez' },
    rock: { id: 'rock', name: 'Rock', art: 'del rock', cls: 'h-rock', hex: '#2E8B72', lead: 'La esquina más ruidosa y la que abre la noche.', people: 1560, img: 'casa-rock.png', cover: 'cov-roc.jpg', tema: 'tema-rock.jpg', know: 'TE MOSTRAMOS NUEVAS VOCES', learn: 'EMPEZÁS POR LOS CLÁSICOS', big: 'ROCK', escenario: 4,
      top: ['por-mil-noches', 'sigo-aca', 'el-disfraz'], pls: ['nuevos-rock', 'garage', 'pogo'], arts: [['airbag', 'AIRBAG', 'cov-pogo2.jpg'], ['bandalos', 'BANDALOS', 'cov-guit2.jpg'], ['ligas', 'LIGAS MENORES', 'cov-garage.jpg']],
      agenda: [['MIÉ 07', 'Ciclo de bandas nuevas', 'CLUB LA ESQUINA · 23 H', 'ciclo', true], ['SÁB 18', 'Doble fecha', 'ESCENARIO 04 · 00 H', 'doble', false]], radio: 'por-mil-noches' },
  };
  D.houseOrder = ['reg', 'cum', 'fol', 'rock'];

  /* ── Temas ───────────────────────────────────────────────── */
  const t = (id, title, artist, dur, house, extra) => (D.tracks[id] = Object.assign({ id, title, artist, dur, house }, extra));
  D.tracks = {};
  // reguetón
  t('guaya-guaya', 'Guaya Guaya', 'Don Omar', '2:48', 'reg');
  t('mafiosa', 'Mafiosa', 'Nathy Peluso', '2:58', 'reg');
  t('dos-mil-16', 'Dos Mil 16', 'Trueno', '3:04', 'reg');
  t('mamichula', 'Mamichula', 'Trueno', '3:18', 'reg');
  t('ultima-fila', 'Última Fila', 'La Joaqui', '2:51', 'reg');
  t('sin-frenos', 'Sin Frenos', 'Emilia', '3:05', 'reg');
  t('toda-la-noche', 'Toda la Noche', 'Duki', '3:12', 'reg');
  t('calle-sin-salida', 'Calle Sin Salida', 'Nicki Nicole', '2:49', 'reg');
  t('ojos-marrones', 'Ojos Marrones', 'Lasso', '3:36', 'reg', { img: 'cov-ronda.jpg' });
  t('perreo-barrio', 'Perreo en el Barrio', 'La Joaqui', '3:02', 'reg');
  t('noche-larga', 'Noche Larga', 'La Joaqui', '3:08', 'reg');
  t('esquina-caliente', 'Esquina Caliente', 'La Joaqui', '2:57', 'reg');
  // cumbia
  t('adios-amor', 'Adiós Amor', 'La Delio Valdez', '3:41', 'cum');
  t('bombon-asesino', 'Bombón Asesino', 'Los Palmeras', '3:12', 'cum');
  t('se-te-ve-la-tanga', 'Se Te Ve La Tanga', 'Damas Gratis', '2:56', 'cum');
  t('el-bombon-asesino', 'El Bombón Asesino', 'Los Palmeras', '3:29', 'cum');
  t('el-liston', 'El Listón de Tu Pelo', 'Los Ángeles Azules', '3:05', 'cum');
  t('corazon-mentiroso', 'Corazón Mentiroso', 'Karina', '3:18', 'cum');
  t('como-te-voy', 'Cómo Te Voy a Olvidar', 'Los Ángeles Azules', '3:40', 'cum');
  t('cumbia-del-sol', 'Cumbia del Sol', 'La Delio Valdez', '3:22', 'cum');
  t('la-ronda', 'La Ronda', 'La Delio Valdez', '3:15', 'cum');
  t('baile-conmigo', 'Bailá Conmigo', 'La Delio Valdez', '3:48', 'cum');
  t('salon-estrella', 'Salón Estrella', 'La Delio Valdez', '3:02', 'cum');
  t('noche-de-cumbia', 'Noche de Cumbia', 'Los Palmeras', '3:36', 'cum');
  t('sonidero', 'Sonidero', 'Los Palmeras', '3:10', 'cum');
  t('cumbia-santafesina', 'Cumbia Santafesina', 'Los Palmeras', '3:25', 'cum');
  t('lunes-de-farol', 'Lunes de Farol', 'Los Faroles del 9*', '3:12', 'cum', { img: 'nuevavoz-faroles.jpg' });
  t('barrio-adentro', 'Barrio Adentro', 'Los Faroles del 9*', '4:02', 'cum', { img: 'nuevavoz-faroles.jpg' });
  t('cumbia-de-terraza', 'Cumbia de Terraza', 'Los Faroles del 9*', '3:44', 'cum', { img: 'nuevavoz-faroles.jpg' });
  t('la-ultima-ronda', 'La Última Ronda', 'Los Faroles del 9*', '3:06', 'cum', { img: 'nuevavoz-faroles.jpg' });
  t('se-apago-el-verano', 'Se Apagó el Verano', 'Los Faroles del 9*', '2:52', 'cum', { img: 'nuevavoz-faroles.jpg' });
  // folclore
  t('rara-vez', 'Rara Vez', 'Milo J', '3:12', 'fol');
  t('jangadero', 'Jangadero', 'Milo J', '4:02', 'fol');
  t('11-11', '11:11', 'Milo J', '3:44', 'fol');
  t('la-vida-era-mas-corta', 'La Vida Era Más Corta', 'Milo J', '3:06', 'fol');
  t('mai', 'M.A.I.', 'Milo J', '2:52', 'fol');
  t('a-don-ata', 'A Don Ata', 'Soledad Pastorutti', '3:28', 'fol');
  t('zamba-olvidarte', 'Zamba para Olvidarte', 'Soledad Pastorutti', '3:35', 'fol');
  t('volver-a-empezar', 'Volver a Empezar', 'Maggie Cullen', '3:20', 'fol', { img: 'nuevavoz-maggiecullen.jpg' });
  t('cuarto-propio', 'Cuarto Propio', 'Luna Ferrari*', '3:12', 'fol', { img: 'tema-cuartopropio.jpg' });
  // rock
  t('por-mil-noches', 'Por Mil Noches', 'Airbag', '3:52', 'rock');
  t('sigo-aca', 'Sigo Acá', 'Bandalos Chinos', '3:20', 'rock');
  t('el-disfraz', 'El Disfraz', 'Las Ligas Menores', '2:44', 'rock');
  t('tarde-de-domingo', 'Tarde de Domingo', 'Bandalos Chinos', '3:11', 'rock');
  t('corazon-de-garage', 'Corazón de Garage', 'Las Diferencias', '2:58', 'rock');
  t('noche-electrica', 'Noche Eléctrica', 'Camionero', '3:30', 'rock');
  t('ultima-fecha', 'Última Fecha', 'Airbag', '4:05', 'rock');
  t('ruido-blanco', 'Ruido Blanco', 'Airbag', '3:18', 'rock');
  t('tarde-de-verano', 'Tarde de Verano', 'Airbag', '2:58', 'rock');

  D.coverOf = (tr) => tr.img || { reg: 'tema-regueton.jpg', cum: 'tema-cumbia.jpg', fol: 'tema-folclore.jpg', rock: 'tema-rock.jpg' }[tr.house];

  /* ── Playlists ───────────────────────────────────────────── */
  const pl = (id, o) => (D.playlists[id] = Object.assign({ id }, o));
  D.playlists = {};
  pl('nuevos-reg', { name: 'Los nuevos del reguetón', house: 'reg', n: 52, upd: 'LUNES', cover: 'cov-reg.jpg', min: '3 H 24 MIN', plays: 18402, desc: 'Lo que está entrando en la casa del reguetón. Se actualiza todos los lunes.', tracks: ['guaya-guaya', 'mafiosa', 'dos-mil-16', 'mamichula', 'ultima-fila', 'sin-frenos', 'toda-la-noche'] });
  pl('perreo', { name: 'Perreo de la cuadra', house: 'reg', n: 70, upd: 'AYER', cover: 'cov-noche.jpg', min: '4 H 02 MIN', plays: 24310, desc: 'Para bailar pegado hasta que prendan las luces. La arma la casa del reguetón.', tracks: ['guaya-guaya', 'dos-mil-16', 'toda-la-noche', 'mafiosa', 'calle-sin-salida', 'ultima-fila', 'sin-frenos'] });
  pl('despues-de-las-tres', { name: 'Después de las tres', house: 'reg', n: 44, cover: 'cov-salon2.jpg', min: '2 H 31 MIN', plays: 9120, desc: 'El tramo de la noche en que ya nadie mira la hora.', tracks: ['noche-larga', 'esquina-caliente', 'perreo-barrio', 'sin-frenos', 'mafiosa', 'toda-la-noche', 'ojos-marrones'] });
  pl('nuevos-cum', { name: 'Los nuevos de la cumbia', house: 'cum', n: 48, upd: 'LUNES', cover: 'cov-cum.jpg', min: '3 H 06 MIN', plays: 15870, desc: 'Lo que se baila en las rondas de la cuadra. Se actualiza todos los lunes.', tracks: ['adios-amor', 'corazon-mentiroso', 'bombon-asesino', 'se-te-ve-la-tanga', 'como-te-voy', 'el-liston', 'el-bombon-asesino'] });
  pl('cumbia-ronda', { name: 'Cumbia para la ronda', house: 'cum', n: 62, upd: 'AYER', cover: 'tema-cumbia.jpg', min: '3 H 24 MIN', plays: 18402, desc: 'Lo que se baila en las rondas de la cuadra, de la orquesta al sonidero. La arma la casa de la cumbia y se actualiza todos los martes.', tracks: ['adios-amor', 'bombon-asesino', 'se-te-ve-la-tanga', 'el-bombon-asesino', 'el-liston', 'corazon-mentiroso', 'como-te-voy'] });
  pl('santafesina', { name: 'Santafesina de fierro', house: 'cum', n: 54, cover: 'cov-guiro.jpg', min: '3 H 10 MIN', plays: 11200, desc: 'La cumbia del litoral, la de los bailes grandes y los acordeones.', tracks: ['bombon-asesino', 'el-bombon-asesino', 'noche-de-cumbia', 'sonidero', 'cumbia-santafesina', 'adios-amor', 'baile-conmigo'] });
  pl('nuevos-fol', { name: 'Los nuevos del folclore', house: 'fol', n: 32, upd: 'LUNES', cover: 'cov-fol.jpg', min: '1 H 58 MIN', plays: 7340, desc: 'Lo que se está tocando hoy en las peñas. Se actualiza todos los lunes.', tracks: ['rara-vez', 'a-don-ata', 'jangadero', '11-11', 'la-vida-era-mas-corta', 'zamba-olvidarte', 'volver-a-empezar'] });
  pl('pena-aclare', { name: 'Peña hasta que aclare', house: 'fol', n: 58, upd: 'AYER', cover: 'cov-pena.jpg', min: '3 H 11 MIN', plays: 12060, desc: 'Guitarra, bombo y una más. Para cuando la peña se alarga.', tracks: ['rara-vez', 'a-don-ata', 'zamba-olvidarte', 'jangadero', 'volver-a-empezar', '11-11', 'la-vida-era-mas-corta'] });
  pl('chacareras', { name: 'Chacareras de entrada', house: 'fol', n: 40, cover: 'cov-bombo.jpg', min: '2 H 20 MIN', plays: 5100, desc: 'Para entrar en calor antes de que arranque el zapateo.', tracks: ['a-don-ata', 'zamba-olvidarte', 'rara-vez', 'jangadero', 'mai', 'volver-a-empezar', '11-11'] });
  pl('nuevos-rock', { name: 'Los nuevos del rock', house: 'rock', n: 41, upd: 'LUNES', cover: 'cov-roc.jpg', min: '2 H 44 MIN', plays: 9860, desc: 'Bandas que arrancaron este año y ya llenan el garage. Se actualiza todos los lunes.', tracks: ['por-mil-noches', 'sigo-aca', 'el-disfraz', 'tarde-de-domingo', 'corazon-de-garage', 'noche-electrica', 'ultima-fecha'] });
  pl('garage', { name: 'Garage de la cuadra', house: 'rock', n: 66, upd: 'AYER', cover: 'cov-garage.jpg', min: '3 H 40 MIN', plays: 13500, desc: 'Ruido, pedales y amplificadores al fondo. La arma la casa del rock.', tracks: ['por-mil-noches', 'corazon-de-garage', 'noche-electrica', 'el-disfraz', 'sigo-aca', 'ultima-fecha', 'tarde-de-domingo'] });
  pl('pogo', { name: 'Para el pogo', house: 'rock', n: 38, cover: 'cov-pogo2.jpg', min: '2 H 05 MIN', plays: 6700, desc: 'Lo más rápido de la casa del rock.', tracks: ['ultima-fecha', 'noche-electrica', 'el-disfraz', 'ruido-blanco', 'tarde-de-verano', 'sigo-aca', 'por-mil-noches'] });
  pl('mas-escuchado', { name: 'Lo más escuchado de la cuadra', house: 'cum', n: 100, upd: 'LUNES', cover: 'hero-final.jpg', min: '5 H 40 MIN', plays: 88120, desc: 'Las 100 que más suenan. De acá sale el lineup del festival de octubre.', tracks: ['adios-amor', 'guaya-guaya', 'rara-vez', 'por-mil-noches', 'bombon-asesino', 'mafiosa', 'jangadero'] });
  pl('guardados', { name: 'Guardados', house: 'cum', n: 214, cover: 'cov-gente.jpg', min: '12 H 18 MIN', plays: 0, desc: 'Lo que guardaste con el corazón.', tracks: [], dyn: 'likes' });
  pl('cosquin', { name: 'Para el viaje a Cosquín', house: 'fol', n: 38, cover: 'cov-acorde.jpg', min: '2 H 12 MIN', plays: 0, desc: 'Armada por vos para la ruta.', tracks: ['rara-vez', 'a-don-ata', 'zamba-olvidarte', 'jangadero', 'volver-a-empezar', '11-11', 'mai'] });
  pl('nuevas-voces-cumbia', { name: 'Nuevas voces', house: 'cum', n: 24, cover: 'nuevavoz-faroles.jpg', min: '1 H 20 MIN', plays: 1200, desc: 'Artistas que entraron a la cuadra este año.', tracks: ['lunes-de-farol', 'barrio-adentro', 'cumbia-de-terraza', 'la-ultima-ronda', 'se-apago-el-verano'] });
  D.plHome = ['nuevos-reg', 'nuevos-cum', 'nuevos-fol', 'nuevos-rock'];
  D.plMoment = ['perreo', 'pena-aclare', 'cumbia-ronda', 'garage', 'chacareras', 'despues-de-las-tres'];

  /* ── Artistas ────────────────────────────────────────────── */
  const ar = (id, o) => (D.artists[id] = Object.assign({ id }, o));
  D.artists = {};
  ar('delio', { name: 'La Delio Valdez', house: 'cum', where: 'BUENOS AIRES', listeners: '286.400 OYENTES EN LA CUADRA', img: 'art-duo.jpg', pop: [['adios-amor', '9,4 M'], ['cumbia-del-sol', '6,1 M'], ['la-ronda', '4,7 M'], ['baile-conmigo', '3,3 M'], ['salon-estrella', '2,2 M']], appears: ['nuevos-fol', 'pena-aclare', 'mas-escuchado'], dates: [['VIE 17', 'Peña de apertura', 'FESTIVAL · ESCENARIO 03', 'fest-apertura', true], ['DOM 19', 'Cierre de las cuatro', 'FESTIVAL · ESCENARIO CENTRAL', 'fest-cierre', false]] });
  ar('palmeras', { name: 'Los Palmeras', house: 'cum', where: 'SANTA FE', listeners: '512.300 OYENTES EN LA CUADRA', img: 'hero-calle.jpg', pop: [['bombon-asesino', '11,2 M'], ['el-bombon-asesino', '7,9 M'], ['noche-de-cumbia', '4,8 M'], ['sonidero', '3,5 M'], ['cumbia-santafesina', '2,6 M']], appears: ['santafesina', 'nuevos-cum', 'mas-escuchado'] });
  ar('joaqui', { name: 'La Joaqui', house: 'reg', where: 'BUENOS AIRES', listeners: '398.700 OYENTES EN LA CUADRA', img: 'art-lajoaqui.jpg', pop: [['ultima-fila', '5,2 M'], ['perreo-barrio', '3,9 M'], ['sin-frenos', '3,1 M'], ['noche-larga', '2,3 M'], ['esquina-caliente', '1,8 M']], appears: ['nuevos-reg', 'perreo', 'mas-escuchado'] });
  ar('airbag', { name: 'Airbag', house: 'rock', where: 'BUENOS AIRES', listeners: '604.100 OYENTES EN LA CUADRA', img: 'cov-pogo2.jpg', pop: [['por-mil-noches', '6,8 M'], ['corazon-de-garage', '4,1 M'], ['ultima-fecha', '3,2 M'], ['ruido-blanco', '2,4 M'], ['tarde-de-verano', '1,9 M']], appears: ['nuevos-rock', 'garage', 'mas-escuchado'] });
  ar('milo', { name: 'Milo J', house: 'fol', where: 'MORÓN, BUENOS AIRES', listeners: '412.900 OYENTES EN LA CUADRA', img: 'art-milo.jpg', pop: [['rara-vez', '4,2 M'], ['jangadero', '3,8 M'], ['11-11', '2,9 M'], ['la-vida-era-mas-corta', '2,1 M'], ['mai', '1,7 M']], appears: ['nuevos-fol', 'pena-aclare', 'mas-escuchado'] });
  ar('faroles', { name: 'Los Faroles del 9*', house: 'cum', where: 'BUENOS AIRES · NUEVA VOZ · ARTISTA INVENTADO', listeners: '', img: 'art-faroles.jpg', nueva: true, pop: [['lunes-de-farol', '38 MIL'], ['barrio-adentro', '31 MIL'], ['cumbia-de-terraza', '24 MIL'], ['la-ultima-ronda', '19 MIL'], ['se-apago-el-verano', '12 MIL']], appears: ['nuevas-voces-cumbia', 'pena-aclare', 'mas-escuchado'] });
  // artistas “reducidos” (sin pantalla propia en el Figma → usan la plantilla de artista)
  ar('sole', { name: 'La Sole', house: 'fol', where: 'ARROYO SECO, SANTA FE', listeners: '366.000 OYENTES EN LA CUADRA', img: 'art-sole.jpg', pop: [['a-don-ata', '5,1 M'], ['zamba-olvidarte', '3,6 M'], ['rara-vez', '1,1 M'], ['jangadero', '0,9 M'], ['mai', '0,7 M']], appears: ['nuevos-fol', 'pena-aclare', 'chacareras'] });
  ar('trueno', { name: 'Trueno', house: 'reg', where: 'BUENOS AIRES', listeners: '455.000 OYENTES EN LA CUADRA', img: 'cov-gente.jpg', pop: [['dos-mil-16', '7,5 M'], ['mamichula', '6,0 M'], ['toda-la-noche', '1,2 M'], ['sin-frenos', '0,9 M'], ['ultima-fila', '0,7 M']], appears: ['nuevos-reg', 'perreo', 'mas-escuchado'] });
  ar('nicki', { name: 'Nicki Nicole', house: 'reg', where: 'ROSARIO', listeners: '389.000 OYENTES EN LA CUADRA', img: 'cov-reg.jpg', pop: [['calle-sin-salida', '5,9 M'], ['mafiosa', '1,1 M'], ['sin-frenos', '0,9 M'], ['ultima-fila', '0,5 M'], ['toda-la-noche', '0,4 M']], appears: ['perreo', 'nuevos-reg', 'mas-escuchado'] });
  ar('marilina', { name: 'Marilina', house: 'cum', where: 'BUENOS AIRES', listeners: '90.100 OYENTES EN LA CUADRA', img: 'cov-acorde.jpg', pop: [['corazon-mentiroso', '2,9 M'], ['se-te-ve-la-tanga', '1,4 M'], ['la-ronda', '0,8 M'], ['cumbia-del-sol', '0,6 M'], ['salon-estrella', '0,4 M']], appears: ['nuevos-cum', 'cumbia-ronda', 'mas-escuchado'] });
  ar('nabale', { name: 'Nabalé', house: 'fol', where: 'TUCUMÁN', listeners: '41.800 OYENTES EN LA CUADRA', img: 'cov-pena.jpg', pop: [['zamba-olvidarte', '1,2 M'], ['a-don-ata', '0,9 M'], ['volver-a-empezar', '0,5 M'], ['jangadero', '0,4 M'], ['mai', '0,3 M']], appears: ['pena-aclare', 'nuevos-fol', 'chacareras'] });
  ar('bandalos', { name: 'Bandalos Chinos', house: 'rock', where: 'BUENOS AIRES', listeners: '233.000 OYENTES EN LA CUADRA', img: 'cov-guit2.jpg', pop: [['sigo-aca', '3,0 M'], ['tarde-de-domingo', '2,2 M'], ['el-disfraz', '0,6 M'], ['ruido-blanco', '0,5 M'], ['tarde-de-verano', '0,4 M']], appears: ['nuevos-rock', 'garage', 'pogo'] });
  ar('ligas', { name: 'Las Ligas Menores', house: 'rock', where: 'LA PLATA', listeners: '120.500 OYENTES EN LA CUADRA', img: 'cov-garage.jpg', pop: [['el-disfraz', '2,0 M'], ['sigo-aca', '0,6 M'], ['tarde-de-domingo', '0,5 M'], ['ruido-blanco', '0,3 M'], ['tarde-de-verano', '0,2 M']], appears: ['garage', 'nuevos-rock', 'pogo'] });

  /* ── Nuevas voces (artistas inventados) ──────────────────── */
  D.nuevas = [
    { id: 'pibeneon', name: 'Pibe Neón*', house: 'reg', tag: 'REGUETÓN · NUEVA VOZ', img: 'nuevavoz-pibeneon.jpg', where: 'CÓRDOBA' },
    { id: 'dulcecalle', name: 'Dulce Calle*', house: 'reg', tag: 'REGUETÓN · POP URBANO', img: 'nuevavoz-dulcecalle.jpg', where: 'ROSARIO' },
    { id: 'chanares', name: 'Los Chañares*', house: 'fol', tag: 'FOLCLORE · SANTIAGO DEL ESTERO', img: 'nuevavoz-chanares.jpg', where: 'SANTIAGO DEL ESTERO' },
    { id: 'maggie', name: 'Maggie Cullen', house: 'fol', tag: 'FOLCLORE · NUEVA VOZ', img: 'nuevavoz-maggiecullen.jpg', where: 'MENDOZA' },
    { id: 'vampiros', name: 'Buenos Vampiros', house: 'rock', tag: 'ROCK · UNDER NACIONAL', img: 'nuevavoz-buenosvampiros.jpg', where: 'BUENOS AIRES' },
    { id: 'faroles', name: 'Los Faroles del 9*', house: 'cum', tag: 'CUMBIA · NUEVA VOZ', img: 'nuevavoz-faroles.jpg', where: 'BUENOS AIRES' },
  ];
  // las nuevas voces sin pantalla propia reutilizan la plantilla de artista emergente
  D.nuevas.forEach((n) => {
    if (!D.artists[n.id]) {
      const base = D.artists.faroles;
      ar(n.id, { name: n.name, house: n.house, where: n.where + ' · NUEVA VOZ · ARTISTA INVENTADO', listeners: '', img: n.img, nueva: true, pop: base.pop.map((p, i) => [['lunes-de-farol', 'barrio-adentro', 'cumbia-de-terraza', 'la-ultima-ronda', 'se-apago-el-verano'][i], p[1]]), appears: ['nuevas-voces-cumbia', 'pena-aclare', 'mas-escuchado'] });
    }
  });

  [['ldiferencias', 'Las Diferencias', 'rock', 'ROCK FEDERAL', 'nuevavoz-lasdiferencias.jpg'], ['camionero', 'Camionero de Buenos Aires', 'rock', 'ROCK FEDERAL', 'nuevavoz-camionero.jpg']].forEach(([id, name, house, where, img]) => {
    ar(id, { name, house, where: where + ' · NUEVA VOZ · ARTISTA INVENTADO', listeners: '', img, nueva: true, pop: D.artists.faroles.pop.map((p, i) => [['por-mil-noches', 'sigo-aca', 'el-disfraz', 'tarde-de-domingo', 'corazon-de-garage'][i], p[1]]), appears: ['nuevos-rock', 'garage', 'pogo'] });
  });

  /* ── Peñas ───────────────────────────────────────────────── */
  D.penas = {
    pancho: { id: 'pancho', day: 'jueves', h: '22 H', name: 'Peña de Pancho Guevara', where: 'TALCAHUANO 949', price: 'A LA GORRA', house: 'fol', going: 84 },
    perreo: { id: 'perreo', day: 'jueves', h: '23 H', name: 'Noche de perreo', where: 'CLUB LA ESQUINA', price: '$ 6.000', house: 'reg', going: 212 },
    ronda: { id: 'ronda', day: 'viernes', h: '22 H', name: 'Ronda con orquesta', where: 'PLAZA DEL ÁNGEL', price: 'A LA GORRA', house: 'cum', going: 301 },
    porteña: { id: 'porteña', day: 'viernes', h: '23 H', name: 'La Porteña', where: 'AV. SANTA FE 4389', price: '$ 4.000', house: 'fol', going: 96 },
    guitarreada: { id: 'guitarreada', day: 'sábado', h: '21 H', name: 'Guitarreada abierta', where: 'EL PATIO', price: 'A LA GORRA', house: 'fol', going: 58 },
    sonidero: { id: 'sonidero', day: 'sábado', h: '00 H', name: 'Baile sonidero', where: 'SALÓN LA ESTRELLA', price: '$ 8.000', house: 'cum', going: 440 },
    'pena-jueves': { id: 'pena-jueves', day: 'jueves', h: '22 H', name: 'Peña de los jueves', where: 'CASA DEL FOLCLORE', price: 'A LA GORRA', house: 'fol', going: 120 },
    setnuevas: { id: 'setnuevas', day: 'sábado', h: '00 H', name: 'Set de las nuevas', where: 'PATIO DE LA CANCHA', price: 'A LA GORRA', house: 'reg', going: 180 },
    ciclo: { id: 'ciclo', day: 'miércoles', h: '23 H', name: 'Ciclo de bandas nuevas', where: 'CLUB LA ESQUINA', price: '$ 3.000', house: 'rock', going: 140 },
    doble: { id: 'doble', day: 'sábado', h: '00 H', name: 'Doble fecha', where: 'ESCENARIO 04', price: 'FESTIVAL', house: 'rock', going: 390 },
    'fest-apertura': { id: 'fest-apertura', day: 'viernes', h: '21 H', name: 'Peña de apertura', where: 'FESTIVAL · ESCENARIO 03', price: 'FESTIVAL', house: 'cum', going: 520 },
    'fest-cierre': { id: 'fest-cierre', day: 'domingo', h: '23 H', name: 'Cierre de las cuatro', where: 'FESTIVAL · ESCENARIO CENTRAL', price: 'FESTIVAL', house: 'cum', going: 980 },
    'radio-viernes': { id: 'radio-viernes', day: 'viernes', h: '22 H', name: 'La Delio Valdez en vivo', where: 'DESDE LA PLAZA DEL ÁNGEL', price: 'EN VIVO', house: 'cum', going: 260 },
    'radio-domingo': { id: 'radio-domingo', day: 'domingo', h: '23 H', name: 'Las cuatro casas juntas', where: 'CIERRE DEL FESTIVAL', price: 'EN VIVO', house: 'cum', going: 700 },
  };

  /* ── Lineup del festival ─────────────────────────────────── */
  D.lineup = [
    { dia: 'VIERNES 17', esc: 'ESCENARIO 1', house: 'reg', list: [['La Joaqui', 98, 'joaqui'], ['Trueno', 84, 'trueno'], ['Nicki Nicole', 71, 'nicki'], ['Duki', 63], ['Emilia', 52]] },
    { dia: 'SÁBADO 18', esc: 'ESCENARIO 2', house: 'cum', list: [['La Delio Valdez', 95, 'delio'], ['Los Palmeras', 88, 'palmeras'], ['Damas Gratis', 74], ['Los Ángeles Azules', 58]] },
    { dia: 'DOMINGO 19', esc: 'ESCENARIO 3', house: 'fol', list: [['Milo J', 100, 'milo'], ['Soledad Pastorutti', 86, 'sole'], ['Airbag', 79, 'airbag'], ['Bandalos Chinos', 66, 'bandalos']] },
  ];
  D.lineupNuevas = [
    { id: 'chanares', name: 'Los Chañares*', house: 'fol', cuando: 'VIE 17 · 21 H · ESCENARIO 3', tag: 'FOLCLORE · NUEVA VOZ' },
    { id: 'pibeneon', name: 'Pibe Neón*', house: 'reg', cuando: 'VIE 17 · 22 H · ESCENARIO 1', tag: 'REGUETÓN · NUEVA VOZ' },
    { id: 'faroles', name: 'Los Faroles del 9*', house: 'cum', cuando: 'SÁB 18 · 21 H · ESCENARIO 2', tag: 'CUMBIA · NUEVA VOZ' },
    { id: 'vampiros', name: 'Buenos Vampiros', house: 'rock', cuando: 'SÁB 18 · 23 H · ESCENARIO 4', tag: 'ROCK · NUEVA VOZ' },
  ];

  /* ── Avisos ──────────────────────────────────────────────── */
  D.avisos = {
    hoy: [
      { house: 'cum', t: 'Participá en la próxima peña', s: 'CONCURSO · CIERRA EN 2 DÍAS', go: '/notificacion' },
      { house: 'reg', t: 'Pibe Neón* llegó a la casa del reguetón', s: 'NUEVA VOZ · HACE 5 MIN', go: '/artista/pibeneon' },
      { house: 'fol', t: 'Peña esta noche: Pancho Guevara', s: 'TALCAHUANO 949 · 22 H', go: '/penas' },
      { house: 'cum', t: 'Se abrió la escalera de la cumbia', s: 'YA TENÉS NUEVAS VOCES', go: '/para-vos' },
    ],
    antes: [{ house: 'fol', t: 'Tu inscripción está en revisión', s: 'LA CUADRA ESCUCHA TU DEMO · HACE 2 DÍAS', go: '/inscripcion/enviada' }],
  };
})();
