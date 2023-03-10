<script setup lang="ts">
import { useTodoListStore } from '@/stores/todoList'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
}>()

const store = useTodoListStore()
const router = useRouter()

const { getTodo } = store
const todo = getTodo(parseInt(props.id, 10))
if (!todo) {
  router.replace({ name: '404-resource', params: { resource: 'card' } })
}
</script>

<template>
  <div v-if="todo">
    <h1>{{ todo.title }}</h1>
    <p>@{{ todo.time }} on {{ todo.date }}</p>
    <p>{{ todo.description }}</p>
  </div>
</template>
