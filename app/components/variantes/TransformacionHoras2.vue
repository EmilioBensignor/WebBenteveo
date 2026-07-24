<template>
  <Section class="md:min-h-[418px] lg:min-h-154 flex py-14 md:py-20 px-4 md:px-7 lg:px-16 xxl:px-30">
    <template #background>
      <video src="/video/reloj.mp4" class="size-full object-cover" autoplay loop muted playsinline />
      <div class="absolute inset-0 bg-negro-puro/75" />
    </template>

    <div class="w-full max-w-280 relative px-2 py-10 md:px-6 md:py-14">
      <span class="size-8 lg:size-12 absolute top-0 left-0 border-t-2 border-l-2 border-amarillo" />
      <span class="size-8 lg:size-12 absolute top-0 right-0 border-t-2 border-r-2 border-amarillo" />
      <span class="size-8 lg:size-12 absolute bottom-0 left-0 border-b-2 border-l-2 border-amarillo" />
      <span class="size-8 lg:size-12 absolute bottom-0 right-0 border-b-2 border-r-2 border-amarillo" />

      <div class="flex items-center gap-2 absolute top-4 left-4 lg:top-6 lg:left-6">
        <span class="size-2 bg-amarillo rounded-full animate-pulse" />
        <span class="text-blanco text-[10px] lg:text-xs font-semibold tracking-[0.25em] uppercase">Tiempo perdido</span>
      </div>
      <span
        class="hidden md:block absolute top-4 right-4 lg:top-6 lg:right-6 text-blanco/60 text-[10px] lg:text-xs font-semibold tracking-[0.25em] uppercase tabular-nums">
        lun–vie · 40hs
      </span>

      <div class="flex flex-col items-center gap-6 lg:gap-10 pt-8 md:pt-4">
        <HeadingH2 class="max-w-120 md:max-w-116 lg:max-w-156 text-center text-blanco">
          ¿Cuántas horas pierdes por semana en cosas que
          <span class="text-amarillo">una herramienta podría hacer sola?</span>
        </HeadingH2>

        <div class="w-full flex flex-col md:flex-row md:justify-between items-start gap-4 md:gap-6 md:px-10 lg:px-16 pb-6">
          <div v-for="(item, i) in items" :key="item.text" class="flex items-center gap-3">
            <span class="text-amarillo text-xs font-bold tabular-nums">0{{ i + 1 }}</span>
            <p
              class="max-w-60 text-left text-blanco text-sm lg:text-base font-semibold leading-snug uppercase tracking-wide [text-shadow:0_0_18px_#000,0_1px_3px_#000]">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
const items = [
  { text: 'Tareas burocráticas que se repiten.' },
  { text: 'Datos que tienes pero no puedes leer ni procesar.' },
  { text: 'Procesos que tardan días y podrían tardar minutos.' }
]
</script>
