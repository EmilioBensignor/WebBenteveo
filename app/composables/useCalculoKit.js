export const MONTO_MIN = 4000000
export const MONTO_MAX = 50000000
export const MONTO_PASO = 500000
const COBERTURA = 0.5
const DURACION = 600

const moneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

function useAnimado(fuente) {
  const mostrado = ref(fuente.value)
  let raf = null

  watch(fuente, (destino) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      mostrado.value = destino
      return
    }
    if (raf) cancelAnimationFrame(raf)
    const inicio = performance.now()
    const salida = mostrado.value
    const tick = (ahora) => {
      const t = Math.min((ahora - inicio) / DURACION, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      mostrado.value = Math.round(salida + (destino - salida) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  })

  onBeforeUnmount(() => { if (raf) cancelAnimationFrame(raf) })
  return mostrado
}

export function useCalculoKit(inicial = 20000000) {
  const monto = ref(inicial)
  const cubre = computed(() => Math.round(monto.value * COBERTURA))
  const aporte = computed(() => monto.value - cubre.value)
  const progreso = computed(() => (monto.value - MONTO_MIN) / (MONTO_MAX - MONTO_MIN))

  const cubreAnimado = useAnimado(cubre)
  const aporteAnimado = useAnimado(aporte)

  return {
    monto,
    cubre,
    aporte,
    progreso,
    cubreAnimado,
    aporteAnimado,
    formato: (valor) => moneda.format(valor),
    cobertura: COBERTURA * 100
  }
}
