<template>
  <li class="list pending">
    <input type="checkbox" :checked="todo.is_done" @change="toggleTodo" />
    <span class="task">{{ todo.title }}</span>
    <div class="action-row">
      <button type="button" class="delete-btn" @click.stop="deleteTodo">Delete</button>
      <i class="uil" :class="icon"></i>
    </div>
  </li>
</template>
<script>
import { useTodoStore } from "../stores/todo";
export default {
  name: "TodoItem",
  props: ["todo", "icon"],
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  methods: {
    toggleTodo() {
      this.todoStore.toggleTodo(this.todo);
    },
    deleteTodo() {
      this.todoStore.deleteTodo(this.todo.id);
    },
  },
};
</script>
