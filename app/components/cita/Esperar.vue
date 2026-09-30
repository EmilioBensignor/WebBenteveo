<template>
  <DefaultSection bg="bg-negro" class="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-16 md:py-20 lg:py-28">
    <div class="w-full flex flex-col gap-8 lg:gap-12">
      <div class="flex flex-col md:flex-row items-center md:items-end md:justify-between gap-3 md:gap-8 text-center md:text-left">
        <UiHeadingH2>¿Qué puedes esperar de la reunión?</UiHeadingH2>
        <p class="text-amarillo text-base lg:text-xl font-light">Queremos que sea una conversación práctica.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <article class="h-full min-h-48 lg:min-h-60 flex flex-col justify-between gap-4 relative overflow-hidden border border-blanco/33 rounded-2xl p-px">
          <div class="flex flex-col gap-4 lg:gap-5 relative p-5 lg:p-8">
            <Icon name="material-symbols:forum-outline-rounded" size="36" class="text-amarillo" />
            <p class="text-hueso text-base lg:text-xl font-light leading-relaxed">
              Te contaremos brevemente en qué estamos trabajando desde Benteveo y, sobre todo, queremos entender cómo funciona hoy tu negocio, qué procesos te están generando dificultades y dónde ves oportunidades de mejora.
            </p>
          </div>
          <span class="relative text-amarillo text-[5.5rem] lg:text-[8rem] font-bold leading-[0.75]! -mb-[0.1em] -ml-2 md:-ml-3 lg:-ml-4">
            01
          </span>
        </article>
        <article class="h-full min-h-48 lg:min-h-60 flex flex-col justify-between gap-4 relative overflow-hidden border border-blanco/33 rounded-2xl p-px">
          <div class="flex flex-col gap-4 lg:gap-5 relative p-5 lg:p-8">
            <Icon name="material-symbols:lightbulb-outline-rounded" size="36" class="text-amarillo" />
            <p class="text-hueso text-base lg:text-xl font-light leading-relaxed">
              No necesitas saber de IA ni estar al día con las últimas herramientas. <span class="text-amarillo font-normal">La tecnología viene después.</span> Primero queremos entender qué está pasando y qué tendría sentido mejorar.
            </p>
          </div>
          <span class="relative text-amarillo text-[5.5rem] lg:text-[8rem] font-bold leading-[0.75]! -mb-[0.1em] -ml-2 md:-ml-3 lg:-ml-4">
            02
          </span>
        </article>
      </div>
    </div>
  </DefaultSection>
</template>

