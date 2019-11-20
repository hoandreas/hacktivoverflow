<template>
  <div>
        <div class="col" style="text-align: right;">
            <b-button @click.prevent="goToPostQuestionPage" variant="warning"> Ask a Question </b-button>
        </div>
      <QuestionDetailsCard></QuestionDetailsCard>
  </div>
</template>

<script>
import QuestionDetailsCard from '../components/QuestionDetailsCard'

export default {
  name: 'QuestionDetailsPage',
  components: {
    QuestionDetailsCard
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
