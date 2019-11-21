<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Questions" active>
          <b-card-text>
            <div class="container-fluid" v-for="usersQuestion in this.$store.state.allUsersQuestions" :key="usersQuestion._id" style="border-bottom: 2px solid gray; padding: 15px; text-align: left;">
              <div class="row">
                <div class="col-md-12">
                  <h2>{{ usersQuestion.title }}</h2>
                  <p v-html="usersQuestion.desc"></p>
                  <div class="row">
                    <div class="col-md-2">
                      <button @click.prevent="setUpdateQuestion(usersQuestion._id)" type="button" class="btn btn-success">update</button>
                    </div>
                    <div class="col-md-8"></div>
                    <div class="col-md-2">
                      <button @click.prevent="deleteQuestion(usersQuestion._id)" type="button" class="btn btn-danger">delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Answers">
          <b-card-text>
              <div class="container-fluid" v-for="usersAnswer in this.$store.state.allUsersAnswers" :key="usersAnswer._id" style="border-bottom: 2px solid gray; padding: 15px; text-align: left;">
              <div class="row">
                <div class="col-md-12">
                  <p v-html="usersAnswer.desc"></p>
                  <div class="row">
                    <div class="col-md-2">
                      <button @click.prevent="setUpdateAnswer(usersAnswer._id)" type="button" class="btn btn-success">update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'UserHomePageContent',
  methods: {
    deleteQuestion (questionId) {
      axios({
        url: `http://localhost:3000/questions/${questionId}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Question deleted',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('getAllUsersQuestions')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    },
    setUpdateQuestion (questionId) {
      this.$store.dispatch('fetchDataUpdateQuestion', questionId)
    },
    setUpdateAnswer (answerId) {
      this.$store.dispatch('fetchDataUpdateAnswer', answerId)
    }
  }
}
</script>

<style>
</style>
