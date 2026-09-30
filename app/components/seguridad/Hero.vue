<template>
  <DefaultSection ref="hero" bg="bg-negro" :class="cubierto && 'invisible'"
    class="min-h-dvh sticky! top-0 [@media(max-height:560px)]:relative! flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pt-32 pb-20"
    @pointermove="mover">
    <template #background>
      <div class="absolute inset-0 puntos text-blanco/12 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div class="absolute inset-0 puntos text-amarillo" :style="{ maskImage: foco, WebkitMaskImage: foco }" />
    </template>

    <div class="w-full max-w-250 flex flex-col items-center gap-6 lg:gap-8 text-center mx-auto">
      <span class="flex items-center gap-2 border border-amarillo/35 bg-amarillo/10 backdrop-blur-md rounded-full text-amarillo text-xs lg:text-sm px-4 py-2">
        <Icon name="material-symbols:lock-outline" size="16" class="shrink-0" />
        Entorno 100% anónimo
      </span>
      <h1 class="text-hueso text-4xl md:text-6xl lg:text-7xl xxl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-balance">
        ¿Hasta qué punto están expuestos <span class="text-amarillo">tus datos</span> al usar IA?
      </h1>
      <p class="max-w-160 text-hueso text-base md:text-lg lg:text-xl font-light leading-normal text-balance">
        No necesitas conocimientos técnicos ni jurídicos. Responde de forma honesta sobre las herramientas que usa tu equipo y conoce tu riesgo actual en 3 minutos.
      </p>
      <UiButtonPrimary variant="glass" size="glass" class="w-full sm:w-max gap-2 mt-2" @click="scrollToEl('test-seguridad', -80)">
        Comenzar el test
        <Icon name="material-symbols:arrow-downward-rounded" size="20" class="shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
import { scrollToEl } from '~/composables/useSmoothScroll'

const hero = useTemplateRef('hero')
const cubierto = ref(false)
const cursor = reactive({ x: 50, y: 45 })

const foco = computed(() => `radial-gradient(circle 18rem at ${cursor.x}% ${cursor.y}%, black, transparent)`)

function mover(e) {
  if (e.pointerType !== 'mouse') return
  const caja = e.currentTarget.getBoundingClientRect()
  cursor.x = ((e.clientX - caja.left) / caja.width) * 100
  cursor.y = ((e.clientY - caja.top) / caja.height) * 100
}

function revisar() {
  const alto = hero.value?.$el?.offsetHeight
  if (alto) cubierto.value = window.scrollY >= alto
}

onMounted(() => {
  revisar()
  window.addEventListener('scroll', revisar, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', revisar))
</script>

<style scoped>
.puntos {
  background-image: radial-gradient(currentColor 1.2px, transparent 1.6px);
  background-size: 28px 28px;
  background-position: center;
}
</style>
