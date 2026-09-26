<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 overflow-visible! px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30">
    <div class="hidden md:max-lg:flex w-full flex-col items-center gap-4 text-center pt-16">
      <UiHeadingH2>Mira cómo funciona en la práctica</UiHeadingH2>
      <p class="max-w-190 text-hueso text-sm leading-normal font-light" v-html="pasos.subtitulo" />
    </div>

    <div ref="recorrido" class="w-full" :style="{ height: `calc(100dvh + ${(pasos.items.length - 1) * TRAMO + PAUSA}vh)` }">
      <div
        class="w-full h-dvh flex flex-col lg:flex-row justify-center md:max-lg:justify-start items-center gap-6 lg:gap-12 sticky top-0 md:max-lg:top-28 md:max-lg:h-[calc(100dvh-7rem)] overflow-hidden pt-24 md:pt-28 md:max-lg:pt-4! lg:pt-33 pb-6">
        <div class="w-full lg:w-auto lg:flex-1 lg:min-w-0 flex md:max-lg:hidden flex-col items-center lg:items-start gap-3 md:gap-4 text-center lg:text-left">
          <UiHeadingH2>Mira cómo funciona en la práctica</UiHeadingH2>
          <p class="max-w-190 lg:max-w-200 text-hueso text-sm lg:text-base leading-normal font-light"
            v-html="pasos.subtitulo" />
        </div>

        <ol class="w-full md:max-lg:max-w-[max(24rem,calc((100dvh-16rem)*2))] lg:w-[min(calc((100dvh-17rem)*2),calc(100%-23rem))] lg:max-w-none lg:shrink-0 grid"
          :style="{ paddingBottom: `${pasos.items.length - 1}rem` }">
          <li v-for="(paso, i) in pasos.items" :key="paso.texto" class="w-full [grid-area:1/1] origin-top will-change-transform"
            :style="estilos[i].card">
            <article class="w-full flex flex-col border border-blanco/33 rounded-2xl overflow-hidden bg-negro">
              <header class="flex items-center gap-3 md:gap-4 border-b border-blanco/15 px-4 md:px-6 py-3 md:py-4"
                :style="estilos[i].header">
                <span class="text-base lg:text-xl font-bold tabular-nums text-amarillo">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <span class="w-px self-stretch bg-blanco/20" />
                <h3 class="text-hueso text-sm md:text-base lg:text-xl leading-[1.3]">{{ paso.texto }}</h3>
                <span class="hidden md:block shrink-0 ml-auto text-hueso/40 text-xs lg:text-sm tabular-nums whitespace-nowrap">
                  {{ i + 1 }} / {{ pasos.items.length }}
                </span>
              </header>
              <div class="w-full aspect-1375/690 relative bg-black">
                <NuxtImg :src="paso.imagen" :alt="paso.texto" format="avif"
                  sizes="xs:100vw sm:100vw md:100vw lg:100vw xxl:1200px" class="size-full absolute inset-0 object-cover" />
              </div>
            </article>
          </li>
        </ol>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
const props = defineProps({
  pasos: { type: Object, required: true }
})

const TRAMO = 80
const PAUSA = 20

const recorrido = ref(null)
const entradas = ref(props.pasos.items.map((_, i) => (i === 0 ? 1 : 0)))

const ease = (t) => 1 - (1 - t) ** 3

const estilos = computed(() => entradas.value.map((t, i) => {
  const encima = entradas.value.slice(i + 1).reduce((total, e) => total + e, 0)
  return {
    card: {
      transform: `translateY(calc(${1 - ease(t)} * 100dvh + ${i}rem)) scale(${1 - encima * 0.04})`,
      filter: `brightness(${1 - Math.min(encima, 1) * 0.35})`,
    },
    header: { opacity: 1 - Math.min(encima, 1) },
  }
}))

let frame
function medir() {
  frame = null
  const el = recorrido.value
  if (!el) return
  const distancia = el.offsetHeight - window.innerHeight
  const avance = Math.min(Math.max(-el.getBoundingClientRect().top, 0), distancia)
  const tramo = (distancia * TRAMO) / ((props.pasos.items.length - 1) * TRAMO + PAUSA)
  entradas.value = props.pasos.items.map((_, i) => {
    if (i === 0) return 1
    return Math.min(Math.max((avance - (i - 1) * tramo) / tramo, 0), 1)
  })
}
const pedir = () => { if (!frame) frame = requestAnimationFrame(medir) }

onMounted(() => {
  window.addEventListener('scroll', pedir, { passive: true })
  window.addEventListener('resize', pedir)
  medir()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', pedir)
  window.removeEventListener('resize', pedir)
  if (frame) cancelAnimationFrame(frame)
})
</script>
