<template>
  <DefaultSection id="proyectos" bg="bg-negro"
    class="lg:h-dvh flex flex-col justify-center overflow-visible! relative z-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 lg:pt-36 lg:pb-16"
    inner="lg:justify-center">
    <div ref="root"
      class="w-full max-w-362 flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-12">
      <div
        class="w-full md:w-2/5 lg:w-74 xxl:w-md shrink-0 flex flex-col items-center md:items-start gap-6 md:gap-8 lg:gap-10">
        <h2 class="text-center lg:text-left text-hueso text-xl lg:text-[1.75rem] font-medium">
          Proyectos reales.<br>Resultados concretos.
        </h2>

        <div class="w-full relative">
          <span class="w-px hidden md:block absolute inset-y-0 left-0 linea-vertical" aria-hidden="true" />

          <span class="w-px md:hidden absolute inset-y-0 left-0 linea-vertical" aria-hidden="true" />

          <span aria-hidden="true"
            class="size-2.5 absolute left-0 top-0 z-10 -translate-x-1/2 -translate-y-1/2 bg-amarillo rounded-full transition-[top] duration-500 ease-out md:transition-none"
            :style="{ top: dotTop }" />

          <ul ref="lista" class="w-full flex flex-col">
            <li v-for="(proyecto, i) in proyectos" :key="proyecto.title" class="w-full relative">
              <button type="button"
                class="w-full flex items-center text-left text-base lg:text-xl font-medium transition-colors duration-300 cursor-pointer py-4 md:py-5 lg:py-6 px-6"
                :class="activo === i ? 'text-amarillo' : 'text-hueso'" @click="irA(i)">
                {{ proyecto.title }}
              </button>

              <div class="md:hidden grid transition-[grid-template-rows] duration-500 ease-out"
                :class="activo === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <div class="min-h-0 overflow-hidden">
                  <div class="w-full flex flex-col gap-4 pb-6 px-6">
                    <div class="w-full h-70">
                      <HomeProyectoCard :proyecto="proyecto" />
                    </div>

                    <UiButtonPrimary :to="proyecto.to || '#'" variant="glass" size="glass"
                      class="w-full justify-between! pl-6 pr-4">
                      Conocer más de {{ proyecto.title }}
                      <Icon name="material-symbols:arrow-forward-rounded" class="size-4 shrink-0" />
                    </UiButtonPrimary>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <UiButtonPrimary to="#" variant="glass" size="glass" class="pl-6 pr-4">
          Ver todos los trabajos
          <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6" />
        </UiButtonPrimary>
      </div>

      <div ref="pila" class="w-full md:flex-1 md:min-w-0 h-94 lg:h-127 mac:h-100 hidden md:block relative isolate">
        <div v-for="(proyecto, i) in proyectos" :key="proyecto.title"
          class="size-full absolute inset-0 will-change-transform transition-opacity duration-500 lg:transition-none lg:opacity-100!"
          :class="activo === i ? 'opacity-100' : 'opacity-0'" :style="{ zIndex: i + 1 }">
          <HomeProyectoCard :proyecto="proyecto" />
        </div>
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
import { proyectos } from '~/constants/home'
import { useGsapContext } from '~/composables/useGsapContext'

const root = useTemplateRef('root')
const pila = useTemplateRef('pila')

const activo = ref(0)
const progreso = ref(0)

const lista = useTemplateRef('lista')
const dotPx = ref(0)

const dotTop = computed(() => {
  if (dotPx.value) return `${dotPx.value}px`
  const paso = 100 / proyectos.length
  return `${paso / 2 + progreso.value * paso * (proyectos.length - 1)}%`
})

function medirDot(indice = activo.value) {
  if (!lista.value) return
  if (!window.matchMedia('(max-width: 767px)').matches) {
    dotPx.value = 0
    return
  }

  const botones = [...lista.value.querySelectorAll(':scope > li > button')]
  const alto = botones[0]?.offsetHeight ?? 0

  dotPx.value = indice * alto + alto / 2
}

let scrollTo = null

function irA(i) {
  activo.value = i
  scrollTo?.(i)
  medirDot(i)
}

function alRedimensionar() {
  medirDot()
}

onMounted(() => {
  medirDot()
  window.addEventListener('resize', alRedimensionar)
})

onBeforeUnmount(() => window.removeEventListener('resize', alRedimensionar))

useGsapContext(root, (ctx, gsap, ScrollTrigger) => {
  if (!pila.value || window.matchMedia('(max-width: 1079px)').matches) return

  const capas = [...pila.value.children]
  if (capas.length < 2) return

  const seccion = root.value.closest('section')

  const desdeAbajo = () => (window.innerHeight + pila.value.offsetHeight) / 2

  gsap.set(capas.slice(1), { y: desdeAbajo })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: seccion,
      start: 'top top',
      end: `+=${(capas.length - 1) * 700}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progreso.value = self.progress
        const i = Math.round(self.progress * (capas.length - 1))
        if (i !== activo.value) activo.value = i
      }
    }
  })

  capas.slice(1).forEach((capa) => {
    tl.to(capa, { y: 0, ease: 'none', duration: 1 })
  })

  requestAnimationFrame(() => ScrollTrigger.refresh())

  scrollTo = (i) => {
    const st = tl.scrollTrigger
    if (!st) return
    const destino = st.start + (st.end - st.start) * (i / (capas.length - 1))
    if (window.__lenis) window.__lenis.scrollTo(destino, { duration: 1 })
    else window.scrollTo({ top: destino, behavior: 'smooth' })
  }
})
</script>
