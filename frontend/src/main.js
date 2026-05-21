import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initCSRF } from './services/api'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

// init csrf before mount
initCSRF().then(() => {
  app.mount('#app')
})
