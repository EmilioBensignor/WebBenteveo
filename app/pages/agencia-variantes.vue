<template>
  <AgenciaHero />
  <component :is="secciones[frase].comp" :key="`frase-${frase}`" />

  <Teleport to="body">
    <div
      class="w-max max-w-[calc(100vw-2rem)] flex flex-col gap-2 fixed bottom-4 left-1/2 -translate-x-1/2 z-70 glass rounded-2xl px-4 py-3">
      <div class="flex items-center gap-2">
        <span class="w-14 text-hueso/60 text-xs font-light shrink-0">Frases</span>
        <button v-for="(opcion, i) in secciones" :key="opcion.nombre" type="button" :title="opcion.nombre"
          class="size-8 flex justify-center items-center rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer"
          :class="frase === i ? 'bg-amarillo text-negro' : 'text-hueso lg:hover:bg-white/10'" @click="frase = i">
          {{ i + 1 }}
        </button>
      </div>
      <p class="text-hueso/60 text-xs font-light text-center pt-1">{{ secciones[frase].nombre }}</p>
    </div>
  </Teleport>
</template>

<script setup>
import { AgenciaFrasesV1, AgenciaFrasesV2, AgenciaFrasesV3, AgenciaFrasesV4, AgenciaFrasesV5 } from '#components'

const secciones = [
  { nombre: 'Globitos', comp: AgenciaFrasesV1 },
  { nombre: 'Cintas', comp: AgenciaFrasesV2 },
  { nombre: 'Lista + respuesta', comp: AgenciaFrasesV3 },
  { nombre: 'Stack sticky', comp: AgenciaFrasesV4 },
  { nombre: 'Quote + índice', comp: AgenciaFrasesV5 }
]

const frase = ref(0)

useSeoMeta({ title: 'Agencia · variantes', robots: 'noindex, nofollow' })
useHead({ bodyAttrs: { class: 'page-agencia' } })
</script>

<style>
body.page-agencia main {
  gap: 0;
}
</style>
