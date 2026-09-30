<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24"
    inner="gap-8! lg:gap-12!">
    <div class="w-full flex flex-col items-center gap-4 text-center">
      <UiHeadingH2 class="text-balance">
        Normativa europea en cada proyecto
      </UiHeadingH2>
      <p class="text-hueso text-sm lg:text-base font-light leading-normal text-balance">
        Trabajamos bajo las normativas europeas de protección de datos en todas las regiones donde operamos, aún en las que todavía no hay leyes al respecto.
      </p>
    </div>

    <ul class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      <li v-for="(n, i) in normativas" :key="n.nombre"
        class="flex flex-col relative overflow-hidden glass bg-negro/60! border-blanco/15! rounded-2xl p-px">
        <SeguridadEstrellas aria-hidden="true"
          class="size-40 lg:size-48 absolute -right-10 -top-10 lg:-right-12 lg:-top-12 text-amarillo/10 pointer-events-none" />

        <span class="flex items-center gap-1 absolute bottom-4 right-4 lg:bottom-5 lg:right-5 z-10 glass rounded-full text-hueso text-xs px-3 py-1.5">
          <Icon name="material-symbols:check-rounded" size="14" class="shrink-0 text-amarillo" />
          Aplicada
        </span>

        <div class="flex flex-col gap-1.5 relative px-5 pt-5 lg:px-6 lg:pt-6">
          <h3 class="text-hueso text-base lg:text-xl font-semibold leading-tight">{{ n.nombre }}</h3>
          <p class="text-hueso/70 text-sm font-light">{{ n.referencia }}</p>
        </div>

        <span aria-hidden="true"
          class="relative text-amarillo text-[5.5rem] lg:text-[6rem] xl:text-[8rem] font-bold mt-auto -mb-7 lg:-mb-8 xl:-mb-10 -ml-2 md:-ml-3 lg:-ml-4">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
      </li>
    </ul>
  </DefaultSection>
</template>

<script setup>
import { normativas } from '~/constants/seguridad'
</script>
