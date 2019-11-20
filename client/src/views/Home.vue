<template>
  <div class="home">
    <!-- <img src="../assets/stack-overflow-background.png" style="width: 100vw; margin-top: 1px;"> -->
    <div class="dive-in-button">
      <b-button @click.prevent="toMainPage" style="margin: 620px auto;" variant="dark"> Start Exploring </b-button>
    </div>
    <footer class="py-3 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Sheaf Deluge 2019 </p>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    toMainPage () {
      this.$router.push('/main/question-list')
    }
  }
}
</script>
<style scoped>
.dive-in-button {
  background-image: url("../assets/stack-overflow-background.png");
  height: 100vh;
  /* width: 100vw; */
  background-repeat: no-repeat;
  background-size: cover;
  /* background-size: contain; */

}
</style>
