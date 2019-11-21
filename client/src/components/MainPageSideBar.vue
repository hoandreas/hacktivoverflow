<template>
  <div style="text-align:left;">
    <a href="" @click.prevent="goToHome"> Home </a>
  </div>
</template>

<script>
export default {
  name: 'MainPageSideBar',
  methods: {
    goToHome () {
      this.$router.push('/main/question-list')
    }
  }

}
</script>

<style>

</style>
