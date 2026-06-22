<template>
  <Section>
    <template #background>
      <NuxtImg src="/img/transformacion/hero-bg.png" alt="" class="size-full object-cover" format="avif,webp"
        sizes="100vw" preload />
      <div class="absolute inset-0 bg-black/75" />
    </template>

    <div
      class="w-full flex flex-col items-center gap-4 lg:gap-10 px-4 pt-30 pb-8 lg:pt-45 lg:pb-20 text-center">
      <div class="flex flex-col items-center gap-2 lg:gap-3">
        <p class="text-blanco text-base lg:text-xl font-medium leading-none">
          LA IA YA ESTÁ CAMBIANDO LOS NEGOCIOS.
        </p>
        <h1
          class="max-w-72 text-amarillo text-2xl lg:text-5xl font-bold leading-tight lg:leading-none">
          Comienza a utilizar la inteligencia artificial en los procesos de tu empresa.
        </h1>
      </div>

      <div class="w-full flex flex-col items-center gap-2 lg:flex-row lg:justify-center lg:gap-4">
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
