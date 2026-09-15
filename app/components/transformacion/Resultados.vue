<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14"
    inner="gap-6 md:gap-8 lg:gap-12 xxl:gap-16">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 lg:gap-6 text-center">
      <UiHeadingH2 class="max-w-72 md:max-w-none">Resultados reales</UiHeadingH2>
      <p class="max-w-190 lg:max-w-230 text-hueso text-sm lg:text-base leading-[1.5] font-light">
        Ayudamos a las empresas a resolver, potenciar y agilizar procesos mediante herramientas de IA robustas y
        confiables adaptadas a sus negocios.
      </p>
    </div>

    <div ref="grupo" class="w-full flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0">
      <template v-for="(m, i) in transformacionMetrics" :key="m.label">
        <span v-if="i > 0" class="w-px h-36 lg:h-44 xl:h-52 hidden md:block shrink-0 linea-vertical" />

        <div class="w-full md:flex-1 flex flex-col items-center justify-start gap-2 md:self-start md:px-4 lg:px-6">
          <span
            class="text-amarillo text-6xl iph:text-7xl md:text-5xl lg:text-7xl xl:text-8xl xxl:text-[7rem] font-bold leading-none tabular-nums">
            {{ mostrados[i] }}
          </span>
          <p class="max-w-72 md:max-w-none text-center text-hueso text-sm lg:text-base xxl:text-xl leading-[1.4] font-light">
            {{ m.label }}
          </p>
        </div>
      </template>
    </div>
  </DefaultSection>
</template>

<script setup>
import { transformacionMetrics } from '~/constants/home'

const DURACION = 1600

const grupo = ref(null)

const partes = transformacionMetrics.map((m) => {
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
