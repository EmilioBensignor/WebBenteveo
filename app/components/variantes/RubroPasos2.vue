<template>
  <Section class="overflow-visible! px-4 md:px-7 lg:px-16 xxl:px-30 py-14 md:py-16 lg:py-24">
    <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
      <HeadingH2 class="text-blanco font-bold">Mira cómo funciona <span class="text-amarillo">en la práctica</span>
      </HeadingH2>
      <p class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 lg:text-xl text-blanco font-medium"
        v-html="pasos.subtitulo" />
    </div>

    <div class="w-full max-w-300 grid md:grid-cols-2 gap-8 lg:gap-16">
      <div class="flex flex-col gap-16 md:gap-0">
        <div v-for="(paso, i) in pasos.items" :key="paso.texto" ref="stepRefs"
          class="md:min-h-120 flex flex-col justify-center gap-4 transition-opacity duration-500"
          :class="active === i ? 'md:opacity-100' : 'md:opacity-30'">
          <span class="text-6xl lg:text-8xl text-amarillo font-bold leading-none tabular-nums">{{ i + 1 }}</span>
          <p class="max-w-100 text-blanco text-lg lg:text-2xl font-semibold leading-snug">{{ paso.texto }}</p>
          <NuxtImg :src="paso.imagen" :alt="paso.texto"
            class="w-full md:hidden border-2 border-blanco/20 rounded-2xl" />
        </div>
      </div>

      <div class="hidden md:block">
        <div class="aspect-16/11 sticky top-24 lg:top-28 bg-negro-puro border-3 border-blanco/20 rounded-2xl overflow-hidden">
          <NuxtImg v-for="(paso, i) in pasos.items" :key="paso.imagen" :src="paso.imagen" :alt="paso.texto"
            class="absolute inset-0 size-full object-cover object-top transition-all duration-500"
            :class="active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'" />
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
defineProps({
  pasos: { type: Object, required: true }
})

const stepRefs = ref([])
const active = ref(0)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) active.value = stepRefs.value.indexOf(entry.target)
    }
  }, { threshold: 0.6 })
  stepRefs.value.forEach((el) => observer.observe(el))
  onBeforeUnmount(() => observer.disconnect())
})
</script>
