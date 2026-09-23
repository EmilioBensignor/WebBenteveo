<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <div class="flex flex-col items-center gap-3 lg:gap-4 text-center">
      <UiHeadingH2 class="text-balance">
        Todo lo que tu marca necesita para crecer.
      </UiHeadingH2>
      <p class="text-hueso text-sm lg:text-base font-light leading-[1.4] text-balance">
        Una estrategia, un solo equipo. Más velocidad, más control y mejores resultados.
      </p>
    </div>

    <div class="w-full flex flex-col lg:flex-row gap-2 lg:gap-3">
      <button v-for="(servicio, i) in servicios" :key="servicio.title" type="button"
        class="sobre-media max-lg:w-full lg:h-80 flex flex-col justify-end relative border border-blanco/33 rounded-2xl text-left transition-[height,flex-grow] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] cursor-pointer overflow-hidden p-px"
        :class="activo === i ? 'h-72 lg:flex-[1.6] xl:flex-[2.2]' : 'h-16 md:h-20 lg:flex-1'" :aria-expanded="activo === i"
        @click="activo = i" @mouseenter="enHover(i)">
        <NuxtImg :src="servicio.image" alt="" format="avif" sizes="xs:100vw md:100vw lg:480px" loading="lazy"
          class="size-full absolute inset-0 object-cover transition-all duration-700"
          :class="activo === i ? 'opacity-100 scale-100' : 'opacity-40 scale-105'" />
        <div class="absolute inset-0 bg-linear-to-b from-black/85 via-black/30 to-black/90" />

        <div class="flex flex-col gap-2 absolute inset-x-0 top-0 z-10 p-4 lg:p-4 xl:p-6">
          <h3 class="text-hueso text-base xl:text-xl leading-[1.2]">{{ servicio.title }}</h3>

          <div class="grid transition-[grid-template-rows] duration-500"
            :class="activo === i ? 'grid-rows-[1fr] lg:delay-300' : 'grid-rows-[0fr]'">
            <div class="overflow-hidden">
              <p class="text-hueso text-sm xl:text-base font-light leading-[1.4] transition-opacity duration-500"
                :class="activo === i ? 'opacity-100 lg:delay-500' : 'opacity-0'">
                {{ servicio.text }}
              </p>
            </div>
          </div>
        </div>

        <span
          class="relative text-[5.5rem] lg:text-[8rem] font-bold transition-all duration-500 -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4"
          :class="activo === i
            ? 'text-amarillo [-webkit-text-stroke:1px_transparent]'
            : 'max-lg:opacity-0 text-transparent [-webkit-text-stroke:1px_rgba(252,183,22,0.45)]'">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
      </button>
    </div>
  </DefaultSection>
</template>

<script setup>
import { servicios } from '~/constants/agencia'

const activo = ref(0)

function enHover(i) {
  if (window.matchMedia('(min-width: 1080px)').matches) activo.value = i
}
</script>
