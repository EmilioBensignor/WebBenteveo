<template>
  <div v-if="status !== 'idle'"
    :class="['w-full max-w-175 h-82 lg:h-104 flex flex-col justify-center items-center gap-4 text-center p-3 md:p-5 lg:p-8', TARJETA]">
    <template v-if="status === 'loading'">
      <span class="loader" />
      <p class="text-amarillo text-lg font-bold">Estamos enviando tu consulta</p>
    </template>

    <template v-else>
      <Icon name="material-symbols:check-circle-outline-rounded" size="100" class="text-amarillo" />
      <p class="text-amarillo text-lg lg:text-xl font-bold">¡Enviamos tu consulta con éxito!</p>
      <p class="text-blanco text-sm lg:text-base">Nuestro equipo se contactará contigo a la brevedad.</p>
    </template>
  </div>

  <form v-else @submit.prevent="submit"
    :class="['w-full max-w-150 flex flex-col justify-center items-center gap-2 md:gap-4 p-3 md:p-5 lg:p-8', TARJETA]">
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
const TARJETA =
  'border border-[#dddddd3d] rounded-2xl lg:rounded-[3rem] bg-[linear-gradient(90deg,rgba(19,19,19,0.6),rgba(19,19,19,0.6)),linear-gradient(90deg,rgba(221,221,221,0.24),rgba(221,221,221,0.24))]'

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
