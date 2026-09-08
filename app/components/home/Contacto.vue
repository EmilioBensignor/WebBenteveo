<template>
  <DefaultSection id="contacto" bg="bg-negro"
    class="sobre-amarillo relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-30 py-12 md:py-16 lg:py-20 xxl:py-24 mac:py-14"
    inner="max-w-410!">
    <div
      class="w-full max-w-410 flex flex-col items-center gap-8 bg-amarillo rounded-[3rem] md:flex-row md:items-center md:gap-6 lg:gap-8 xl:gap-12 p-6 md:p-8 lg:px-10 xl:px-16 xxl:px-24 lg:py-12">
      <div
        class="w-full md:flex-1 md:min-w-0 flex flex-col items-center md:items-start gap-4 text-center md:text-left text-negro">
        <p v-if="eyebrow" class="text-base lg:text-xl">{{ eyebrow }}</p>

        <h2 class="text-negro-puro text-2xl md:text-3xl lg:text-4xl font-bold" v-html="title" />

        <p class="text-base lg:text-xl" v-html="subtitle" />
      </div>

      <div class="w-full md:flex-1 md:min-w-0 flex justify-center">
        <SharedFormContacto :submit-label="submitLabel" />
      </div>
    </div>
  </DefaultSection>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  submitLabel: { type: String, default: 'Agendar cita' }
})
</script>
