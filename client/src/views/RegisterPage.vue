<template>
  <div class="container">
    <div style="display:flex; align-items:center; height:100vh;">
      <div style="width:50%;">
        <RegisterPageInfo></RegisterPageInfo>
      </div>
      <div style="width:50%;">
        <img src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a" style="width: 60px; height: 60px;">
        <RegisterForm></RegisterForm>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
import RegisterPageInfo from '../components/RegisterPageInfo'

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm,
    RegisterPageInfo
  }
}
</script>

<style>
</style>
