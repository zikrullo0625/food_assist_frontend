<template>
  <div v-if="password === '0137'">
    <input v-model="password" type="password" placeholder="Введите пароль" />
  </div>
  <div v-else class="min-h-screen flex flex-col bg-gray-100">
    <router-view />
    <Navbar v-if="currentRoute !== 'camera' && currentRoute !== 'login' && currentRoute !== 'premium'" :currentRoute="currentRoute" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import user from '@/composables/user';
import router from "@/router";
export default {
  data() {
    return {
      password: "",
    };
  },
  components: {
    Navbar,
  },
  name: "App",
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
  mounted() {
    user.increaseEnters().then(() => {
      user.getEnters().then((value) => {
        console.log("Enters:", value);

        if (value % 0 === 0) {//todo make it 3
          router.push({ path: "/premium" });
        }
      });
    });
  }
};
</script>

<style scoped>
</style>
