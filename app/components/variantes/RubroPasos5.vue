<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30 py-14 md:py-16 lg:py-24" inner="gap-0">
    <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
      <HeadingH2 class="text-blanco font-bold">Mira cómo funciona <span class="text-amarillo">en la práctica</span>
      </HeadingH2>
      <p class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 lg:text-xl text-blanco font-medium"
        v-html="pasos.subtitulo" />
    </div>

    <div class="w-full max-w-280 relative flex flex-col items-center">
      <span
        class="hollow max-w-full absolute top-6 md:top-2 left-1/2 -translate-x-1/2 text-center text-[3.2rem] md:text-[5rem] lg:text-[7rem] font-bold leading-none uppercase whitespace-nowrap overflow-hidden pointer-events-none">
        Paso {{ active + 1 }}
      </span>

      <div
        class="w-full max-w-220 relative mt-16 md:mt-20 lg:mt-28 [mask-image:radial-gradient(ellipse_85%_85%_at_50%_50%,#000_55%,transparent_98%)]">
        <NuxtImg :src="pasos.items[0].imagen" :alt="pasos.items[0].texto" class="w-full opacity-0" />
        <NuxtImg v-for="(paso, i) in pasos.items" :key="paso.imagen" :src="paso.imagen" :alt="paso.texto"
          class="absolute inset-0 size-full object-cover transition-opacity duration-700"
          :class="active === i ? 'opacity-100' : 'opacity-0'" />
      </div>

      <p class="min-h-14 max-w-120 text-center text-blanco text-lg lg:text-2xl font-semibold mt-6">
        {{ pasos.items[active].texto }}
      </p>

      <div class="flex items-center gap-3 lg:gap-4 mt-6">
        <button v-for="(paso, i) in pasos.items" :key="paso.texto" type="button" :aria-label="paso.texto"
          class="size-9 lg:size-11 flex items-center justify-center rounded-full border text-sm lg:text-base font-bold tabular-nums transition-all duration-300 cursor-pointer"
          :class="active === i
            ? 'bg-amarillo border-amarillo text-negro-puro scale-110'
            : 'border-blanco/30 text-blanco/50 hover:border-amarillo/60 hover:text-blanco'"
          @click="active = i">
          {{ i + 1 }}
        </button>
      </div>
    </div>
  </Section>
</template>

<script setup>
defineProps({
  pasos: { type: Object, required: true }
})

const active = ref(0)
</script>

<style scoped>
.hollow {
  color: transparent;
  -webkit-text-stroke: 1px rgba(252, 183, 22, 0.4);
}
</style>
