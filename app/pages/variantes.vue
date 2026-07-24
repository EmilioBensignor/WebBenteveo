<template>
  <div class="sticky top-0 z-50 w-full flex items-center gap-1 bg-negro-puro/90 backdrop-blur-md border-b border-blanco/10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 py-3">
    <a v-for="g in grupos" :key="g.id" :href="`#${g.id}`"
      class="shrink-0 rounded-full text-xs font-semibold text-blanco/60 hover:text-amarillo whitespace-nowrap transition-colors px-3 py-1.5">
      {{ g.nombre }}
    </a>
  </div>

  <template v-for="g in grupos" :key="g.id">
    <h2 :id="g.id"
      class="w-full bg-amarillo text-negro-puro text-sm lg:text-base font-bold tracking-[0.2em] uppercase scroll-mt-14 px-4 md:px-7 lg:px-16 py-3">
      {{ g.nombre }}
    </h2>

    <template v-for="(v, i) in g.variantes" :key="v.titulo">
      <p
        class="w-full bg-negro-puro border-y border-blanco/10 text-blanco/50 text-xs lg:text-sm font-semibold tracking-widest uppercase px-4 md:px-7 lg:px-16 py-2">
        V{{ i + 1 }} · {{ v.titulo }}
      </p>
      <component :is="v.comp" v-bind="v.props || {}" />
    </template>
  </template>
</template>

<script setup>
import { rubros } from '~/constants/rubros'
import {
  VariantesHomeBeneficios1, VariantesHomeBeneficios2, VariantesHomeBeneficios3,
  VariantesHomeBeneficios4, VariantesHomeBeneficios5,
  VariantesTransformacionHoras1, VariantesTransformacionHoras2, VariantesTransformacionHoras3,
  VariantesTransformacionHoras4, VariantesTransformacionHoras5,
  VariantesTransformacionBeneficios1, VariantesTransformacionBeneficios2, VariantesTransformacionBeneficios3,
  VariantesTransformacionBeneficios4, VariantesTransformacionBeneficios5,
  VariantesRubroPasos1, VariantesRubroPasos2, VariantesRubroPasos3,
  VariantesRubroPasos4, VariantesRubroPasos5,
  VariantesEventosNecesidades1, VariantesEventosNecesidades2, VariantesEventosNecesidades3,
  VariantesEventosNecesidades4, VariantesEventosNecesidades5
} from '#components'

const pasosProps = { pasos: rubros.salud.pasos, nombre: rubros.salud.nombre }

const grupos = [
  {
    id: 'home-beneficios',
    nombre: 'Home / Beneficios',
    variantes: [
      { titulo: 'Editorial asimétrico con índice', comp: VariantesHomeBeneficios1 },
      { titulo: 'Columnas que se expanden con hover', comp: VariantesHomeBeneficios2 },
      { titulo: 'Spotlight que sigue el cursor', comp: VariantesHomeBeneficios3 },
      { titulo: 'Deck apilado que se despliega al scrollear', comp: VariantesHomeBeneficios4 },
      { titulo: 'Tipografía gigante con keywords interactivas', comp: VariantesHomeBeneficios5 }
    ]
  },
  {
    id: 'horas-perdidas',
    nombre: 'Transformación / Horas perdidas',
    variantes: [
      { titulo: 'Contador de horas + máscara radial', comp: VariantesTransformacionHoras1 },
      { titulo: 'Visor de cámara con corner brackets', comp: VariantesTransformacionHoras2 },
      { titulo: 'Split diagonal con reveals', comp: VariantesTransformacionHoras3 },
      { titulo: 'Marquee hollow + banda amarilla', comp: VariantesTransformacionHoras4 },
      { titulo: 'Checklist que se tacha sola', comp: VariantesTransformacionHoras5 }
    ]
  },
  {
    id: 'transformacion-beneficios',
    nombre: 'Transformación / Beneficios',
    variantes: [
      { titulo: 'Zig-zag editorial con números hollow', comp: VariantesTransformacionBeneficios1 },
      { titulo: 'Accordion numerado', comp: VariantesTransformacionBeneficios2 },
      { titulo: 'Cards sticky que se apilan', comp: VariantesTransformacionBeneficios3 },
      { titulo: 'Bento asimétrico', comp: VariantesTransformacionBeneficios4 },
      { titulo: 'Tabs autoplay con barra de progreso', comp: VariantesTransformacionBeneficios5 }
    ]
  },
  {
    id: 'rubro-pasos',
    nombre: 'Rubro / Pasos (data: salud)',
    variantes: [
      { titulo: 'Split vertical con progreso autoplay', comp: VariantesRubroPasos1, props: pasosProps },
      { titulo: 'Scrollytelling con imagen sticky', comp: VariantesRubroPasos2, props: pasosProps },
      { titulo: 'Números gigantes hollow', comp: VariantesRubroPasos3, props: pasosProps },
      { titulo: 'Ventana de browser con pestañas', comp: VariantesRubroPasos4, props: pasosProps },
      { titulo: 'Máscara radial + título fantasma', comp: VariantesRubroPasos5, props: pasosProps }
    ]
  },
  {
    id: 'eventos-necesidades',
    nombre: 'Eventos / Necesidades',
    variantes: [
      { titulo: 'Lista viva con wipe amarillo', comp: VariantesEventosNecesidades1 },
      { titulo: 'Checklist animada en dos columnas', comp: VariantesEventosNecesidades2 },
      { titulo: 'Tickets de pedido apilados', comp: VariantesEventosNecesidades3 },
      { titulo: 'Split sticky con lista numerada', comp: VariantesEventosNecesidades4 },
      { titulo: 'Marquee doble de pills', comp: VariantesEventosNecesidades5 }
    ]
  }
]

useSeoMeta({
  title: 'Variantes',
  robots: 'noindex, nofollow'
})
</script>
