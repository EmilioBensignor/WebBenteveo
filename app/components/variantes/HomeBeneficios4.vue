<template>
  <Section bg="bg-amarillo" class="py-16 md:py-24 lg:py-32 px-4 md:px-7 lg:px-16 xxl:px-32">
    <template #background>
      <div class="w-full h-16 md:h-20 absolute top-0 left-0 bg-linear-to-b from-negro to-amarillo" />
      <div class="w-full h-16 md:h-20 absolute bottom-0 left-0 bg-linear-to-t from-negro to-amarillo" />
    </template>

    <div class="max-w-150 lg:max-w-200 flex flex-col items-center gap-2 lg:gap-4 text-center text-negro-puro px-4">
      <HeadingH2 class="font-bold!">
        Cuando creatividad, tecnología y producción trabajan juntos desde el día uno, los resultados son mejores.
      </HeadingH2>
      <p class="text-lg lg:text-xl font-medium">El mismo equipo, el mismo criterio y la misma visión de tu marca.</p>
    </div>

    <div ref="deckRef" class="w-full max-w-300 grid md:grid-cols-3 gap-3 lg:gap-4 px-4 md:px-0">
      <article v-for="(b, i) in beneficios" :key="b.title"
        class="flex flex-col gap-8 lg:gap-12 bg-negro rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-all duration-700 ease-out p-6 lg:p-8"
        :class="revealed ? 'opacity-100' : 'opacity-90'" :style="revealed ? '' : closedStyles[i]"
        :data-delay="i">
        <span class="size-12 lg:size-14 flex items-center justify-center bg-amarillo/10 rounded-full text-amarillo">
          <Icon :name="b.icon" class="size-6! lg:size-7!" />
        </span>
        <div class="flex flex-col gap-2 lg:gap-3">
          <h3 class="text-amarillo text-xl lg:text-2xl font-bold">{{ b.title }}</h3>
          <p class="text-blanco text-sm lg:text-base font-medium">{{ b.text }}</p>
        </div>
      </article>
    </div>

    <ButtonPrimary to="#servicios" variant="dark">Conoce como trabajamos</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/home'

const deckRef = ref(null)
const revealed = ref(false)

const closedStyles = [
  'transform: translate(55%, 4%) rotate(-7deg); transition-delay: 0ms',
  'transform: translateY(-2%) rotate(3deg); transition-delay: 80ms',
  'transform: translate(-55%, 6%) rotate(9deg); transition-delay: 160ms'
]

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      revealed.value = true
      observer.disconnect()
    }
  }, { threshold: 0.35 })
  observer.observe(deckRef.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>
