<template>
  <div class="absolute inset-0 flex flex-col justify-center items-center bg-[#4f5bf7] text-white text-center z-50 p-4">
    <button
        @click="triggerGoBack"
        class="absolute top-6 left-6 text-white text-3xl focus:outline-none hover:scale-110 transition-transform duration-200 z-10">
      ←
    </button>

    <div class="relative w-full max-w-md py-8 px-6 rounded-2xl bg-[#3846e0] shadow-lg">
      <div class="mb-6 text-5xl">🔍</div>
      <h2 class="text-2xl font-bold mb-2">У вас закончились сканы</h2>

      <p v-if="internalState === 'error'" class="text-red-300 mb-4 text-sm px-2">{{ errorMessage }}</p>

      <div v-if="internalState === 'loadingAd' || internalState === 'loadingPurchase'" class="my-4">
        <p class="text-lg">
          {{ internalState === 'loadingAd' ? 'Загрузка рекламы...' : 'Обработка покупки...' }}
        </p>
        <div class="flex justify-center items-center mt-4">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>

      <p v-else-if="internalState !== 'error'" class="mb-6 text-lg opacity-90 px-2">
        Вы можете посмотреть рекламу или приобрести дополнительные сканы.
      </p>

      <div v-if="internalState !== 'loadingAd' && internalState !== 'loadingPurchase'" class="flex flex-col gap-4 justify-center px-2 mt-4">
        <button
            @click="watchAd"
            :disabled="isActionInProgress"
            class="bg-red-700 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
            :class="{'opacity-60 cursor-not-allowed': isActionInProgress}">
          ▶️ Смотреть рекламу
        </button>
        <button
            @click="buyScans"
            :disabled="isActionInProgress"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
            :class="{'opacity-60 cursor-not-allowed': isActionInProgress}">
          💰 Купить сканы
        </button>
        <div class="text-white font-bold text-lg mt-2">
          *Всего за 1.99$
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OutOfScansPromotions',
  emits: ['scansAcquired', 'goBackTriggered'],
  data() {
    return {
      internalState: 'idle',
      errorMessage: '',
      isActionInProgress: false,
    };
  },
  methods: {
    triggerGoBack() {
      this.$emit('goBackTriggered');
    },

    async watchAd() {
      this.errorMessage = '';
      this.internalState = 'loadingAd';
      this.isActionInProgress = true;

      // Имитация рекламы на вебе (2 секунды)
      setTimeout(async () => {
        try {
          await this.handleRewardBackendCall();
          this.internalState = 'idle';
        } catch (error) {
          this.internalState = 'error';
          this.errorMessage = 'Ошибка при получении награды.';
        } finally {
          this.isActionInProgress = false;
        }
      }, 2000);
    },

    async buyScans() {
      this.internalState = 'loadingPurchase';
      this.errorMessage = '';
      this.isActionInProgress = true;

      // Имитация покупки
      setTimeout(async () => {
        try {
          // Пример запроса к серверу
          const response = await axios.post(import.meta.env.VITE_API_URL + '/getScans', { scans: 5 });
          if (response.data.success) {
            this.$emit('scansAcquired');
          } else {
            this.internalState = 'error';
            this.errorMessage = response.data.message || 'Ошибка при покупке сканов';
          }
        } catch (error) {
          this.internalState = 'error';
          this.errorMessage = error.response?.data?.message || error.message || 'Ошибка сети при покупке сканов.';
        } finally {
          this.isActionInProgress = false;
        }
      }, 1000);
    },

    async handleRewardBackendCall() {
      // Имитация выдачи 1 скана после "рекламы"
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/getScans', { scans: 1 });
        if (response.data.success) {
          this.$emit('scansAcquired');
        } else {
          throw new Error(response.data.message || 'Ошибка при получении скана после рекламы');
        }
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
