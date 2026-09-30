<template>
  <Teleport to="body">
    <Transition name="quiz" @after-leave="reiniciar">
      <div v-if="abierto" class="fixed inset-0 z-70 flex justify-center items-center bg-negro-puro/75 backdrop-blur-sm p-3 md:p-6"
        @click.self="abierto = false">
        <div ref="dialogo" role="dialog" aria-modal="true" aria-labelledby="quiz-titulo" tabindex="-1" data-lenis-prevent
          class="quiz-caja w-full max-w-xl max-h-[92dvh] flex flex-col relative overflow-y-auto bg-negro border border-blanco/33 rounded-2xl lg:rounded-3xl outline-none shadow-[0_24px_80px_-24px_rgba(252,183,22,0.25)]">
          <div class="absolute -top-32 -right-32 size-64 rounded-full bg-amarillo/15 blur-3xl pointer-events-none" />

          <button type="button" aria-label="Cerrar"
            class="size-10 flex justify-center items-center absolute top-3 right-3 z-10 rounded-full text-hueso cursor-pointer transition-colors duration-200 lg:hover:text-amarillo"
            @click="abierto = false">
            <Icon name="material-symbols:close-rounded" size="24" />
          </button>

          <div class="flex flex-col gap-6 lg:gap-8 relative px-5 py-7 md:px-8 md:py-9">
            <template v-if="paso < preguntasKit.length">
              <div class="flex flex-col gap-3 pr-8">
                <h2 id="quiz-titulo" class="text-hueso text-xl lg:text-2xl font-semibold leading-[1.2]">
                  ¿Tu empresa puede acceder al Kit 4.0?
                </h2>
                <p class="text-hueso text-sm lg:text-base font-light leading-[1.5]">
                  Responde 3 preguntas y descubre si tu empresa podría acceder a beneficios para impulsar su transformación tecnológica.
                </p>
              </div>

              <div class="flex items-center gap-2">
                <span v-for="(p, i) in preguntasKit" :key="p.pregunta" class="h-1 flex-1 rounded-full overflow-hidden bg-blanco/18">
                  <span class="block h-full bg-amarillo origin-left transition-transform duration-500 ease-out"
                    :style="{ transform: `scaleX(${paso >= i ? 1 : 0})` }" />
                </span>
              </div>

              <Transition name="paso" mode="out-in">
                <fieldset :key="paso" class="flex flex-col gap-4">
                  <legend class="flex flex-col gap-1 mb-4">
                    <span class="text-amarillo text-xs lg:text-sm font-medium">Pregunta {{ paso + 1 }} de {{ preguntasKit.length }}</span>
                    <span class="text-hueso text-lg lg:text-xl font-semibold leading-[1.3]">{{ preguntasKit[paso].pregunta }}</span>
                  </legend>

                  <div class="flex flex-col gap-2">
                    <button v-for="opcion in preguntasKit[paso].opciones" :key="opcion" type="button"
                      :aria-pressed="respuestas[paso] === opcion"
                      class="w-full flex items-center justify-between gap-3 border rounded-xl text-left text-sm lg:text-base cursor-pointer transition-colors duration-200 px-4 py-3.5 lg:py-4"
                      :class="respuestas[paso] === opcion
                        ? 'border-amarillo bg-amarillo/10 text-amarillo'
                        : 'border-blanco/20 text-hueso lg:hover:border-blanco/60'"
                      @click="responder(opcion)">
                      {{ opcion }}
                      <span class="size-5 flex justify-center items-center shrink-0 border rounded-full transition-colors duration-200"
                        :class="respuestas[paso] === opcion ? 'bg-amarillo border-amarillo text-negro' : 'border-blanco/40'">
                        <Icon v-if="respuestas[paso] === opcion" name="material-symbols:check-rounded" size="14" />
                      </span>
                    </button>
                  </div>
                </fieldset>
              </Transition>

              <button v-if="paso > 0" type="button"
                class="w-max flex items-center gap-1 text-hueso text-sm lg:text-base font-light cursor-pointer transition-colors duration-200 lg:hover:text-amarillo"
                @click="paso--">
                <Icon name="material-symbols:arrow-back-rounded" size="20" class="shrink-0" />
                Volver
              </button>
            </template>

            <div v-else class="flex flex-col gap-6 lg:gap-8">
              <span class="size-14 lg:size-16 flex justify-center items-center rounded-full bg-amarillo text-negro shadow-amarilla">
                <Icon name="material-symbols:check-rounded" size="32" />
              </span>

              <div class="flex flex-col gap-3 pr-8">
                <h2 id="quiz-titulo" class="text-amarillo text-2xl lg:text-[1.75rem] font-bold leading-[1.2]">
                  ¡Tu empresa podría calificar!
                </h2>
                <p class="text-hueso text-sm lg:text-base font-light leading-[1.5]">
                  Por tus respuestas, podrías acceder a un programa de apoyo para impulsar la transformación tecnológica de tu empresa.
                </p>
                <p class="text-hueso text-sm lg:text-base font-light leading-[1.5]">
                  Agenda una reunión de 20 minutos y evaluamos tu caso, las soluciones que podrías implementar y las condiciones del beneficio.
                </p>
              </div>

              <UiButtonPrimary variant="glass" size="glass" class="w-full sm:w-max gap-2" @click="irAAgendar">
                <Icon name="material-symbols:calendar-month-outline-rounded" size="20" class="shrink-0" />
                Quiero evaluar mi empresa
              </UiButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { preguntasKit } from '~/constants/kit'
import { scrollToEl } from '~/composables/useSmoothScroll'

const abierto = defineModel({ type: Boolean, default: false })

const dialogo = useTemplateRef('dialogo')
const paso = ref(0)
const respuestas = ref([])
let avance = null

function responder(opcion) {
  respuestas.value[paso.value] = opcion
  clearTimeout(avance)
  avance = setTimeout(() => paso.value++, 280)
}

function irAAgendar() {
  abierto.value = false
  requestAnimationFrame(() => scrollToEl('contacto', -100))
}

function reiniciar() {
  paso.value = 0
  respuestas.value = []
}

function alEscape(e) {
  if (e.key === 'Escape') abierto.value = false
}

watch(abierto, async (valor) => {
  if (valor) {
    window.__lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', alEscape)
    await nextTick()
    dialogo.value?.focus()
  } else {
    clearTimeout(avance)
    window.__lenis?.start()
    document.documentElement.style.overflow = ''
    window.removeEventListener('keydown', alEscape)
  }
})

onBeforeUnmount(() => {
  clearTimeout(avance)
  window.__lenis?.start()
  document.documentElement.style.overflow = ''
  window.removeEventListener('keydown', alEscape)
})
</script>

<style scoped>
.quiz-enter-active,
.quiz-leave-active {
  transition: opacity 0.25s ease-out;
}

.quiz-enter-active .quiz-caja,
.quiz-leave-active .quiz-caja {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.quiz-enter-from,
.quiz-leave-to {
  opacity: 0;
}

.quiz-enter-from .quiz-caja,
.quiz-leave-to .quiz-caja {
  transform: translateY(16px) scale(0.98);
}

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
  .quiz-enter-active,
  .quiz-leave-active,
  .quiz-enter-active .quiz-caja,
  .quiz-leave-active .quiz-caja,
  .paso-enter-active,
  .paso-leave-active {
    transition: none;
  }
}
</style>
