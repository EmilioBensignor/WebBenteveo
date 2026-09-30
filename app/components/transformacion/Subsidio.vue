<template>
  <DefaultSection id="subsidio" bg="bg-negro"
    class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-12">
    <div
      class="w-full relative overflow-hidden rounded-2xl border border-white/33 bg-linear-to-tl from-amarillo/15 via-negro to-negro px-5 py-8 md:px-10 xl:px-16 xl:py-14 flex flex-col xl:flex-row xl:items-center gap-6 md:gap-8 xl:gap-12">
      <div class="absolute -top-36 -left-36 size-72 rounded-full bg-amarillo/25 blur-3xl pointer-events-none"></div>

      <div class="relative min-w-0 flex-1 flex flex-col gap-4">
        <UiHeadingH2 class="xl:max-w-lg">
          Transforma tu empresa con tecnología y <span class="text-amarillo">paga solo el 50%</span> con este subsidio.
        </UiHeadingH2>
        <p class="text-gris text-xs lg:text-sm leading-normal">
          El beneficio está sujeto a elegibilidad, disponibilidad de cupo, aprobación del programa y condiciones vigentes.
        </p>
      </div>

      <UiButtonPrimary :to="ROUTE_NAMES.subsidio" class="relative w-full sm:w-max shrink-0 gap-3 pl-6 pr-4">
        Quiero saber si mi empresa puede aplicar
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/routes'
</script>
