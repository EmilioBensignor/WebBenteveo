<template>
  <div v-if="status !== 'idle'"
    :class="['w-full h-82 lg:h-104 flex flex-col justify-center items-center gap-4 text-center p-3 md:p-5 lg:p-8', TARJETA]">
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
    :class="['w-full flex flex-col justify-center items-center gap-2 md:gap-4 p-3 md:p-5 lg:p-8', TARJETA]">
    <p class="w-full text-center text-hueso text-base lg:text-xl">{{ formTitle }}</p>

    <UiFormField v-model="form.nombre" placeholder="Nombre" autocomplete="name" :error="errors.nombre"
      @blur="validate('nombre')" />
    <UiFormField v-model="form.correo" placeholder="Correo" type="email" autocomplete="email" :error="errors.correo"
      @blur="validate('correo')" />
    <UiFormField v-model="form.empresa" placeholder="Empresa" autocomplete="organization" :error="errors.empresa"
      @blur="validate('empresa')" />
    <div ref="selectRef" class="w-full flex flex-col gap-1 relative">
      <button type="button" :aria-expanded="abierto" aria-haspopup="listbox"
        class="w-full h-12 flex items-center justify-between gap-2 bg-blanco/18 rounded-lg text-sm lg:text-base font-light text-left cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-amarillo transition-shadow pl-4 pr-3"
        :class="[form.sector ? 'text-hueso' : 'text-hueso/70', errors.sector ? 'ring-1 ring-red-400' : '']"
        @click="abierto = !abierto">
        <span class="truncate">{{ form.sector || 'Sector' }}</span>
        <Icon name="material-symbols:keyboard-arrow-down-rounded" size="20"
          class="shrink-0 text-amarillo transition-transform duration-200" :class="abierto ? 'rotate-180' : ''" />
      </button>

      <Transition name="opciones">
        <ul v-if="abierto" role="listbox"
          class="w-full max-h-44 flex flex-col absolute left-0 top-full z-20 overflow-y-auto bg-negro border border-blanco/33 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.6)] mt-2 p-1"
          data-lenis-prevent>
          <li v-for="s in SECTORES" :key="s">
            <button type="button" role="option" :aria-selected="form.sector === s"
              class="w-full rounded-md text-sm lg:text-base text-left font-light cursor-pointer transition-colors duration-150 lg:hover:bg-blanco/18 py-2.5 px-3"
              :class="form.sector === s ? 'text-amarillo' : 'text-hueso'" @click="elegirSector(s)">
              {{ s }}
            </button>
          </li>
        </ul>
      </Transition>
      <p v-if="errors.sector" class="text-xs text-red-400 px-1">{{ errors.sector }}</p>
    </div>
    <UiFormField v-if="form.sector === OTRO" v-model="form.sectorOtro" placeholder="¿Cuál es tu sector?"
      :error="errors.sectorOtro" @blur="validate('sectorOtro')" />
    <UiFormField v-model="form.web" placeholder="Página web" autocomplete="url" :error="errors.web"
      @blur="validate('web')" />
    <UiButtonPrimary type="submit" class="w-full">{{ submitLabel }}</UiButtonPrimary>
  </form>
</template>

<script setup>
import { industrias } from '~/constants/transformacion'

const TARJETA =
  'border border-[#dddddd3d] rounded-2xl lg:rounded-[3rem] bg-[linear-gradient(90deg,rgba(19,19,19,0.6),rgba(19,19,19,0.6)),linear-gradient(90deg,rgba(221,221,221,0.24),rgba(221,221,221,0.24))]'

defineProps({
  submitLabel: { type: String, default: 'Enviar mi consulta' },
  formTitle: { type: String, default: 'Déjanos tus datos para ponernos en contacto' }
})

const form = reactive({ nombre: '', correo: '', empresa: '', sector: '', sectorOtro: '', web: '' })
const errors = reactive({ nombre: null, correo: null, empresa: null, sector: null, sectorOtro: null, web: null })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEB_RE = /^\S+\.\S{2,}$/

const REGLAS = {
  nombre: () => form.nombre.trim() ? null : 'El nombre es requerido',
  correo: () => EMAIL_RE.test(form.correo.trim()) ? null : 'Ingresa un correo válido',
  empresa: () => form.empresa.trim() ? null : 'La empresa es requerida',
  sector: () => form.sector ? null : 'Elige tu sector',
  sectorOtro: () => form.sector !== OTRO || form.sectorOtro.trim() ? null : 'Cuéntanos cuál es tu sector',
  web: () => WEB_RE.test(form.web.trim()) ? null : 'Ingresa una página web válida'
}

const validate = (field) => {
  errors[field] = REGLAS[field]()
}

const OTRO = 'Otro'
const SECTORES = [...industrias.map((i) => i.label), OTRO]

const abierto = ref(false)
const selectRef = ref(null)

const elegirSector = (sector) => {
  form.sector = sector
  abierto.value = false
  errors.sector = null
  errors.sectorOtro = null
}

const alClickAfuera = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) abierto.value = false
}

const alEscape = (e) => {
  if (e.key === 'Escape') abierto.value = false
}

onMounted(() => {
  document.addEventListener('click', alClickAfuera)
  document.addEventListener('keydown', alEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', alClickAfuera)
  document.removeEventListener('keydown', alEscape)
})

const status = ref('idle')

const submit = async () => {
  Object.keys(REGLAS).forEach(validate)
  if (Object.values(errors).some(Boolean)) return
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

.opciones-enter-active {
  transition: opacity 0.18s ease-out, transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

.opciones-leave-active {
  transition: opacity 0.12s ease-in, transform 0.12s ease-in;
}

.opciones-enter-from,
.opciones-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .opciones-enter-active,
  .opciones-leave-active {
    transition: none;
  }
}
</style>
