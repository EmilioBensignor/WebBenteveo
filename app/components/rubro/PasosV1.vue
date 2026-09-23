<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16">
    <div ref="root" class="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-8 lg:gap-12 xl:gap-16"
      @mouseenter="hover = true" @mouseleave="hover = false">
      <div class="flex flex-col gap-6 lg:gap-10">
        <div class="flex flex-col gap-3 md:gap-4">
          <UiHeadingH2>Mira cómo funciona <span class="text-amarillo">en la práctica</span></UiHeadingH2>
          <p class="text-hueso text-sm lg:text-base leading-normal font-light" v-html="pasos.subtitulo" />
        </div>

        <ol class="flex flex-col">
          <li v-for="(paso, i) in pasos.items" :key="paso.texto" class="border-t border-blanco/15 last:border-b">
            <button type="button" class="w-full flex flex-col gap-3 text-left cursor-pointer pt-4 lg:pt-5"
              :aria-pressed="active === i" @click="go(i)">
              <span class="flex items-baseline gap-4">
                <span class="text-sm lg:text-base font-bold tabular-nums transition-colors duration-300"
                  :class="active === i ? 'text-amarillo' : 'text-hueso/40'">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <span class="text-base lg:text-xl leading-[1.3] transition-colors duration-300"
                  :class="active === i ? 'text-hueso' : 'text-hueso/50 md:hover:text-hueso/80'">
                  {{ paso.texto }}
                </span>
              </span>
              <span class="w-full h-0.5 block relative overflow-hidden">
                <span v-if="active === i" :key="ciclo"
                  class="progreso absolute inset-y-0 left-0 bg-amarillo"
                  :style="{ animationDuration: `${INTERVALO}ms`, animationPlayState: pausado ? 'paused' : 'running' }"
                  @animationend="next" />
              </span>
            </button>
          </li>
        </ol>
      </div>

      <div class="w-full aspect-[1375/700] lg:aspect-square xl:aspect-[5/4] relative border border-blanco/33 rounded-2xl overflow-hidden bg-black">
        <Transition enter-active-class="transition-all duration-500" enter-from-class="opacity-0 scale-105"
          leave-active-class="transition-opacity duration-500" leave-to-class="opacity-0">
          <NuxtImg :key="pasos.items[active].imagen" :src="pasos.items[active].imagen" :alt="pasos.items[active].texto"
            format="avif" sizes="xs:100vw sm:100vw md:100vw lg:60vw xxl:860px"
            class="size-full absolute inset-0 object-cover" />
        </Transition>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
const props = defineProps({
  pasos: { type: Object, required: true }
})

const INTERVALO = 6000

const root = ref(null)
const active = ref(0)
const ciclo = ref(0)
const hover = ref(false)
const visible = ref(false)
const pausado = computed(() => hover.value || !visible.value)

const go = (i) => {
  active.value = i
  ciclo.value++
}
const next = () => go((active.value + 1) % props.pasos.items.length)

let observer
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => { visible.value = entry.isIntersecting }, { threshold: 0.3 })
  observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.progreso {
  animation-name: progreso;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes progreso {
  from { width: 0; }
  to { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .progreso {
    animation-play-state: paused !important;
    width: 100%;
  }
}
</style>
