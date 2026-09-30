<template>
  <DefaultSection ref="hero" bg="bg-negro" :class="cubierto && 'invisible'"
    class="min-h-dvh sticky! top-0 [@media(max-height:560px)]:relative! flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pt-32 pb-20"
    @pointermove="mover">
    <template #background>
      <div class="absolute inset-0 puntos text-blanco/12 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div class="absolute inset-0 puntos text-amarillo" :style="{ maskImage: foco, WebkitMaskImage: foco }" />
      <div class="absolute top-0 inset-x-0 h-1/2 bg-linear-to-b from-[#74ACDF]/10 to-transparent" />
    </template>

    <div class="w-full max-w-240 flex flex-col items-center gap-6 lg:gap-8 text-center mx-auto">
      <SubsidioBandera class="w-12 lg:w-16 shadow-[0_8px_24px_rgba(0,0,0,0.4)]" />
      <h1 class="text-hueso text-5xl md:text-7xl lg:text-8xl xxl:text-[7.5rem] font-bold leading-[0.95] tracking-tight text-balance">
        ¿Qué es <span class="text-amarillo whitespace-nowrap">KIT 4.0</span>?
      </h1>
      <p class="max-w-160 text-hueso text-base md:text-lg lg:text-xl font-light leading-[1.5] text-balance">
        KIT 4.0 es un programa nacional que facilita a las PyMEs la incorporación de tecnología para mejorar y digitalizar sus procesos.
      </p>
      <UiButtonPrimary variant="glass" size="glass" class="w-full sm:w-max gap-2 mt-2" @click="emit('calificar')">
        Quiero saber si mi empresa califica
        <Icon name="material-symbols:arrow-forward-rounded" size="20" class="hidden! iph:block! shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
const emit = defineEmits(['calificar'])

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
