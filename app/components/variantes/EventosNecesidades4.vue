<template>
  <Section class="overflow-visible! px-4 md:px-7 lg:px-16 xxl:px-30">
    <div class="w-full max-w-300 grid lg:grid-cols-[1fr_1.4fr] items-start gap-10 lg:gap-24">
      <div class="flex flex-col items-start gap-6 lg:sticky lg:top-28">
        <HeadingH2 class="text-blanco text-left">
          Todo lo que necesitás, <span class="text-amarillo">resuelto en un solo lugar</span>
        </HeadingH2>
        <p class="lg:text-xl text-blanco font-medium">¿Ya tenés algo en mente?</p>
        <ButtonPrimary to="#contacto">Hablemos de tu evento</ButtonPrimary>
      </div>

      <div class="w-full flex flex-col">
        <article v-for="(n, i) in necesidades" :key="n.title"
          class="group flex items-baseline gap-4 lg:gap-6 border-t border-blanco/15 last:border-b py-6 lg:py-8">
          <span class="text-sm lg:text-base text-blanco/30 font-semibold tabular-nums">0{{ i + 1 }}</span>
          <div class="flex flex-col gap-2">
            <h3
              class="text-blanco text-lg lg:text-2xl font-bold transition-colors duration-300 group-hover:text-amarillo group-hover:italic">
              {{ n.title }}
            </h3>
            <p class="max-w-140 text-sm lg:text-base text-blanco/70 font-medium">{{ n.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { necesidades } from '~/constants/eventos'
</script>
