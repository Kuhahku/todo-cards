<script setup lang="ts">
export interface Props {
  resource?: string
}

const props = withDefaults(defineProps<Props>(), {
  resource: 'page'
})
</script>

<template>
  <h2>Oops!</h2>
  <h3>The {{ props.resource }} you're looking for is not here.</h3>
  <RouterLink :to="{ name: 'card-list' }">Back to the home page</RouterLink>
</template>
