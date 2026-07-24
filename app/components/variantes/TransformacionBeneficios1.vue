<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30" inner="gap-10 lg:gap-0">
    <div class="flex flex-col items-center gap-3 lg:gap-4 text-center">
      <HeadingH2 class="max-w-64 md:max-w-full">
        <span class="text-blanco">Cuatro cosas que cambian en tu empresa</span>
        <span class="text-amarillo"> cuando integras IA a tus procesos</span>
      </HeadingH2>
      <p class="max-w-64 sm:max-w-80 md:max-w-full lg:text-xl text-blanco font-medium">
        Deja de apagar incendios y empieza a crecer
      </p>
    </div>

    <div class="w-full max-w-280 flex flex-col">
      <article v-for="(b, i) in beneficios" :key="b.number"
        class="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 lg:gap-16 relative border-t border-blanco/15 last:border-b overflow-hidden py-10 lg:py-16"
        :class="i % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''">
        <span
          class="hollow absolute top-1/2 -translate-y-1/2 text-[9rem] lg:text-[14rem] font-bold leading-none opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
          :class="i % 2 === 1 ? 'left-0 md:-left-6' : 'right-0 md:-right-6'">
          {{ b.number }}
        </span>

        <span
          class="size-14 lg:size-18 flex items-center justify-center shrink-0 relative bg-amarillo/10 rounded-full text-amarillo">
          <Icon :name="b.icon" class="size-8! lg:size-10!" />
        </span>

        <div class="max-w-150 flex flex-col gap-3 lg:gap-4 relative" :class="i % 2 === 1 ? 'md:items-end md:ml-auto' : ''">
          <HeadingH3 class="text-amarillo font-bold">
            <span v-html="b.title" />
          </HeadingH3>
          <p class="text-sm lg:text-base text-blanco font-medium">{{ b.text }}</p>
        </div>
      </article>
    </div>

    <ButtonPrimary class="lg:mt-12">Quiero aplicarlo a mi empresa</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/transformacion'
</script>

<style scoped>
.hollow {
  color: transparent;
  -webkit-text-stroke: 1px rgba(252, 183, 22, 0.5);
}
</style>
