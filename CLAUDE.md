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
| `gris` | `#808080` |
| `shadow-amarilla` | `0 0 18px 0 rgba(252,183,22,0.33)` |
| Fuente | Inter (400/500/600/700) — global en body, no usar `font-inter` |

### Breakpoints

| Nombre | px |
|---|---|
| `sm` | 480 |
| `tab` | 600 |
| `md` | 768 |
| `lg` | 1080 |
| `xl` | 1280 |
| `xxl` | 1440 |

## Componentes globales reutilizables

| Componente | Uso |
|---|---|
| `Section` | Wrapper de sección: fondo full-width + contenido `max-w` centrado. Props: `bg`, `id`, `class` para gap/padding |
| `HeadingH2` / `HeadingH3` | Tipografía de títulos |
| `ButtonPrimary` | Botón principal amarillo |
| `CarouselStatic` | Carrusel con drag, flechas en desktop, props `slidesPerView` (por breakpoint) y `gap`. El wrapper interno tiene `px-4 md:px-0` para padding lateral en mobile |
| `CarouselAutoplay` | Carrusel con autoplay (prop `interval`), arranca al entrar al viewport, snap y drag. Slot `#dots` con `{ total, current, goTo, playing }` para navegación custom |
| `UiAccordion` | Accordion animado con `grid-rows` transition. Prop `question`, contenido via slot |
| `FormField` | Input genérico con `v-model`, `type`, `placeholder`, `error`, `autocomplete`. Muestra error debajo si se pasa |

## Estructura de componentes

```
app/components/
  carousel/Static.vue       # CarouselStatic
  carousel/Autoplay.vue     # CarouselAutoplay
  form/Field.vue            # FormField
  heading/H2.vue H3.vue
  button/Primary.vue        # ButtonPrimary
  opinion/Card.vue          # OpinionCard
  proceso/Card.vue          # ProcesoCard
  ui/Accordion.vue          # UiAccordion
  transformacion/           # Secciones de la landing /transformacion-tecnologica
  agencia/                  # Secciones de la landing /agencia-creativa
```

## Constantes

Datos de contenido en `app/constants/`:
- `transformacion.js` — `opiniones`, `proceso`, `faqs`, `metrics`, etc.
- `agencia.js` — `heroWords` (typewriter), `frases`, `servicios`, `pasos`
- `routes.js` — `ROUTE_NAMES` para rutas tipadas

## Páginas

| Ruta | Estado |
|---|---|
| `/` | En progreso (home) |
| `/transformacion-tecnologica` | Landing lista, pendiente revisión responsive |
| `/agencia-creativa` | Landing lista. Placeholders: palabras del typewriter del hero, 3ª frase, CTA "Ver todos los trabajos" (`#`) |

## Landing /agencia-creativa

Secciones (en orden), todas en `app/components/agencia/`. Contenido en `constants/agencia.js`.

| Sección | Qué es | Cómo tocarlo |
|---|---|---|
| `AgenciaHero` | Reusa el `Hero` global. El subtítulo va por slot `#text` con typewriter que escribe/borra palabras en amarillo | Palabras: `heroWords` en `agencia.js`. Timings (`HOLD`/`TYPE`/`ERASE`) arriba del `<script>` |
| `AgenciaFrases` | `CarouselAutoplay` con las frases; dots = líneas que se rellenan de amarillo sincronizadas al intervalo | Frases: `frases[]`. Velocidad: `INTERVAL` (5s) — se pasa al carrusel **y** a la animación de la línea |
| `AgenciaServicios` | 5 cards. En `lg+` se expanden con hover (flex animado); en mobile/md es accordion con clic. Gradientes tomados de `rubro/Pasos` | Cards: `servicios[]` (icon/image/title/text). Imgs en `public/img/agencia/servicios/` |
| `AgenciaPasos` + `AgenciaPasoCard` | `CarouselStatic` en mobile, 3 columnas desde `md`. La activa cicla sola cada 4s; el clic reinicia el timer | Pasos: `pasos[]`. Intervalo: `setInterval(..., 4000)` en `Pasos.vue` |
| `HomeProyectos` | El de la home, ahora con props `title`/`accent`/`cta`/`ctaTo` (defaults = home, no lo rompe). Usa los `proyectos` de `constants/home.js` | Props en `agencia-creativa.vue`. El CTA apunta a `#` (no hay página de trabajos) |
| `HomeContacto` | El global, con textos de esta página y `submit-label` propio | Props en `agencia-creativa.vue` |

**Decisiones tomadas:**
- `Hero.vue` global ganó un slot `#text` opcional (cae a la prop `text` si no se pasa) — así el typewriter vive en `AgenciaHero` sin duplicar el Hero.
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
