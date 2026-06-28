<template>
  <TransformacionHero />
  <TransformacionEmpresas />
  <Resultados :metrics="transformacionMetrics">
    <template #header>
      <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
        <HeadingH2 class="text-amarillo">Resultados reales</HeadingH2>
        <p class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 lg:text-xl text-blanco font-medium">
          Ayudamos a las empresas a resolver, potenciar y agilizar procesos mediante herramientas de IA robustas y
          confiables adaptadas a tus negocios
        </p>
      </div>
    </template>
  </Resultados>
  <TransformacionHorasPerdidas />
  <TransformacionBeneficios />
  <TransformacionIndustrias />
  <TransformacionOpiniones />
  <TransformacionProceso />
  <TransformacionFaqs />
  <HomeContacto title="¿Listo para el siguiente nivel?"
    subtitle="Agenda una sesión de asesoramiento. Sin compromisos, solo pensar juntos."
    title-class="md:text-2xl lg:text-5xl! font-bold!" />
</template>

<script setup>
import { transformacionMetrics } from '~/constants/home'

useSeoMeta({
  title: 'Transformación Tecnológica con IA',
  description: 'Comenzá a utilizar la inteligencia artificial en los procesos de tu empresa.'
})
</script>
