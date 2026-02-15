<template>
  <div class="bg-indigo-600 min-h-screen pb-16">
    <div class="container mx-auto px-4 py-6 max-w-lg">
      <div class="flex flex-row items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">Settings</h1>

        <div
            class="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md"
        >
          <span class="text-base">🎯</span>
          <span class="text-sm font-semibold text-white">
            {{ userScans }} сканов
          </span>
        </div>
      </div>

      <!-- Premium Block -->
      <div
          class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 mb-6 shadow-lg relative overflow-hidden"
      >
        <div
            class="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full bg-yellow-300 opacity-20"
        ></div>
        <div
            class="absolute bottom-0 left-0 w-16 h-16 -mb-6 -ml-6 rounded-full bg-purple-300 opacity-20"
        ></div>

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

      <!-- Allergies Block -->
      <div class="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Мои аллергии</h2>
        
        <div class="flex flex-col sm:flex-row gap-2 mb-4">
          <input 
            v-model="newAllergy" 
            @keyup.enter="addAllergy"
            type="text" 
            placeholder="Например: Арахис" 
            class="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
          >
          <button 
            @click="addAllergy"
            class="bg-indigo-600 active:bg-indigo-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md whitespace-nowrap"
          >
            Добавить
          </button>
        </div>

        <div v-if="allergies.length > 0" class="flex flex-wrap gap-2">
          <div 
            v-for="allergy in allergies" 
            :key="allergy"
            class="group bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 border border-red-100 transition-all duration-200 shadow-sm"
          >
            <span>{{ allergy }}</span>
            <button 
              @click="removeAllergy(allergy)"
              class="text-red-400 hover:text-red-600 focus:outline-none p-0.5 rounded-full hover:bg-red-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div v-else class="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <span class="text-4xl block mb-2">🥬</span>
          <p class="text-gray-500 text-sm">
            Список аллергий пуст
          </p>
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
          <div v-if="index === 2" class="mb-2">
            <span
                class="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full"
            >
              ⭐ Top
            </span>
          </div>

          <div class="flex flex-col items-center">
            <div
                class="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-2"
            >
              <span class="text-xl font-bold text-white">{{ pack.amount }}</span>
            </div>
            <p class="text-sm text-gray-600 mb-1">сканов</p>
            <p class="text-base font-bold text-indigo-800 mb-3">
              {{ pack.price }}
            </p>
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
          <button class="text-red-500 font-medium" @click="logout">
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import user from "@/composables/user";

export default {
  name: "SettingsPage",
  data() {
    return {
      userScans: 0,
      newAllergy: "",
      allergies: [],
      scanPacks: [
        { amount: 10, price: "0.99$", color: "bg-indigo-50", id: "scans_10" },
        { amount: 50, price: "3.99$", color: "bg-indigo-50", id: "scans_50" },
        { amount: 100, price: "9.99$", color: "bg-indigo-50", id: "scans_100" },
      ],
    };
  },
  methods: {
    buyPack(amount) {
      const product = this.scanPacks.find((p) => p.amount === amount);
      if (window.store && product) {
        window.store.order(product.id);
      } else {
        alert("Store не инициализирован или товар не найден");
      }
    },
    logout() {
      this.$router.push("/logout");
    },
    async loadAllergies() {
      this.allergies = [...await user.getAllergies()];
    },
    async addAllergy() {
      if (!this.newAllergy.trim()) return;

      const allergy = this.newAllergy.trim();
      await user.addAllergy(allergy);
      // Force reactivity by creating a new array reference
      this.allergies = [...await user.getAllergies()];
      this.newAllergy = "";
    },
    async removeAllergy(allergy) {
      await user.removeAllergy(allergy);
      // Force reactivity by creating a new array reference
      this.allergies = [...await user.getAllergies()];
    },
  },
  mounted() {
    this.loadAllergies();

    axios
        .get(import.meta.env.VITE_API_URL + "/auth/user")
        .then((res) => {
          this.userScans = res.data.scans;
        })
        .catch((err) => {
          console.error("Ошибка при получении сканов", err);
        });

    if (!window.store) {
      console.warn("cordova-plugin-purchase не найден");
      return;
    }

    const store = window.store;
    store.verbosity = store.DEBUG;

    this.scanPacks.forEach((pack) => {
      store.register({
        id: pack.id,
        type: store.CONSUMABLE,
      });
    });

    store.when("product").approved((product) => {
      product.finish();
      alert(`Покупка завершена: ${product.id}`);
      // тут можно отправить событие на сервер
    });

    store.error((err) => {
      console.error("Ошибка оплаты", err);
      alert(`Ошибка оплаты: ${err.message}`);
    });

    store.ready(() => {
      console.log("Store готов");
    });

    store.refresh();
  },
};
</script>
