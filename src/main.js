import '@dotlottie/player-component'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import user from './composables/user'
import '@fortawesome/fontawesome-free/css/all.css'
import 'mdui/mdui.css'
import 'mdui'
import { App as CapApp } from '@capacitor/app'
import { setColorScheme } from 'mdui'

setColorScheme('#123')

const app = createApp(App)

let pendingUrl = null

const setupDeepLinks = async () => {
    if (!window.Capacitor?.isNativePlatform?.()) return

    const handleUrl = async (url) => {
        if (!url) return

        const parsed = new URL(url)
        const isOauth =
            parsed.pathname.includes('oauth') ||
            parsed.host.includes('oauth')

        if (!isOauth) return

        const token = parsed.searchParams.get('token')
        if (!token) return

        await router.replace({ path: '/oauth-success', query: { token } })
    }

    const launch = await CapApp.getLaunchUrl()
    if (launch?.url) pendingUrl = launch.url

    CapApp.addListener('appUrlOpen', async ({ url }) => {
        if (router.isReady()) {
            await handleUrl(url)
        } else {
            pendingUrl = url
        }
    })
}

setupDeepLinks()

user.loadSession().then(() => {
    app.use(router)
    app.mount('#app')
})

router.isReady().then(async () => {
    if (pendingUrl) {
        const parsed = new URL(pendingUrl)
        const token = parsed.searchParams.get('token')

        if (token) {
            await router.replace({ path: '/oauth-success', query: { token } })
            pendingUrl = null
            return
        }
    }

    const token = await user.getToken()
    if (!token) {
        await router.push({ name: 'login' })
    }
})
