<template>
  <DefaultSection id="seguridad" bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-12"
    inner="grid! grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 xxl:gap-20">
    <div class="min-w-0 flex flex-col gap-6 lg:gap-8">
      <div class="flex flex-col gap-3 md:gap-4">
        <UiHeadingH2>
          ¿Sabés a dónde van los datos de tu empresa cuando usas IA sin regulación?
        </UiHeadingH2>
        <p class="text-hueso text-sm lg:text-base leading-normal font-light">
          Si tu equipo ya está usando ChatGPT o cualquier herramienta de IA, <span class="font-semibold text-amarillo">la información de tu compañía está
          quedando expuesta todos los días.</span>
        </p>
        <p class="text-hueso text-sm lg:text-base leading-normal font-light">
          Desde Benteveo diseñamos cada solución protegiendo la confidencialidad, integridad y disponibilidad de los
          datos.
        </p>
      </div>

      <div class="hidden lg:block">
        <UiButtonPrimary :to="ROUTE_NAMES.seguridad" variant="glass" size="glass" class="w-max gap-3 pl-6 pr-4">
          Conoce más aquí
          <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
        </UiButtonPrimary>
      </div>
    </div>

    <div class="min-w-0 flex flex-col gap-6 lg:gap-8">
      <ul class="flex flex-col">
        <li v-for="(p, i) in seguridadPilares" :key="p.title" class="border-t border-blanco/20 last:border-b">
          <button type="button" class="group w-full flex items-center gap-4 py-4 lg:py-5 text-left cursor-pointer"
            :aria-expanded="abierto === i" :aria-controls="`seguridad-pilar-${i}`" @click="alternar(i)">
            <Icon :name="p.icon" size="24" class="shrink-0 text-amarillo" />
            <h3 class="flex-1 min-w-0 text-hueso text-base lg:text-xl leading-[1.3]">{{ p.title }}</h3>
            <span class="size-8 lg:size-10 shrink-0 flex justify-center items-center glass-boton rounded-full text-hueso"
              :class="{ activo: abierto === i }">
              <Icon name="material-symbols:add-rounded" size="1.25rem" class="transition-transform duration-300"
                :class="{ 'rotate-45': abierto === i }" />
            </span>
          </button>

          <div :id="`seguridad-pilar-${i}`" class="grid transition-all duration-300 ease-in-out"
            :class="abierto === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
            <div class="overflow-hidden">
              <p class="pl-10 pr-12 lg:pr-14 pb-4 lg:pb-5 text-hueso/70 text-sm lg:text-base leading-[1.4] font-light">
                {{ p.text }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <UiButtonPrimary :to="ROUTE_NAMES.seguridad" variant="glass" size="glass"
        class="lg:hidden w-full sm:w-max gap-3 pl-6 pr-4">
        Conoce más aquí
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
import { seguridadPilares } from '~/constants/transformacion'
import { ROUTE_NAMES } from '~/constants/routes'

const abierto = ref(null)

function alternar(i) {
  abierto.value = abierto.value === i ? null : i
}
</script>
