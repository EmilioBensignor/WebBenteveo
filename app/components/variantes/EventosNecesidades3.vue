<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <HeadingH2 class="text-center text-blanco">
      Todo lo que necesitás, <span class="text-amarillo">resuelto en un solo lugar</span>
    </HeadingH2>

    <div class="max-w-280 flex flex-wrap justify-center gap-4 lg:gap-6">
      <article v-for="(n, i) in necesidades" :key="n.title"
        class="max-w-90 lg:max-w-100 flex flex-col gap-3 relative bg-negro border border-dashed border-amarillo/40 rounded-xl transition-all duration-300 hover:rotate-0! hover:-translate-y-2 hover:shadow-amarilla hover:border-solid hover:border-amarillo p-5 lg:p-6"
        :style="`rotate: ${rotations[i % rotations.length]}deg`">
        <div class="flex items-center justify-between gap-4">
          <span class="text-amarillo/50 text-[10px] lg:text-xs font-bold tracking-[0.25em] uppercase tabular-nums">
            Pedido N°0{{ i + 1 }}
          </span>
          <Icon :name="n.icon" size="20" class="text-amarillo" />
        </div>
        <div class="h-px w-full bg-blanco/10" />
        <h3 class="text-amarillo text-base lg:text-lg font-bold">{{ n.title }}</h3>
        <p class="text-xs lg:text-sm text-blanco font-medium">{{ n.text }}</p>
        <span class="text-blanco/30 text-[10px] font-bold tracking-[0.25em] uppercase mt-1">✓ Resuelto por Benteveo</span>
      </article>
    </div>

    <div class="flex flex-col items-center gap-4">
      <p class="lg:text-xl text-blanco font-medium">¿Ya tenés algo en mente?</p>
      <ButtonPrimary to="#contacto">Hablemos de tu evento</ButtonPrimary>
    </div>
  </Section>
</template>

<script setup>
import { necesidades } from '~/constants/eventos'

const rotations = [-2, 1.5, -1, 2, -1.5, 1]
</script>
