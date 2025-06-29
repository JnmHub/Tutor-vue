import './assets/main.css'
import { loadingFadeOut } from 'virtual:app-loading'
loadingFadeOut()
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
const app = createApp(App)
// 创建 Pinia 实例并使用插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia) // 修改这里
app.use(router)
app.config.globalProperties.$env = import.meta.env
import myComponent from '@/components/index'
Object.keys(myComponent).forEach(key => {
    app.component(key, myComponent[key])
})

app.mount('#app')
