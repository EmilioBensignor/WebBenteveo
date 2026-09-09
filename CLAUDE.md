# WebBenteveo

Sitio web de Benteveo — agencia de IA y transformación tecnológica.

## Stack

- **Nuxt 4** + **Vue 3** (Composition API, `<script setup>`)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, sin config file — todo en `main.css`)
- **pnpm** como gestor de paquetes
- Módulos: `@nuxt/fonts`, `@nuxt/icon` (material-symbols), `@nuxt/image`, `@nuxtjs/seo`

## Convenciones Vue

- `<template>` primero, luego `<script setup>`, luego `<style>` (solo si es necesario)
- **Nunca** `lang="ts"` en script. Composables en `.js`, no `.ts`
- Sin comentarios en el código
- UI en español, código en inglés

## Design system

Definido en `app/assets/css/main.css` bajo `@theme`:

| Token | Valor |
|---|---|
| `negro` | `#131313` |
| `negro-puro` | `#000000` |
| `amarillo` | `#FCB716` |
| `blanco` | `#F8F8F8` |
| `hueso` | `#EAEAEA` — el "blanco" real del Figma para texto sobre oscuro |
| `gris` | `#808080` |
| `shadow-amarilla` | `0 0 18px 0 rgba(252,183,22,0.33)` |
| Fuente | Inter (400/500/600/700) — global en body, no usar `font-inter` |

**`hueso` vs `blanco`**: el Figma usa `#EAEAEA` para todo el texto sobre fondo oscuro. `blanco` (`#F8F8F8`) queda para bordes, fondos y el tema light. Texto nuevo sobre oscuro → `text-hueso`.

### Breakpoints

`--breakpoint-*: initial` borra la escala default de Tailwind antes de redefinir. Sin esa línea conviven las dos y `lg` significa dos cosas.

| Nombre | px |
|---|---|
| `iph` | 402 |
| `sm` | 480 |
| `tab` | 600 |
| `md` | 768 |
| `lg` | 1080 |
| `xl` | 1280 |
| `xxl` | 1440 |
| `mac` | `min-width: 1280px and max-height: 820px` |

## Escala tipográfica — medida del Figma

Los cuatro artboards del Figma (320 / 760 / 1080 / 1920) dan esta escala. **La progresión no es gradual**: mobile y tablet comparten casi todos los valores, y 1080 ya usa los de desktop. No inventar pasos intermedios.

| Elemento | 320 | 768 | 1080 | 1920 |
|---|---|---|---|---|
| H1 hero | 20 | 24 | 32* | 44* |
| H2 sección | 20 | 20 | 28 | 28 |
| Número gigante | 88 | 88 | 128 | 128 |
| Título de card | 16 | 16 | 20 | 20 |
| Texto de card | 14 | 14 | 16 | 16 |
| Botón | 14 | 14 | 16 | 16 |
| Alto de card servicios | 186 | 240 | 320 | 320 |

\* El Figma marca 40 en 1080 y 48 en 1920, pero a esos tamaños el título invade el círculo del hero. Bajados a 32/44 tras medirlo en el browser.

### Padding lateral de sección

Todas las secciones, header y footer comparten la misma escala. Si una queda distinta, se desalinea con el resto:

```
px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30
```

### Ancho de contenido

`max-w-362` (1448px) es el ancho de contenido del Figma a 1920, y el default de `DefaultSection`. La única excepción es la tarjeta de Contacto: `max-w-410` (1640px), pasado también por `inner="max-w-410!"` porque el `max-w-362` del Section la recortaba.

## Estructura de componentes

Nada suelto en la raíz de `app/components/`: todo vive en una carpeta y el nombre del tag lo arma Nuxt con `Carpeta + Archivo`.

```
app/components/
  default/      # Chrome del layout: Header, Footer, Section, Cursor.client
  ui/           # Primitivas sin lógica de negocio: ButtonPrimary, HeadingH1-H3,
                # CarouselStatic/Autoplay/Loop, FormField, Accordion
  shared/       # Piezas de negocio usadas por más de una página: Hero, Marcas,
                # Resultados, FormContacto, OpinionCard, ProyectoCard,
                # ServicioCard, PasosTimeline
  home/         # Secciones de /
  agencia/      # Secciones de /agencia-creativa
  transformacion/ # Secciones de /transformacion-tecnologica
  eventos/      # Secciones de /eventos
  rubro/        # Secciones de /rubros/[nombre]
```

Dónde va un componente nuevo: si lo usa una sola página → carpeta de esa página. Si lo usan varias y tiene contenido de negocio → `shared/`. Si es una primitiva reusable sin contenido → `ui/`. Si es parte del layout → `default/`.

## Componentes globales reutilizables

| Componente | Uso |
|---|---|
| `DefaultSection` | Wrapper de sección: fondo full-width + contenido `max-w` centrado. Props: `bg`, `id`, `class` para gap/padding |
| `SharedHero` | Hero base (video/imagen de fondo, overlay, título, CTAs). Los heroes por página lo envuelven |
| `UiHeadingH1` / `UiHeadingH2` / `UiHeadingH3` | Tipografía de títulos |
| `UiButtonPrimary` | Botón principal. Variantes: `glass` (la del diseño nuevo, usar con `size="glass"`), `solid`, `light`, `dark`, `outline` |
| `DefaultCursor` | Cursor custom. Se expande a píldora con texto sobre elementos con `data-cursor-label` |
| `UiCarouselStatic` | Carrusel con drag, flechas en desktop, props `slidesPerView` (por breakpoint) y `gap`. El wrapper interno tiene `px-4 md:px-0` para padding lateral en mobile |
| `UiCarouselAutoplay` | Carrusel con autoplay (prop `interval`), arranca al entrar al viewport, snap y drag. Slot `#dots` con `{ total, current, goTo, playing }` para navegación custom |
| `UiAccordion` | Accordion animado con `grid-rows` transition. Prop `question`, contenido via slot |
| `UiFormField` | Input genérico con `v-model`, `type`, `placeholder`, `error`, `autocomplete`. Muestra error debajo si se pasa |

## Botón glass — NO TOCAR

`.glass-boton` en `main.css`. **Cerrado. No modificar salvo pedido explícito de Lio.**

El hover es un tramo amarillo que recorre el borde con glow, sobre el resto del anillo transparente, con el glass (`backdrop-filter`) siempre visible.

Portado del slider de "Quiénes somos" de `Motix/web` (`app/components/home/Somos.vue`, `.somos__slider-glow`), que hace lo mismo en violeta y en loop. Acá corre sólo en hover.

Claves de ese gradiente: el amarillo va **sólido en `0deg` y `360deg`** — es el mismo punto del anillo, así el tramo queda continuo en vez de partirse en dos líneas. Los desvanecidos usan `color-mix`, y los dos `drop-shadow` dan el glow. Animación `spin-border 1.6s linear infinite`.

**El fragmento se estira y se comprime al girar, y es irreparable con `conic-gradient`.** Medido: el botón es 262×46 (5.7:1) y el conic reparte el arco en *ángulo*, no en píxeles. Un mismo arco de 70° mide entre 33px y 240px según dónde esté (7x de variación); por cada 10° recorre 4.1px en las puntas y 67.2px en los lados. Ningún valor de gradiente ni easing lo arregla: es geometría.

Alternativas ya probadas y descartadas, **no volver a intentarlas**:

| Intento | Por qué se descartó |
|---|---|
| SVG + `stroke-dashoffset` | Sí da largo constante, pero mete markup en el componente. Rechazado |
| `offset-path: border-box` | Sí da largo constante, se vio peor. Rechazado |
| `z-index: -1` sin mask | El fondo translúcido deja pasar el cono: manchón adentro del botón |
| `::after` con fondo sólido | Tapa el `backdrop-filter`: se pierde el glass |
| Anillo amarillo completo | No se ve recorrido, queda estático |
| Borde amarillo sólido sin animación | No es lo pedido |

Detalles que rompen el efecto si se tocan: `inset` debe ser `0` (con `-1.33px` aparecen dos anillos: el del pseudo y el del botón); `border-radius` debe ser `inherit` (un valor fijo corta la curva en las esquinas); el amarillo no puede estar en `0deg` **y** `360deg` a la vez (es el mismo punto del anillo, se ven dos líneas).

## Smooth scroll

Lenis vía `useSmoothScroll()` (`app/composables/useSmoothScroll.js`), enganchado una sola vez en `layouts/default.vue`. Imports lazy dentro de `onMounted`, así que no toca SSR. Guard de `prefers-reduced-motion`: si está activo no arranca y queda scroll nativo.

Los anclas van por `scrollToEl(id, offset)` del mismo composable, no por `href="#"` nativo (Lenis lo ignora y salta seco). Overlays con scroll propio necesitan `data-lenis-prevent`.

## Constantes

Datos de contenido en `app/constants/`:
- `home.js` — `servicios`, `equipo`, `metrics`, `proyectos`
- `transformacion.js` — `opiniones`, `proceso`, `faqs`, `metrics`, etc.
- `agencia.js` — `heroWords` (typewriter), `frases`, `servicios`, `pasos`
- `routes.js` — `ROUTE_NAMES` para rutas tipadas

## Páginas

| Ruta | Estado |
|---|---|
| `/` | **Lista y 1:1 con el Figma. Es la referencia del rediseño** |
| `/transformacion-tecnologica` | Diseño viejo, pendiente de rehacer siguiendo la home |
| `/agencia-creativa` | Diseño viejo, pendiente de rehacer siguiendo la home |
| `/agencia-creativa-light` | Variante en tema light para test con cliente |
| `/eventos` | Diseño viejo, pendiente de rehacer siguiendo la home |

## Home — referencia del rediseño

Figma: `Frontend Freelance`, artboards `240:1161` (1920), `240:2` (1080), `240:298` (760), `240:584` (320).

**Toda página nueva se maqueta copiando estos patrones.** La home ya está verificada 1:1 contra los cuatro artboards.

Secciones en orden, todas en `app/components/home/`, contenido en `constants/home.js`:

| Sección | Qué tiene | Notas |
|---|---|---|
| `HomeHero` | Título + 2 botones glass + círculo con video que se expande a pantalla completa al scrollear | El video es `fixed`; ver "Video del hero" abajo |
| `HomeServicios` | 3 cards con número gigante, imagen y botón "+" que en hover se expande a píldora | 1 col mobile → 3 desde `md` |
| `HomeEquipo` | Texto con primera frase en amarillo + bloque de gradiente diagonal | El gradiente es placeholder: falta el gráfico de órbita real |
| `HomeEmpresas` | Marquee infinito de logos + 3 métricas con líneas divisorias | Líneas sólo desde `md` |
| `HomeProyectos` | Lista + cards apiladas con pin de scroll | Ver "Pin de Proyectos" abajo |
| `HomeContacto` | Tarjeta amarilla `rounded-48` con formulario glass | `max-w-410`, no el 362 del resto |

### Patrones para reusar

**Botón glass** (`variant="glass" size="glass"` en `UiButtonPrimary`): es el botón por defecto del diseño nuevo. El amarillo sólido quedó sólo para el CTA del header y el submit del form.

**Cards con imagen**: `border border-blanco/33 rounded-2xl overflow-hidden`, imagen `absolute inset-0 object-cover`, y encima `bg-linear-to-b from-black/25 to-black`. Sin `backdrop-blur`: borronea la foto.

**Números gigantes** (`01`, `02`, `03`): amarillos, pegados al borde inferior izquierdo y **cortados** por el borde de la card. Se logra con margin negativo (`-mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4`), no con `leading`.

**Línea divisoria**: utility `linea-vertical` / `linea-horizontal` — degradé amarillo que se desvanece a `#131313` en las puntas. **Excepción**: la del footer es blanca sólida (`bg-white`), así está en el Figma.

**Logos de marcas**: los de `public/img/marcas/color/` son a color con fondo propio, para los tiles del marquee. Los `.webp` sueltos en `public/img/marcas/` son blancos monocromo y desaparecen sobre fondo claro.

### Video del hero

`marco` es un `div` **fixed** que arranca midiendo y posicionándose sobre un hueco invisible del grid, y crece a `100vw/100vh` con ScrollTrigger. Detalles que importan:

- Se desvanece con un `IntersectionObserver` cuando el hero sale de pantalla. Sin eso queda visible detrás de las otras secciones, que son transparentes.
- `html` lleva `background-color: negro-puro` para que no se vea el video en el rebote del overscroll de iOS.
- Todas las secciones que van después llevan `bg-negro` y `relative z-10` para tapar el video.

### Pin de Proyectos

La sección se pinnea y las cards entran desde abajo del viewport mientras el scroll avanza. Tres cosas que lo rompen:

1. **`overflow-hidden` en el `<section>`**: ScrollTrigger no puede aplicar `pinSpacing`. Por eso esta sección lleva `overflow-visible!`.
2. **`trigger` apuntando al componente `DefaultSection`**: GSAP necesita un elemento DOM. El `ref` va en un `<div>` interno y se usa `.closest('section')`.
3. **`inner="lg:h-full"`**: hace que el contenido ignore el `padding` de la sección y quede pegado al header.

El pin sólo corre desde 1080. Abajo de eso: 2 columnas con fade en `md`, acordeón en mobile.

El dot amarillo de la lista se posiciona por aritmética (`índice × alto + alto/2`), no midiendo el DOM: medirlo durante la transición del acordeón lo hacía saltar al fondo y volver.

### Cursor custom

`DefaultCursor` (`components/default/Cursor.client.vue`) convierte el puntero en una píldora glass con texto al pasar sobre cualquier elemento con `data-cursor-label="..."`. Lo usa `HomeProyectoCard`.

Dos trampas ya resueltas, no reintroducirlas:
- El centrado va por `transform` inline calculado en el rAF con el ancho actual. La clase `-translate-x-1/2` de Tailwind gana por especificidad y hace que la píldora crezca hacia un lado.
- Durante la salida el cursor tiene que quedarse en la rama estable del rAF (la condición incluye `glass-boton`), si no entra en el `scale` elástico y se estira justo antes de achicarse.

### Responsive

Verificado sin overflow horizontal en 320 / 402 / 480 / 768 / 1080 / 1280 / 1440 / 1920.

- Hover desactivado abajo de `md`: no aplica en touch y deja estados pegados.
- El hero se centra con `min-h-dvh` + `items-center` y padding vertical simétrico, no con `pt-*` fijo.
- El círculo del hero escala `lg:w-88 → xl:w-110 → xxl:w-125`, con `mac:w-96` aparte. A 476px fijos desbordaba 74px en 1080.

### Pendientes de la home

- **Gráfico de órbita** (`HomeEquipo`): el Figma sólo tiene un texto describiéndolo. Hoy es un gradiente diagonal con ese texto adentro.
- **Logos de marcas**: sólo 9 a color, y el Figma repite algunos. Los demás están en blanco monocromo y no sirven para los tiles.
- **CTAs a `#`**: "Ver todos los trabajos", "Conocer más de {proyecto}", "Contanos tu desafío", Nosotros y Blog del header y footer.
- **Form de contacto**: `submit` simulado con un `setTimeout`, falta el endpoint real.

## Landing /agencia-creativa

Secciones (en orden), todas en `app/components/agencia/`. Contenido en `constants/agencia.js`.

| Sección | Qué es | Cómo tocarlo |
|---|---|---|
| `AgenciaHero` | Reusa el `SharedHero` global. El subtítulo va por slot `#text` con typewriter que escribe/borra palabras en amarillo | Palabras: `heroWords` en `agencia.js`. Timings (`HOLD`/`TYPE`/`ERASE`) arriba del `<script>` |
| `AgenciaFrases` | `UiCarouselAutoplay` con las frases; dots = líneas que se rellenan de amarillo sincronizadas al intervalo | Frases: `frases[]`. Velocidad: `INTERVAL` (5s) — se pasa al carrusel **y** a la animación de la línea |
| `AgenciaServicios` | 5 cards. En `lg+` se expanden con hover (flex animado); en mobile/md es accordion con clic. Gradientes tomados de `rubro/Pasos` | Cards: `servicios[]` (icon/image/title/text). Imgs en `public/img/agencia/servicios/` |
| `AgenciaPasos` + `AgenciaPasoCard` | `UiCarouselStatic` en mobile, 3 columnas desde `md`. La activa cicla sola cada 4s; el clic reinicia el timer | Pasos: `pasos[]`. Intervalo: `setInterval(..., 4000)` en `Pasos.vue` |
| `HomeProyectos` | El de la home, ahora con props `title`/`accent`/`cta`/`ctaTo` (defaults = home, no lo rompe). Usa los `proyectos` de `constants/home.js` | Props en `agencia-creativa.vue`. El CTA apunta a `#` (no hay página de trabajos) |
| `HomeContacto` | El global, con textos de esta página y `submit-label` propio | Props en `agencia-creativa.vue` |

**Decisiones tomadas:**
- `shared/Hero.vue` global ganó un slot `#text` opcional (cae a la prop `text` si no se pasa) — así el typewriter vive en `AgenciaHero` sin duplicar el Hero.
- `home/Proyectos.vue` se parametrizó en vez de clonarlo; la home sigue igual porque los defaults son sus valores.
- Assets del Figma venían en ~75MB (PNG). Comprimidos a JPG en `public/img/agencia/` → 1.4MB total.

**Pendientes (placeholders):**
- `heroWords` en `agencia.js` son de relleno (`campañas`, `piezas de comunicación`…).
- La 3ª frase de `frases[]` es inventada — el Figma solo tenía 2.
- CTA "Ver todos los trabajos" → `#`.

## Carrusel — patrón de slidesPerView

Para consistencia entre carruseles, el patrón base es:

```js
{ base: 1.2, sm: 1.5, tab: 2.2, md: 2.5, lg: 3, xl: 3, xxl: 3 }
```

Ajustar `lg`/`xl`/`xxl` según cuántas columnas tiene el diseño (2 para videos, 3 para cards).

## Variables de entorno

| Variable | Descripción |
|---|---|
| `SITE_URL` | URL pública del sitio (default: `https://benteveo.com`) |
| `INDEXABLE` | `true` para permitir indexación por bots (default: bloqueado) |

Crear `.env` local (no commitear):
```
SITE_URL=http://localhost:3000
INDEXABLE=false
```

## Comandos

```bash
pnpm dev       # desarrollo
pnpm build     # build producción
pnpm generate  # SSG
```
