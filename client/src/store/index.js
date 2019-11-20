import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: ''
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    setQuestionData (state, payload) {
      console.log(payload)
      state.question = payload
    }
  },
  actions: {
    getAllQuestions ({ commit }) {
      axios({
        url: `http://localhost:3000/questions`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('setQuestions', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    },
    getQuestionDetails ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/questions/${payload}`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setQuestionData', data)
          router.push(`/main/question-details/${data._id}`)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Internal server error`, `error`)
        })
    }
  },
  modules: {
  }
})
