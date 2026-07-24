<template>
  <Section class="py-16 md:py-24 lg:py-32 px-4 md:px-7 lg:px-16 xxl:px-30" inner="gap-10 lg:gap-14">
    <template #background>
      <video src="/video/reloj.mp4" class="size-full object-cover opacity-30" autoplay loop muted playsinline />
      <div class="absolute inset-0 bg-negro-puro/70" />
    </template>

    <HeadingH2 class="max-w-120 md:max-w-116 lg:max-w-156 text-center text-blanco">
      ¿Cuántas horas pierdes por semana en cosas que
      <span class="text-amarillo">una herramienta podría hacer sola?</span>
    </HeadingH2>

    <div ref="listRef" class="flex flex-col items-start gap-6 lg:gap-8">
      <div v-for="(item, i) in items" :key="item.text" class="flex items-center gap-4 lg:gap-6">
        <span class="strike relative text-blanco text-lg md:text-2xl lg:text-3xl font-semibold leading-snug"
          :class="{ on: struck > i }">
          {{ item.text }}
        </span>
        <span
          class="hidden sm:inline-block shrink-0 bg-amarillo rounded-full text-negro-puro text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-all duration-500 px-3 py-1"
          :class="struck > i ? 'opacity-100 scale-100 -rotate-3' : 'opacity-0 scale-75'">
          la hace la herramienta
        </span>
      </div>
    </div>

    <p class="text-lg lg:text-2xl text-amarillo font-bold text-center transition-all duration-700"
      :class="struck > items.length - 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
      Recuperá esas horas.
    </p>
  </Section>
</template>

<script setup>
const items = [
  { text: 'Tareas burocráticas que se repiten.' },
  { text: 'Datos que tienes pero no puedes leer ni procesar.' },
  { text: 'Procesos que tardan días y podrían tardar minutos.' }
]

const listRef = ref(null)
const struck = ref(0)
let timer = null

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    observer.disconnect()
    timer = setInterval(() => {
      struck.value++
      if (struck.value >= items.length) clearInterval(timer)
    }, 700)
  }, { threshold: 0.5 })
  observer.observe(listRef.value)
  onBeforeUnmount(() => {
    observer.disconnect()
    if (timer) clearInterval(timer)
  })
})
</script>

<style scoped>
.strike::after {
  content: '';
  position: absolute;
  left: 0;
  top: 55%;
  height: 3px;
  width: 0;
  background: #fcb716;
  transition: width 0.6s ease;
}

.strike.on {
  color: rgba(248, 248, 248, 0.45);
}

.strike.on::after {
  width: 100%;
}

.strike {
  transition: color 0.6s ease;
}
</style>
