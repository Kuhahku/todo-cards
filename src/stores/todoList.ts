import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '../types'

export const useTodoListStore = defineStore('todoList', () => {
  const id = ref(4)
  const todoList: Todo[] = reactive([
    {
      id: 0,
      title: 'Add a todo card',
      description: 'Now we have implemented pagination functionality.',
      date: 'March 9, 2023',
      time: '18:00',
      complete: true
    },
    {
      id: 1,
      title: 'Watch a movie',
      description: 'Watch "Suzume no Tojimari".',
      date: 'March 24, 2023',
      time: '10:00',
      complete: false
    },
    {
      id: 2,
      title: 'Find a job',
      description:
        '「ここでは仕事を持たない者は 湯婆婆に動物にされてしまう」—— 《千と千尋の神隠し》',
      date: 'March 27, 2023',
      time: '12:00',
      complete: false
    },
    {
      id: 3,
      title: 'Try stable diffusion',
      description: 'Maybe I can make something interesting.',
      date: 'March 29, 2023',
      time: '11:00',
      complete: false
    }
  ])

  function getTodos(page: number, num: number = 3) {
    const index = (page - 1) * num
    return todoList.slice(index, index + num)
  }

  function getTodo(id: number) {
    for (const todo of todoList) {
      if (todo.id === id) {
        return todo
      }
    }
  }
  return { id, todoList, getTodo, getTodos }
})
