<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-16"
    inner="gap-8 lg:gap-12 items-stretch!">
    <UiHeadingH2 class="max-w-80 md:max-w-none self-center text-center">
      ¿Te suena <span class="text-amarillo">alguna de estas frases?</span>
    </UiHeadingH2>

    <div class="w-full flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-16">
      <nav class="flex lg:flex-col shrink-0 gap-2 lg:gap-4" aria-label="Frases">
        <button v-for="(frase, i) in frases" :key="frase" type="button" :aria-current="i === actual"
          class="group flex items-center gap-3 cursor-pointer" @click="irA(i)">
          <span
            class="text-2xl lg:text-4xl font-semibold leading-none tabular-nums transition-colors duration-300"
            :class="i === actual ? 'text-amarillo' : 'text-hueso/25 lg:group-hover:text-hueso/60'">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <span class="h-0.5 lg:h-px w-10 lg:w-16 relative bg-blanco/20 rounded-full overflow-hidden">
            <span v-if="i === actual" class="barra h-full absolute inset-y-0 left-0 block bg-amarillo"
              :style="{ animationDuration: `${INTERVALO}ms` }" />
          </span>
        </button>
      </nav>

      <div class="flex-1 min-w-0 flex flex-col justify-center gap-6 lg:gap-8">
        <Icon name="material-symbols:format-quote-rounded" class="size-10 lg:size-16 shrink-0 text-amarillo/50" />

        <Transition mode="out-in" enter-active-class="transition duration-500 ease-out"
          leave-active-class="transition duration-300 ease-in" enter-from-class="opacity-0 translate-y-4"
          leave-to-class="opacity-0 -translate-y-4">
          <p :key="actual" class="text-blanco text-xl md:text-3xl lg:text-5xl xxl:text-6xl font-medium leading-[1.15]">
            {{ frases[actual] }}
          </p>
        </Transition>

        <p class="text-amarillo text-base lg:text-[1.75rem] font-medium">Para eso estamos.</p>
      </div>
    </div>

    <UiButtonPrimary to="#contacto" variant="glass" size="glass" class="self-center gap-3 pl-6 pr-4">
      Hablemos de tu marca
      <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
    </UiButtonPrimary>
  </DefaultSection>
</template>

<script setup>
import { frases } from '~/constants/agencia'

const INTERVALO = 6000

const actual = ref(0)
let reloj = null

function arrancar() {
  detener()
  reloj = setInterval(() => { actual.value = (actual.value + 1) % frases.length }, INTERVALO)
}

function detener() {
  if (reloj) clearInterval(reloj)
  reloj = null
}

function irA(i) {
  actual.value = i
  arrancar()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  arrancar()
})

onBeforeUnmount(detener)
</script>

<style scoped>
.barra {
  animation: llenar linear forwards;
}

@keyframes llenar {
  from { width: 0 }
  to { width: 100% }
}
</style>
