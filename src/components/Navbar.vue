<template>
  <div class="navbar-container">
    <mdui-navigation-bar
        label-visibility="unlabeled"
        :value="currentRoute"
        class="fixed bottom-0 left-0 right-0 z-50 mdui-shadow-6"
    >
      <mdui-navigation-bar-item
          value="home"
          @click="navigate('home')"
      >
        <mdui-icon-home slot="icon"></mdui-icon-home>
        Home
      </mdui-navigation-bar-item>

      <mdui-navigation-bar-item
          value="stats"
          @click="navigate('stats')"
      >
        <mdui-icon-insert-chart-outlined slot="icon"></mdui-icon-insert-chart-outlined>
        Stats
      </mdui-navigation-bar-item>

      <mdui-navigation-bar-item
          value="camera"
          style="visibility: hidden; pointer-events: none;"
      >
        <mdui-icon-camera slot="icon"></mdui-icon-camera>
      </mdui-navigation-bar-item>

      <mdui-navigation-bar-item
          value="history"
          @click="navigate('history')"
      >
        <mdui-icon-history slot="icon"></mdui-icon-history>
        History
      </mdui-navigation-bar-item>

      <mdui-navigation-bar-item
          value="settings"
          @click="navigate('settings')"
      >
        <mdui-icon-settings slot="icon"></mdui-icon-settings>
        Settings
      </mdui-navigation-bar-item>
    </mdui-navigation-bar>

    <mdui-fab
        class="center-fab"
        @click="navigate('camera')"
    >
      <mdui-icon-camera slot="icon"></mdui-icon-camera>
    </mdui-fab>
  </div>
</template>

<script>
import '@mdui/icons/home.js';
import '@mdui/icons/insert-chart-outlined.js';
import '@mdui/icons/camera.js';
import '@mdui/icons/history.js';
import '@mdui/icons/settings.js';

export default {
  name: 'Navbar',
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  },
  methods: {
    navigate(route) {
      this.$router.push({ name: route });
    }
  }
}
</script>

<style scoped>
.navbar-container {
  position: relative;
}

.mdui-navigation-bar {
  background-color: #ffffff;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.center-fab {
  position: fixed;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 51;
  border-radius: 30%;
}
</style>