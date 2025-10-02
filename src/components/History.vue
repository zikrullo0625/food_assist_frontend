<template>
  <div class="bg-[#3846e0] min-h-screen pb-16">
    <div class="px-4 py-6">
      <h1 class="text-2xl font-bold text-white mb-4">История проверок</h1>

      <div class="space-y-4">
        <div v-for="(item, index) in historyItems" :key="index" class="bg-white rounded-lg shadow p-3 flex">
          <div class="h-16 w-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img :src="item.image" alt="Food Item" class="w-full h-full object-cover" />
          </div>

          <div class="ml-5 flex-1">
            <div class="flex items-center justify-between">
              <h3 class="font-medium">{{ item.name }}</h3>
              <div
                  :class="`ml-3 h-3 w-3 rounded-full ${item.health_status === 'Полезный продукт' ? 'bg-green-500' : 'bg-red-500'}`"
                  style="flex-shrink: 0;"
              ></div>

            </div>
            <p class="text-sm text-gray-500">{{ item.scanned_at }}</p>
            <div class="mt-1 text-xs" :class="item.health_status === 'Полезный продукт' ? 'text-green-600' : 'text-red-600'">
              {{ item.health_status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HistoryView',
  data() {
    return {
      historyItems: []
    }
  },
  mounted() {
    this.loadHistory();
  },
  methods: {
    async loadHistory() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/history');
        this.historyItems = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке истории:', error);
      }
    }
  }
}
</script>
