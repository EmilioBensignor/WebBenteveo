<template>
  <SharedHeroVideo
    video="https://q7epkagsjeo0w9l9.public.blob.vercel-storage.com/video/hero-transfromacion-tecnologica.mp4"
    poster="/img/posters/hero-transformacion.jpg" eyebrow="La transformación IA ya empezó.">
    <span class="[text-shadow:0_2px_4px_rgb(0_0_0/0.45),0_4px_24px_rgb(0_0_0/0.5)]">
      ¿Cuánto está perdiendo tu empresa por quedarse afuera de la transformación?
    </span>

    <template #actions>
      <UiButtonPrimary variant="glass" size="glass" class="gap-3 pl-6 pr-4">
        Agendar una llamada
        <Icon name="material-symbols:calendar-month-outline-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
      <UiButtonPrimary variant="glass" size="glass" class="gap-3 pl-6 pr-4">
        Solicitar auditoría
        <Icon name="material-symbols:arrow-forward-rounded" class="size-4 lg:size-6 shrink-0" />
      </UiButtonPrimary>
    </template>
  </SharedHeroVideo>
</template>
