import "./assets/main.css";

import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";
import { DefaultApolloClient } from '@vue/apollo-composable';

import App from "./App.vue";
import { apolloClient } from './apollo/client';

// 1. Create the Vue App and provide Apollo
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App), 
});

// 2. Create Pinia and use it
const store = createPinia();
app.use(store);

// 3. Mount the app
app.mount("#app");