import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apolloClient } from '@/apollo/client'
import { GET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, TODOS_SUB } from '@/graphql/todos'

export type Todo = {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const countTodos = computed(() => todos.value.filter(todo => !todo.is_done).length)

  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      const { data } = await apolloClient.query<{ todos: Todo[] }>({
        query: GET_TODOS,
        fetchPolicy: 'network-only', // keep it simple for students
      })
      todos.value = data.todos
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load todos'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    const clean = title.trim()
    if (!clean) return

    try {
      await apolloClient.mutate({
        mutation: ADD_TODO,
        variables: { title: clean },
      })
    } catch (e: any) {
      console.error('Add todo failed', e)
      throw e
    }

    // simplest approach for class:
    await fetchTodos()
  }

  async function toggleTodo(todo: Todo) {
    try {
      await apolloClient.mutate({
        mutation: TOGGLE_TODO,
        variables: { id: todo.id, done: !todo.is_done },
      })
    } catch (e: any) {
      console.error('Toggle todo failed', e)
      throw e
    }
    await fetchTodos()
  }

  async function deleteTodo(id: string) {
    try {
      await apolloClient.mutate({
        mutation: DELETE_TODO,
        variables: { id },
      })
    } catch (e: any) {
      console.error('Delete todo failed', e)
      throw e
    }
    await fetchTodos()
  }

  // Optional: realtime updates (subscription)
  function startRealtime() {
    const obs = apolloClient.subscribe<{ todos: Todo[] }>({
      query: TODOS_SUB,
    })

    const sub = obs.subscribe({
      next: ({ data }) => {
        if (data?.todos) todos.value = data.todos
      },
      error: (e) => {
        // keep app running even if WS fails
        console.error('Subscription error', e)
      },
    })

    return () => sub.unsubscribe()
  }

  return {
    todos,
    loading,
    error,
    countTodos,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
  }
})
