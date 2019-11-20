<template>
  <div class="login-page" style="margin-top: 150px">
    <img src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a" style="width: 60px; height: 60px;">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
}
</script>

<style scoped>
.login-page {
  background-image: url("https://cdn.sstatic.net/img/home/illo-hero-full.svg?v=e2018a5f9272");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
