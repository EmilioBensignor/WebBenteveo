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

    <div class="w-full max-w-260 bg-negro-puro rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.35)] overflow-hidden">
      <div class="flex items-center gap-2 bg-negro px-4 pt-3">
        <span class="flex gap-1.5 shrink-0 pb-3 pr-2">
          <span class="size-2.5 bg-blanco/20 rounded-full" />
          <span class="size-2.5 bg-blanco/20 rounded-full" />
          <span class="size-2.5 bg-amarillo rounded-full" />
        </span>
        <div class="flex-1 flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button v-for="(paso, i) in pasos.items" :key="paso.texto" type="button"
            class="max-w-44 lg:max-w-none flex items-center gap-2 shrink-0 rounded-t-lg text-xs lg:text-sm font-semibold transition-colors cursor-pointer px-3 lg:px-4 py-2"
            :class="active === i ? 'bg-amarillo text-negro-puro' : 'bg-blanco/5 text-blanco/50 hover:text-blanco'"
            @click="active = i">
            <span class="tabular-nums">{{ i + 1 }}.</span>
            <span class="truncate">{{ paso.texto }}</span>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2 bg-negro border-b border-blanco/10 px-4 py-2">
        <Icon name="material-symbols:lock-outline" size="14" class="text-blanco/40" />
        <span class="text-blanco/40 text-xs font-medium truncate">benteveo.com/automatizaciones/{{ slug }}</span>
      </div>
      <div class="w-full aspect-16/10 relative">
        <NuxtImg v-for="(paso, i) in pasos.items" :key="paso.imagen" :src="paso.imagen" :alt="paso.texto"
          class="absolute inset-0 size-full object-cover object-top transition-opacity duration-500"
          :class="active === i ? 'opacity-100' : 'opacity-0'" />
      </div>
    </div>
  </Section>
</template>

<script setup>
const props = defineProps({
  pasos: { type: Object, required: true },
  nombre: { type: String, default: '' }
})

const active = ref(0)
const slug = computed(() => props.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'))
</script>
