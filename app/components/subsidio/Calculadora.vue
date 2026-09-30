<template>
  <DefaultSection bg="bg-negro" inner="items-stretch!"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pt-4 pb-16 md:pb-20 lg:pb-28">
    <div class="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-6">
      <div class="flex flex-col gap-6 lg:gap-8 lg:pr-6 xl:pr-10">
        <UiHeadingH2>Calcula cuánto podría cubrir KIT 4.0</UiHeadingH2>

        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
            <label for="calc-kit" class="text-hueso text-sm lg:text-base font-light">Valor neto estimado del proyecto</label>
            <p class="text-hueso text-3xl iph:text-4xl lg:text-5xl font-bold leading-none tabular-nums">{{ formato(monto) }}</p>
          </div>
          <SubsidioRango id="calc-kit" v-model="monto" />
          <div class="flex justify-between text-gris text-xs lg:text-sm tabular-nums">
            <span>{{ formato(MONTO_MIN) }}</span>
            <span>{{ formato(MONTO_MAX) }}</span>
          </div>
        </div>

        <div class="h-14 lg:h-16 w-full flex rounded-xl bg-blanco/5 border border-blanco/10 p-1" aria-hidden="true">
          <div class="h-full flex gap-1 transition-[width] duration-500 ease-out" :style="{ width: `max(12rem, ${18 + progreso * 82}%)` }">
            <span class="flex-1 flex items-center rounded-lg bg-amarillo text-negro text-xs lg:text-sm font-semibold overflow-hidden whitespace-nowrap px-3">KIT 4.0</span>
            <span class="flex-1 flex items-center rounded-lg bg-hueso/15 text-hueso text-xs lg:text-sm font-semibold overflow-hidden whitespace-nowrap px-3">Tu empresa</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="flex flex-col justify-between gap-2 bg-amarillo text-negro rounded-xl p-4 lg:p-5">
            <p class="text-xs lg:text-sm font-medium">KIT 4.0 podría cubrir hasta</p>
            <p class="text-2xl lg:text-3xl font-bold leading-none tabular-nums">{{ formato(cubreAnimado) }}</p>
          </div>
          <div class="flex flex-col justify-between gap-2 border border-blanco/20 rounded-xl p-4 lg:p-5">
            <p class="text-hueso text-xs lg:text-sm">Aporte estimado de tu empresa</p>
            <p class="text-hueso text-2xl lg:text-3xl font-bold leading-none tabular-nums">{{ formato(aporteAnimado) }}</p>
          </div>
        </div>

        <UiButtonPrimary variant="glass" size="glass" class="w-full sm:w-max sm:self-end gap-2 max-iph:px-4!" @click="emit('calificar')">
          Quiero saber si mi empresa califica
          <Icon name="material-symbols:arrow-forward-rounded" size="20" class="hidden! iph:block! shrink-0" />
        </UiButtonPrimary>

        <p class="text-gris text-xs lg:text-sm leading-normal border-t border-blanco/15 pt-6">
          El cálculo es estimativo. El monto final depende del kit seleccionado, sus topes, la elegibilidad del proyecto y la aprobación del programa.
        </p>
      </div>

      <aside class="flex flex-col justify-between gap-8 relative overflow-hidden border border-blanco/33 rounded-2xl lg:rounded-3xl bg-linear-to-b from-blanco/6 to-transparent p-5 md:p-8 lg:p-10">
        <div class="flex flex-col gap-5">
          <span class="size-11 lg:size-12 flex justify-center items-center rounded-xl border border-amarillo/40 text-amarillo">
            <Icon name="material-symbols:account-balance-outline-rounded" size="24" />
          </span>
          <UiHeadingH2>¿Necesitas financiar el monto restante?</UiHeadingH2>
          <p class="text-hueso text-sm lg:text-base font-light leading-[1.5]">
            Para la parte que corresponde a tu empresa existen alternativas de financiación disponibles con determinados bancos.
          </p>
        </div>

        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          <li v-for="banco in bancos" :key="banco.nombre"
            class="h-18 lg:h-20 flex justify-center items-center bg-hueso rounded-xl px-6">
            <img :src="banco.logo" :alt="banco.nombre" :width="banco.width" :height="banco.height" class="max-h-7 lg:max-h-9 w-auto">
          </li>
        </ul>
      </aside>
    </div>
  </DefaultSection>
</template>

<script setup>
import { bancos } from '~/constants/subsidio'
import { useCalculoKit, MONTO_MIN, MONTO_MAX } from '~/composables/useCalculoKit'

const emit = defineEmits(['calificar'])

const { monto, progreso, cubreAnimado, aporteAnimado, formato } = useCalculoKit()
</script>
