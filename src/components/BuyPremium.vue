<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600">
    <div class="container mx-auto px-4 py-8 max-w-lg">
      <RouterLink to="/" class="flex items-center text-white mb-6 hover:text-yellow-300 transition-colors">
        <X v-if="backActive" class="w-5 h-5 transform rotate-90 mr-1" />
      </RouterLink>

      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
        <div class="flex justify-center mb-4">
          <div class="bg-yellow-400 rounded-full p-2 shadow-lg">
            <Award class="w-8 h-8 text-purple-900" />
          </div>
        </div>

        <h1 class="text-3xl font-bold text-center text-white mb-2">Премиум Доступ</h1>
        <p class="text-center text-white/80 mb-6">Разблокируйте все премиум функции</p>

        <div class="bg-white/20 rounded-xl p-4 mb-6">
          <h2 class="text-xl font-semibold text-white mb-4">Что включено</h2>
          <ul class="space-y-3 mb-4">
            <li class="flex items-center text-white" v-for="item in features" :key="item">
              <Star class="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-white">Стоимость подписки</span>
            <span class="text-2xl font-bold text-white">19.90 $ <span class="text-2xl opacity-70">/∞</span></span>
          </div>
        </div>

        <button
            class="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold py-3 rounded-xl shadow-lg transition-all"
            :disabled="isProcessing"
            @click="handlePurchase"
        >
          {{ isProcessing ? 'Обработка...' : 'Оформить Премиум' }}
        </button>
      </div>

      <p class="text-white/70 text-center text-sm">
        Оформляя подписку, вы соглашаетесь с нашими условиями использования и политикой конфиденциальности.
      </p>
    </div>
  </div>
</template>

<script>
import { X, Award, Star } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import axios from "axios";

export default {
  components: {
    X,
    Award,
    Star,
  },
  data() {
    return {
      isProcessing: false,
      features: [
        'Безлимитные сканы документов',
        'Навсегда',
        'Приоритетная быстрая обработка',
        'Ранний доступ к новым функциям',
      ],
      backActive: false,
    };
  },
  methods: {
    handlePurchase() {
      this.isProcessing = true;
      setTimeout(() => {
        this.isProcessing = false;
        axios.post(import.meta.env.VITE_API_URL + '/buyPremium');
        this.$router.push('/');
      }, 1500);
    },
    activateBackButton() {
      setTimeout(() => {
        this.backActive = true;
      }, 5000);
    }
  },
  mounted() {
    this.activateBackButton();
  }
};
</script>
