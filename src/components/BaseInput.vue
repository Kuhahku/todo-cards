<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string
}>()
</script>

<template>
  <label v-if="label" :for="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :id="label"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="field"
  />
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
}
textarea,
select,
input {
  font-size: 1rem;
  font-family: inherit;
  margin: 0 0 1rem 0;
  padding: 0.5rem;
  width: 100%;
}
</style>
