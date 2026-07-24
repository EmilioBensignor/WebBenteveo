<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30">
    <div class="flex flex-col items-center gap-3 lg:gap-4 text-center">
      <HeadingH2 class="max-w-64 md:max-w-full">
        <span class="text-blanco">Cuatro cosas que cambian en tu empresa</span>
        <span class="text-amarillo"> cuando integras IA a tus procesos</span>
      </HeadingH2>
      <p class="max-w-64 sm:max-w-80 md:max-w-full lg:text-xl text-blanco font-medium">
        Deja de apagar incendios y empieza a crecer
      </p>
    </div>

    <div class="w-full max-w-240 flex flex-col gap-6 lg:gap-8">
      <div class="grid grid-cols-4 gap-2 lg:gap-3">
        <button v-for="(b, i) in beneficios" :key="b.number" type="button"
          class="group flex flex-col gap-2 cursor-pointer text-left" @click="goTo(i)">
          <span class="text-sm lg:text-base font-bold tabular-nums transition-colors duration-300"
            :class="active === i ? 'text-amarillo' : 'text-blanco/40'">
            {{ b.number }}
          </span>
          <span class="h-0.5 w-full relative bg-blanco/15 overflow-hidden">
            <span class="absolute inset-y-0 left-0 bg-amarillo" :class="active === i ? 'fill' : 'w-0'"
              :style="active === i ? `animation-duration: ${INTERVAL}ms` : ''" />
          </span>
        </button>
      </div>

      <Transition name="beneficio" mode="out-in">
        <article :key="active"
          class="min-h-70 lg:min-h-75 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 lg:gap-16 bg-negro border border-blanco/20 rounded-3xl p-6 md:p-10 lg:p-14">
          <div class="flex md:flex-col items-center gap-4 md:gap-6 shrink-0">
            <span class="text-7xl lg:text-9xl text-amarillo font-bold leading-none tabular-nums">
              {{ beneficios[active].number }}
            </span>
            <span class="size-12 lg:size-14 flex items-center justify-center bg-amarillo/10 rounded-full text-amarillo">
              <Icon :name="beneficios[active].icon" class="size-6! lg:size-7!" />
            </span>
          </div>
          <div class="flex flex-col gap-3 lg:gap-4">
            <HeadingH3 class="text-amarillo font-bold lg:text-3xl!">
              <span v-html="beneficios[active].title" />
            </HeadingH3>
            <p class="max-w-140 text-sm lg:text-lg text-blanco font-medium">{{ beneficios[active].text }}</p>
          </div>
        </article>
      </Transition>
    </div>

    <ButtonPrimary>Quiero aplicarlo a mi empresa</ButtonPrimary>
  </Section>
</template>

<script setup>
import { beneficios } from '~/constants/transformacion'

const INTERVAL = 5000

const active = ref(0)
let timer = null

const startTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    active.value = (active.value + 1) % beneficios.length
  }, INTERVAL)
}

const goTo = (i) => {
  active.value = i
  startTimer()
}

onMounted(startTimer)
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.fill {
  animation: fill linear forwards;
}

@keyframes fill {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

.beneficio-enter-active,
.beneficio-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.beneficio-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.beneficio-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
