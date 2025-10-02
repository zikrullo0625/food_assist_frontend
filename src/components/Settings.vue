<template>
  <div class="bg-indigo-600 min-h-screen pb-16">
    <div class="container mx-auto px-4 py-6 max-w-lg">
      <h1 class="text-2xl font-bold text-white mb-6">Settings</h1>

      <!-- Premium Block -->
      <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 mb-6 shadow-lg relative overflow-hidden">
        <div class="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full bg-yellow-300 opacity-20"></div>
        <div class="absolute bottom-0 left-0 w-16 h-16 -mb-6 -ml-6 rounded-full bg-purple-300 opacity-20"></div>

        <h2 class="text-xl font-bold text-white mb-2">Премиум доступ</h2>
        <ul class="text-sm text-white mb-4 space-y-1">
          <li class="flex items-start">
            <span class="mr-2 mt-1 text-yellow-300">•</span>
            <span>Безлимитные сканы</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 text-yellow-300">•</span>
            <span>Быстрый анализ</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 text-yellow-300">•</span>
            <span>Поддержка приоритетная</span>
          </li>
        </ul>

        <div class="flex items-center justify-between">
          <span class="text-lg font-bold text-white">19.90 $</span>
          <RouterLink
              to="/premium"
              class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-colors duration-200 text-decoration-none"
          >
            Оформить
          </RouterLink>
        </div>
      </div>
      <h1 class="text-2xl font-bold text-white mb-6 text-center">Packs</h1>

      <!-- Scan Packs -->
      <div class="grid grid-cols-2 gap-4 items-stretch mb-4">
        <div
            v-for="(pack, index) in scanPacks"
            :key="pack.amount"
            :class="[
      'h-full flex flex-col justify-between p-4 rounded-xl border border-indigo-100 shadow-md transition-transform duration-200 hover:scale-105',
      pack.color,
      index === 2 ? 'col-span-2' : ''
    ]"
        >
          <!-- Плашка "Top" -->
          <div v-if="index === 2" class="mb-2">
      <span class="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
        ⭐ Top
      </span>
          </div>

          <div class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-2">
              <span class="text-xl font-bold text-white">{{ pack.amount }}</span>
            </div>
            <p class="text-sm text-gray-600 mb-1">сканов</p>
            <p class="text-base font-bold text-indigo-800 mb-3">{{ pack.price }}</p>
          </div>

          <button
              class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg shadow-md w-full transition-colors duration-200 mt-auto"
              @click="buyPack(pack.amount)"
          >
            Купить
          </button>
        </div>
      </div>



      <!-- About & Logout -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-4">
          <h3 class="font-medium">О приложении</h3>
          <p class="text-sm text-gray-500 mt-1">Версия beta-3.0.0</p>
        </div>
        <div class="p-4 border-t border-gray-100">
          <button class="text-red-500 font-medium" @click="logout">Выйти из аккаунта</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const scanPacks = [
  { amount: 10, price: '0.99$', color: 'bg-indigo-50', id: 'scans_10' },
  { amount: 50, price: '3.99$', color: 'bg-indigo-50', id: 'scans_50' },
  { amount: 100, price: '9.99$', color: 'bg-indigo-50', id: 'scans_100' },
];

const buyPack = (amount) => {
  const product = scanPacks.find(p => p.amount === amount);
  if (window.store && product) {
    window.store.order(product.id);
  } else {
    alert('Store не инициализирован или товар не найден');
  }
};

const logout = () => {
  router.push('/logout');
};

// === Магазин ===
onMounted(() => {
  if (!window.store) {
    console.warn('cordova-plugin-purchase не найден');
    return;
  }

  const store = window.store;
  store.verbosity = store.DEBUG;

  // Регистрация продуктов
  scanPacks.forEach(pack => {
    store.register({
      id: pack.id,
      type: store.CONSUMABLE,
    });
  });

  store.when("product").approved(product => {
    product.finish();
    alert(`Покупка завершена: ${product.id}`);
    // тут можно отправить событие на сервер
  });

  store.error(err => {
    console.error("Ошибка оплаты", err);
    alert(`Ошибка оплаты: ${err.message}`);
  });

  store.ready(() => {
    console.log("Store готов");
  });

  store.refresh();
});
</script>
