<template>
<div class="container" style="margin-top: 20px;">
    <div class="row">
        <div class="col-lg-2" style="border-right: 1px solid black;">
            <MainPageSideBar></MainPageSideBar>
        </div>
        <div class="col-lg-10" style="overflow: auto; height: 100vh; padding-bottom: 5%">
          <router-view />
        </div>
    </div>
</div>

</template>

<script>
import MainPageSideBar from '../components/MainPageSideBar'

export default {
  name: 'MainPage',
  props: ['QuestionData'],
  components: {
    MainPageSideBar
  },
  created () {
    this.$store.dispatch('getAllQuestions')
  }

}
</script>

<style>

</style>
