<template>
  <div class="flex items-center justify-center h-screen text-xl text-white">
    Loading...
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import user from '@/composables/user.js'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  try {
    console.log('--- OAuth Debug Start ---')

    const hash = window.location.hash; // "#/oauth-success?token=abc123"
    console.log('Current hash:', hash);

    const queryString = hash.includes('?') ? hash.split('?')[1] : '';
    console.log('Query string:', queryString);

    const params = new URLSearchParams(queryString);
    const token = params.get('token');
    console.log('Token from URL:', token);

    if (token) {
      console.log('Setting token in localStorage...');
      await user.setToken(token);

      console.log('Fetching user data...');
      const { data } = await axios.get(import.meta.env.VITE_API_URL + '/auth/user');
      console.log('User data received:', data);
      await user.setUser(data);

      console.log('Redirecting to home...');
      // await router.replace('/');
    } else {
      console.warn('No token found in URL, redirecting to login...');
      // router.replace('/login');
    }

    console.log('--- OAuth Debug End ---')
  } catch (error) {
    console.error('Error in OAuth callback:', error);
    await user.clearToken();
    router.replace('/login');
  }
});
</script>
