<template>
  <div class="w-full relative overflow-hidden">
    <div class="w-max flex items-center gap-1 md:gap-4 animate-marquee">
      <span v-for="(logo, i) in track" :key="i"
        class="size-23 md:size-30 xxl:size-32 shrink-0 relative border border-hueso/40 rounded-2xl lg:rounded-3xl shadow-[-4px_6px_32px_0_#171b21] overflow-hidden">
        <img :src="logo" alt="" class="size-full object-cover" loading="lazy" decoding="async" width="128" height="128">
        <span
          class="absolute inset-0 rounded-[inherit] shadow-[inset_-2px_2px_20px_0_rgba(0,18,22,0.7),inset_4px_-4px_20px_0_rgba(1,17,21,0.7)]" />
        <img src="/img/marcas/reflejo.svg" alt="" aria-hidden="true"
          class="w-[78%] h-[78%] absolute left-[13%] top-[2%] pointer-events-none" loading="lazy" decoding="async">
      </span>
    </div>

    <div class="w-12 lg:w-32 absolute inset-y-0 left-0 z-10 bg-linear-to-r from-negro from-20% to-transparent" />
    <div class="w-12 lg:w-32 absolute inset-y-0 right-0 z-10 bg-linear-to-l from-negro from-20% to-transparent" />
  </div>
</template>

<script setup>
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
