import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importera bootstrap CSS stilar
import 'bootstrap/dist/css/bootstrap.css'

// Importera bootstrap JS filer
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.vue'
import router from './router'

// Import jQuery
import $ from 'jquery';

// Set jQuery as a global variable
window.$ = window.jQuery = $;


const app = createApp(App)

// För att importer ska fungera behöver man använda ett middleware "use"
app.use(createPinia())
app.use(router)


app.use(bootstrap)

app.mount('#app')
