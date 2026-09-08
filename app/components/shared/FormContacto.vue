<template>
  <div
    class="w-full max-w-175 h-82 lg:h-104 flex flex-col justify-center items-center gap-4 border border-[#dddddd3d] rounded-[3rem] bg-[linear-gradient(90deg,rgba(19,19,19,0.6),rgba(19,19,19,0.6)),linear-gradient(90deg,rgba(221,221,221,0.24),rgba(221,221,221,0.24))] text-center p-6"
    v-if="status === 'loading'">
    <span class="loader" />
    <p class="text-amarillo text-lg font-bold">Estamos enviando tu consulta</p>
  </div>

  <div
    class="w-full max-w-175 h-82 lg:h-104 flex flex-col justify-center items-center gap-6 border border-[#dddddd3d] rounded-[3rem] bg-[linear-gradient(90deg,rgba(19,19,19,0.6),rgba(19,19,19,0.6)),linear-gradient(90deg,rgba(221,221,221,0.24),rgba(221,221,221,0.24))] text-center py-14 md:py-16 lg:py-24 xxl:py-28 px-6 lg:px-12"
    v-else-if="status === 'success'">
    <Icon name="material-symbols:check-circle-outline-rounded" size="100" class="text-amarillo" />
    <div class="flex flex-col gap-4">
      <p class="lg:text-xl text-amarillo font-bold">¡Enviamos tu consulta con éxito!</p>
      <p class="text-sm lg:text-base text-blanco">Nuestro equipo se contactará contigo a la brevedad.</p>
    </div>
  </div>

  <form
    class="w-full max-w-150 flex flex-col justify-center items-center gap-4 border border-[#dddddd3d] rounded-[3rem] bg-[linear-gradient(90deg,rgba(19,19,19,0.6),rgba(19,19,19,0.6)),linear-gradient(90deg,rgba(221,221,221,0.24),rgba(221,221,221,0.24))] p-6 md:p-8"
    @submit.prevent="submit" v-else>
    <p class="w-full text-center text-hueso text-base lg:text-xl">Dejanos tus datos para ponernos en contacto</p>

    <UiFormField v-model="form.nombre" placeholder="Nombre" autocomplete="name" :error="errors.nombre"
      @blur="validate('nombre')" />
    <UiFormField v-model="form.correo" placeholder="Correo" type="email" autocomplete="email" :error="errors.correo"
      @blur="validate('correo')" />
    <UiFormField v-model="form.empresa" placeholder="Empresa" />
    <UiFormField v-model="form.sector" placeholder="Sector" />
    <UiButtonPrimary type="submit" class="w-full">{{ submitLabel }}</UiButtonPrimary>
  </form>
</template>

<script setup>
defineProps({
  submitLabel: { type: String, default: 'Enviar mi consulta' }
})

const form = reactive({ nombre: '', correo: '', empresa: '', sector: '' })
const errors = reactive({ nombre: null, correo: null })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (field) => {
  if (field === 'nombre') errors.nombre = form.nombre.trim() ? null : 'El nombre es requerido'
  if (field === 'correo') errors.correo = EMAIL_RE.test(form.correo) ? null : 'Ingresá un correo válido'
}

const status = ref('idle')

const submit = async () => {
  validate('nombre')
  validate('correo')
  if (errors.nombre || errors.correo) return
  status.value = 'loading'
  await new Promise((resolve) => setTimeout(resolve, 1500))
  status.value = 'success'
}
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid var(--color-blanco);
  border-bottom-color: var(--color-amarillo);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  to {
    transform: rotate(360deg);
  }
}
</style>
