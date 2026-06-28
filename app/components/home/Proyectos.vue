<template>
  <Section id="proyectos">
    <div class="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:px-7 lg:px-16 xxl:px-32">
      <HeadingH2
        class="flex md:inline flex-col items-center md:items-start text-center md:text-left text-blanco mx-4 md:mx-0">
        Proyectos reales. <span class="text-amarillo">Resultados concretos.</span>
      </HeadingH2>

      <div class="hidden md:flex gap-3">
        <button @click="carousel?.scrollPrev()"
          class="w-10 lg:w-12 h-10 lg:h-12 flex justify-center items-center bg-negro border border-white/20 rounded-full cursor-pointer"
          aria-label="Anterior">
          <Icon name="material-symbols:chevron-left-rounded" class="size-6! lg:size-8! text-amarillo" />
        </button>
        <button @click="carousel?.scrollNext()"
          class="w-10 lg:w-12 h-10 lg:h-12 flex justify-center items-center bg-negro border border-white/20 rounded-full cursor-pointer"
          aria-label="Siguiente">
          <Icon name="material-symbols:chevron-right-rounded" class="size-6! lg:size-8! text-amarillo" />
        </button>
      </div>
    </div>

    <CarouselStatic fade class="md:hidden" :slides-per-view="{ base: 1.2, sm: 1.8, tab: 2.4 }" :gap="{ base: 8 }">
      <ProyectoCard v-for="p in proyectos" :key="p.title" :p="p" />
    </CarouselStatic>

    <CarouselLoop ref="carousel" class="hidden md:block" :items="proyectos" :slides-per-view="2.6" :gap="16"
      v-slot="{ item }">
      <ProyectoCard :p="item" />
    </CarouselLoop>
  </Section>
</template>

<script setup>
import { proyectos } from '~/constants/home'

const carousel = ref(null)
</script>
