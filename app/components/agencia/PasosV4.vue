<template>
  <div ref="wrapRef" class="h-[350vh] relative">
    <div class="h-dvh w-full flex flex-col justify-center gap-8 md:gap-12 sticky top-0 overflow-hidden">
      <div class="w-full max-w-344 flex items-end justify-between gap-6 mx-auto px-4 md:px-7 lg:px-16 xxl:px-30">
        <HeadingH2 class="max-w-72 sm:max-w-96 lg:max-w-150 text-blanco">
          Todo empieza con una idea. <span class="text-amarillo">Todo sucede en el mismo equipo.</span>
        </HeadingH2>
        <div class="hidden md:flex items-baseline gap-1 text-2xl font-bold tabular-nums">
          <span class="text-amarillo">0{{ active + 1 }}</span>
          <span class="text-blanco/30 text-base">/ 0{{ pasos.length }}</span>
        </div>
      </div>

      <div ref="trackRef" class="w-max flex gap-4 md:gap-8 px-4 md:px-7 lg:px-16 xxl:px-30"
        :style="{ transform: `translate3d(${-x}px, 0, 0)` }">
        <article v-for="(paso, i) in pasos" :key="paso.title"
          class="w-[80vw] sm:w-[55vw] md:w-[42vw] lg:w-120 flex flex-col gap-4 transition-all duration-500 ease-out"
          :class="active === i ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.96]'">
          <div class="relative rounded-2xl overflow-hidden">
            <NuxtImg :src="paso.image" :alt="paso.title" format="avif,webp" sizes="700px" loading="lazy"
              class="w-full aspect-16/10 object-cover"
              :style="{ transform: `translateX(${(progress * pasos.length - i) * -18}px) scale(1.12)` }" />
            <div class="absolute inset-0 rounded-2xl border border-blanco/10" />
            <span class="absolute top-3 left-4 text-xs text-blanco font-semibold uppercase tracking-widest bg-negro/50 rounded-full backdrop-blur-sm px-3 py-1">
              Paso {{ i + 1 }} de {{ pasos.length }}
            </span>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-5xl lg:text-6xl text-amarillo font-bold leading-none">0{{ i + 1 }}</span>
            <div class="flex flex-col gap-1">
              <h3 class="text-lg lg:text-xl text-blanco font-bold">{{ paso.title }}</h3>
              <p class="text-sm lg:text-base text-blanco/70 font-medium">{{ paso.text }}</p>
            </div>
          </div>
        </article>
      </div>

      <div class="w-full max-w-344 mx-auto px-4 md:px-7 lg:px-16 xxl:px-30">
        <div class="w-full h-px bg-blanco/15 rounded-full overflow-hidden">
          <div class="h-full bg-amarillo shadow-amarilla" :style="{ width: `${progress * 100}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { pasos } from '~/constants/agencia'

const wrapRef = ref(null)
const trackRef = ref(null)
const dist = ref(0)

const progress = useScrollProgress(wrapRef, (r, vh) => -r.top / (r.height - vh))

const active = computed(() => Math.min(pasos.length - 1, Math.floor(progress.value * pasos.length)))
const x = computed(() => progress.value * dist.value)

const measure = () => {
  const track = trackRef.value
  if (!track) return
  dist.value = Math.max(0, track.scrollWidth - window.innerWidth)
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
})
onUnmounted(() => window.removeEventListener('resize', measure))
</script>
