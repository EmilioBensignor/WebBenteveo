<template>
  <AgenciaHero />
  <AgenciaFrases />
  <AgenciaServicios />
  <AgenciaPasos />
  <HomeProyectos title="Así se ve una buena estrategia" accent="cuando se pone en acción." cta="Ver todos los trabajos"
    cta-to="#" class="pb-6 md:pb-8 lg:pb-12 xxl:pb-16" />
  <HomeContacto eyebrow="El siguiente paso" title="Ahora hablemos de tu marca."
    subtitle="Contanos qué desafío tenés. Nosotros encontramos la mejor manera de resolverlo."
    submit-label="Empecemos a trabajar juntos" />
</template>

<script setup>
useSeoMeta({
  title: 'Agencia creativa',
  description: 'Tu marca tiene algo para decir. Nosotros hacemos que el mundo la escuche. Campañas, contenido y experiencias que conectan con la gente y generan resultados concretos.'
})

useHead({ bodyAttrs: { class: 'page-agencia' } })
</script>

<style>
body.page-agencia main {
  gap: 0;
}
</style>
