<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12" style="text-align: left;">
          <h3>{{ this.$store.state.question.title }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <div style="cursor: pointer;" @click.prevent="upvoteAQuestion($store.state.question._id)">
            <i class="fas fa-chevron-up"></i>
          </div>
          <br />
          <h4>{{ this.$store.state.question.upvotes.length - this.$store.state.question.downvotes.length }}</h4>
          <br />
          <div
            style="cursor: pointer;"
            @click.prevent="downvoteAQuestion($store.state.question._id)">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
        <div class="col-md-10" style="text-align: left;">
          <p>{{ this.$store.state.question.desc }}</p>
        </div>
      </div>
    </div>
    <hr />
    <h5 style="text-align: left;">{{ this.$store.state.question.answers.length }} Answer(s)</h5>
    <br />
    <br />
    <div>
      <div class="container-fluid">
        <div class="row" v-for="answer in this.$store.state.question.answers" :key="answer._id">
          <div class="col-md-2">
            <div style="cursor: pointer;" @click.prevent="upvoteAnAnswer(answer._id)">
              <i class="fas fa-chevron-up"></i>
            </div>
            <br />
            <h4>{{ answer.upvotes.length - answer.downvotes.length }}</h4>
            <br />
            <div style="cursor: pointer;" @click.prevent="downvoteAnAnswer(answer._id)">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
          <div class="col-md-10" style="text-align: left;">
            <p>{{ answer.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <div class="container" style="margin-top: 30px;">
        <div class="row">
          <div class="col-lg-4" style="text-align: left;">
            <h3>Your Answer</h3>
          </div>
          <div style="box-shadow: 2px 2px 10px gray; padding: 20px; text-align: left; width: 100%">
            <form @submit.prevent="postAnswer($store.state.question._id)">
              <div class="form-group">
                <br />
                <quill v-model="answerDesc" :config="config" output="html" style="heigth: 60px;"></quill>
              </div>
              <b-button type="submit" variant="warning">Post your answer</b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Vue from 'vue'
import VueQuill from 'vue-quill'
Vue.use(VueQuill)

export default {
  name: 'QuestionDetailsCard',
  data () {
    return {
      answerDesc: '',
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ['clean'] // remove formatting button
          ]
        },
        placeholder: 'Description here'
      }
    }
  },
  methods: {
    postAnswer (questionId) {
      axios({
        url: `http://localhost:3000/answers/`,
        method: 'POST',
        data: {
          desc: this.answerDesc,
          question_id: questionId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.answerDesc = ''
          Swal.fire({
            icon: 'success',
            title: 'Posted an answer!',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('getQuestionDetails', this.$route.params.id)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    },
    upvoteAQuestion (id) {
      axios({
        url: `http://localhost:3000/questions/upvote/${id}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Upvoted!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    },
    downvoteAQuestion (id) {
      axios({
        url: `http://localhost:3000/questions/downvote/${id}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Downvoted!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    },
    upvoteAnAnswer (id) {
      axios({
        url: `http://localhost:3000/answers/upvote/${id}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Upvoted!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    },
    downvoteAnAnswer (id) {
      axios({
        url: `http://localhost:3000/answers/downvote/${id}`,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Downvoted!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    }
  },
  created () {
    this.$store.dispatch('getQuestionDetails', this.$route.params.id)
  }
}
</script>

<style>
</style>
