<template>
  <Section class="gap-6 md:gap-8 lg:gap-12 px-4 md:px-7">
    <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
      <HeadingH2 class="text-amarillo">Resultados reales</HeadingH2>
      <p class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 lg:text-xl text-blanco font-medium">
        Ayudamos a las empresas a resolver, potenciar y agilizar procesos mediante herramientas de IA robustas y
        confiables adaptadas a tus negocios
      </p>
    </div>

    <div
      class="w-full md:max-w-220 flex flex-col items-center gap-8 md:gap-16 md:flex-row md:justify-center md:relative">
      <div
        class="hidden md:block absolute inset-x-0 top-6 -translate-y-1/2 h-px bg-[linear-gradient(90deg,rgba(128,128,128,0)_0%,#808080_15%,#808080_85%,rgba(128,128,128,0)_100%)]" />

      <div v-for="m in metrics" :key="m.value" class="flex flex-col items-center gap-4 md:flex-1 md:relative md:z-10">
        <div class="relative flex items-center justify-center md:contents">
          <div
            class="w-72 h-px md:hidden absolute top-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(128,128,128,0)_0%,#808080_15%,#808080_85%,rgba(128,128,128,0)_100%)]" />
          <span
            class="relative flex items-center justify-center rounded-full bg-amarillo shadow-amarilla text-negro text-xl lg:text-[1.75rem] font-bold py-3 px-4">
            {{ m.value }}
          </span>
        </div>
        <p class="max-w-42 sm:max-w-62 text-blanco text-base font-medium leading-snug text-center">{{ m.text }}</p>
      </div>
    </div>
  </Section>
</template>

<script setup>
const metrics = [
  { value: '70%', text: 'menos tiempo en tareas repetitivas que no generan valor' },
  { value: '8x', text: 'más rápido para analizar datos y tomar decisiones' },
  { value: '+80%', text: 'de capacidad operativa sin sumar personal' }
]
</script>
