<template>
  <RubroHero :rubro="rubro" />
  <RubroProblemas v-if="rubro.problemas" :parrafo="rubro.parrafo" :problemas="rubro.problemas"
    :nombre="rubro.nombre" />
  <component :is="pasosVersiones[pasos] ?? RubroPasos" v-if="rubro.pasos" :pasos="rubro.pasos" />
  <RubroAutomatizaciones v-if="rubro.automatizaciones" :automatizaciones="rubro.automatizaciones"
    :nombre="rubro.nombre" />
  <TransformacionResultados
    :texto="`Ayudamos a las empresas de ${rubro.nombre} a resolver, potenciar y agilizar procesos mediante herramientas de IA robustas y confiables adaptadas a sus negocios.`" />
  <TransformacionOpiniones />
  <TransformacionProceso />
  <HomeContacto eyebrow="¿Listo para el siguiente nivel?"
    title="Agenda una sesión de asesoramiento."
    subtitle="Sin compromisos, solo pensar juntos cómo aplicar IA en tu operación."
    form-title="Déjanos tus datos para ponernos en contacto." submit-label="Agendar una cita" />

  <nav class="flex gap-1 fixed bottom-28 left-1/2 -translate-x-1/2 z-60 glass rounded-full p-1" aria-label="Versiones de pasos">
    <span class="self-center text-hueso text-xs md:text-sm pl-3 pr-1">Pasos</span>
    <NuxtLink v-for="v in ['actual', '1', '2', '3', '4', '5']" :key="v"
      :to="{ query: { ...route.query, pasos: v === 'actual' ? undefined : v } }"
      class="rounded-full text-xs md:text-sm px-3 py-1.5 transition-colors"
      :class="(pasos ?? 'actual') === v ? 'bg-amarillo text-negro font-semibold' : 'text-hueso'">
      {{ v === 'actual' ? 'Actual' : `V${v}` }}
    </NuxtLink>
  </nav>
</template>

<script setup>
import { rubros } from '~/constants/rubros'

const route = useRoute()
const rubro = rubros[route.params.nombre]
const pasos = computed(() => route.query.pasos)

const RubroPasos = resolveComponent('RubroPasos')
const pasosVersiones = {
  1: resolveComponent('RubroPasosV1'),
  2: resolveComponent('RubroPasosV2'),
  3: resolveComponent('RubroPasosV3'),
  4: resolveComponent('RubroPasosV4'),
  5: resolveComponent('RubroPasosV5')
}

if (!rubro) throw createError({ statusCode: 404, statusMessage: 'Rubro no encontrado' })

useSeoMeta({
  title: `IA para ${rubro.h1}`,
  description: rubro.subtitulo
})
</script>
