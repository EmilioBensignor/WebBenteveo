<template>
  <Section ref="sectionRef" class="px-4 md:px-7 lg:px-16 xxl:px-30 py-6 md:py-10 lg:py-16">
    <HeadingH2 class="max-w-72 sm:max-w-96 md:max-w-none text-center text-blanco">
      Todo empieza con una idea. <span class="text-amarillo">Todo sucede en el mismo equipo.</span>
    </HeadingH2>

    <CarouselStatic class="w-[calc(100%+2rem)] md:hidden -mx-4"
      :slides-per-view="{ base: 1.15, sm: 1.5, tab: 2.2 }" :gap="{ base: 8 }">
      <AgenciaPasoCard v-for="(paso, i) in pasos" :key="paso.title" ref="cardRefs" :paso="paso" :index="i"
        :active="active === i" @click="select(i)" />
    </CarouselStatic>

    <div class="w-full max-w-300 hidden md:flex gap-4">
      <AgenciaPasoCard v-for="(paso, i) in pasos" :key="paso.title" class="flex-1" :paso="paso" :index="i"
        :active="active === i" @click="select(i)" />
    </div>
  </Section>
</template>

<script setup>
import { pasos } from '~/constants/agencia'

const active = ref(0)
const cardRefs = ref([])
const sectionRef = ref(null)
let timer = null
let observer = null
let visible = false

const startTimer = () => {
  clearInterval(timer)
  if (!visible) return
  timer = setInterval(() => { active.value = (active.value + 1) % pasos.length }, 4000)
}

const select = (i) => {
  active.value = i
  startTimer()
}

watch(active, (i) => {
  const card = cardRefs.value[i]?.$el
  const scroller = card?.closest('.overflow-x-auto')
  if (!scroller) return
  const left = card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2
  scroller.scrollTo({ left, behavior: 'smooth' })
})

onMounted(() => {
  const el = sectionRef.value?.$el
  if (!el || !window.IntersectionObserver) { visible = true; return startTimer() }
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) startTimer()
    else clearInterval(timer)
  }, { threshold: 0.5 })
  observer.observe(el)
})
onUnmounted(() => { clearInterval(timer); observer?.disconnect() })
</script>
