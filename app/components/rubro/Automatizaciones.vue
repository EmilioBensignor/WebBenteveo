<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <UiHeadingH2 class="max-w-80 md:max-w-none text-center px-4 md:px-0">
      Otras automatizaciones para <span class="text-amarillo">{{ nombre }}</span>
    </UiHeadingH2>

    <UiCarouselStatic class="w-full" :slides-per-view="{ base: 1.2, sm: 1.5, tab: 2.2, md: 2.3, lg: 2.6, xl: 3, xxl: 3 }"
      :gap="{ base: 8, md: 16, lg: 16, xl: 16, xxl: 16 }"
      :button-position="{ top: '50%', transform: 'translateY(-50%)', left: { base: '1.25rem', md: '0rem', lg: '0rem', xl: '-1.25rem', xxl: '-1.25rem' }, right: { base: '1.25rem', md: '0rem', lg: '0rem', xl: '-1.25rem', xxl: '-1.25rem' } }">
      <article v-for="a in automatizaciones" :key="a.titulo"
        class="flex flex-col gap-6 lg:gap-8 border border-blanco/20 rounded-2xl p-5 lg:p-6 xxl:p-8">
        <Icon :name="a.icon" class="size-8! lg:size-10! shrink-0 text-amarillo" />
        <div class="flex flex-col gap-2">
          <h3 class="text-hueso text-base lg:text-xl leading-[1.3]">{{ a.titulo }}</h3>
          <p class="text-hueso/70 text-sm lg:text-base leading-[1.4] font-light">{{ a.texto }}</p>
        </div>
      </article>
    </UiCarouselStatic>
  </DefaultSection>
</template>

<script setup>
defineProps({
  automatizaciones: { type: Array, required: true },
  nombre: { type: String, required: true }
})
</script>
