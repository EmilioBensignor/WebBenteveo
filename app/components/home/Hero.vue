<template>
  <Section class="px-4 md:px-7 lg:px-16 pt-30 md:pt-32 pb-8 lg:pt-45 lg:pb-20 xxl:pb-28" inner="gap-6 md:gap-8 lg:gap-12 xxl:gap-16">
    <template #background>
      <NuxtImg src="/img/home/hero-bg.png" alt="" class="size-full object-cover" />
      <div class="absolute inset-0 bg-black/75" />
    </template>

    <div class="max-w-md lg:max-w-158 xxl:max-w-full flex flex-col items-center gap-2 xxl:gap-4 text-center">
      <HeadingH1 class="max-w-212 text-amarillo">
        Ideas que mueven marcas. Estrategias que generan resultados.
      </HeadingH1>
      <p class="text-blanco lg:text-xl font-medium">
        Tu marca tiene potencial. Nosotros lo convertimos en crecimiento, desde la campaña hasta el proceso.
      </p>
    </div>

    <div class="flex flex-wrap sm:flex-nowrap justify-center gap-2">
      <ButtonPrimary to="#servicios" class="w-full sm:max-w-68 md:w-68 px-4!">
        <Icon name="material-symbols:search-rounded" size="1.5rem" />
        Conoce como trabajamos
      </ButtonPrimary>
      <ButtonPrimary to="#proyectos" variant="light" class="w-full sm:w-42 shrink-0 px-4!">
        Ver trabajos
        <Icon name="material-symbols:arrow-forward-rounded" size="1.5rem" />
      </ButtonPrimary>
    </div>
  </Section>
</template>
