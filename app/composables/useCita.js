import { preguntasCita } from '~/constants/cita'

export function useFechaCita() {
  const route = useRoute()
  const dia = computed(() => route.query.dia || '[día]')
  const hora = computed(() => route.query.hora || '[hora]')
  return { dia, hora }
}

export function useCuestionarioCita() {
  const respuestas = ref(preguntasCita.map(() => []))
  const frase = ref('')
  const estado = ref('idle')

  function elegida(i, opcion) {
    return respuestas.value[i].includes(opcion)
  }

  function bloqueada(i, opcion) {
    const { max } = preguntasCita[i]
    return max > 1 && !elegida(i, opcion) && respuestas.value[i].length >= max
  }

  function alternar(i, opcion) {
    const lista = respuestas.value[i]
    if (preguntasCita[i].max === 1) {
      respuestas.value[i] = elegida(i, opcion) ? [] : [opcion]
      return
    }
    if (elegida(i, opcion)) respuestas.value[i] = lista.filter((o) => o !== opcion)
    else if (!bloqueada(i, opcion)) respuestas.value[i] = [...lista, opcion]
  }

  const completo = computed(() => respuestas.value.some((r) => r.length) || frase.value.trim().length > 0)

  function enviar() {
    if (!completo.value || estado.value !== 'idle') return
    estado.value = 'loading'
    setTimeout(() => (estado.value = 'enviado'), 900)
  }

  return { preguntas: preguntasCita, respuestas, frase, estado, elegida, bloqueada, alternar, completo, enviar }
}
