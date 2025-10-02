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
  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')

  if (token) {
    await user.setToken(token)

    try {
      const { data } = await axios.get(import.meta.env.VITE_API_URL + '/auth/user')
      await user.setUser(data)

      await router.replace('/')
    } catch (error) {
      console.error('Ошибка получения пользователя', error)
      await user.clearToken()
    }
  }
})
</script>