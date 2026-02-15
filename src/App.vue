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
      debug: true,
      password: "",
      debugOpen: false,
      debugLogs: []
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
    // Test debug console
    console.log("=== APP MOUNTED ===");
    console.log("Window Capacitor:", !!window.Capacitor);
    console.log("Is native platform:", window.Capacitor?.isNativePlatform?.());
    
    // Override console.log to capture in debug console
    this.setupDebugConsole();
    
    user.increaseEnters().then(() => {
      user.getEnters().then((value) => {
        console.log("Enters:", value);

        if (value % 0 === 0) {//todo make it 3
          router.push({ path: "/premium" });
        }
      });
    });
  },
  methods: {
    setupDebugConsole() {
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      const addLog = (type, ...args) => {
        const text = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        
        this.debugLogs.push({
          type,
          time: new Date().toLocaleTimeString(),
          text
        });
        
        // Keep only last 50 logs
        if (this.debugLogs.length > 50) {
          this.debugLogs = this.debugLogs.slice(-50);
        }
        
        // Call original console
        originalLog.apply(console, args);
      };
      
      console.log = (...args) => addLog('log', ...args);
      console.error = (...args) => addLog('error', ...args);
      console.warn = (...args) => addLog('warn', ...args);
    },
    
    toggleDebugConsole() {
      this.debugOpen = !this.debugOpen;
      if (this.debugOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    
    clearDebugConsole() {
      this.debugLogs = [];
    },
    
    scrollToBottom() {
      if (this.$refs.debugContent) {
        this.$refs.debugContent.scrollTop = this.$refs.debugContent.scrollHeight;
      }
    }
  },
  watch: {
    debugLogs() {
      if (this.debugOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    }
  }
};
</script>

<style scoped>
.debug-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #333;
  color: white;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.debug-button:hover {
  background: #555;
  transform: scale(1.1);
}

.debug-button.debug-open {
  background: #f44336;
  bottom: auto;
  top: 60px;
  right: 20px;
}

.debug-console {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 350px;
  height: 400px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #444;
  border-radius: 8px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}

.debug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #222;
  border-bottom: 1px solid #444;
  border-radius: 8px 8px 0 0;
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.clear-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.clear-btn:hover {
  background: #d32f2f;
}

.debug-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  line-height: 1.4;
}

.debug-log {
  margin-bottom: 4px;
  word-break: break-all;
}

.debug-log.log {
  color: #fff;
}

.debug-log.error {
  color: #ff6b6b;
}

.debug-log.warn {
  color: #ffd93d;
}

.debug-time {
  color: #888;
  margin-right: 8px;
}

.debug-text {
  color: inherit;
}

@media (max-width: 768px) {
  .debug-console {
    width: 90%;
    right: 5%;
    height: 300px;
  }
  
  .debug-button {
    bottom: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
  }
  
  .debug-button.debug-open {
    top: 60px;
    right: 15px;
  }
}
</style>
