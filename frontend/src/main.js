import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initCSRF } from './services/api'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

// Initialize CSRF before mounting
initCSRF().then(() => {
  app.mount('#app')
})
