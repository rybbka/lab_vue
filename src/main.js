import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importera bootstrap CSS stilar
import "bootstrap/dist/css/bootstrap.css"

// Importera bootstrap JS filer
import "bootstrap" 
import App from './App.vue'
import router from './router'

const app = createApp(App)

// För att importer ska fungera behöver man använda ett middleware "use"
app.use(createPinia())
app.use(router)




app.mount('#app')
