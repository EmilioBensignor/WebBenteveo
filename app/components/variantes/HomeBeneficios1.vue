<template>
  <Section bg="bg-amarillo" class="overflow-visible! py-16 md:py-24 lg:py-32 px-4 md:px-7 lg:px-16 xxl:px-32">
    <template #background>
      <div class="w-full h-16 md:h-20 absolute top-0 left-0 bg-linear-to-b from-negro to-amarillo" />
      <div class="w-full h-16 md:h-20 absolute bottom-0 left-0 bg-linear-to-t from-negro to-amarillo" />
    </template>

    <div class="w-full max-w-300 grid lg:grid-cols-[1fr_1.3fr] items-start gap-10 lg:gap-20">
      <div class="flex flex-col items-start gap-4 lg:gap-6 lg:sticky lg:top-28 text-left text-negro-puro">
        <span class="text-xs font-semibold tracking-[0.2em] uppercase opacity-60">Por qué funciona</span>
        <HeadingH2 class="font-bold! lg:text-[2.5rem]! lg:leading-tight!">
          Cuando creatividad, tecnología y producción trabajan juntos desde el día uno, los resultados son mejores.
        </HeadingH2>
        <p class="text-lg font-medium">El mismo equipo, el mismo criterio y la misma visión de tu marca.</p>
        <ButtonPrimary to="#servicios" variant="dark">Conoce como trabajamos</ButtonPrimary>
      </div>

      <div class="w-full flex flex-col">
        <article v-for="(b, i) in beneficios" :key="b.title"
          class="group relative border-t border-negro-puro/25 last:border-b text-negro-puro overflow-hidden">
          <span
            class="absolute inset-0 bg-negro origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out" />
          <div class="flex flex-col gap-3 relative py-8 lg:py-12 px-3 lg:px-5">
            <div class="flex items-center gap-4 lg:gap-6">
              <span
                class="text-sm lg:text-base font-semibold tabular-nums opacity-50 group-hover:text-amarillo group-hover:opacity-100 transition-colors duration-300">
                0{{ i + 1 }}
              </span>
              <h3
                class="text-2xl md:text-3xl lg:text-[2.75rem] font-bold leading-none group-hover:text-amarillo transition-all duration-300 ease-out group-hover:translate-x-3">
                {{ b.title }}
              </h3>
              <Icon name="material-symbols:arrow-right-alt-rounded"
                class="size-8! lg:size-10! text-amarillo opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ml-auto" />
            </div>
            <p
              class="max-w-105 text-base lg:text-lg font-medium group-hover:text-blanco transition-colors duration-300 pl-8 lg:pl-11">
              {{ b.text }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/home'
</script>
