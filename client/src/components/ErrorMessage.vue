<template>
  <div id="errorMessage">
    <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      <p>{{$store.state.errMsg}}. Dimissing in {{dismissCountDown}} seconds...</p>
      <b-progress variant="danger" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
    </b-alert>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'ErrorMessage',
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  computed: mapState(['errMsg']),
  watch: {
    errMsg (newVal, oldVal){
      // console.log(this.errMsg)
      this.showAlert()
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>
