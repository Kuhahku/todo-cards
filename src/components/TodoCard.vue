<script setup lang="ts">
import { useTodoListStore } from '@/stores/todoList'
import type { Todo } from '@/types'
import { ref } from 'vue'

defineProps<{
  todo: Todo
}>()

const store = useTodoListStore()
const { deleteTodo } = store

const showEdit = ref(false)

function triggerDone(todo: Todo) {
  todo.complete = !todo.complete
}
function triggerDelete(todo: Todo) {
  deleteTodo(todo.id)
}
</script>

<template>
  <RouterLink class="card-link" :to="{ name: 'card-details', params: { id: todo.id } }">
    <div
      :class="{ 'todo-card': true, 'is-completed': todo.complete }"
      @mouseover="showEdit = true"
      @mouseleave="showEdit = false"
    >
      <img
        v-show="todo.complete || showEdit"
        class="trigger-done"
        src="@/assets/check.svg"
        alt="done"
        @click.prevent="triggerDone(todo)"
      />
      <img
        v-show="showEdit"
        class="trigger-delete"
        src="@/assets/trash.svg"
        alt="delete"
        @click.prevent="triggerDelete(todo)"
      />
      <h2>{{ todo.title }}</h2>
      <span>@{{ todo.time }} on {{ todo.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.todo-card {
  position: relative;
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.is-completed {
  opacity: 0.5;
}
.todo-card img {
  height: 1.6rem;
}
.todo-card .trigger-done {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
}
.todo-card .trigger-delete {
  position: absolute;
  top: 4.7rem;
  right: 0.6rem;
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
