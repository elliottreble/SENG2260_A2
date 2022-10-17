import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'


const pinia = createPinia()

const app  = createApp({
    render: ()=>h(App)
});

app.use(router).use(pinia);
app.mount("#app")