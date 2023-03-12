import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { mount, RouterLinkStub } from '@vue/test-utils'
import TodoCard from '@/components/TodoCard.vue'
import { useTodoListStore } from '@/stores/todoList'

describe('TodoCard', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
  })

  it('The title should be displayed correctly', () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[0]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    expect(wrapper.find('h2').text()).toMatch('Add a todo card')
  })

  it('The time and date should be displayed correctly', () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[0]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    expect(wrapper.find('span').text()).toMatch('@18:00 on March 9, 2023')
  })

  it('The checkmark icon should be displayed when the todo is completed', () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[0]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    expect(wrapper.find('.trigger-done').isVisible()).toBe(true)
  })

  it('The checkmark icon should not be displayed when the todo is not completed', () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[1]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    expect(wrapper.find('.trigger-done').isVisible()).toBe(false)
  })

  it('The checkmark icon should not be displayed by default', () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[1]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    expect(wrapper.find('.trigger-delete').isVisible()).toBe(false)
  })

  it('The delete icon should not be displayed by default', () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[1]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    expect(wrapper.find('.trigger-delete').isVisible()).toBe(false)
  })

  it('Display the checkmark icon when mouseover the card element', async () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[1]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const card = wrapper.find('.todo-card')
    await card.trigger('mouseover')
    expect(wrapper.find('.trigger-done').isVisible()).toBe(true)
  })

  it('Display the trash icon when mouseover the card element', async () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[1]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const card = wrapper.find('.todo-card')
    await card.trigger('mouseover')
    expect(wrapper.find('.trigger-delete').isVisible()).toBe(true)
  })

  it('Add the is-completed class to the card element when the checkmark icon is clicked', async () => {
    const store = useTodoListStore()
    const { todoList } = store
    const wrapper = mount(TodoCard, {
      props: {
        todo: todoList[1]
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const checkmark = wrapper.find('.trigger-done')
    await checkmark.trigger('click')
    expect(wrapper.find('.todo-card').classes()).toContain('is-completed')
  })
})
