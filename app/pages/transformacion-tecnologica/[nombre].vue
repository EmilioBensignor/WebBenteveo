<template>
  <RubroHero :title="rubro.h1" :subtitulo="rubro.subtitulo" :image="rubro.imagenHero" />
  <RubroProblemas v-if="rubro.problemas" :parrafo="rubro.parrafo" :problemas="rubro.problemas"
    :nombre="rubro.nombre" />
  <RubroPasos v-if="rubro.pasos" :pasos="rubro.pasos" :automatizaciones="rubro.automatizaciones"
    :nombre="rubro.nombre" />
  <TransformacionProceso />
  <Resultados :metrics="transformacionMetrics">
    <template #header>
      <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
        <HeadingH2 class="text-amarillo">Resultados reales</HeadingH2>
        <p class="max-w-72 sm:max-w-96 tab:max-w-120 md:max-w-146 lg:max-w-236 lg:text-xl text-blanco font-medium">
          Ayudamos a las empresas de {{ rubro.nombre }} a resolver, potenciar y agilizar procesos mediante
          herramientas de IA robustas y confiables adaptadas a tus negocios
        </p>
      </div>
    </template>
  </Resultados>
  <Section class="md:px-8 lg:px-16 xxl:px-30">
    <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.8, tab: 2.4, md: 3, lg: 3, xl: 3, xxl: 4 }"
      :gap="{ base: 8, md: 16, lg: 16, xl: 16, xxl: 16 }"
      :button-position="{ top: '50%', transform: 'translateY(-50%)', left: { base: '0.5rem', md: '-1.5rem', lg: '-1.75rem', xl: '-1.75rem', xxl: '-1.75rem' }, right: { base: '0.5rem', md: '-1.5rem', lg: '-1.75rem', xl: '-1.75rem', xxl: '-1.75rem' } }">
      <OpinionCard v-for="op in opiniones" :key="op.autor + op.empresa" :op="op" />
    </CarouselStatic>
  </Section>
  <HomeContacto title="¿Listo para el siguiente nivel?"
    subtitle="Agenda una sesión de asesoramiento. Sin compromisos, solo pensar juntos." />
</template>

<script setup>
import { rubros } from '~/constants/rubros'
import { opiniones } from '~/constants/transformacion'
import { transformacionMetrics } from '~/constants/home'

const route = useRoute()
const rubro = rubros[route.params.nombre]

if (!rubro) throw createError({ statusCode: 404, statusMessage: 'Rubro no encontrado' })
</script>
