<template>
  <div class="input-field">
    <input
      v-model="title"
      @keyup.enter.prevent="onAdd"
      ref="input"
      type="text"
      placeholder="Enter your new todo"
      aria-label="New todo"
    />
    <button type="button" class="add-button" @click="onAdd">Add</button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const title = ref('')
let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  // Optional realtime:
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  todoStore.addTodo(title.value)
  title.value = ''
}
</script>
