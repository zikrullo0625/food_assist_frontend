<template>
  <div class="bg-[#3846e0] min-h-screen pb-16">
    <div class="px-4 py-6">
      <h1 class="text-2xl font-bold text-white mb-4">Статистика</h1>

      <!-- Последние 7 дней -->
      <div class="bg-white rounded-xl shadow-md p-4 mb-4">
        <h2 class="text-lg font-medium mb-3">Последние 7 дней</h2>
        <div class="flex items-end space-x-2 h-40 mb-2">
          <div
              v-for="(stat, index) in dailyStats"
              :key="index"
              class="flex-1 flex flex-col items-center"
          >
            <div class="relative w-full h-full flex flex-col justify-end">
              <!-- Стек колонок (полезные снизу, вредные сверху) -->
              <div class="w-full flex flex-col justify-end h-full">
                <!-- Полезные продукты (зеленый) -->
                <div
                    v-if="stat.useful > 0"
                    class="bg-green-500 w-full rounded-t-sm"
                    :style="{ height: getBarHeight(stat.useful) }"
                ></div>

                <!-- Вредные продукты (красный) -->
                <div
                    v-if="stat.harmful > 0"
                    class="bg-red-500 w-full rounded-t-sm"
                    :style="{ height: getBarHeight(stat.harmful) }"
                ></div>

                <!-- Пустой столбец с нижней границей если нет данных -->
                <div
                    v-if="!stat.hasData"
                    class="border-b-2 border-gray-300 w-full h-1"
                ></div>
              </div>
            </div>
            <span class="text-xs mt-1">{{ stat.day }}</span>
          </div>
        </div>
        <div class="flex justify-between text-sm text-gray-500 mt-2">
          <span>Полезных: {{ usefulPercent }}%</span>
          <span>Вредных: {{ harmfulPercent }}%</span>
        </div>
      </div>

      <!-- Общая сводка -->
      <div class="bg-white rounded-xl shadow-md p-4">
        <h2 class="text-lg font-medium mb-3">Общая сводка</h2>
        <div class="space-y-4">
          <!-- Полезные -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Полезные продукты</span>
              <span class="text-sm font-medium">{{ usefulPercent }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                  class="bg-green-500 h-2 rounded-full"
                  :style="{ width: usefulPercent + '%' }"
              ></div>
            </div>
          </div>

          <!-- Вредные -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Вредные продукты</span>
              <span class="text-sm font-medium">{{ harmfulPercent }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                  class="bg-red-500 h-2 rounded-full"
                  :style="{ width: harmfulPercent + '%' }"
              ></div>
            </div>
          </div>

          <!-- Цифровая сводка -->
          <div class="pt-2">
            <div class="flex justify-between text-sm">
              <div>
                <div class="font-bold text-xl">{{ totalChecked }}</div>
                <div class="text-gray-500">Всего проверено</div>
              </div>
              <div>
                <div class="font-bold text-xl text-green-500">{{ usefulCount }}</div>
                <div class="text-gray-500">Полезных</div>
              </div>
              <div>
                <div class="font-bold text-xl text-red-500">{{ harmfulCount }}</div>
                <div class="text-gray-500">Вредных</div>
              </div>
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
  name: 'StatisticsView',
  data() {
    return {
      dailyStats: [], // [{ day: 'Пн', useful: 0, harmful: 0, hasData: false }, ...]
      usefulPercent: 0,
      harmfulPercent: 0,
      totalChecked: 0,
      usefulCount: 0,
      harmfulCount: 0,
      loading: true,  // Add loading state
    };
  },
  methods: {
    // Function to calculate the height of the bar based on the value
    getBarHeight(value) {
      const minHeight = 20;
      return Math.max(minHeight, value * 10) + 'px';
    },

    // Function to set default values if there's an error fetching the data
    initializeDefaultData() {
      const daysOrder = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      this.dailyStats = daysOrder.map(day => ({
        day,
        useful: 0,
        harmful: 0,
        hasData: false
      }));
      this.usefulPercent = 0;
      this.harmfulPercent = 0;
      this.totalChecked = 0;
      this.usefulCount = 0;
      this.harmfulCount = 0;
    }
  },
  async created() {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/stats');
      const stats = res.data;

      const daysOrder = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      const byDay = stats.last_7_days.by_day;

      // Map the data into a suitable format for your chart
      this.dailyStats = daysOrder.map(day => {
        const useful = byDay[day]?.useful || 0;
        const harmful = byDay[day]?.harmful || 0;
        const hasData = useful > 0 || harmful > 0;

        return {
          day,
          useful,
          harmful,
          hasData
        };
      });

      this.usefulPercent = stats.last_7_days.summary.useful_percent;
      this.harmfulPercent = stats.last_7_days.summary.harmful_percent;
      this.totalChecked = stats.global_summary.total_checked;
      this.usefulCount = stats.global_summary.useful_count;
      this.harmfulCount = stats.global_summary.harmful_count;
    } catch (e) {
      console.error('Ошибка при загрузке статистики', e);
      this.initializeDefaultData();
    } finally {
      this.loading = false;  // Set loading to false when data is fetched or error occurs
    }
  },
};
</script>
