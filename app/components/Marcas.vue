<template>
  <div class="w-full relative h-12 overflow-hidden">
    <div class="w-max flex items-center gap-10 md:gap-20 animate-marquee">
      <img v-for="(logo, i) in track" :key="i" :src="logo" alt=""
        class="w-auto h-8 md:h-12 shrink-0 object-contain">
    </div>
    <div
      class="absolute inset-y-0 left-0 w-16 lg:w-40 bg-[linear-gradient(90deg,#000000_33%,rgba(0,0,0,0)_100%)] z-10" />
    <div
      class="absolute inset-y-0 right-0 w-16 lg:w-40 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#000000_67%)] z-10" />
  </div>
</template>

<script setup>
const logos = [
  'ajinomoto_logo',
  'barbieri_logo',
  'bayer_logo',
  'canal_fox_logo',
  'danica_logo',
  'fruttami_logo',
  'fundacion_argentina_de_mieloma_logo',
  'klaukol_logo',
  'mapei',
  'mercadopago_logo',
  'paty_logo',
  'qualy_logo',
  'red_link',
  'revear_logo',
  'sadia_logo',
  'sika_logo',
  'sodimac_logo',
  'un_minuto_de_vos_logo',
  'vasser_logo',
  'vietur_logo'
].map(name => `/img/marcas/${name}.webp`)
const track = [...logos, ...logos]
</script>
