<template>
  <Section class="min-h-50 md:min-h-75 xxl:min-h-100 flex items-center px-4 md:px-7 lg:px-16 py-12 md:py-16 lg:py-24">
    <template #background>
      <NuxtImg src="/img/eventos/produccion.jpg" alt="" class="size-full object-cover" />
      <div class="absolute inset-0 bg-black/75" />
      <div class="h-14 md:h-25 absolute inset-x-0 top-0 bg-linear-to-b from-negro-puro to-transparent" />
      <div class="h-14 md:h-25 absolute inset-x-0 bottom-0 bg-linear-to-t from-negro-puro to-transparent" />
    </template>

    <div class="flex flex-col items-center gap-3 md:gap-4 text-center">
      <HeadingH2 class="text-blanco">
        Trabajamos como <span class="text-amarillo">parte de tu equipo</span>
      </HeadingH2>
      <p class="max-w-236 lg:text-xl text-blanco font-medium">
        Nos metemos adentro del proyecto, entendemos el negocio y diseñamos como si el evento fuera nuestro.
        <span class="text-amarillo">Porque las grandes ideas se hacen realidad cuando se trabajan en conjunto.</span>
      </p>
    </div>
  </Section>
</template>
