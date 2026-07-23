<template>
  <Section bg="bg-amarillo" class="px-4 md:px-7 lg:px-16 xxl:px-30 py-14 md:py-16 lg:py-24">
    <template #background>
      <div class="w-full h-16 md:h-20 absolute top-0 left-0 bg-linear-to-b from-negro to-transparent" />
      <div class="w-full h-16 md:h-20 absolute bottom-0 left-0 bg-linear-to-t from-negro to-transparent" />
    </template>
    <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
      <HeadingH2 class="text-negro-puro font-bold">Mira cómo funciona en la práctica</HeadingH2>
      <p class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 lg:text-xl text-negro font-medium"
        v-html="pasos.subtitulo" />
    </div>

    <PasosTimeline class="mt-2 md:mt-8" :items="items" line-track="bg-negro-puro/15" line-fill="bg-negro-puro"
      dot-halo="bg-negro-puro/20" dot-on="bg-negro-puro" dot-off="bg-negro-puro/30"
      image-shadow="shadow-[0_0_18px_0_rgba(0,0,0,0.25)]" image-border="border-negro-puro/20"
      number-class="text-negro-puro" title-class="text-negro-puro" />

    <p class="text-center lg:text-xl text-negro-puro font-medium">Otras automatizaciones para {{ nombre }}</p>

    <CarouselStatic class="w-[calc(100%+2rem)] md:w-full -mx-4 md:mx-0"
      :slides-per-view="{ base: 1.2, sm: 1.5, tab: 2.2, md: 3, lg: 3, xl: 3, xxl: 3 }">
      <div v-for="a in automatizaciones" :key="a.titulo"
        class="flex flex-col gap-4 lg:gap-6 bg-negro rounded-2xl p-4 md:p-6">
        <span class="size-14 lg:size-18 flex items-center justify-center bg-amarillo/10 rounded-full text-amarillo">
          <Icon :name="a.icon" class="size-8! lg:size-12!" />
        </span>
        <div class="flex flex-col gap-3 md:gap-4">
          <HeadingH3 class="text-amarillo font-bold">{{ a.titulo }}</HeadingH3>
          <p class="text-sm lg:text-base text-blanco font-medium">{{ a.texto }}</p>
        </div>
      </div>
    </CarouselStatic>
  </Section>
</template>

<script setup>
const props = defineProps({
  pasos: { type: Object, required: true },
  automatizaciones: { type: Array, required: true },
  nombre: { type: String, required: true }
})

const items = computed(() => props.pasos.items.map((p) => ({ title: p.texto, image: p.imagen })))
</script>
