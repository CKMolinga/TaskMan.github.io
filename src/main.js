import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//firebase imports
import { dbAuth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

// let app

// onAuthStateChanged(dbAuth, () => {
//     if (!app) {
//         app = 
//     }
// })
createApp(App).use(router).mount('#app')