<template>
  <HomeHero />
  <HomeServicios />
  <HomeBeneficios />
  <Resultados :metrics="metrics">
    <template #header>
      <HeadingH2 class="md:flex md:flex-col md:items-center text-center text-blanco">
        Marcas que confiaron en nosotros <span class="text-amarillo">para proyectos importantes.</span>
      </HeadingH2>
      <Marcas />
    </template>
  </Resultados>
  <HomeProyectos />
  <HomeContacto eyebrow="El siguiente paso" title="Tenés un desafío de marca. Comencemos a resolverlo."
    subtitle="Contanos tus desafios de marca y pensemos juntos como empezar a resolverlos." />
</template>

<script setup>
import { metrics } from '~/constants/home'

useSeoMeta({
  title: 'Agencia de publicidad creativa',
  description: 'Ideas que mueven marcas. Estrategias que generan resultados. Creatividad, transformación tecnológica y eventos bajo un mismo techo.'
})
</script>
