<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 overflow-visible! px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-4">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 text-center">
      <UiHeadingH2>Mira cómo funciona <span class="text-amarillo">en la práctica</span></UiHeadingH2>
      <p class="max-w-190 lg:max-w-230 text-hueso text-sm lg:text-base leading-normal font-light"
        v-html="pasos.subtitulo" />
    </div>

    <div class="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-12 xl:gap-16">
      <ol class="flex flex-col gap-10 lg:gap-0">
        <li v-for="(paso, i) in pasos.items" :key="paso.texto" ref="stepRefs" :data-index="i"
          class="flex flex-col justify-center gap-4 lg:min-h-[70vh]">
          <div class="flex items-center gap-4 lg:gap-5">
            <span class="text-5xl lg:text-7xl font-bold leading-none tabular-nums transition-colors duration-500"
              :class="active === i ? 'text-amarillo' : 'lg:text-hueso/15 text-amarillo'">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="flex-1 h-px linea-horizontal transition-opacity duration-500"
              :class="active === i ? 'opacity-100' : 'lg:opacity-20'" />
          </div>
          <p class="text-lg lg:text-3xl leading-[1.25] font-medium transition-colors duration-500"
            :class="active === i ? 'text-hueso' : 'lg:text-hueso/25 text-hueso'">
            {{ paso.texto }}
          </p>
          <div class="lg:hidden w-full aspect-[1375/700] relative border border-blanco/33 rounded-2xl overflow-hidden bg-black">
            <NuxtImg :src="paso.imagen" :alt="paso.texto" format="avif" sizes="xs:100vw sm:100vw md:100vw"
              loading="lazy" class="size-full absolute inset-0 object-cover" />
          </div>
        </li>
      </ol>

      <div class="hidden lg:block relative">
        <div class="h-dvh flex items-center sticky top-0">
          <div class="w-full aspect-square xl:aspect-[5/4] relative border border-blanco/33 rounded-2xl overflow-hidden bg-black">
            <NuxtImg v-for="(paso, i) in pasos.items" :key="paso.imagen" :src="paso.imagen" :alt="paso.texto"
              format="avif" sizes="lg:60vw xxl:860px"
              class="size-full absolute inset-0 object-cover transition-all duration-700"
              :class="active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'" />
            <div class="flex gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
              <span v-for="(paso, i) in pasos.items" :key="paso.texto" class="h-1 rounded-full transition-all duration-500"
                :class="active === i ? 'w-8 bg-amarillo' : 'w-4 bg-hueso/30'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
defineProps({
  pasos: { type: Object, required: true }
})

const active = ref(0)
const stepRefs = ref([])

let observer
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) active.value = Number(entry.target.dataset.index)
    })
  }, { rootMargin: '-50% 0px -50% 0px' })
  stepRefs.value.forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>
