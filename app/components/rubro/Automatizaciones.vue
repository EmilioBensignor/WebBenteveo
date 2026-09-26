<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12">
    <template #background>
      <div class="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_60%,rgb(252_183_22/0.2),transparent)]" />
    </template>

    <UiHeadingH2 class="max-w-80 md:max-w-none text-center">
      Otras automatizaciones para {{ nombre }}
    </UiHeadingH2>

    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <article v-for="a in automatizaciones" :key="a.titulo"
        class="flex flex-col gap-4 lg:gap-6 glass rounded-3xl p-5 lg:p-7 xxl:p-8">
        <Icon :name="a.icon" class="size-8! lg:size-10! shrink-0 text-amarillo" />
        <div class="flex flex-col gap-2 lg:gap-3">
          <h3 class="text-blanco text-base lg:text-xl font-medium leading-[1.3]">{{ a.titulo }}</h3>
          <p class="text-hueso/80 text-sm lg:text-base leading-[1.4] font-light">{{ a.texto }}</p>
        </div>
      </article>
    </div>
  </DefaultSection>
</template>

<script setup>
defineProps({
  automatizaciones: { type: Array, required: true },
  nombre: { type: String, required: true }
})
</script>
