<template>
  <DefaultSection bg="bg-negro" inner="items-stretch! gap-6! lg:gap-8!"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20">
    <UiHeadingH2>¿Cómo funciona?</UiHeadingH2>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr] md:grid-rows-2 gap-4 lg:gap-6">
      <article
        class="md:row-span-2 min-h-72 md:min-h-full flex flex-col justify-between relative overflow-hidden border border-amarillo/40 rounded-2xl bg-linear-to-br from-amarillo/15 via-negro to-negro p-5 lg:p-8">
        <div class="flex items-center gap-3 text-amarillo">
          <Icon :name="pasosKit[0].icon" size="28" class="shrink-0" />
          <span class="text-xs lg:text-sm font-medium uppercase tracking-widest">{{ pasosKit[0].label }}</span>
        </div>
        <div class="flex flex-col gap-4">
          <span class="text-amarillo text-[6rem] md:text-[8rem] lg:text-[9.5rem] font-bold leading-[0.85] tracking-tight">50%</span>
          <p class="text-hueso text-base lg:text-xl font-light leading-[1.45]">{{ pasosKit[0].text }}</p>
        </div>
      </article>

      <article v-for="paso in pasosKit.slice(1)" :key="paso.number"
        class="flex flex-col gap-5 lg:gap-6 border border-blanco/20 rounded-2xl bg-blanco/3 p-5 lg:p-7">
        <span class="size-11 lg:size-12 flex justify-center items-center rounded-xl bg-amarillo text-negro">
          <Icon :name="paso.icon" size="24" />
        </span>
        <div class="flex flex-col gap-2">
          <h3 class="text-hueso text-base lg:text-xl font-semibold">{{ paso.label }}</h3>
          <p class="text-hueso text-sm lg:text-base font-light leading-normal">{{ paso.text }}</p>
        </div>
      </article>
    </div>
  </DefaultSection>
</template>

<script setup>
import { pasosKit } from '~/constants/kit'
</script>
