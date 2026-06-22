<template>
  <Section class="py-14 px-4">
    <HeadingH2 class="text-center">
      ¿Cuántas horas pierdes por semana en cosas que
      <span class="text-amarillo">una herramienta podría hacer sola?</span>
    </HeadingH2>

    <div class="flex flex-col items-start gap-4 lg:flex-row lg:justify-center lg:gap-4 lg:mt-4">
      <div v-for="item in items" :key="item.text" class="flex items-center gap-2">
        <span class="flex items-center justify-center rounded-full bg-amarillo/10 p-3 backdrop-blur-[2px]">
          <Icon :name="item.icon" size="24" class="text-amarillo" />
        </span>
        <p
          class="max-w-58 lg:max-w-60 text-blanco text-sm font-semibold leading-snug text-left [text-shadow:0_0_18px_#000,0_1px_3px_#000]">
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
</script>
