<template>
  <NuxtLink :to="servicio.to" :data-cursor-label="servicio.cta" data-cursor-arrow
    class="w-full flex flex-col gap-6 lg:gap-8 relative">
    <div class="w-full relative">
      <div
        class="w-full h-46.5 md:h-60 lg:h-80 flex flex-col justify-end relative border border-blanco/33 rounded-2xl overflow-hidden p-px">
        <NuxtImg :src="servicio.image" :alt="servicio.title" class="size-full absolute inset-0 object-cover"
          format="avif" sizes="xs:100vw sm:100vw tab:50vw md:340px lg:460px" loading="lazy" />
        <div class="absolute inset-0 bg-linear-to-b from-black/25 to-black" />

        <span
          class="relative text-amarillo text-[5.5rem] lg:text-[8rem] font-bold -mb-4 md:-mb-6 lg:-mb-10 -ml-2 md:-ml-3 lg:-ml-4">
          {{ servicio.number }}
        </span>
      </div>

      <span
        class="size-8 lg:size-10 flex justify-center items-center absolute right-2 lg:-right-5 -bottom-4 glass-boton rounded-full text-hueso">
        <Icon :name="`material-symbols:${icon}-rounded`" size="1.25rem" />
      </span>
    </div>

    <div class="w-full flex flex-col gap-2 text-hueso px-3 lg:px-4">
      <h3 class="text-base lg:text-xl">{{ servicio.title }}</h3>
      <p class="text-sm lg:text-base leading-[1.4] font-light">{{ servicio.text }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  servicio: { type: Object, required: true },
  icon: { type: String, default: 'add' }
})
</script>
