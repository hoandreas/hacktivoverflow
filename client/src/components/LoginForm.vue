<template>
  <div style="align-items: center; display:flex; justify-content:center; align-items:baseline;">
    <div style="width:30%;">
      <div class="card mb-4">
        <div class="card-header text-center">Login</div>
        <div class="card-body">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model="password" type="password" class="form-control" id="password" />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%">Log in</button>
          </form>
        </div>
      </div>
      <div>
        <h4>
          Don't have an account ?
          <br>
          <a href="" @click.prevent="toRegister()">Sign up</a>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    toRegister () {
      this.$router.push('/register')
    },
    login () {
      axios({
        url: `http://localhost:3000/users/login`,
        method: 'POST',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.email = ''
          this.password = ''
          this.$store.commit('setLogin', true)
          localStorage.setItem('token', data.token)
          this.$router.push('/')
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Wrong email or password`, `error`)
        })
    }
  }
}
</script>

<style>
</style>
