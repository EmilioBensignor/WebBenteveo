<template>
  <DefaultSection id="dolor" bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-12"
    inner="grid! grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 xxl:gap-20">
    <div class="min-w-0 flex flex-col gap-6 lg:gap-8">
      <div class="flex flex-col gap-3 md:gap-4">
        <UiHeadingH2>
          ¿Cuántas horas pierde tu empresa cada semana en tareas que
          <span class="text-amarillo">una herramienta podría hacer sola?</span>
        </UiHeadingH2>
        <p class="text-hueso text-sm lg:text-base leading-normal font-light">
          Si tu equipo responde consultas manualmente, carga datos en Excel o prepara presupuestos uno por uno, estás
          destinando tiempo y recursos a tareas que una herramienta podría hacer automáticamente.
        </p>
      </div>

      <ul class="flex flex-col">
        <li v-for="t in dolorTareas" :key="t.text"
          class="flex items-center gap-4 border-t border-blanco/20 last:border-b py-4 lg:py-5">
          <Icon :name="t.icon" size="24" class="shrink-0 text-amarillo" />
          <span class="text-hueso text-sm lg:text-base leading-[1.3]">{{ t.text }}</span>
        </li>
      </ul>

      <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="w-full sm:w-max gap-3 pl-6 pr-4">
        Quiero mi diagnóstico gratis
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>

    <TransformacionCalculadora class="min-w-0" />
  </DefaultSection>
</template>

<script setup>
import { dolorTareas } from '~/constants/transformacion'
</script>
