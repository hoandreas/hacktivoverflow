<template>
  <div>
    <h2> Welcome, {{ loggedUserUsername }} </h2>
      <UserHomePageContent></UserHomePageContent>
  </div>
</template>

<script>
import UserHomePageContent from '../components/UserHomePageContent'
export default {
  name: 'UserHomePage',
  components: {
    UserHomePageContent
  },
  data () {
    return {
      loggedUserUsername: localStorage.getItem('username')
    }
  },
  created () {
    this.$store.dispatch('getAllUsersQuestions')
    this.$store.dispatch('getAllUsersAnswers')
  }
}
</script>

<style>

</style>
