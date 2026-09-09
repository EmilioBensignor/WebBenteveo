<template>
  <DefaultSection id="servicios" bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8">
    <UiHeadingH2 class="w-full text-center">
      Tres capacidades. Una misma visión del negocio.
    </UiHeadingH2>

    <div class="w-full max-w-362 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 lg:gap-8 xxl:gap-12">
      <HomeServicioCard v-for="servicio in servicios" :key="servicio.number" :servicio="servicio"
        :icon="esMobile ? 'arrow-forward' : 'add'" />
    </div>
  </DefaultSection>
</template>

<script setup>
import { servicios } from '~/constants/home'

const esMobile = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(max-width: 767px)')
  const sync = () => { esMobile.value = mq.matches }
  sync()
  mq.addEventListener('change', sync)
  onBeforeUnmount(() => mq.removeEventListener('change', sync))
})
</script>
