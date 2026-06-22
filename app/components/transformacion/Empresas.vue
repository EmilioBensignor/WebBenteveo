<template>
  <Section class="px-7">
    <HeadingH2 class="text-center text-amarillo">Confían en nosotros</HeadingH2>

    <div class="w-full relative h-12 overflow-hidden">
      <div class="w-max flex items-center gap-10 md:gap-8 animate-marquee">
        <img v-for="(logo, i) in track" :key="i" :src="logo" alt=""
          class="w-24 md:w-40 lg:w-48 xxl:w-52 h-8 md:h-12 shrink-0 object-contain" width="96" height="32">
      </div>
      <div
        class="absolute inset-y-0 left-0 w-16 lg:w-40 bg-[linear-gradient(90deg,#000000_33%,rgba(0,0,0,0)_100%)] z-10" />
      <div
        class="absolute inset-y-0 right-0 w-16 lg:w-40 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#000000_67%)] z-10" />
    </div>
  </Section>
</template>

<script setup>
const logos = [
  '/img/transformacion/empresa-1.png',
  '/img/transformacion/empresa-2.png',
  '/img/transformacion/empresa-3.png'
]
const track = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos]
</script>
