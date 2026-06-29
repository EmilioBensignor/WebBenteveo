<template>
  <Hero
    image="/img/home/hero-bg.png"
    title="Ideas que mueven marcas. Estrategias que generan resultados."
    text="Tu marca tiene potencial. Nosotros lo convertimos en crecimiento, desde la campaña hasta el proceso."
    inner="gap-6 md:gap-8 lg:gap-12 xxl:gap-16"
    content-class="max-w-md lg:max-w-158 xxl:max-w-full gap-2! xxl:gap-4!"
    title-class="max-w-212!"
    actions-class="md:max-w-none! flex-wrap! sm:flex-nowrap! gap-2!"
  >
    <template #actions>
      <ButtonPrimary to="#servicios" class="w-full sm:max-w-68 md:w-68 px-4!">
        <Icon name="material-symbols:search-rounded" size="1.5rem" />
        Conoce como trabajamos
      </ButtonPrimary>
      <ButtonPrimary to="#proyectos" variant="light" class="w-full sm:w-42 shrink-0 px-4!">
        Ver trabajos
        <Icon name="material-symbols:arrow-forward-rounded" size="1.5rem" />
      </ButtonPrimary>
    </template>
  </Hero>
</template>
