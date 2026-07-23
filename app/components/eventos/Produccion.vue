<template>
  <Section class="px-4 md:px-7 lg:px-16 xxl:px-30 pt-4 lg:pt-8" inner="lg:gap-12 xxl:gap-16">
    <div class="w-full flex flex-col items-center gap-3 md:gap-4 lg:gap-6 text-center">
      <HeadingH2 class="text-blanco">
        Dónde la estrategia <span class="text-amarillo">se encuentra con la producción</span>
      </HeadingH2>
      <p class="max-w-180 lg:max-w-214 text-blanco font-medium">
        Benteveo Eventos suma el poder de una agencia creativa para poder producir experiencias estrategicas que 
        <span class="text-amarillo">conectan a las marcas con sus clientes</span>.
      </p>
    </div>

    <div class="relative w-full">
      <video ref="videoRef" src="/video/eventos/show-reel-eventos.mp4" autoplay loop muted playsinline
        class="w-full h-full object-cover rounded-2xl lg:rounded-4xl" />
      <button type="button" @click="toggleMute"
        class="w-10 h-10 flex justify-center items-center absolute bottom-4 right-4 bg-negro border border-white/20 rounded-full cursor-pointer"
        :aria-label="isMuted ? 'Activar sonido' : 'Silenciar'">
        <Icon :name="isMuted ? 'material-symbols:volume-off-rounded' : 'material-symbols:volume-up-rounded'"
          size="1.5rem" class="text-amarillo" />
      </button>
    </div>
  </Section>
</template>

<script setup>
const videoRef = ref(null)
const isMuted = ref(true)

function toggleMute() {
  isMuted.value = !isMuted.value
  if (videoRef.value) videoRef.value.muted = isMuted.value
}
</script>
