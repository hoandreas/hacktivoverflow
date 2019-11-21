<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="warning">
      <b-navbar-brand @click.prevent="goToHome" style="cursor: pointer;"> <i class="fab fa-stack-overflow"></i> Sheaf Deluge </b-navbar-brand>
      <b-button v-if="this.$store.state.isLogin" @click.prevent="goToUserHomePage" variant="outline-primary" size="sm" class="my-2 my-sm-0" type="submit">My Page</b-button>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div>
          <b-button v-if="!this.$store.state.isLogin" @click.prevent="goToLoginPage" variant="outline-info" size="sm" class="my-2 my-sm-0" type="submit">Login</b-button>
          &nbsp;
          <b-button v-if="!this.$store.state.isLogin" @click.prevent="goToRegisterPage" variant="primary" size="sm" class="my-2 my-sm-0" type="submit">Sign up</b-button>
          <b-button v-if="this.$store.state.isLogin" @click.prevent="logout" size="sm" class="my-2 my-sm-0" type="submit">Logout</b-button>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Navbar',
  methods: {
    goToLoginPage () {
      this.$router.push('/login')
    },
    goToRegisterPage () {
      this.$router.push('/register')
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.$store.commit('setLogin', false)
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push('/')
    },
    goToHome () {
      this.$router.push('/')
    },
    goToUserHomePage () {
      this.$router.push('/main/user-homepage')
    }
  }
}
</script>

<style>
</style>
