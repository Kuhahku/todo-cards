<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTodoListStore } from '@/stores/todoList'
import type { Todo } from '@/types'
import BaseInput from '@/components/BaseInput.vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import 'dayjs/locale/en'

const router = useRouter()

const store = useTodoListStore()
const { id, todoList } = storeToRefs(store)

const title = ref('')
const description = ref('')

const currentTime = dayjs().format('HH:mm')
const currentDate = dayjs().format('YYYY-MM-DD')
const date = ref(currentDate)
const time = ref(currentTime)

function formatDate(dateStr: string) {
  const date = dayjs(dateStr).locale('en')
  return date.format('MMMM DD, YYYY')
}

function handleSave() {
  if (id.value && title.value && description.value && date.value && time.value) {
    const todo: Todo = {
      id: id.value++,
      title: title.value,
      description: description.value,
      date: formatDate(date.value),
      time: time.value,
      complete: false
    }
    todoList.value.push(todo)
    id.value = id.value++
    router.go(-1)
  } else {
    alert('The form must be completed in full.')
  }
}

function handleClose() {
  router.go(-1)
}
</script>

<template>
  <h2>Add new card</h2>
  <div class="wrapper">
    <BaseInput v-model="title" label="Title" type="text" />
    <BaseInput v-model="description" label="Description" type="textarea" />
    <BaseInput v-model="date" label="Date" type="date" />
    <BaseInput v-model="time" label="Time" type="time" />
    <div class="btn">
      <img src="@/assets/check.svg" alt="save" id="check" @click="handleSave" />
      <img src="@/assets/close.svg" alt="close" id="close" @click="handleClose" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 250px;
  margin: 1rem auto;
  text-align: start;
}
.btn {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
img {
  cursor: pointer;
}
</style>
