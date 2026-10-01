<template>
  <DefaultSection ref="hero" bg="bg-negro" :class="cubierto && 'invisible'"
    class="min-h-dvh sticky! top-0 [@media(max-height:560px)]:relative! flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pt-32 pb-20"
    @pointerenter="entrar" @pointermove="mover" @pointerleave="activo = false">
    <template #background>
      <div class="absolute left-1/2 top-[38%] w-240 max-w-[140vw] aspect-2/1 -translate-1/2 rounded-full bg-amarillo/8 blur-[120px] respira" />
      <div class="absolute inset-0 puntos text-blanco/12 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div ref="foco" class="absolute inset-0 puntos foco text-amarillo transition-opacity duration-700" :class="activo ? 'opacity-100' : 'opacity-0'" />
      <slot name="background" />
    </template>

    <div class="entrada w-full flex flex-col items-center gap-6 lg:gap-8 text-center mx-auto" :class="ancho">
      <slot />
    </div>
  </DefaultSection>
</template>

<script setup>
defineProps({
  ancho: { type: String, default: 'max-w-250' }
})

const hero = useTemplateRef('hero')
const foco = useTemplateRef('foco')
const cubierto = ref(false)
const activo = ref(false)
const punto = { x: 0, y: 0, tx: 0, ty: 0 }
let frame = 0

function posicion(e) {
  const caja = e.currentTarget.getBoundingClientRect()
  punto.tx = e.clientX - caja.left
  punto.ty = e.clientY - caja.top
}

function pintar() {
  foco.value?.style.setProperty('--x', `${punto.x}px`)
  foco.value?.style.setProperty('--y', `${punto.y}px`)
}

function seguir() {
  punto.x += (punto.tx - punto.x) * 0.1
  punto.y += (punto.ty - punto.y) * 0.1
  pintar()
  frame = Math.abs(punto.tx - punto.x) + Math.abs(punto.ty - punto.y) > 0.5 ? requestAnimationFrame(seguir) : 0
}

function entrar(e) {
  if (e.pointerType !== 'mouse') return
  posicion(e)
  punto.x = punto.tx
  punto.y = punto.ty
  pintar()
  activo.value = true
}

function mover(e) {
  if (e.pointerType !== 'mouse') return
  posicion(e)
  activo.value = true
  if (!frame) frame = requestAnimationFrame(seguir)
}

function revisar() {
  const alto = hero.value?.$el?.offsetHeight
  if (alto) cubierto.value = window.scrollY >= alto
}

onMounted(() => {
  revisar()
  window.addEventListener('scroll', revisar, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', revisar)
})
</script>

<style scoped>
.puntos {
  background-image: radial-gradient(currentColor 1.2px, transparent 1.6px);
  background-size: 28px 28px;
  background-position: center;
}

.foco {
  --x: 50%;
  --y: 45%;
  mask-image: radial-gradient(circle 18rem at var(--x) var(--y), black, transparent);
}

@media (prefers-reduced-motion: no-preference) {
  .puntos {
    animation: deriva 24s linear infinite;
  }

  .respira {
    animation: respira 9s ease-in-out infinite alternate;
  }

  .entrada > * {
    animation: entrada 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  }

  .entrada > :nth-child(1) {
    animation-delay: 0.1s;
  }

  .entrada > :nth-child(2) {
    animation-delay: 0.22s;
  }

  .entrada > :nth-child(3) {
    animation-delay: 0.34s;
  }

  .entrada > :nth-child(4) {
    animation-delay: 0.46s;
  }
}

@keyframes deriva {
  to {
    background-position: calc(50% + 28px) calc(50% + 28px);
  }
}

@keyframes entrada {
  from {
    opacity: 0;
    translate: 0 24px;
    filter: blur(8px);
  }
}

@keyframes respira {
  from {
    opacity: 0.6;
    scale: 0.9;
  }

  to {
    opacity: 1;
    scale: 1.08;
  }
}
</style>
