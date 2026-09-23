<template>
  <SharedEmpresas title="Empresas que confiaron en nosotros para proyectos importantes.">
    <div ref="grupo" class="w-full flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-0">
      <template v-for="(m, i) in metrics" :key="m.label">
        <span v-if="i > 0" class="w-px h-52 hidden md:block shrink-0 linea-vertical" />

        <div class="w-full md:flex-1 flex flex-col items-center">
          <span class="text-amarillo text-8xl md:text-7xl lg:text-[7rem] xxl:text-[8rem] font-bold leading-none tabular-nums">
            {{ mostrados[i] }}
          </span>
          <p class="text-center text-hueso text-base lg:text-2xl xxl:text-[2rem]">
            {{ m.label }}
          </p>
        </div>
      </template>
    </div>
  </SharedEmpresas>
</template>

<script setup>
import { metrics } from '~/constants/home'

const DURACION = 1600

const grupo = ref(null)
const partes = metrics.map((m) => {
  const [, prefijo = '', digitos = '', sufijo = ''] = m.value.match(/^(\D*)(\d+)(\D*)$/) || []
  return { prefijo, objetivo: Number(digitos), sufijo, crudo: m.value }
})
const valores = ref(partes.map(() => 0))
const mostrados = computed(() => partes.map((p, i) =>
  p.objetivo ? `${p.prefijo}${valores.value[i]}${p.sufijo}` : p.crudo))

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    valores.value = partes.map((p) => p.objetivo)
    return
  }

  let raf = null
  const correr = () => {
    const inicio = performance.now()
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / DURACION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      valores.value = partes.map((p) => Math.round(p.objetivo * eased))
      if (t < 1) raf = requestAnimationFrame(paso)
    }
    raf = requestAnimationFrame(paso)
  }

  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return
    io.disconnect()
    correr()
  }, { threshold: 0.4 })

  if (grupo.value) io.observe(grupo.value)

  onBeforeUnmount(() => {
    io.disconnect()
    if (raf) cancelAnimationFrame(raf)
  })
})
</script>
