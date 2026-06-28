<template>
  <div
    class="w-full max-w-134 h-82 lg:h-104 flex flex-col justify-center items-center gap-4 border-2 border-amarillo rounded-2xl bg-negro text-center p-6"
    v-if="status === 'loading'">
    <span class="loader" />
    <p class="text-amarillo text-lg font-bold">Estamos enviando tu consulta</p>
  </div>

  <div
    class="w-full max-w-134 h-82 lg:h-104 flex flex-col justify-center items-center gap-6 rounded-2xl bg-negro text-center py-14 md:py-16 lg:py-24 xxl:py-28 px-6 lg:px-12"
    v-else-if="status === 'success'">
    <Icon name="material-symbols:check-circle-outline-rounded" size="100" class="text-amarillo" />
    <div class="flex flex-col gap-4">
      <p class="lg:text-xl text-amarillo font-bold">¡Enviamos tu consulta con éxito!</p>
      <p class="text-sm lg:text-base text-blanco">Nuestro equipo se contactará contigo a la brevedad.</p>
    </div>
  </div>

  <form class="w-full max-w-134 flex flex-col gap-4 rounded-2xl bg-negro p-4 md:p-6 lg:py-12" @submit.prevent="submit" v-else>
    <FormField v-model="form.nombre" placeholder="Nombre" autocomplete="name" :error="errors.nombre"
      @blur="validate('nombre')" />
    <FormField v-model="form.correo" placeholder="Correo" type="email" autocomplete="email" :error="errors.correo"
      @blur="validate('correo')" />
    <FormField v-model="form.empresa" placeholder="Empresa" />
    <FormField v-model="form.sector" placeholder="Sector" />
    <ButtonPrimary type="submit" class="w-full">{{ submitLabel }}</ButtonPrimary>
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
