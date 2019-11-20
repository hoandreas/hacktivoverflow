<template>
  <div>
    <div class="row">
      <div class="col" style="text-align: left;">
        <h2>Question List</h2>
      </div>
      <div class="col" style="text-align: right;">
        <b-button @click.prevent="goToPostQuestionPage" variant="warning">Ask a Question</b-button>
      </div>
    </div>
    <QuestionCard
      v-for="question in this.$store.state.questions"
      :key="question._id"
      :QuestionData="question"
    ></QuestionCard>
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard'

export default {
  name: 'QuestionListPage',
  props: ['QuestionData'],
  components: {
    QuestionCard
  },
  methods: {
    goToPostQuestionPage () {
      this.$router.push('/postQuestion')
    }
  }
}
</script>

<style>
</style>
