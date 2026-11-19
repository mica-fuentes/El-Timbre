# El Timbre · prototipo navegable

Demo de la app de La Cuadra (reguetón, cumbia, folclore y rock), construida desde el Figma
**La Cuadra — Repertorio visual** (página *App*). Prioriza la fidelidad visual y que todo se pueda tocar;
no tiene backend, login ni verificaciones.

## Cómo abrirla

Doble click en `index.html` (no necesita servidor ni internet: las fuentes están incluidas).
En el escritorio se ve dentro de un teléfono de 390×844 con un panel que lleva a cualquiera de las 37 pantallas.
En un celular ocupa toda la pantalla.

## Qué incluye

| Sección | Pantallas |
|---|---|
| A · Registro | 01 Arranque, 02 Elegí tus casas, 03 ¿Cuánto las conocés? |
| B · Inicio | 04 La cuadra (noche), 05 de día, 06 Para vos, 07 Avisos |
| C · Casas | 08–11 cumbia, reguetón, folclore, rock |
| D · Descubrir | 12 Buscar, 13 Nuevas voces, 14 Artista, 15 Artista emergente |
| E · Escuchar | 16 Playlists, 17 Dentro de una lista, 18 Reproductor, 19 Radio |
| F · Festival | 20 Festival, 21–22 Lineup, 23 El predio, 24 Peñas, 25 Descubrí peñas |
| G · Vos y artistas | 26–27 Vos, 28 Sumate, 29 Inscripción, 30 En revisión |
| I · Concurso | 32 Notificación, 33 Concurso, 34 Presentá tu tema, 35 Enviada, 36 ¡Ganaste!, 37 En vivo |
| H · Sistema | `sistema.html` (colores, tipografías, íconos, componentes, estados) |

Las variantes por casa (playlists, reproductor, artistas) usan una sola plantilla con datos distintos.

## Cosas que funcionan de verdad

- Reproductor simulado (sin audio): play/pausa, siguiente/anterior, aleatorio, repetir, cola, scrubber arrastrable, mini reproductor persistente.
- Guardar temas (corazón), seguir artistas y casas, anotarse a peñas (“Anotarme” ↔ “Voy”), sacar entrada al festival.
- Buscador con resultados reales sobre temas, artistas, playlists, peñas y notas; filtros por tipo.
- Filtros en Playlists, Lineup, Nuevas voces y Peñas; crear listas nuevas.
- Formularios con validación: inscripción de artistas y presentación al concurso (el resultado “¡Ganaste!” llega solo unos segundos después de participar, por la campanita).
- Modo día/noche (ícono del sol en Vos o el botón del panel). El estado se guarda en el navegador; “Reiniciar demo” lo borra.

## Estructura

```
index.html          shell de la demo
sistema.html        sistema de diseño
css/                tokens, componentes y una hoja por sección
js/core.js          estado, reproductor, router, toasts y hojas
js/data.js          contenido (casas, temas, playlists, artistas, peñas)
js/screens/*.js     pantallas
assets/             íconos SVG y fuentes
images/             fotos, casas y logos del Figma
```

Los artistas con `*` son inventados, solo para este proyecto.
