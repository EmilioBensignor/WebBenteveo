<template>
  <Section class="py-16 md:py-24 lg:py-32 px-4 md:px-7 lg:px-16 xxl:px-30">
    <template #background>
      <div
        class="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_85%_at_50%_50%,#000_35%,transparent_95%)]">
        <video src="/video/reloj.mp4" class="size-full object-cover opacity-60" autoplay loop muted playsinline />
      </div>
    </template>

    <div ref="rootRef" class="flex flex-col items-center gap-2 text-center">
      <span class="text-6xl md:text-8xl lg:text-[9rem] text-amarillo font-bold leading-none tabular-nums">
        +{{ hours }}hs
      </span>
      <HeadingH2 class="max-w-120 md:max-w-116 lg:max-w-156 text-blanco">
        perdidas por semana en cosas que <span class="text-amarillo">una herramienta podría hacer sola</span>
      </HeadingH2>
    </div>

    <div class="flex flex-col md:flex-row md:justify-center items-start gap-4 md:gap-8 lg:gap-12 lg:mt-4">
      <div v-for="item in items" :key="item.text" class="flex items-center gap-2 lg:gap-4">
        <span class="flex items-center justify-center bg-amarillo/10 rounded-full backdrop-blur-[2px] p-3">
          <Icon :name="item.icon" size="24" class="text-amarillo" />
        </span>
        <p
          class="max-w-58 lg:max-w-60 text-left text-blanco text-sm lg:text-base font-semibold leading-snug [text-shadow:0_0_18px_#000,0_1px_3px_#000]">
          {{ item.text }}
        </p>
      </div>
    </div>
  </Section>
</template>

<script setup>
const items = [
  { icon: 'material-symbols:repeat-rounded', text: 'Tareas burocráticas que se repiten.' },
  { icon: 'material-symbols:leaderboard-outline-rounded', text: 'Datos que tienes pero no puedes leer ni procesar.' },
  { icon: 'material-symbols:local-fire-department-outline-rounded', text: 'Procesos que tardan días y podrían tardar minutos.' }
]

const rootRef = ref(null)
const hours = ref(0)
let raf = null

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    observer.disconnect()
    const start = performance.now()
    const step = (t) => {
      const p = Math.min((t - start) / 1800, 1)
      hours.value = Math.round((1 - Math.pow(1 - p, 3)) * 10)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  }, { threshold: 0.5 })
  observer.observe(rootRef.value)
  onBeforeUnmount(() => {
    observer.disconnect()
    if (raf) cancelAnimationFrame(raf)
  })
})
</script>
