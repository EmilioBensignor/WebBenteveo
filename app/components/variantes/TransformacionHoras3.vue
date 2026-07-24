<template>
  <Section>
    <div ref="rootRef" class="w-full grid md:grid-cols-2 items-stretch">
      <div class="h-56 md:h-auto md:min-h-130 relative overflow-hidden md:[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]">
        <video src="/video/reloj.mp4" class="absolute inset-0 size-full object-cover" autoplay loop muted playsinline />
        <div class="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-negro to-transparent" />
      </div>

      <div class="flex flex-col justify-center gap-8 lg:gap-12 px-4 md:px-10 lg:px-16 py-12 md:py-20">
        <HeadingH2 class="max-w-130 text-blanco transition-all duration-700 ease-out"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
          ¿Cuántas horas pierdes por semana en cosas que
          <span class="text-amarillo">una herramienta podría hacer sola?</span>
        </HeadingH2>

        <div class="flex flex-col gap-5 lg:gap-7">
          <div v-for="(item, i) in items" :key="item.text"
            class="flex items-center gap-4 transition-all duration-700 ease-out"
            :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
            :style="`transition-delay: ${200 + i * 150}ms`">
            <span class="flex items-center justify-center shrink-0 bg-amarillo/10 rounded-full p-3">
              <Icon :name="item.icon" size="24" class="text-amarillo" />
            </span>
            <p class="max-w-80 text-blanco text-sm lg:text-base font-semibold leading-snug">{{ item.text }}</p>
          </div>
        </div>
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
const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.3 })
  observer.observe(rootRef.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>
