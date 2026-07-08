<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <HeadingH2 class="text-center text-amarillo">
      Conoce las soluciones para tu industria
    </HeadingH2>

    <div class="w-full flex md:grid md:grid-cols-3 justify-center flex-wrap gap-2 lg:gap-4">
      <NuxtLink v-for="ind in industrias" :key="ind.label" :to="`/transformacion-tecnologica/${ind.slug}`"
        class="w-[48.5%] md:w-full flex flex-col md:flex-row items-center gap-4 rounded-2xl border border-blanco/33 hover:border-amarillo/50 bg-negro backdrop-blur-[20px] transition-colors p-4">
        <span class="size-12 flex items-center justify-center rounded-full bg-amarillo/10">
          <Icon :name="ind.icon" size="24" class="text-amarillo" />
        </span>
        <p class="text-center md:text-left text-sm text-white font-semibold">{{ ind.label }}</p>
      </NuxtLink>
    </div>
  </Section>
</template>

<script setup>
import { industrias } from '~/constants/transformacion'
</script>
