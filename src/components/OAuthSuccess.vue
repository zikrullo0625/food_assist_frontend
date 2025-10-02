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
  const hash = window.location.hash; // "#/oauth-success?token=abc123"
  const params = new URLSearchParams(hash.split('?')[1]);
  const token = params.get('token');

  if (token) {
    await user.setToken(token);

    try {
      const { data } = await axios.get(import.meta.env.VITE_API_URL + '/auth/user');
      await user.setUser(data);

      await router.replace('/'); // редирект на главную
    } catch (error) {
      console.error('Ошибка получения пользователя', error);
      await user.clearToken();
      router.replace('/login');
    }
  } else {
    router.replace('/login');
  }
});

</script>