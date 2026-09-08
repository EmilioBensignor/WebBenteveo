<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14"
    inner="gap-10 md:gap-14 lg:gap-20">
    <div class="w-full flex flex-col items-center gap-8 md:gap-10">
      <h2 class="max-w-72 md:max-w-none text-center text-hueso text-xl lg:text-[1.75rem] font-medium">
        Empresas que confiaron en nosotros para proyectos importantes.
      </h2>

      <div class="w-full relative overflow-hidden">
        <div class="w-max flex items-center gap-4 animate-marquee">
          <span v-for="(logo, i) in track" :key="i"
            class="size-23 md:size-30 xxl:size-32 shrink-0 border border-hueso/40 rounded-3xl shadow-[-4px_6px_32px_0_#171b21] overflow-hidden">
            <img :src="logo" alt="" class="size-full object-cover" loading="lazy">
          </span>
        </div>

        <div class="w-12 lg:w-32 absolute inset-y-0 left-0 z-10 bg-linear-to-r from-negro from-20% to-transparent" />
        <div class="w-12 lg:w-32 absolute inset-y-0 right-0 z-10 bg-linear-to-l from-negro from-20% to-transparent" />
      </div>
    </div>

    <div class="w-full flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-0">
      <template v-for="(m, i) in metrics" :key="m.label">
        <span v-if="i > 0" class="w-px h-52 hidden md:block shrink-0 linea-vertical" />

        <div class="w-full md:flex-1 flex flex-col items-center gap-3">
          <span class="text-amarillo text-5xl iph:text-6xl md:text-7xl lg:text-8xl xxl:text-[8rem] font-bold leading-none">
            {{ m.value }}
          </span>
          <p class="text-center text-hueso text-base md:text-xl lg:text-2xl xxl:text-[2rem] font-medium">
            {{ m.label }}
          </p>
        </div>
      </template>
    </div>
  </DefaultSection>
</template>

<script setup>
import { metrics } from '~/constants/home'

const logos = [
  'bayer.png',
  'tour-experto.png',
  'sodimac.jpg',
  'paty.jpg',
  'mercadopago.jpg',
  'mapei.jpg',
  'klaukol.jpg',
  'bosch.png',
  'sika.jpg'
].map((file) => `/img/marcas/color/${file}`)

const track = [...logos, ...logos]
</script>
