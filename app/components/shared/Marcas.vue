<template>
  <div class="w-full relative h-12 overflow-hidden">
    <div class="w-max flex items-center gap-10 md:gap-20 animate-marquee">
      <img v-for="(logo, i) in track" :key="i" :src="logo.src" :width="logo.w" :height="logo.h" alt=""
        loading="lazy" decoding="async" class="w-auto h-8 md:h-12 shrink-0 object-contain">
    </div>
    <div class="w-16 lg:w-40 absolute inset-y-0 left-0 z-10 bg-linear-to-r from-33% to-transparent" :class="from" />
    <div class="w-16 lg:w-40 absolute inset-y-0 right-0 z-10 bg-linear-to-l from-33% to-transparent" :class="from" />
  </div>
</template>

<script setup>
defineProps({
  from: { type: String, default: 'from-negro' }
})

const logos = [
  ['ajinomoto_logo', 138, 100],
  ['barbieri_logo', 260, 37],
  ['bayer_logo', 98, 100],
  ['bosch_logo', 522, 200],
  ['canal_fox_logo', 158, 100],
  ['danica_logo', 260, 86],
  ['fruttami_logo', 123, 100],
  ['fundacion_argentina_de_mieloma_logo', 260, 100],
  ['incose_logo', 522, 200],
  ['klaukol_logo', 260, 58],
  ['mapei', 251, 60],
  ['mercadopago_logo', 260, 66],
  ['paty_logo', 135, 100],
  ['qualy_logo', 234, 99],
  ['red_link', 98, 100],
  ['revear_logo', 260, 48],
  ['sadia_logo', 194, 100],
  ['sika_logo', 260, 65],
  ['sodimac_logo', 248, 40],
  ['tour_experto_logo', 522, 200],
  ['un_minuto_de_vos_logo', 138, 100],
  ['unike_group_logo', 522, 200],
  ['vasser_logo', 260, 59],
  ['vietur_logo', 260, 70]
].map(([name, w, h]) => ({ src: `/img/marcas/${name}.webp`, w, h }))
const track = [...logos, ...logos]
</script>
