<template>
  <RubroHero :rubro="rubro" />
  <RubroProblemas v-if="rubro.problemas" :parrafo="rubro.parrafo" :problemas="rubro.problemas"
    :nombre="rubro.nombre" />
  <RubroPasos v-if="rubro.pasos" :pasos="rubro.pasos" />
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
</template>

<script setup>
import { rubros } from '~/constants/rubros'

const route = useRoute()
const rubro = rubros[route.params.nombre]

if (!rubro) throw createError({ statusCode: 404, statusMessage: 'Rubro no encontrado' })

useSeoMeta({
  title: `IA para ${rubro.h1}`,
  description: rubro.subtitulo
})
</script>
