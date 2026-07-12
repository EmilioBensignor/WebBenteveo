<template>
  <Section bg="bg-amarillo" class="px-4 md:px-7 lg:px-16 xxl:px-30 py-12 md:py-16 lg:py-24 xxl:py-32">
    <template #background>
      <div class="w-full h-16 md:h-20 absolute top-0 left-0 bg-linear-to-b from-negro to-transparent" />
      <div class="w-full h-16 md:h-20 absolute bottom-0 left-0 bg-linear-to-t from-negro to-transparent" />
    </template>

    <div class="flex flex-col items-center gap-2 md:gap-3 lg:gap-4 text-center">
      <HeadingH2 class="text-negro">Todo lo que tu marca necesita para crecer.</HeadingH2>
      <p class="lg:text-xl text-negro font-medium">Un solo equipo. Más velocidad, más control y mejores resultados.</p>
    </div>

    <div class="w-full max-w-300 flex flex-col lg:flex-row lg:items-stretch">
      <button v-for="(servicio, i) in servicios" :key="servicio.title" type="button" :aria-expanded="active === i"
        @click="active = i" @mouseenter="onHover(i)"
        class="servicio-card lg:h-75 flex flex-col justify-between items-end gap-4 relative first:rounded-t-2xl last:rounded-b-2xl lg:first:rounded-tr-none lg:last:rounded-bl-none lg:first:rounded-l-2xl lg:last:rounded-r-2xl text-left transition-all duration-500 cursor-pointer overflow-hidden p-4 lg:p-6"
        :class="active === i ? 'lg:flex-2' : 'lg:flex-1'">
        <div class="absolute inset-0 bg-linear-to-b from-negro from-33% to-negro-puro">
          <NuxtImg :src="servicio.image" alt="" format="avif,webp" sizes="480px" loading="lazy"
            class="size-full object-cover transition-opacity duration-500" :class="active === i ? 'opacity-20' : 'opacity-0'" />
        </div>

        <span class="text-xl lg:text-[1.75rem] font-bold leading-none relative transition-colors duration-300"
          :class="active === i ? 'text-amarillo' : 'text-blanco'">0{{ i + 1 }}</span>

        <div class="w-full flex flex-col relative">
          <div class="grid transition-[grid-template-rows] duration-500"
            :class="active === i ? 'grid-rows-[1fr] lg:delay-300' : 'grid-rows-[0fr]'">
            <div class="overflow-hidden">
              <span class="size-12 flex justify-center items-center bg-amarillo/10 rounded-full text-amarillo mb-2 lg:mb-4">
                <Icon :name="servicio.icon" class="size-6!" />
              </span>
            </div>
          </div>
          <h3 class="text-base lg:text-xl font-semibold transition-colors duration-300"
            :class="active === i ? 'text-amarillo' : 'text-blanco'">
            {{ servicio.title }}
          </h3>
          <div class="grid transition-[grid-template-rows] duration-500"
            :class="active === i ? 'grid-rows-[1fr] lg:delay-500' : 'grid-rows-[0fr]'">
            <div class="overflow-hidden">
              <p class="text-xs lg:text-sm text-blanco font-medium pt-2 lg:pt-4">{{ servicio.text }}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  </Section>
</template>

<script setup>
import { servicios } from '~/constants/agencia'

const active = ref(0)

function onHover(i) {
  if (window.matchMedia('(min-width: 1080px)').matches) active.value = i
}
</script>

<style scoped>
.servicio-card::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #131313, #f8f8f8);
  pointer-events: none;
}
.servicio-card:first-child::after {
  display: none;
}
@media (min-width: 1080px) {
  .servicio-card::after {
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, #131313, #f8f8f8);
  }
}
</style>
