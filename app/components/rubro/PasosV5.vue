<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 text-center">
      <UiHeadingH2>Mira cómo funciona <span class="text-amarillo">en la práctica</span></UiHeadingH2>
      <p class="max-w-190 lg:max-w-230 text-hueso text-sm lg:text-base leading-normal font-light"
        v-html="pasos.subtitulo" />
    </div>

    <ol ref="root" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-6 xl:gap-8">
      <li v-for="(paso, i) in pasos.items" :key="paso.texto"
        class="group flex flex-col gap-4 relative transition-all duration-700 ease-out"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        :style="{ transitionDelay: `${i * 150}ms`, zIndex: pasos.items.length - i }">
        <div class="relative">
          <div class="w-full aspect-[4/3] lg:aspect-[4/5] relative border border-blanco/33 rounded-2xl overflow-hidden bg-black transition-colors duration-300 md:group-hover:border-amarillo">
            <NuxtImg :src="paso.imagen" :alt="paso.texto" format="avif" loading="lazy"
              sizes="xs:100vw sm:100vw md:50vw lg:25vw xxl:360px"
              class="size-full absolute inset-0 object-cover transition-transform duration-700 md:group-hover:scale-105" />
            <span
              class="size-10 lg:size-12 flex justify-center items-center absolute top-3 left-3 lg:top-4 lg:left-4 glass rounded-full text-hueso text-sm lg:text-base font-bold tabular-nums">
              {{ i + 1 }}
            </span>
          </div>

          <span v-if="i < pasos.items.length - 1"
            class="hidden lg:flex size-10 xl:size-12 justify-center items-center absolute top-1/2 -right-3 xl:-right-4 translate-x-1/2 -translate-y-1/2 z-10 glass-boton rounded-full text-amarillo">
            <Icon name="material-symbols:arrow-forward-rounded" class="size-5! xl:size-6!" />
          </span>
        </div>

        <div class="flex items-start gap-3">
          <span class="w-6 h-px shrink-0 bg-amarillo mt-3" />
          <p class="text-hueso text-base lg:text-lg leading-[1.3]">{{ paso.texto }}</p>
        </div>
      </li>
    </ol>
  </DefaultSection>
</template>

<script setup>
defineProps({
  pasos: { type: Object, required: true }
})

const root = ref(null)
const visible = ref(false)

let observer
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    visible.value = true
    observer.disconnect()
  }, { threshold: 0.2 })
  observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>
