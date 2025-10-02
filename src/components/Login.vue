<template>
  <div class="relative min-h-screen flex flex-col items-center overflow-hidden">
    <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('https://st.depositphotos.com/15352324/54894/i/450/depositphotos_548942966-stock-photo-fresh-blueberry-background-texture-blueberry.jpg');"
    ></div>

    <div class="absolute inset-0 backdrop-blur-sm"></div>

    <div class="relative z-10 flex flex-col h-full w-full px-8 py-10 flex-1">
      <div class="text-white text-left mt-11">
        <h1 class="text-5xl font-bold leading-tight">
          Just take<br>photo to<br>analyze food
        </h1>
      </div>

      <div class="flex-grow"></div>

      <div class="w-full mb-14 flex justify-center">
        <button @click="signInWithGoogle"
                class="flex items-center justify-center w-full py-3 px-4 bg-white rounded-full text-gray-700 font-medium shadow-lg hover:shadow-xl transition duration-300"
        >
          <svg class="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const signInWithGoogle = () => {
  window.location.href = import.meta.env.VITE_API_URL + '/auth/google'
}
</script>