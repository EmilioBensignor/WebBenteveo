<template>
  <Section class="gap-6 px-4">
    <div class="flex flex-col items-center gap-3 text-center">
      <HeadingH2 class="text-amarillo">Resultados reales</HeadingH2>
      <p class="max-w-72 lg:max-w-236 text-blanco font-medium">
        Ayudamos a las empresas a resolver, potenciar y agilizar procesos mediante herramientas de IA robustas y
        confiables adaptadas a tus negocios
      </p>
    </div>

    <div class="w-full flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-4 lg:relative">

      <div v-for="m in metrics" :key="m.value" class="flex flex-col items-center gap-4 lg:flex-1 lg:relative lg:z-10">
        <div class="relative flex items-center justify-center w-72 lg:w-full h-12">
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gris" />
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px flex">
            <div class="w-25 bg-linear-to-r from-negro to-negro/0" />
            <div class="flex-1" />
            <div class="w-25 bg-linear-to-l from-negro to-negro/0" />
          </div>
          <span class="relative flex items-center justify-center rounded-full bg-amarillo shadow-amarilla text-negro text-xl font-bold py-4 px-6">
            {{ m.value }}
          </span>
        </div>
        <p class="max-w-37 text-blanco text-sm font-medium leading-snug text-center">{{ m.text }}</p>
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
