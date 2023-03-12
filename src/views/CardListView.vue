<script setup lang="ts">
import TodoCard from '@/components/TodoCard.vue'
import { useTodoListStore } from '@/stores/todoList'
import { reactive, ref, watchEffect } from 'vue'
import type { Todo } from '@/types'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  page: string
}>()

const store = useTodoListStore()
const { getTodos } = store
const { todoList } = storeToRefs(store)

let page = ref(1)
let pageTodoList: Todo[] = reactive([])

watchEffect(() => {
  page.value = parseInt(props.page, 10)
  pageTodoList = getTodos(page.value)
})

function hasNextPage(num: number = 3) {
  const totalPage = Math.ceil(todoList.value.length / num)
  return page.value < totalPage
}
</script>

<template>
  <div class="cards">
    <RouterLink class="add-card" :to="{ name: 'add-card' }">
      <img src="@/assets/plus.svg" alt="+" />
      <p>Add a card</p>
    </RouterLink>
    <TodoCard v-for="todo in pageTodoList" :key="todo.id" :todo="todo" />
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'card-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev</RouterLink
      >
      <RouterLink
        id="page-next"
        :to="{ name: 'card-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage()"
      >
        Next &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-card {
  padding: 0 20px;
  width: 250px;
  cursor: pointer;
  border: 1px dashed #39495c;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.add-card img {
  height: 1rem;
  margin-right: 3px;
  margin-bottom: 1.6px;
}

.add-card:hover {
  border-style: solid;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
}
.pagination a:hover {
  transform: scale(1.01);
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
