<template>
  <DefaultSection bg="bg-negro" class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-16 md:py-20 lg:py-28">
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-8 lg:gap-6">
      <div class="flex flex-col items-center lg:items-start gap-3 lg:gap-4 text-center lg:text-left lg:pr-16">
        <UiHeadingH2 class="text-balance">Ayúdanos a llegar mejor preparados</UiHeadingH2>
        <p class="max-w-150 text-hueso text-sm lg:text-lg font-light leading-relaxed">
          Si quieres, antes de la reunión puedes responder estas cuatro preguntas breves.
          Nos darán un poco de contexto para aprovechar mejor la conversación.
        </p>
        <span class="w-max flex items-center gap-2 rounded-full border border-amarillo/40 bg-amarillo/10 text-amarillo text-xs lg:text-sm font-medium px-3 py-1.5">
          <Icon name="material-symbols:timer-outline-rounded" size="18" class="shrink-0" />
          Te llevará alrededor de 1 minuto.
        </span>
      </div>

      <div class="w-full flex flex-col items-center gap-6 lg:gap-8">
        <div class="w-full relative overflow-hidden bg-negro border border-blanco/33 rounded-2xl lg:rounded-3xl shadow-[0_24px_80px_-24px_rgba(252,183,22,0.25)]">
          <div class="absolute -top-32 -right-32 size-64 rounded-full bg-amarillo/15 blur-3xl pointer-events-none" />

          <div v-if="estado === 'enviado'" class="relative px-5 py-14 lg:py-20">
            <CitaGracias />
          </div>

          <form v-else class="flex flex-col gap-6 lg:gap-8 relative px-5 py-7 md:px-8 md:py-9" @submit.prevent="enviar">
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <span v-for="n in TOTAL" :key="n" class="h-1 flex-1 rounded-full overflow-hidden bg-blanco/18">
                  <span class="block h-full bg-amarillo origin-left transition-transform duration-500 ease-out"
                    :style="{ transform: `scaleX(${paso >= n - 1 ? 1 : 0})` }" />
                </span>
              </div>
              <span class="text-amarillo text-xs lg:text-sm font-medium whitespace-nowrap">Pregunta {{ paso + 1 }} de {{ TOTAL }}</span>
            </div>

            <Transition name="paso" mode="out-in">
              <fieldset v-if="paso < preguntas.length" :key="paso" class="min-h-96 flex flex-col gap-4">
                <legend class="flex flex-col gap-1 mb-4">
                  <span class="text-hueso text-lg lg:text-xl font-semibold leading-snug">{{ preguntas[paso].pregunta }}</span>
                  <span v-if="preguntas[paso].ayuda" class="text-gris text-sm font-light">{{ preguntas[paso].ayuda }}</span>
                </legend>

                <div class="flex flex-col gap-2">
                  <button v-for="opcion in preguntas[paso].opciones" :key="opcion" type="button"
                    :aria-pressed="elegida(paso, opcion)" :disabled="bloqueada(paso, opcion)"
                    class="w-full flex items-center justify-between gap-3 border rounded-xl text-left text-sm lg:text-base transition-colors duration-200 px-4 py-3"
                    :class="[
                      elegida(paso, opcion) ? 'border-amarillo bg-amarillo/10 text-amarillo' : 'border-blanco/20 text-hueso lg:hover:border-blanco/60',
                      bloqueada(paso, opcion) ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                    ]"
                    @click="elegir(opcion)">
                    {{ opcion }}
                    <span class="size-5 flex justify-center items-center shrink-0 border transition-colors duration-200"
                      :class="[
                        preguntas[paso].max === 1 ? 'rounded-full' : 'rounded-md',
                        elegida(paso, opcion) ? 'bg-amarillo border-amarillo text-negro' : 'border-blanco/40'
                      ]">
                      <Icon v-if="elegida(paso, opcion)" name="material-symbols:check-rounded" size="14" />
                    </span>
                  </button>
                </div>
              </fieldset>

              <div v-else key="frase" class="min-h-96 flex flex-col gap-4">
                <label for="frase" class="flex flex-col gap-1">
                  <span class="text-hueso text-lg lg:text-xl font-semibold leading-snug">En una frase, ¿qué te gustaría que funcionara mejor?</span>
                  <span class="text-gris text-sm font-light">Opcional</span>
                </label>
                <textarea id="frase" v-model="frase" rows="5" placeholder="Ej.: “Hoy cargamos manualmente los pedidos de WhatsApp al ERP.”"
                  class="w-full resize-none bg-blanco/10 border border-blanco/20 rounded-xl text-hueso text-sm lg:text-base font-light placeholder:text-hueso/50 outline-none focus:border-amarillo transition-colors px-4 py-3.5" />
              </div>
            </Transition>

            <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
              <button v-if="paso > 0" type="button"
                class="w-max flex items-center gap-1 text-hueso text-sm lg:text-base font-light cursor-pointer transition-colors duration-200 lg:hover:text-amarillo"
                @click="paso--">
                <Icon name="material-symbols:arrow-back-rounded" size="20" class="shrink-0" />
                Volver
              </button>
              <span v-else />

              <UiButtonPrimary v-if="paso < TOTAL - 1" variant="glass" size="glass" class="w-full sm:w-max gap-2" @click="paso++">
                Siguiente
                <Icon name="material-symbols:arrow-forward-rounded" size="20" class="shrink-0" />
              </UiButtonPrimary>
              <UiButtonPrimary v-else type="submit" :class="!completo && 'opacity-50 pointer-events-none'" class="w-full sm:w-max">
                {{ estado === 'loading' ? 'Enviando…' : 'Enviar respuestas' }}
              </UiButtonPrimary>
            </div>
          </form>
        </div>

        <NuxtLink v-if="estado !== 'enviado'" to="/"
          class="text-hueso text-sm lg:text-base font-light underline underline-offset-4 transition-colors lg:hover:text-amarillo">
          Prefiero conversarlo en la reunión
        </NuxtLink>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
import { useCuestionarioCita } from '~/composables/useCita'

const { preguntas, frase, estado, elegida, bloqueada, alternar, completo, enviar } = useCuestionarioCita()

const TOTAL = preguntas.length + 1
const paso = ref(0)
let avance = null

function elegir(opcion) {
  alternar(paso.value, opcion)
  if (preguntas[paso.value].max !== 1 || !elegida(paso.value, opcion)) return
  clearTimeout(avance)
  avance = setTimeout(() => paso.value++, 280)
}

onBeforeUnmount(() => clearTimeout(avance))
</script>

<style scoped>
.paso-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.paso-leave-active {
  transition: opacity 0.15s ease-in, transform 0.15s ease-in;
}

.paso-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.paso-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@media (prefers-reduced-motion: reduce) {
  .paso-enter-active,
  .paso-leave-active {
    transition: none;
  }
}
</style>
