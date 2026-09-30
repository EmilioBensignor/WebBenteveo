<template>
  <DefaultSection bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24"
    inner="gap-10! lg:gap-16!">
    <div ref="bloque" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-rows-[auto_1fr] items-center gap-x-8 lg:gap-x-12 xxl:gap-x-20 gap-y-8 lg:gap-y-10">
      <div class="min-w-0 flex flex-col gap-4 md:col-span-2 lg:col-span-1 lg:col-start-2 lg:self-end">
        <UiHeadingH2 class="text-balance">
          La seguridad se diseña desde el comienzo
        </UiHeadingH2>
        <p class="text-hueso text-sm lg:text-base font-light leading-normal">
          En Benteveo trabajamos para que la IA se integre a tu operación sin perder de vista la privacidad, el control de los datos y la continuidad del negocio.
        </p>
      </div>

      <div class="w-full max-w-96 md:max-w-80 lg:max-w-130 aspect-square relative mx-auto lg:col-start-1 lg:row-start-1 lg:row-span-2">
        <svg viewBox="0 0 240 240" class="size-full overflow-visible" aria-hidden="true">
          <g v-for="(r, i) in RADIOS" :key="r" class="cursor-pointer" @click="elegir(i)">
            <circle cx="120" cy="120" :r="r" stroke-width="1.2"
              class="transition-all duration-500"
              :class="activo === i ? 'stroke-amarillo/25 fill-amarillo/6' : 'stroke-blanco/20 fill-transparent'" />
            <circle v-if="activo === i" :key="`progreso-${activo}-${vuelta}`" cx="120" cy="120" :r="r" stroke-width="1.6"
              pathLength="100" stroke-dasharray="100" transform="rotate(-90 120 120)"
              class="stroke-amarillo fill-transparent anillo-activo"
              :class="automatico ? ['progreso', !enPantalla && 'pausado'] : ''" :style="{ animationDuration: `${INTERVALO}ms` }"
              @animationend="siguiente" />
            <circle cx="120" :cy="120 - r" r="9" class="transition-colors duration-500"
              :class="activo === i ? 'fill-amarillo' : 'fill-negro stroke-blanco/30'" stroke-width="1" />
            <text x="120" :y="120 - r" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="600"
              class="transition-colors duration-500 select-none" :class="activo === i ? 'fill-negro' : 'fill-hueso'">
              {{ i + 1 }}
            </text>
          </g>
          <circle cx="120" cy="120" r="22" class="fill-amarillo" />
        </svg>
        <div class="absolute inset-0 flex flex-col justify-center items-center text-negro pointer-events-none">
          <Icon name="material-symbols:lock-outline" class="size-7! md:size-6! lg:size-8!" />
          <span class="hidden lg:block text-xs font-bold uppercase tracking-wide">Tus datos</span>
        </div>
      </div>

      <div class="min-w-0 flex flex-col gap-4 lg:hidden">
        <div class="flex items-center gap-3">
          <span class="text-hueso/50 text-sm md:text-base tabular-nums"><span class="text-hueso font-semibold">{{ String(activo + 1).padStart(2, '0') }}</span> / {{ String(total).padStart(2, '0') }}</span>
          <div class="flex items-center gap-2 ml-auto">
            <button type="button" aria-label="Principio anterior"
              class="size-9 flex justify-center items-center glass-boton rounded-full text-hueso cursor-pointer" @click="elegir((activo + total - 1) % total)">
              <Icon name="material-symbols:arrow-back-rounded" size="18" />
            </button>
            <button type="button" aria-label="Principio siguiente"
              class="size-9 flex justify-center items-center glass-boton rounded-full text-hueso cursor-pointer" @click="elegir((activo + 1) % total)">
              <Icon name="material-symbols:arrow-forward-rounded" size="18" />
            </button>
          </div>
        </div>

        <Transition name="principio" mode="out-in">
          <article :key="activo" class="flex flex-col gap-3">
            <h3 class="flex items-center gap-3 text-hueso text-base md:text-lg font-semibold leading-[1.3]">
              <span class="size-9 flex justify-center items-center shrink-0 rounded-full bg-amarillo text-negro">
                <Icon :name="principiosSeguridad[activo].icon" size="1.25rem" />
              </span>
              {{ principiosSeguridad[activo].title }}
            </h3>
            <p class="text-hueso/80 text-sm font-light leading-normal">{{ principiosSeguridad[activo].text }}</p>
            <ul v-if="principiosSeguridad[activo].garantias" class="flex flex-wrap gap-1.5">
              <li v-for="g in principiosSeguridad[activo].garantias" :key="g"
                class="flex items-center gap-1 border border-amarillo/40 rounded-full text-amarillo text-xs px-2.5 py-1">
                <Icon name="material-symbols:check-rounded" size="14" class="shrink-0" />
                {{ g }}
              </li>
            </ul>
          </article>
        </Transition>
      </div>

      <ul class="min-w-0 hidden lg:flex flex-col lg:col-start-2 lg:self-start">
        <li v-for="(p, i) in principiosSeguridad" :key="p.title" class="border-t border-blanco/15 last:border-b">
          <button type="button" class="w-full flex items-center gap-4 text-left cursor-pointer py-4 lg:py-5"
            :aria-expanded="activo === i" :aria-controls="`capa-${i}`" @click="elegir(i)">
            <span class="size-8 lg:size-10 flex justify-center items-center shrink-0 rounded-full transition-colors duration-300"
              :class="activo === i ? 'bg-amarillo text-negro' : 'border border-blanco/20 text-amarillo'">
              <Icon :name="p.icon" size="1.25rem" />
            </span>
            <h3 class="flex-1 min-w-0 text-base lg:text-xl leading-[1.3] transition-colors duration-300"
              :class="activo === i ? 'text-hueso font-semibold' : 'text-hueso/60'">
              {{ p.title }}
            </h3>
          </button>

          <div :id="`capa-${i}`" class="grid transition-all duration-500 ease-in-out"
            :class="activo === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
            <div class="overflow-hidden">
              <div class="flex flex-col gap-3 pl-12 lg:pl-14 pb-5">
                <p class="text-hueso/80 text-sm lg:text-base font-light leading-normal">{{ p.text }}</p>
                <ul v-if="p.garantias" class="flex flex-wrap gap-2">
                  <li v-for="g in p.garantias" :key="g"
                    class="flex items-center gap-1.5 border border-amarillo/40 rounded-full text-amarillo text-xs lg:text-sm px-3 py-1.5">
                    <Icon name="material-symbols:check-rounded" size="16" class="shrink-0" />
                    {{ g }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </DefaultSection>
</template>

<script setup>
import { principiosSeguridad } from '~/constants/seguridad'

const RADIOS = [118, 97, 76, 55, 34]
const INTERVALO = 6000

const total = principiosSeguridad.length

const bloque = useTemplateRef('bloque')
const activo = ref(0)
const automatico = ref(true)
const enPantalla = ref(false)
const vuelta = ref(0)
let observador = null

function elegir(i) {
  activo.value = i
  vuelta.value++
}

function siguiente() {
  if (automatico.value) activo.value = (activo.value + 1) % total
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) automatico.value = false
  observador = new IntersectionObserver(([e]) => (enPantalla.value = e.isIntersecting), { threshold: 0.4 })
  observador.observe(bloque.value)
})

onBeforeUnmount(() => observador?.disconnect())
</script>

<style scoped>
.anillo-activo {
  filter: drop-shadow(0 0 6px rgb(252 183 22 / 0.6));
}

.progreso {
  animation: llenar linear forwards;
}

.pausado {
  animation-play-state: paused;
}

.principio-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.principio-leave-active {
  transition: opacity 0.15s ease-in;
}

.principio-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.principio-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .principio-enter-active,
  .principio-leave-active {
    transition: none;
  }
}

@keyframes llenar {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
}
</style>
