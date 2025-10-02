<template>
  <div class="container">
    <h1 class="profile-name">FoodAssist</h1>

    <div class="content">
      <img @click="goHome()" src="@/assets/example.jpg" alt="Example of a product" class="example-img" />

      <div class="instruction">
        <h1>How it works?</h1>
        <p>Take a photo of the product's ingredients to find out if it's healthy.</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    goHome() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.profile-name{
  color: white;
}
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #4f5bf7; /* Темный фон приложения */
  padding: 20px;
}

.content {
  text-align: center;
  color: white;
  flex-grow: 1; /* Заполняем оставшееся пространство */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -80px; /* Отступ сверху */
  opacity: 0; /* Начальная прозрачность */
  transform: translateY(50px); /* Начальная позиция */
  animation: fadeInUp 1s forwards; /* Анимация */
  position: relative; /* Устанавливаем позицию, чтобы работать с z-index */
  z-index: 1; /* Убедимся, что контент не перекрывает элементы под ним */
}

.example-img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.instruction {
  margin-top: 20px;
}

.instruction h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.instruction p {
  font-size: 1.4rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

