<template>
  <div>
      <pre>{{ $store.state.questionGonnaBeUpdated }}</pre>
    <div class="container" style="margin-top: 30px;">
      <div class="row">
        <div class="col-lg-4" style="text-align: left;">
          <h2>Your question needs editing?</h2>
        </div>
        <div class="col-lg-8">
          <img
            src="https://cdn.sstatic.net/img/ask/background.svg?v=2e9a8205b368"
            alt="question-page-image"
          />
        </div>
      </div>
    </div>
    <div
      class="container"
      style="display: flex; justify-content:center; align-items:center; height:70vh;"
    >
      <div style="box-shadow: 2px 2px 10px gray; padding: 10px; text-align: left; width: 70%">
        <form @submit.prevent="updateQuestion($store.state.questionGonnaBeUpdated._id)">
          <div class="form-group">
            <label for="title">Title</label>
            <br />
            <small>Be specific and imagine you’re asking a question to another person</small>
            <input v-model="title" class="form-control" />
          </div>
          <div class="form-group">
            <label for="desc">Description</label>
            <br />
            <small>Include all the information someone would need to answer your question</small>
            <quill v-model="desc" :config="config" output="html" style="heigth: 100px;"></quill>
          </div>
          <b-button type="submit" variant="warning">Update your question</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from 'axios'
import Swal from 'sweetalert2'
Vue.use(VueQuill)

export default {
  name: 'UpdateQuestionForm',
  data () {
    return {
      title: '',
      desc: '',
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
    updateQuestion (id) {
      axios({
        url: `http://localhost:3000/questions/${id}`,
        method: 'PUT',
        data: {
          title: this.title,
          desc: this.desc
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Question updated!',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/main/user-homepage')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    }
  },
  created () {
    let questionId = this.$route.params.id
    this.$store.dispatch('fetchDataUpdateQuestion', questionId)
      .then(data => {
        this.title = data.title
        this.desc = data.desc
      })
      .catch(err => {
        console.log(err)
        Swal.fire('Errors', `Oops something went wrong`, `error`)
      })
    this.desc = this.$store.state.questionGonnaBeUpdated.desc
  }
}
</script>

<style>
</style>
