<template>
  <div class="bg-negro">
    <header class="min-h-[35vh] flex flex-col justify-center items-center gap-2 text-center px-4">
      <h1 class="text-2xl md:text-4xl text-blanco font-bold">Variantes de <span class="text-amarillo">Pasos</span></h1>
      <p class="text-sm md:text-base text-gris font-medium">Cuatro timelines que acompañan el scroll, cada una con una técnica distinta.</p>
    </header>

    <template v-for="v in variantes" :key="v.n">
      <div class="flex flex-col items-center gap-1 text-center px-4 py-16 md:py-24">
        <span class="text-xs text-amarillo font-semibold uppercase tracking-widest">Variante {{ v.n }}</span>
        <span class="text-lg md:text-xl text-blanco font-bold">{{ v.name }}</span>
        <span class="text-sm text-gris">{{ v.tech }}</span>
      </div>
      <component :is="v.component" />
    </template>

    <div class="h-[30vh]" />
  </div>
</template>

<script setup>
import { AgenciaPasosV1, AgenciaPasosV2, AgenciaPasosV4 } from '#components'

const variantes = [
  { n: 1, name: 'Timeline vertical', tech: 'Línea de progreso que se llena + cards alternadas que se revelan', component: AgenciaPasosV1 },
  { n: 2, name: 'Escenas fijas', tech: 'Sección sticky: el scroll avanza los pasos con panel de imagen y texto que rotan', component: AgenciaPasosV2 },
  { n: 4, name: 'Recorrido horizontal', tech: 'Sticky con track horizontal que se traslada + contador y barra de progreso', component: AgenciaPasosV4 }
]

useSeoMeta({ title: 'Variantes Pasos', robots: 'noindex' })
</script>
