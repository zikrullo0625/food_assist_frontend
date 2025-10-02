<template>
  <div class="flex flex-col items-center justify-center h-screen relative bg-[#4f5bf7]">
    <!-- Loading State (for upload) -->
    <div v-if="appState === 'uploading'" class="absolute inset-0 flex flex-col justify-center items-center z-50">
      <h1 class="text-white text-center mb-4">
        Analyzing product...
      </h1>
      <iframe
          src="https://lottie.host/embed/5972ac57-f6a1-4922-8680-234cd48e18f4/FCtj66fNnk.lottie"
          style="width: 250px; height: 250px;">
      </iframe>
    </div>

    <!-- Idle (placeholder) -->
    <div v-if="appState === 'idle'" class="relative w-screen h-screen flex items-center justify-center">
      <button
          @click="takePicture"
          class="bg-white text-[#4f5bf7] font-semibold py-2 px-4 rounded-xl shadow-md hover:scale-105 transition">
        Upload or Capture Photo
      </button>
      <!-- скрытый input -->
      <input
          ref="fileInput"
          type="file"
          accept="image/*"
          capture="environment"
          class="hidden"
          @change="onFileSelected"
      />
    </div>

    <!-- Error -->
    <div v-if="appState === 'error'"
         class="absolute inset-0 flex flex-col justify-center items-center bg-[#4f5bf7] text-white text-center z-50">
      <button
          @click="goBack"
          class="absolute top-4 left-4 text-white text-3xl focus:outline-none hover:scale-110 transition-transform duration-200">
        <i class="fa fa-arrow-left"></i>
      </button>
      <img src="../assets/yellow-duck.gif" alt="Error GIF" class="w-64 h-64 mb-4" />
      <p class="mb-4 text-lg font-medium">{{ errorMessage }}</p>
      <button
          @click="takePicture"
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200">
        Try again
      </button>
    </div>

    <!-- Out of scans -->
    <OutOfScansPromotions
        v-if="appState === 'outOfScans'"
        @scansAcquired="onScansAcquired"
        @goBackTriggered="goBack"
    />
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";
import OutOfScansPromotions from './OutOfScansPromotions.vue';

export default {
  name: 'CameraCapture',
  components: { OutOfScansPromotions },
  data() {
    return {
      appState: 'idle', // 'idle', 'uploading', 'error', 'outOfScans'
      errorMessage: '',
    };
  },
  methods: {
    goBack() {
      router.push('/');
    },

    async onScansAcquired() {
      this.appState = 'idle';
    },

    takePicture() {
      // триггерим скрытый input
      this.$refs.fileInput.click();
    },

    async onFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;

      console.log("Selected file:", file);

      if (!file || file.size === 0) {
        this.appState = 'error';
        this.errorMessage = 'Файл пуст или отсутствует';
        return;
      }

      await this.sendPhotoToServer(file);
    },

    async sendPhotoToServer(file) {
      this.appState = 'uploading';
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/analyze', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log('Upload progress:', percent + '%');
            }
          }
        });

        console.log('Server response:', response.data);

        if (response.data?.success === true) {
          localStorage.setItem('analysisResult', JSON.stringify(response.data.result));
          this.$router.push({ name: 'result' });
        } else if (response.data?.scans === false) {
          this.appState = 'outOfScans';
        } else {
          this.appState = 'error';
          this.errorMessage = response.data.message || 'Произошла ошибка при анализе';
        }
      } catch (error) {
        this.handleApiError(error, 'Ошибка при отправке фото на сервер');
      }
    },

    handleApiError(error, defaultMessage) {
      console.error(defaultMessage, error);
      this.appState = 'error';
      if (error.response) {
        this.errorMessage = `Ошибка сервера: ${error.response.status} ${error.response.data?.message || ''}`;
      } else if (error.request) {
        this.errorMessage = `Нет ответа от сервера: ${defaultMessage}. Проверьте ваше интернет-соединение.`;
      } else {
        this.errorMessage = `Ошибка сети: ${error.message || 'Не удалось соединиться с сервером'}`;
      }
    }
  },
};
</script>
