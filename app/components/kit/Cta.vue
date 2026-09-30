<template>
  <DefaultSection id="contacto" bg="bg-negro"
    class="sobre-amarillo relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14"
    inner="max-w-410!">
    <div
      class="w-full max-w-410 flex flex-col items-center gap-6 md:gap-8 lg:gap-10 relative overflow-hidden bg-amarillo text-negro rounded-3xl md:rounded-[3rem] text-center px-5 py-10 md:px-10 md:py-14 lg:px-16 lg:py-20 xxl:px-24 xxl:py-24">
      <div class="flex flex-col items-center gap-2 md:gap-4">
        <h2 class="text-negro-puro text-xl md:text-2xl lg:text-[2rem] xxl:text-4xl font-bold text-balance">
          Empieza a transformar tu empresa con KIT 4.0.
        </h2>
        <p class="text-xs md:text-sm lg:text-xl font-light text-balance">
          Agenda una reunión de 20 minutos y evaluamos tu caso, las soluciones que podrías implementar y las condiciones del beneficio.
        </p>
      </div>

      <UiButtonPrimary to="#" variant="glass-dark" size="glass" class="w-full sm:w-max gap-2 lg:text-lg! lg:py-4! lg:px-8!">
        <Icon name="material-symbols:calendar-month-outline-rounded" size="22" class="shrink-0" />
        Empezar a transformar mi empresa
      </UiButtonPrimary>
    </div>
  </DefaultSection>
</template>
