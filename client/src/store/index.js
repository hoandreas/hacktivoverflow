import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: []
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
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
    }
  },
  modules: {
  }
})
