<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTodoListStore } from '@/stores/todoList'
import type { Todo } from '@/types'
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

function handleSubmit() {
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

function handleCancel() {
  router.go(-1)
}
</script>

<template>
  <p>Add a card</p>
  <div class="form-wrapper">
    <form>
      <label for="title">title:</label>
      <input type="text" id="title" v-model="title" />

      <label for="time">time:</label>
      <input type="time" id="time" v-model="time" />

      <label for="date">date:</label>
      <input type="date" id="date" v-model="date" />

      <label for="description">description:</label>
      <textarea id="description" cols="2" v-model="description"></textarea>

      <div class="button-wrapper">
        <button type="button" @click.prevent="handleSubmit()">Submit</button>
        <button type="button" @click.prevent="handleCancel()">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: min(500px, 80vw);
}

label {
  font-family: inherit;
  display: flex;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
}

input[type='text'],
input[type='date'],
input[type='time'],
textarea,
button {
  font-family: inherit;
  display: block;
  width: 100%;
  border: 1px solid #39495c;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.button-wrapper {
  margin-top: 1.2rem;
}

button {
  padding: 0.8rem;
  cursor: pointer;
  background-color: #fff;
}
button:hover {
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
