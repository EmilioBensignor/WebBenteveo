export function useConteo(metricas, el, duracion = 1600) {
  const partes = metricas.map((m) => {
    const [, prefijo = '', digitos = '', sufijo = ''] = m.value.match(/^(\D*)(\d+)(\D*)$/) || []
    return { prefijo, objetivo: Number(digitos), sufijo, crudo: m.value }
  })
  const valores = ref(partes.map(() => 0))
  const mostrados = computed(() => partes.map((p, i) =>
    p.objetivo ? `${p.prefijo}${valores.value[i]}${p.sufijo}` : p.crudo))

  let raf = null
  let io = null
  let corriendo = false

  function correr() {
    corriendo = true
    const inicio = performance.now()
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      valores.value = partes.map((p) => Math.round(p.objetivo * eased))
      if (t < 1) raf = requestAnimationFrame(paso)
    }
    raf = requestAnimationFrame(paso)
  }

  function reiniciar() {
    if (raf) cancelAnimationFrame(raf)
    corriendo = false
    valores.value = partes.map(() => 0)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      valores.value = partes.map((p) => p.objetivo)
      return
    }
    const v = Array.isArray(el.value) ? el.value[0] : el.value
    const nodo = v?.$el ?? v
    if (!nodo) return
    io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) reiniciar()
      else if (e.intersectionRatio >= 0.4 && !corriendo) correr()
    }, { threshold: [0, 0.4] })
    io.observe(nodo)
  })

  onBeforeUnmount(() => {
    io?.disconnect()
    if (raf) cancelAnimationFrame(raf)
  })

  return mostrados
}
