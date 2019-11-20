<template>
  <div style="text-align: center !important;">
      <h2> Welcome, username </h2>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Questions" active>
          <b-card-text>
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12" style="text-align: center;">
                  <h2>Question Title</h2>
                  <p>Question Description</p>
                  <div class="row">
                    <div class="col-md-2">
                      <button type="button" class="btn btn-success">update</button>
                    </div>
                    <div class="col-md-8"></div>
                    <div class="col-md-2">
                      <button type="button" class="btn btn-danger">delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Answers">
          <b-card-text>
              <div class="container-fluid">
              <div class="row">
                <div class="col-md-12" style="text-align: center;">
                  <p>Answer Description</p>
                  <div class="row">
                    <div class="col-md-2">
                      <button type="button" class="btn btn-success">update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'UserHomePageContent'
}
</script>

<style>
</style>
