<template>
  <div @click.prevent="toQuestionDetailPage(QuestionData._id)" style="cursor:pointer;">
    <b-row align-v="center" no-gutters class="p-3 border-bottom border-top">
      <b-col md="1">
        <p class="text-center m-1 p-1">
          {{ QuestionData.upvotes.length }}
          <br />votes
        </p>
      </b-col>
      <b-col md="1">
        <p class="text-center m-1 p-1">
          {{ QuestionData.answers.length }}
          <br />answers
        </p>
      </b-col>
      <b-col md="9" class="font-weight-bold text-break pl-4">
        <p class="mb-1">{{ QuestionData.title }}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: ['QuestionData'],
  methods: {
    toQuestionDetailPage (questionId) {
      // this.$router.push('/main/question-details', QuestionData)
      this.$store.dispatch('getQuestionDetails', questionId)
    }
  }
}
</script>

<style>
</style>
