<script>
import user from '@/composables/user';

export default {
  name: 'Logout',
  async mounted() {
    await user.logout();  // Выполни logout
    window.location.href = '/login' // Перенаправь на страницу входа
  }
}
</script>