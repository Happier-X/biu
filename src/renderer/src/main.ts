import '@renderer/assets/main.css'
import { createApp } from 'vue'
import App from '@renderer/App.vue'
import { createPinia } from 'pinia'
import { dragWindow } from '@renderer/directives/dragWindow'

const pinia = createPinia()
const app = createApp(App)
app.directive('drag-window', dragWindow)
app.use(pinia).mount('#app')
