import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import History from '@/components/History.vue';
import Camera from '@/components/Camera.vue';
import Stats from '@/components/Statistics.vue';
import Settings from '@/components/Settings.vue';
import Login from '@/components/Login.vue';
import user from '@/composables/user.js';
import BuyPremium from "@/components/BuyPremium.vue";

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/history', name: 'history', component: History, meta: { requiresAuth: true } },
    { path: '/premium', name: 'premium', component: BuyPremium, meta: { requiresAuth: true } },
    { path: '/camera', name: 'camera', component: Camera, meta: { requiresAuth: true } },
    { path: '/stats', name: 'stats', component: Stats, meta: { requiresAuth: true } },
    { path: '/settings', name: 'settings', component: Settings, meta: { requiresAuth: true } },
    {
        path: '/oauth-success',
        name: 'OAuthSuccess',
        component: () => import('@/components/OAuthSuccess.vue')
    },
    {
        path: '/result',
        name: 'result',
        component: () => import('@/components/Result.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/components/Logout.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const isLoggedIn = await user.isLoggedIn();
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        next({ name: 'login' });
    } else {
        next();
    }
});

router.isReady().then(async () => {
    const token = await user.getToken();
    if (!token) {
        router.push({ name: 'login' });
    }
});

export default router;