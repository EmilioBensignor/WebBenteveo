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

    <div class="w-full relative">
      <div
        class="h-px absolute top-1/2 -inset-x-4 md:inset-x-0 bg-linear-to-r from-transparent via-negro-puro via-50% to-transparent" />
      <div
        class="flex gap-3 lg:gap-4 relative overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 md:mx-0 px-4 md:px-0">
        <button v-for="(paso, i) in pasos.items" :key="paso.texto" type="button" ref="tabRefs" @click="active = i"
          class="min-w-56 md:min-w-0 md:flex-1 flex items-center gap-2 lg:gap-4 border rounded-2xl text-left shadow-amarilla transition-colors cursor-pointer p-4"
          :class="active === i ? 'bg-negro border-negro-puro' : 'bg-blanco border-blanco/33'">
          <span class="text-lg lg:text-xl font-bold" :class="active === i ? 'text-amarillo' : 'text-negro'">
            {{ i + 1 }}.
          </span>
          <span class="text-sm lg:text-base font-medium" :class="active === i ? 'text-blanco' : 'text-negro'">
            {{ paso.texto }}
          </span>
        </button>
      </div>
    </div>

    <div class="w-[calc(100%+2rem)] md:w-full relative -mx-4 md:mx-0 md:px-7 lg:px-0">
      <NuxtImg :src="pasos.items[active].imagen" :alt="pasos.items[active].texto"
        class="w-full h-72 md:h-87 object-cover md:border-3 border-negro-puro md:rounded-2xl" />
      <span
        class="size-12 flex items-center justify-center absolute top-3 left-3 md:left-10 lg:left-3 bg-negro-puro/33 rounded-full text-amarillo text-xl font-bold">
        {{ active + 1 }}
      </span>
      <button type="button" aria-label="Anterior" @click="prev"
        class="size-10 lg:size-12 flex items-center justify-center absolute top-1/2 left-3 md:left-2 lg:-left-6 -translate-y-1/2 bg-negro-puro rounded-full text-blanco cursor-pointer">
        <Icon name="material-symbols:arrow-left-rounded" size="32" />
      </button>
      <button type="button" aria-label="Siguiente" @click="next"
        class="size-10 lg:size-12 flex items-center justify-center absolute top-1/2 right-3 md:right-2 lg:-right-6 -translate-y-1/2 bg-negro-puro rounded-full text-blanco cursor-pointer">
        <Icon name="material-symbols:arrow-right-rounded" size="32" />
      </button>
    </div>

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

const active = ref(0)
const tabRefs = ref([])
const prev = () => { active.value = (active.value + props.pasos.items.length - 1) % props.pasos.items.length }
const next = () => { active.value = (active.value + 1) % props.pasos.items.length }

watch(active, (i) => {
  tabRefs.value[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
})
</script>
