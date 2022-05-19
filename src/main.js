import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//firebase imports
import { dbAuth } from './firebase/config'

let app

dbAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})