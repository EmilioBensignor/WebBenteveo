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

    <div class="w-full max-w-300 grid lg:grid-cols-[1fr_1.7fr] items-center gap-6 lg:gap-12">
      <div class="flex flex-col">
        <button v-for="(paso, i) in pasos.items" :key="paso.texto" type="button"
          class="flex items-stretch gap-4 text-left cursor-pointer group" @click="goTo(i)">
          <span class="w-1 relative shrink-0 bg-negro-puro/15 rounded-full overflow-hidden">
            <span class="w-full absolute top-0 left-0 bg-negro-puro" :class="active === i ? 'fill-v' : 'h-0'"
              :style="active === i ? `animation-duration: ${INTERVAL}ms` : ''" />
          </span>
          <span class="flex items-baseline gap-3 py-4 lg:py-5">
            <span class="text-lg lg:text-xl font-bold tabular-nums transition-colors duration-300"
              :class="active === i ? 'text-negro-puro' : 'text-negro-puro/40'">
              {{ i + 1 }}.
            </span>
            <span class="text-sm lg:text-lg font-semibold transition-colors duration-300"
              :class="active === i ? 'text-negro-puro' : 'text-negro-puro/50 group-hover:text-negro-puro/80'">
              {{ paso.texto }}
            </span>
          </span>
        </button>
      </div>

      <div class="w-full aspect-16/10 relative bg-negro-puro border-3 border-negro-puro rounded-2xl overflow-hidden">
        <NuxtImg v-for="(paso, i) in pasos.items" :key="paso.imagen" :src="paso.imagen" :alt="paso.texto"
          class="absolute inset-0 size-full object-cover object-top transition-opacity duration-500"
          :class="active === i ? 'opacity-100' : 'opacity-0'" />
      </div>
    </div>
  </Section>
</template>

<script setup>
const props = defineProps({
  pasos: { type: Object, required: true }
})

const INTERVAL = 5000

const active = ref(0)
let timer = null

const startTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    active.value = (active.value + 1) % props.pasos.items.length
  }, INTERVAL)
}

const goTo = (i) => {
  active.value = i
  startTimer()
}

onMounted(startTimer)
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.fill-v {
  animation: fillv linear forwards;
}

@keyframes fillv {
  from {
    height: 0;
  }

  to {
    height: 100%;
  }
}
</style>
