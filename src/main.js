import '@dotlottie/player-component';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import user from './composables/user'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

user.loadSession().then(() => {
    app.use(router)
    app.mount('#app')
})

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((reg) => console.log("SW зарегистрирован:", reg))
            .catch((err) => console.log("Ошибка SW:", err));
    });
}