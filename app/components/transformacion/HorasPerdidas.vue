<template>
  <Section class="md:min-h-[418px] lg:min-h-154 flex py-14 md:py-0 px-4 md:px-7 lg:px-16 xxl:px-30" inner="md:gap-4 lg:gap-6 xxl:gap-12">
    <template #background>
      <video src="/video/reloj.mp4" class="size-full object-cover" autoplay loop muted playsinline />
      <div class="absolute inset-0 bg-black/75" />
      <div
        class="absolute inset-0 md:hidden bg-linear-to-b from-negro-puro via-transparent to-negro-puro" />
      <div
        class="w-full h-50 lg:h-75 hidden md:block absolute inset-x-0 top-0 bg-linear-to-b from-negro-puro to-transparent" />
      <div
        class="w-full h-50 lg:h-75 hidden md:block absolute inset-x-0 bottom-0 bg-linear-to-t from-negro-puro to-transparent" />
    </template>

    <HeadingH2 class="max-w-120 md:max-w-116 lg:max-w-156 text-center">
      ¿Cuántas horas pierdes por semana en cosas que
      <span class="text-amarillo">una herramienta podría hacer sola?</span>
    </HeadingH2>

    <div class="flex flex-col md:flex-row md:justify-center items-start gap-4 md:gap-8 lg:gap-12 xxl:gap-16 lg:mt-4">
      <div v-for="item in items" :key="item.text" class="flex items-center gap-2 lg:gap-4">
        <span class="flex items-center justify-center rounded-full bg-amarillo/10 p-3 backdrop-blur-[2px]">
          <Icon :name="item.icon" size="24" class="text-amarillo" />
        </span>
        <p
          class="max-w-58 lg:max-w-60 text-blanco text-sm lg:text-base font-semibold leading-snug text-left [text-shadow:0_0_18px_#000,0_1px_3px_#000]">
          {{ item.text }}
        </p>
      </div>
    </div>
  </Section>
</template>

<script setup>
const items = [
  { icon: 'material-symbols:repeat-rounded', text: 'Tareas burocráticas que se repiten.' },
  { icon: 'material-symbols:leaderboard-outline-rounded', text: 'Datos que tienes pero no puedes leer ni procesar.' },
  { icon: 'material-symbols:local-fire-department-outline-rounded', text: 'Procesos que tardan días y podrían tardar minutos.' }
]
</script>
