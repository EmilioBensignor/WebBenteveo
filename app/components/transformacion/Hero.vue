<template>
  <Section>
    <template #background>
      <NuxtImg src="/img/transformacion/hero-bg.png" alt="" class="size-full object-cover" format="avif,webp"
        sizes="100vw" preload />
      <div class="absolute inset-0 bg-black/75" />
    </template>

    <div
      class="w-full flex flex-col items-center gap-4 md:gap-6 lg:gap-10 px-4 md:px-7 lg:px-16 pt-30 md:pt-32 pb-8 lg:pt-45 lg:pb-20 text-center">
      <div class="flex flex-col items-center gap-2 lg:gap-3">
        <p class="text-blanco lg:text-xl font-medium leading-none">
          LA IA YA ESTÁ CAMBIANDO LOS NEGOCIOS.
        </p>
        <HeadingH1 class="max-w-72 sm:max-w-80 md:max-w-124 lg:max-w-235 text-amarillo">
          Comienza a utilizar la inteligencia artificial en los procesos de tu empresa.
        </HeadingH1>
      </div>

      <div class="w-full md:max-w-115 lg:max-w-120 flex flex-col md:flex-row md:justify-center items-center gap-2 lg:gap-4">
        <ButtonPrimary class="w-72 lg:w-auto">
          <Icon name="material-symbols:calendar-month-outline-rounded" size="24" />
          Agendar una llamada
        </ButtonPrimary>
        <ButtonPrimary variant="light" class="w-72 lg:w-auto">
          Solicitar auditoria
          <Icon name="material-symbols:arrow-forward-rounded" size="24" />
        </ButtonPrimary>
      </div>
    </div>
  </Section>
</template>
