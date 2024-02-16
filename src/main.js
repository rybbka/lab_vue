import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importera bootstrap CSS stilar
import 'bootstrap/dist/css/bootstrap.css'

// Importera bootstrap JS filer
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// För att importer ska fungera behöver man använda ett middleware "use"
app.use(bootstrap)

app.mount('#app')
