<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <div class="flex flex-col items-center gap-3 lg:gap-4 text-center">
      <HeadingH2 class="max-w-64 md:max-w-full">
        <span class="text-blanco">Cuatro cosas que cambian en tu empresa</span>
        <span class="text-amarillo"> cuando integras IA a tus procesos</span>
      </HeadingH2>
      <p class="max-w-64 sm:max-w-80 md:max-w-full lg:text-xl text-blanco font-medium">
        Deja de apagar incendios y empieza a crecer
      </p>
    </div>

    <div class="w-full max-w-280 grid md:grid-cols-12 gap-3 lg:gap-4">
      <article v-for="(b, i) in beneficios" :key="b.number"
        class="group flex flex-col justify-between gap-8 relative bg-negro border border-blanco/20 hover:border-amarillo/50 rounded-3xl transition-all duration-300 hover:-translate-y-1 overflow-hidden p-6 lg:p-8"
        :class="[i === 0 || i === 3 ? 'md:col-span-7' : 'md:col-span-5', i === 0 ? 'md:min-h-80' : '']">
        <span
          class="hollow absolute -top-4 right-2 text-8xl lg:text-[10rem] font-bold leading-none opacity-40 group-hover:opacity-80 transition-opacity duration-500">
          {{ b.number }}
        </span>
        <span
          class="size-12 lg:size-14 flex items-center justify-center relative bg-amarillo/10 rounded-full text-amarillo">
          <Icon :name="b.icon" class="size-6! lg:size-7!" />
        </span>
        <div class="flex flex-col gap-2 lg:gap-3 relative">
          <HeadingH3 class="text-amarillo font-bold" :class="i === 0 ? 'lg:text-3xl!' : ''">
            <span v-html="b.title" />
          </HeadingH3>
          <p class="text-sm lg:text-base text-blanco font-medium">{{ b.text }}</p>
        </div>
      </article>
    </div>

    <ButtonPrimary>Quiero aplicarlo a mi empresa</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/transformacion'
</script>

<style scoped>
.hollow {
  color: transparent;
  -webkit-text-stroke: 1px rgba(248, 248, 248, 0.25);
}
</style>
