<script setup lang="ts">
import type { Todo } from '@/types'

defineProps<{
  todo: Todo
}>()
</script>

<template>
  <RouterLink class="card-link" :to="{ name: 'card-details', params: { id: todo.id } }">
    <div class="todo-card">
      <h2>{{ todo.title }}</h2>
      <span>@{{ todo.time }} on {{ todo.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.todo-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.todo-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.card-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
