<template>
  <Section class="overflow-visible! px-4 md:px-7 lg:px-16 xxl:px-30">
    <div class="flex flex-col items-center gap-3 lg:gap-4 text-center">
      <HeadingH2 class="max-w-64 md:max-w-full">
        <span class="text-blanco">Cuatro cosas que cambian en tu empresa</span>
        <span class="text-amarillo"> cuando integras IA a tus procesos</span>
      </HeadingH2>
      <p class="max-w-64 sm:max-w-80 md:max-w-full lg:text-xl text-blanco font-medium">
        Deja de apagar incendios y empieza a crecer
      </p>
    </div>

    <div class="w-full max-w-220 flex flex-col gap-6 lg:gap-8 pb-10">
      <article v-for="(b, i) in beneficios" :key="b.number"
        class="min-h-70 lg:min-h-80 flex flex-col justify-between gap-6 sticky bg-negro border border-blanco/20 rounded-3xl shadow-[0_-12px_40px_rgba(0,0,0,0.6)] p-6 lg:p-10"
        :style="`top: calc(5rem + ${i * 1.75}rem)`">
        <div class="flex items-start justify-between">
          <span class="size-14 lg:size-18 flex items-center justify-center bg-amarillo/10 rounded-full text-amarillo">
            <Icon :name="b.icon" class="size-8! lg:size-10!" />
          </span>
          <span class="text-6xl lg:text-8xl font-bold text-blanco/10 leading-none">{{ b.number }}</span>
        </div>
        <div class="flex flex-col gap-3 lg:gap-4">
          <HeadingH3 class="max-w-150 text-amarillo font-bold">
            <span v-html="b.title" />
          </HeadingH3>
          <p class="max-w-150 text-sm lg:text-base text-blanco font-medium">{{ b.text }}</p>
        </div>
      </article>
    </div>

    <ButtonPrimary>Quiero aplicarlo a mi empresa</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/transformacion'
</script>
