<template>
<div class="container" style="margin-top: 20px;">
    <div class="row">
        <div class="col-lg-2" style="border-right: 1px solid black; heiht: 100vh;">
            <MainPageSideBar></MainPageSideBar>
        </div>
        <div class="col-lg-10">
            <div class="row">
                <div class="col" style="text-align: left;">
                    <h2> Question List </h2>
                </div>
                <div class="col" style="text-align: right;">
                    <b-button @click.prevent="goToPostQuestionPage" variant="warning"> Ask a Question </b-button>
                </div>
            </div>
            <QuestionCard v-for="question in this.$store.state.questions" :key="question._id" :QuestionData="question"></QuestionCard>
        </div>
    </div>
</div>

</template>

<script>
import MainPageSideBar from '../components/MainPageSideBar'
import QuestionCard from '../components/QuestionCard'

export default {
  name: 'MainPage',
  props: ['QuestionData'],
  components: {
    MainPageSideBar,
    QuestionCard
  },
  methods: {
    goToPostQuestionPage () {
      this.$router.push('/postQuestion')
    }
  },
  created () {
    this.$store.dispatch('getAllQuestions')
  }

}
</script>

<style>

</style>
