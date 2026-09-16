<template>
  <section class="h-dvh w-full relative overflow-hidden bg-negro">
    <video
      src="https://q7epkagsjeo0w9l9.public.blob.vercel-storage.com/video/hero-transfromacion-tecnologica.mp4"
      poster="/img/posters/hero-transformacion.jpg" class="size-full object-cover absolute inset-0" autoplay loop muted
      playsinline preload="metadata" />
    <div class="absolute inset-0 bg-black/40" />

    <div class="w-full absolute bottom-0 left-0 z-10">
      <svg class="w-full block" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 Q0,64 64,64 L1376,64 Q1440,64 1440,0 L1440,64 L0,64 Z" fill="var(--color-negro)" />
      </svg>

      <div
        class="bg-negro flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 pb-8 md:pb-10 lg:pb-12">
        <div class="flex flex-col items-start gap-2 lg:gap-3">
          <p class="text-hueso lg:text-xl font-medium leading-none">
            La transformación IA ya empezó.
          </p>
          <UiHeadingH1 class="max-w-md lg:max-w-2xl text-amarillo">
            ¿Cuánto está perdiendo tu empresa por quedarse afuera?
          </UiHeadingH1>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-4">
          <UiButtonPrimary variant="glass" size="glass" class="gap-3 pl-6 pr-4">
            Agendar una llamada
            <Icon name="material-symbols:calendar-month-outline-rounded" class="size-4 lg:size-6 shrink-0" />
          </UiButtonPrimary>
          <UiButtonPrimary variant="glass" size="glass" class="gap-3 pl-6 pr-4">
            Solicitar auditoría
            <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
          </UiButtonPrimary>
        </div>
      </div>
    </div>
  </section>
</template>
