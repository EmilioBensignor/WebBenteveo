<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14"
    inner="gap-6 md:gap-8 lg:gap-12 xxl:gap-16">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 lg:gap-6 xxl:gap-8">
      <UiHeadingH2 class="max-w-72 md:max-w-none text-center">
        Empresas que confiaron en nosotros para proyectos importantes.
      </UiHeadingH2>

      <div class="w-full relative overflow-hidden">
        <div class="w-max flex items-center gap-1 md:gap-4 animate-marquee">
          <span v-for="(logo, i) in track" :key="i"
            class="size-23 md:size-30 xxl:size-32 shrink-0 relative border border-hueso/40 rounded-2xl lg:rounded-3xl shadow-[-4px_6px_32px_0_#171b21] overflow-hidden">
            <img :src="logo" alt="" class="size-full object-cover" loading="lazy" decoding="async" width="128" height="128">
            <span
              class="absolute inset-0 rounded-[inherit] shadow-[inset_-2px_2px_20px_0_rgba(0,18,22,0.7),inset_4px_-4px_20px_0_rgba(1,17,21,0.7)]" />
            <img src="/img/marcas/reflejo.svg" alt="" aria-hidden="true"
              class="w-[78%] h-[78%] absolute left-[13%] top-[2%] pointer-events-none" loading="lazy" decoding="async">
          </span>
        </div>

        <div class="w-12 lg:w-32 absolute inset-y-0 left-0 z-10 bg-linear-to-r from-negro from-20% to-transparent" />
        <div class="w-12 lg:w-32 absolute inset-y-0 right-0 z-10 bg-linear-to-l from-negro from-20% to-transparent" />
      </div>
    </div>

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
  </DefaultSection>
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

const logos = [
  'bayer.png',
  'tour-experto.png',
  'sodimac.jpg',
  'paty.jpg',
  'mercadopago.jpg',
  'mapei.jpg',
  'klaukol.jpg',
  'bosch.png',
  'sika.jpg'
].map((file) => `/img/marcas/color/${file}`)

const track = [...logos, ...logos]
</script>
