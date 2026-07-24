<template>
  <Section class="py-16 md:py-24 lg:py-32 overflow-hidden" inner="gap-10 lg:gap-16">
    <template #background>
      <video src="/video/reloj.mp4" class="size-full object-cover opacity-25" autoplay loop muted playsinline />
      <div class="absolute inset-0 bg-linear-to-b from-negro via-negro/40 to-negro" />
    </template>

    <HeadingH2 class="max-w-120 md:max-w-116 lg:max-w-156 text-center text-blanco px-4">
      ¿Cuántas horas pierdes por semana en cosas que
      <span class="text-amarillo">una herramienta podría hacer sola?</span>
    </HeadingH2>

    <div class="w-screen flex flex-col gap-4 lg:gap-6 relative">
      <div class="marquee flex w-max">
        <div v-for="n in 2" :key="n" class="flex items-center shrink-0">
          <template v-for="item in items" :key="item">
            <span class="hollow text-4xl md:text-6xl lg:text-7xl font-bold whitespace-nowrap uppercase px-6">
              {{ item }}
            </span>
            <span class="size-3 lg:size-4 shrink-0 bg-amarillo rounded-full" />
          </template>
        </div>
      </div>

      <div class="w-[110%] -rotate-2 relative -left-[5%] bg-amarillo overflow-hidden py-2 lg:py-3">
        <div class="marquee-reverse flex w-max">
          <div v-for="n in 2" :key="n" class="flex items-center shrink-0">
            <span v-for="item in badges" :key="item"
              class="text-negro-puro text-sm lg:text-base font-bold whitespace-nowrap uppercase tracking-widest px-8">
              {{ item }} ✦
            </span>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
const items = [
  'Tareas que se repiten',
  'Datos sin procesar',
  'Procesos que tardan días'
]

const badges = [
  '+2hs en planillas', '+3hs en reportes', '+2hs en seguimientos', '+3hs en carga manual'
]
</script>

<style scoped>
.marquee {
  animation: marquee 22s linear infinite;
}

.marquee-reverse {
  animation: marquee 18s linear infinite reverse;
}

.hollow {
  color: transparent;
  -webkit-text-stroke: 1px rgba(248, 248, 248, 0.55);
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
