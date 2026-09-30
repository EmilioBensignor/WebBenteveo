<template>
  <DefaultSection ref="hero" bg="bg-negro" :class="cubierto && 'invisible'"
    class="min-h-dvh sticky! top-0 [@media(max-height:560px)]:relative! flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pt-32 pb-20">
    <template #background>
      <div class="absolute inset-0 puntos text-blanco/10 mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 lg:size-[36rem] rounded-full bg-amarillo/15 blur-3xl" />
    </template>

    <div class="w-full max-w-200 flex flex-col items-center gap-6 lg:gap-8 text-center mx-auto">
      <span class="check size-20 lg:size-24 flex justify-center items-center rounded-full bg-amarillo text-negro shadow-amarilla">
        <Icon name="material-symbols:check-rounded" size="48" />
      </span>

      <h1 class="text-hueso text-3xl md:text-5xl lg:text-6xl xxl:text-7xl font-bold leading-[1.05] tracking-tight text-balance">
        Listo, tu reunión está <span class="text-amarillo">confirmada</span>
      </h1>

      <p class="glass flex flex-wrap justify-center items-center gap-x-2 gap-y-1 rounded-full text-hueso text-base lg:text-xl font-light px-6 py-3">
        <Icon name="material-symbols:calendar-month-outline-rounded" size="22" class="shrink-0 text-amarillo" />
        <span>Nos vemos el <strong class="text-amarillo font-semibold">{{ dia }}</strong> a las <strong class="text-amarillo font-semibold">{{ hora }}</strong>.</span>
      </p>
    </div>
  </DefaultSection>
</template>

<script setup>
import { useFechaCita } from '~/composables/useCita'

const { dia, hora } = useFechaCita()

const hero = useTemplateRef('hero')
const cubierto = ref(false)

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

.check {
  animation: aparecer 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes aparecer {
  from { transform: scale(0.4); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .check { animation: none; }
}
</style>
