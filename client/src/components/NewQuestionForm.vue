<template>
<div>
    <div class="container" style="margin-top: 30px;">
        <div class="row">
            <div class="col-lg-4" style="text-align: left;">
                <h2> Ask a public question </h2>
            </div>
            <div class="col-lg-8">
                <img src="https://cdn.sstatic.net/img/ask/background.svg?v=2e9a8205b368" alt="question-page-image">
            </div>
        </div>
    </div>
  <div
    class="container"
    style="display: flex; justify-content:center; align-items:center; height:70vh;"
  >
    <div style="box-shadow: 2px 2px 10px gray; padding: 10px; text-align: left; width: 70%">
      <form @submit.prevent="postQuestion">
        <div class="form-group">
          <label for="title">Title</label>
          <br>
          <small>Be specific and imagine you’re asking a question to another person</small>
          <input v-model="title" class="form-control" />
        </div>
        <div class="form-group">
          <label for="desc">Description</label>
          <br>
          <small>Include all the information someone would need to answer your question</small>
          <quill v-model="desc" :config="config" output="html" style="heigth: 100px;"></quill>
        </div>
        <b-button type="submit" variant="warning">Post your question</b-button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from '../apis/axios'
import Swal from 'sweetalert2'
Vue.use(VueQuill)

export default {
  name: 'NewQuestionForm',
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
    postQuestion () {
      axios({
        url: `/questions`,
        method: 'POST',
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
            title: 'Question posted!',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/main/question-list')
        })
        .catch(err => {
          console.log(err)
          if (!localStorage.getItem('token')) {
            Swal.fire('Errors', `You need to login first`, `error`)
            this.$router.push('/login')
          } else {
            Swal.fire('Blank field detected', `Please input your question and your question's description.`, `error`)
          }
        })
    }
  }
}
</script>

<style>
.ql-editor {
  height: 300px;
}
</style>
