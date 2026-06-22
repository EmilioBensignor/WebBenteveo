<template>
  <Section>
    <HeadingH2 class="text-center text-amarillo">Confían en nosotros</HeadingH2>

    <div class="w-full relative h-12 overflow-hidden">
      <div v-for="offset in [0, 1]" :key="offset"
        class="absolute top-0 w-full h-full flex items-center justify-around animate-marquee"
        :style="{ left: offset * 100 + '%' }">
        <img v-for="(logo, i) in logos" :key="i" :src="logo" alt="" class="h-8 w-24 shrink-0 object-contain" width="96" height="32">
      </div>
      <div class="absolute inset-y-0 left-0 w-16 lg:w-40 bg-linear-to-r from-negro to-transparent z-10" />
      <div class="absolute inset-y-0 right-0 w-16 lg:w-40 bg-linear-to-l from-negro to-transparent z-10" />
    </div>
  </Section>
</template>

<script setup>
const logos = [
  '/img/transformacion/empresa-1.png',
  '/img/transformacion/empresa-2.png',
  '/img/transformacion/empresa-3.png'
]
</script>
