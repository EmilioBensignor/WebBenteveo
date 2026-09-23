<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14"
    inner="gap-6 md:gap-8 lg:gap-12 xxl:gap-16">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 lg:gap-6 xxl:gap-8">
      <UiHeadingH2 class="max-w-72 md:max-w-none text-center">{{ title }}</UiHeadingH2>

      <SharedMarcas />
    </div>

    <slot />
  </DefaultSection>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Ya se transformaron con nosotros' }
})
</script>
