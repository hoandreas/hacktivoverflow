<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-header text-center">Sign up</div>
        <div class="card-body">
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="username">Username</label>
              <input v-model="username" type="text" class="form-control" id="username" />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model="password" type="password" class="form-control" id="password" />
            </div>
            <button type="submit" class="btn btn-primary">Sign up</button>
          </form>
        </div>
      </div>
      <div>
        <h4>
          Already have an account ?
          <a href="" @click.prevent="toLogin">Log in</a>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'RegisterForm',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    register () {
      axios({
        url: `http://localhost:3000/users/register`,
        method: 'POST',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.email = ''
          this.password = ''
          this.username = ''
          this.$store.commit('setLogin', true)
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('username', data.data.username)
          this.$router.push('/')
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Invalid input format`, `error`)
        })
    }
  }
}
</script>

<style>
</style>
