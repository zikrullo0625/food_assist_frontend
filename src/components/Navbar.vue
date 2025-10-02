<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl z-50">
    <div class="flex justify-between items-center h-16 px-6">
      <button
          @click="navigate('home')"
          class="text-gray-500 p-2"
          :class="{ 'text-blue-500': $route.name === 'home' }"
      >
        <i class="fas fa-home text-xl"></i>
      </button>

      <button
          @click="navigate('stats')"
          class="text-gray-500 p-2"
          :class="{ 'text-blue-500': $route.name === 'stats' }"
      >
        <i class="fas fa-chart-bar text-xl"></i>
      </button>

      <button
          @click="navigate('camera')"
          class="bg-blue-500 text-white p-2 rounded-full w-12 h-12 shadow-md focus:outline-none"
          :class="{ 'bg-blue-600': $route.name === 'camera' }"
      >
        <i class="fas fa-camera text-xl"></i>
      </button>

      <button
          @click="navigate('history')"
          class="text-gray-500 p-2"
          :class="{ 'text-blue-500': $route.name === 'history' }"
      >
        <i class="fas fa-history text-xl"></i>
      </button>

      <button
          @click="navigate('settings')"
          class="text-gray-500 p-2"
          :class="{ 'text-blue-500': $route.name === 'settings' }"
      >
        <i class="fas fa-cogs text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    navigate(route) {
      this.$router.push({ name: route });
    }
  }
}
</script>

<style scoped>
/* Добавить стили по необходимости */
</style>
