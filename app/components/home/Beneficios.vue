<template>
  <Section bg="bg-gradient-amarillo" class="py-16 md:py-24 lg:py-32 xxl:py-48 md:px-7 lg:px-16 xxl:px-32">

    <p class="text-xs md:text-sm text-negro-puro font-semibold tracking-[0.25em] uppercase">
      Creatividad, tecnología y producción, juntas:
    </p>

    <h2
      class="max-w-260 text-center text-negro-puro text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.35] px-2">
      <template v-for="(b, i) in beneficios" :key="b.title">
        <span v-if="i > 0">{{ i === beneficios.length - 1 ? ' y con ' : ', ' }}</span>
        <span tabindex="0"
          :class="i % 2 === 1 ? 'hover:rotate-2 focus-visible:rotate-2' : 'hover:-rotate-2 focus-visible:-rotate-2'"
          class="group inline-block relative bg-negro rounded-2xl lg:rounded-3xl text-amarillo whitespace-nowrap cursor-default transition-transform duration-300 hover:scale-[1.03] outline-none px-3 lg:px-5 py-0.5 lg:py-1">
          {{ b.title.toLowerCase() }}
          <span
            class="w-64 lg:w-72 absolute left-1/2 bottom-[calc(100%+0.75rem)] z-20 -translate-x-1/2 bg-negro-puro rounded-2xl text-blanco text-sm lg:text-base font-medium normal-case whitespace-normal shadow-amarilla opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-all duration-300 pointer-events-none p-4 lg:p-5">
            <Icon :name="b.icon" class="size-5! text-amarillo mb-2" />
            <span class="block">{{ b.text }}</span>
          </span>
        </span>
      </template>
      <span>.</span>
    </h2>

    <p class="text-lg lg:text-xl text-negro-puro font-medium text-center">
      El mismo equipo, el mismo criterio y la misma visión de tu marca.
    </p>

    <ButtonPrimary to="#servicios" variant="dark">Conoce como trabajamos</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/home'
</script>
