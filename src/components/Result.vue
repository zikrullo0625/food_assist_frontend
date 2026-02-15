<template>
  <div class="min-h-screen bg-[#3846e0] flex flex-col p-4 pb-20">
    <div class="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-6">
      <!-- Заголовок -->
      <h2 class="text-3xl font-bold text-white text-center animate-fadeIn">Product analyze</h2>

      <!-- Изображение продукта -->
      <div class="w-full bg-white rounded-2xl shadow-md overflow-hidden animate-fadeInUp">
        <img
            :src="productImage"
            alt="Изображение продукта"
            class="w-full h-64 object-cover"
            @error="handleImageError"
        />
      </div>

      <!-- Карточка с оценкой -->
      <div class="w-full bg-white rounded-2xl shadow-md p-5 animate-fadeInUp">
        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-700 font-medium">Product healthy:</span>
          <span class="text-lg font-bold" :class="scoreColorClass">{{ healthScore }}/100</span>
        </div>

        <!-- Прогресс-бар -->
        <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
              class="h-full transition-all duration-500"
              :style="{ width: `${healthScore}%` }"
              :class="scoreBackgroundClass"
          ></div>
        </div>

        <!-- Описание -->
        <p class="text-center text-sm italic mt-3 text-gray-600">{{ scoreDescription }}</p>
      </div>

      <!-- Карточки с concerns -->
      <div
          v-if="sortedConcerns && sortedConcerns.length"
          class="w-full space-y-3 animate-fadeInUp"
      >
        <h3 class="text-lg font-semibold text-white mb-2">Analysis:</h3>

        <div
            v-for="(concern, index) in sortedConcerns"
            :key="index"
            class="w-full rounded-xl p-4 flex items-start gap-3 shadow-md"
            :class="getConcernCardClass(concern.type)"
        >
          <!-- Иконка в зависимости от типа -->
          <component :is="getConcernIcon(concern.type)" class="shrink-0 mt-0.5" />

          <div class="flex-1">
            <span class="text-sm leading-snug block" :class="getConcernTextClass(concern.type)">
              {{ concern.content }}
            </span>
            <span class="text-xs mt-1 inline-block px-2 py-0.5 rounded-full" :class="getConcernBadgeClass(concern.type)">
              {{ getConcernLabel(concern.type) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Кнопка назад -->
      <button
          @click="goBack"
          class="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition duration-300 animate-fadeInUp"
      >
        Сделать еще фото
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resultData: null,
      imageError: false
    };
  },
  mounted() {
    const storedResult = localStorage.getItem('analysisResult');
    if (storedResult) {
      try {
        this.resultData = JSON.parse(storedResult);
      } catch (e) {
        console.error('Ошибка при разборе JSON:', e);
      }
    }
  },
  computed: {
    healthScore() {
      return this.resultData?.healthScore ?? 0;
    },
    productImage() {
      return this.resultData?.productImage ?? 'https://via.placeholder.com/300x200?text=Нет+изображения';
    },
    concerns() {
      return this.resultData?.concerns ?? [];
    },
    sortedConcerns() {
      const priority = {
        'allergen': 0,
        'harm': 1,
        'description': 2,
        'healthy': 3
      };
      
      return [...this.concerns].sort((a, b) => {
        const pA = priority[a.type] !== undefined ? priority[a.type] : 99;
        const pB = priority[b.type] !== undefined ? priority[b.type] : 99;
        return pA - pB;
      });
    },
    scoreColorClass() {
      const score = this.healthScore;
      if (score >= 75) return 'text-green-600';
      if (score >= 50) return 'text-yellow-600';
      return 'text-red-600';
    },
    scoreBackgroundClass() {
      const score = this.healthScore;
      if (score >= 75) return 'bg-green-500';
      if (score >= 50) return 'bg-yellow-500';
      return 'bg-red-500';
    },
    scoreDescription() {
      const score = this.healthScore;
      if (score >= 75) {
        return 'This product has high nutritional value and is recommended for consumption.';
      } else if (score >= 50) {
        return 'This product has moderate nutritional value. Consume in moderation.';
      } else {
        return 'This product has low nutritional value. It is recommended to limit its consumption.';
      }
    }
  },
  methods: {
    handleImageError() {
      this.imageError = true;
      this.resultData.productImage = 'https://via.placeholder.com/300x200?text=Ошибка+изображения';
    },
    goBack() {
      this.$router.push({ name: 'camera' });
    },
    getConcernCardClass(type) {
      const classes = {
        'harm': 'bg-red-50 border border-red-200',
        'allergen': 'bg-orange-50 border border-orange-200',
        'healthy': 'bg-green-50 border border-green-200',
        'description': 'bg-blue-50 border border-blue-200'
      };
      return classes[type] || 'bg-gray-50 border border-gray-200';
    },
    getConcernTextClass(type) {
      const classes = {
        'harm': 'text-gray-800',
        'allergen': 'text-gray-800',
        'healthy': 'text-gray-800',
        'description': 'text-gray-800'
      };
      return classes[type] || 'text-gray-800';
    },
    getConcernBadgeClass(type) {
      const classes = {
        'harm': 'bg-red-200 text-red-800',
        'allergen': 'bg-orange-200 text-orange-800',
        'healthy': 'bg-green-200 text-green-800',
        'description': 'bg-blue-200 text-blue-800'
      };
      return classes[type] || 'bg-gray-200 text-gray-800';
    },
    getConcernLabel(type) {
      const labels = {
        'harm': 'Harmful',
        'allergen': 'Allergen',
        'healthy': 'Benefit',
        'description': 'Info'
      };
      return labels[type] || 'Info';
    },
    getConcernIcon(type) {
      const icons = {
        'harm': {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          `
        },
        'allergen': {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          `
        },
        'healthy': {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          `
        },
        'description': {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          `
        }
      };
      return icons[type] || icons['description'];
    }
  }
};
</script>

<style scoped>
/* Custom animations for fadeIn and fadeInUp */
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}
.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>