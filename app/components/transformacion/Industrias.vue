<template>
  <Section class="px-4">
    <HeadingH2 class="text-center text-amarillo">
      Conoce las soluciones para tu industria
    </HeadingH2>

    <div class="w-full flex justify-center flex-wrap gap-2 lg:gap-4">
      <div v-for="ind in industrias" :key="ind.label"
        class="w-[48.5%] flex flex-col items-center gap-4 rounded-2xl border border-blanco/33 bg-negro backdrop-blur-[20px] p-4">
        <span class="size-12 flex items-center justify-center rounded-full bg-amarillo/10">
          <Icon :name="ind.icon" size="24" class="text-amarillo" />
        </span>
        <p class="text-center lg:text-left text-sm text-white font-semibold">{{ ind.label }}</p>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { industrias } from '~/constants/transformacion'
</script>
