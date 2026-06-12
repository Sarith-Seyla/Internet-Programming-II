<template>
  <div class="container">
    <AddTodo />
    <h3>Pending Tasks:</h3>
    <TodoLists status="pending" />

    <h3>Completed Tasks:</h3>
    <TodoLists status="completed" />
    <div class="pending-tasks">
      <span
        >You have <span class="pending-num"> {{ nbOfTodo }} </span> tasks
        pending.</span
      >
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import AddTodo from "./components/AddTodo.vue";
import TodoLists from "./components/TodoList.vue";

import { useTodoStore } from "./stores/todo";
export default {
  name: "App",
  components: {
    AddTodo,
    TodoLists,
  },
  computed: {
    ...mapState(useTodoStore, {
      nbOfTodo: "countTodos",
    }),
  },
};
</script>
<style>
@import "https://unicons.iconscout.com/release/v4.0.0/css/line.css";
</style>
