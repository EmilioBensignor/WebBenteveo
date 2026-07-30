<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30" inner="gap-6 md:gap-8 lg:gap-12">
    <slot name="header" />

    <div ref="rootRef"
      class="w-full md:max-w-220 flex flex-col items-center gap-8 md:gap-16 md:flex-row md:justify-center md:relative mt-6 md:mt-10 lg:mt-14">
      <div
        class="hidden md:block absolute inset-x-0 top-6 -translate-y-1/2 h-px bg-[linear-gradient(90deg,rgba(128,128,128,0)_0%,#808080_15%,#808080_85%,rgba(128,128,128,0)_100%)]" />

      <div v-for="(m, i) in parsedMetrics" :key="m.value"
        class="flex flex-col items-center gap-4 md:flex-1 md:relative md:z-10">
        <div class="relative flex items-center justify-center md:contents">
          <div
            class="w-72 h-px md:hidden absolute top-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(128,128,128,0)_0%,#808080_15%,#808080_85%,rgba(128,128,128,0)_100%)]" />
          <span
            class="relative flex items-center justify-center rounded-full bg-amarillo shadow-amarilla text-negro text-xl lg:text-[1.75rem] font-bold tabular-nums py-3 px-6">
            {{ m.prefix }}{{ counts[i] }}{{ m.suffix }}
          </span>
        </div>
        <p class="max-w-42 sm:max-w-62 text-center text-blanco text-base font-medium leading-snug">{{ m.label }}</p>
      </div>
    </div>
  </Section>
</template>

<script setup>
const props = defineProps({
  metrics: { type: Array, required: true }
})

const DURATION = 1600

const rootRef = ref(null)

const parsedMetrics = computed(() => props.metrics.map((m) => {
  const match = String(m.value).match(/^(\D*)(\d+)(\D*)$/)
  return {
    ...m,
    prefix: match ? match[1] : '',
    target: match ? Number(match[2]) : 0,
    suffix: match ? match[3] : String(m.value)
  }
}))

const counts = ref(parsedMetrics.value.map(() => 0))

let frame = null
let observer = null

function run() {
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / DURATION, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    counts.value = parsedMetrics.value.map((m) => Math.round(m.target * eased))
    if (t < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counts.value = parsedMetrics.value.map((m) => m.target)
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    observer.disconnect()
    observer = null
    run()
  }, { threshold: 0.4 })
  observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>
