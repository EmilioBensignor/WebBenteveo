import { preguntasSeguridad, nivelesRiesgo } from '~/constants/seguridad'

export function useTestSeguridad() {
  const total = preguntasSeguridad.length

  const paso = ref(0)
  const respuestas = ref([])
  let avance = null

  const terminado = computed(() => paso.value >= total)
  const actual = computed(() => preguntasSeguridad[Math.min(paso.value, total - 1)])
  const puntaje = computed(() => respuestas.value.reduce((suma, i, p) => suma + (preguntasSeguridad[p].opciones[i]?.puntos ?? 0), 0))
  const nivel = computed(() => nivelesRiesgo.find((n) => puntaje.value <= n.hasta))
  const indiceNivel = computed(() => nivelesRiesgo.indexOf(nivel.value))

  function responder(indice) {
    respuestas.value[paso.value] = indice
    clearTimeout(avance)
    avance = setTimeout(() => paso.value++, 320)
  }

  function volver() {
    clearTimeout(avance)
    if (paso.value > 0) paso.value--
  }

  function reiniciar() {
    clearTimeout(avance)
    paso.value = 0
    respuestas.value = []
  }

  onBeforeUnmount(() => clearTimeout(avance))

  return { preguntas: preguntasSeguridad, total, paso, respuestas, terminado, actual, puntaje, nivel, indiceNivel, responder, volver, reiniciar }
}
