<template>
  <Hero image="/img/agencia/hero-bg.jpg"
    title="Tu marca tiene algo para decir. Nosotros hacemos que el mundo la escuche."
    content-class="max-w-154 lg:max-w-full lg:w-full gap-6 md:gap-8 lg:gap-12 xxl:gap-16" title-class="max-w-236!"
    actions-class="md:max-w-none! flex-wrap! sm:flex-nowrap! gap-2!">
    <template #text>
      <span class="block">Creamos <span class="text-amarillo">{{ typed }}<span
            class="animate-pulse">|</span></span></span>
      <span class="block">que conectan con la gente y generan resultados concretos.</span>
    </template>
    <template #actions>
      <ButtonPrimary to="#contacto" class="w-56 md:w-50">
        <Icon name="material-symbols:calendar-month-outline-rounded" size="1.5rem" />
        Hablemos
      </ButtonPrimary>
      <ButtonPrimary to="#proyectos" variant="light" class="w-56 md:w-50">
        Ver trabajos
        <Icon name="material-symbols:arrow-forward-rounded" size="1.5rem" />
      </ButtonPrimary>
    </template>
  </Hero>
</template>

<script setup>
import { heroWords } from '~/constants/agencia'

const HOLD = 2200
const TYPE = 90
const ERASE = 45

const typed = ref('')

let wordIndex = 0
let charIndex = 0
let deleting = false
let timer = null

const step = () => {
  const word = heroWords[wordIndex]
  charIndex += deleting ? -1 : 1
  typed.value = word.slice(0, charIndex)
  let delay = deleting ? ERASE : TYPE
  if (deleting && charIndex === 0) {
    deleting = false
    wordIndex = (wordIndex + 1) % heroWords.length
    delay = 400
  } else if (!deleting && charIndex === word.length) {
    deleting = true
    delay = HOLD
  }
  timer = setTimeout(step, delay)
}

onMounted(() => { timer = setTimeout(step, 400) })
onBeforeUnmount(() => clearTimeout(timer))
</script>
