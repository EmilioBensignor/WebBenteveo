<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center">
      Conocé algunas de las <span class="text-amarillo">soluciones para tu industria</span>
    </UiHeadingH2>

    <div class="w-full max-w-362 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
      <NuxtLink v-for="ind in industrias" :key="ind.slug" :to="`/transformacion-tecnologica/${ind.slug}`"
        :data-cursor-label="`Ver soluciones para ${ind.label}`" data-cursor-arrow
        class="group h-40 md:h-52 lg:h-64 xxl:h-72 flex flex-col justify-end relative border border-blanco/33 rounded-2xl overflow-hidden p-4 lg:p-5">
        <NuxtImg :src="ind.image" :alt="ind.label"
          class="size-full absolute inset-0 object-cover transition-transform duration-700 ease-out lg:group-hover:scale-105"
          format="avif" sizes="xs:50vw sm:50vw tab:33vw md:340px lg:420px xl:480px xxl:520px" loading="lazy" />
        <div class="absolute inset-0 bg-linear-to-b from-transparent from-55% to-black/70" />

        <div class="flex items-center gap-2 lg:gap-3 relative">
          <Icon :name="ind.icon" size="24" class="shrink-0 text-amarillo" />
          <p
            class="text-hueso text-sm lg:text-base xxl:text-xl leading-[1.2] transition-colors duration-300 lg:group-hover:text-amarillo">
            {{ ind.label }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </DefaultSection>
</template>

<script setup>
import { industrias } from '~/constants/transformacion'
</script>
