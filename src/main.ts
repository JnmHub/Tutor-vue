import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
import myComponent from "@/components/index";
Object.keys(myComponent).forEach((key) => {
  app.component(key, myComponent[key]);
});
app.mount('#app')
