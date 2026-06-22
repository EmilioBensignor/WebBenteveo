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
| `UiAccordion` | Accordion animado con `grid-rows` transition. Prop `question`, contenido via slot |
| `FormField` | Input genérico con `v-model`, `type`, `placeholder`, `error`, `autocomplete`. Muestra error debajo si se pasa |

## Estructura de componentes

```
app/components/
  carousel/Static.vue       # CarouselStatic
  form/Field.vue            # FormField
  heading/H2.vue H3.vue
  button/Primary.vue        # ButtonPrimary
  opinion/Card.vue          # OpinionCard
  proceso/Card.vue          # ProcesoCard
  ui/Accordion.vue          # UiAccordion
  transformacion/           # Secciones de la landing /transformacion-tecnologica
```

## Constantes

Datos de contenido en `app/constants/`:
- `transformacion.js` — `opiniones`, `proceso`, `faqs`, `metrics`, etc.
- `routes.js` — `ROUTE_NAMES` para rutas tipadas

## Páginas

| Ruta | Estado |
|---|---|
| `/` | En progreso (home) |
| `/transformacion-tecnologica` | Landing lista, pendiente revisión responsive |

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
