<template>
  <div class="flex flex-col gap-1">
    <input :type="type" :value="modelValue" :placeholder="placeholder" :autocomplete="autocomplete" :required="required"
      class="w-full h-12 bg-white/18 rounded-lg text-sm lg:text-base text-blanco font-medium placeholder:text-blanco/60 outline-none focus:ring-1 focus:ring-amarillo p-4 transition-shadow"
      :class="error ? 'ring-1 ring-red-400' : ''" @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')" />
    <p v-if="error" class="text-xs text-red-400 font-medium px-1">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: String, default: null },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' }
})

defineEmits(['update:modelValue', 'blur'])
</script>
