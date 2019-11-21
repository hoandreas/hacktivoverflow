<template>
  <div>
      <div class="container" style="margin-top: 30px;">
        <div class="row">
          <div class="col-lg-4" style="text-align: left;">
            <h3>Update Your Answer</h3>
          </div>
          <div style="box-shadow: 2px 2px 10px gray; padding: 20px; text-align: left; width: 100%">
            <form @submit.prevent="updateAnswer($store.state.answerGonnaBeUpdated._id)">
              <div class="form-group">
                <br />
                <quill v-model="answerDesc" :config="config" output="html" style="heigth: 60px;"></quill>
              </div>
              <b-button type="submit" variant="warning">Update your answer</b-button>
            </form>
          </div>
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
  name: 'UpdateAnswerForm',
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
        placeholder: this.answerDesc
      }
    }
  },
  methods: {
    updateAnswer (id) {
      axios({
        url: `http://localhost:3000/answers/${id}`,
        method: 'PUT',
        data: {
          desc: this.answerDesc
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
    let answerId = this.$route.params.id
    this.$store.dispatch('fetchDataUpdateAnswer', answerId)
      .then(data => {
        this.answerDesc = data.desc
      })
      .catch(err => {
        console.log(err)
        Swal.fire('Errors', `Oops something went wrong`, `error`)
      })
    this.answerDesc = this.$store.state.answerGonnaBeUpdated.desc
  }
}
</script>

<style>

</style>
