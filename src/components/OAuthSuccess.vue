<template>
  <div class="flex items-center justify-center h-screen text-xl text-white">
    <div class="text-center">
      <div class="mb-4">Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import user from '@/composables/user.js'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const debugInfo = ref([])

const debug = (msg) => {
  debugInfo.value.push(`[${new Date().toLocaleTimeString()}] ${msg}`)
  console.log('[OAuthSuccess]', msg)
}

onMounted(async () => {
  debug('OAuthSuccess mounted')
  
  try {
    debug('--- OAuth Debug Start ---')

    const tokenFromRoute = typeof route?.query?.token === 'string' ? route.query.token : null
    debug(`Token from route.query: ${tokenFromRoute ? 'YES' : 'NO'}`)

    // Берем query-параметры из URL напрямую (web / fallback)
    const params = new URLSearchParams(window.location.search)
    const tokenFromWindow = params.get('token')
    debug(`Token from window.location.search: ${tokenFromWindow ? 'YES' : 'NO'}`)

    const token = tokenFromRoute || tokenFromWindow
    debug(`Final token decision: ${token ? 'YES' : 'NO'}`)

    if (token) {
      debug('Setting token in localStorage...')
      await user.setToken(token);

      debug('Fetching user data...');
      const { data } = await axios.get(import.meta.env.VITE_API_URL + '/auth/user');
      debug('User data received');
      await user.setUser(data);

      debug('Redirecting to home...');
      await router.replace('/');
    } else {
      debug('No token found, redirecting to login...');
      router.replace('/login');
    }

    debug('--- OAuth Debug End ---')
  } catch (error) {
    debug(`Error: ${error.message}`)
    await user.clearToken();
    router.replace('/login');
  }
});
</script>
