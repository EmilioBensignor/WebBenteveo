<template>
  <DefaultSection id="servicios" bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8">
    <h2 class="w-full text-center text-hueso text-xl lg:text-[1.75rem] font-medium">
      Tres capacidades. Una misma visión del negocio.
    </h2>

    <div class="w-full max-w-362 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 lg:gap-8 xxl:gap-12">
      <article v-for="servicio in servicios" :key="servicio.number"
        class="group w-full flex flex-col gap-6 lg:gap-8 relative">
        <div class="w-full relative">
          <div
            class="w-full h-46.5 md:h-60 lg:h-80 flex flex-col justify-end relative border border-blanco/33 rounded-2xl overflow-hidden p-px">
            <NuxtImg :src="servicio.image" :alt="servicio.title" class="size-full absolute inset-0 object-cover"
              loading="lazy" />
            <div class="absolute inset-0 bg-linear-to-b from-black/25 to-black" />

            <span
              class="relative text-amarillo text-[5.5rem] lg:text-[8rem] font-bold -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4">
              {{ servicio.number }}
            </span>
          </div>

          <NuxtLink :to="servicio.to" :aria-label="servicio.cta"
            class="h-8 lg:h-10 flex items-center absolute right-2 lg:-right-5 -bottom-4 glass-boton rounded-full text-hueso hover:text-amarillo whitespace-nowrap overflow-hidden">
          <span
            class="max-w-0 opacity-0 transition-all duration-400 ease-out md:group-hover:max-w-70 md:group-hover:opacity-100 md:group-hover:pl-5">
            <span class="text-sm font-medium">{{ servicio.cta }}</span>
          </span>
          <span class="size-8 lg:size-10 flex justify-center items-center shrink-0">
            <Icon name="material-symbols:close-rounded" class="size-5 -rotate-45 md:group-hover:hidden!" />
            <Icon name="material-symbols:arrow-forward-rounded" class="size-5 hidden! md:group-hover:block!" />
          </span>
          </NuxtLink>
        </div>

        <div class="w-full flex flex-col gap-2 text-hueso px-3 lg:px-4">
          <h3 class="text-base lg:text-xl font-medium">{{ servicio.title }}</h3>
          <p class="text-sm lg:text-base leading-[1.4]">{{ servicio.text }}</p>
        </div>
      </article>
    </div>
  </DefaultSection>
</template>

<script setup>
import { servicios } from '~/constants/home'
</script>
