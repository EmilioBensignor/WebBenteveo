<template>
  <Section bg="bg-amarillo" class="py-16 md:py-24 lg:py-32 px-4 md:px-7 lg:px-16 xxl:px-32">
    <template #background>
      <div class="w-full h-16 md:h-20 absolute top-0 left-0 bg-linear-to-b from-negro to-amarillo" />
      <div class="w-full h-16 md:h-20 absolute bottom-0 left-0 bg-linear-to-t from-negro to-amarillo" />
    </template>

    <div class="max-w-150 lg:max-w-200 flex flex-col items-center gap-2 lg:gap-4 text-center text-negro-puro px-4">
      <HeadingH2 class="font-bold!">
        Cuando creatividad, tecnología y producción trabajan juntos desde el día uno, los resultados son mejores.
      </HeadingH2>
      <p class="text-lg lg:text-xl font-medium">El mismo equipo, el mismo criterio y la misma visión de tu marca.</p>
    </div>

    <div class="w-full max-w-300 h-85 xl:h-95 hidden lg:flex gap-3">
      <article v-for="b in beneficios" :key="b.title"
        class="group flex-1 hover:flex-[2.4] flex flex-col justify-between rounded-3xl bg-negro overflow-hidden transition-all duration-500 ease-out p-8">
        <span class="size-14 flex items-center justify-center shrink-0 bg-amarillo/10 rounded-full text-amarillo">
          <Icon :name="b.icon" class="size-7!" />
        </span>
        <div class="flex flex-col gap-3">
          <h3 class="text-amarillo text-2xl font-bold whitespace-nowrap">{{ b.title }}</h3>
          <p
            class="min-w-70 text-blanco font-medium opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {{ b.text }}
          </p>
        </div>
      </article>
    </div>

    <div class="w-full flex lg:hidden flex-col gap-3 px-4">
      <article v-for="b in beneficios" :key="b.title" class="flex flex-col gap-4 rounded-3xl bg-negro p-6">
        <span class="size-12 flex items-center justify-center bg-amarillo/10 rounded-full text-amarillo">
          <Icon :name="b.icon" class="size-6!" />
        </span>
        <div class="flex flex-col gap-2">
          <h3 class="text-amarillo text-xl font-bold">{{ b.title }}</h3>
          <p class="text-blanco text-sm font-medium">{{ b.text }}</p>
        </div>
      </article>
    </div>

    <ButtonPrimary to="#servicios" variant="dark">Conoce como trabajamos</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/home'
</script>
