<template>
  <div class="todoLists">
    <template v-if="status === 'completed'">
      <TodoItem
        v-for="todo of completedTasks"
        :key="todo.id"
        icon="uil-check-circle"
        :todo="todo"
      />
      <p v-if="completedTasks.length === 0" class="empty-state">No completed tasks yet.</p>
    </template>
    <template v-else>
      <TodoItem
        v-for="todo of pendingTasks"
        :key="todo.id"
        icon="uil-clock"
        :todo="todo"
      />
      <p v-if="pendingTasks.length === 0" class="empty-state">No pending tasks. Add one above.</p>
    </template>
  </div>
</template>
<script>
import TodoItem from "./TodoItem.vue";
import { useTodoStore } from "../stores/todo";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: ["status"],
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  async mounted() {
    await this.todoStore.fetchTodos();
  },
  computed: {
    completedTasks() {
      return this.todoStore.todos.filter((todo) => todo.is_done);
    },
    pendingTasks() {
      return this.todoStore.todos.filter((todo) => !todo.is_done);
    },
  },
};
</script>
