<template lang="pug">
  el-dialog(title='问卷详情', :visible.sync='show', fullscreen, custom-class='tite-dialog')
    el-card(shadow='never', style='height: calc(100vh - 80px); overflow-y: scroll;')
      .hero-wrap
        survey-detai-view(v-if='show', :data='survey')
</template>

<script>
import SurveyDetaiView from './components/SurveyDetaiView'

export default {
  name: 'DialogDetailSurvey',
  data() {
    return {
      show: false,
      survey: false
    }
  },
  methods: {
    open(survey) {
      this.counter = true
      this.survey = survey
      this.show = true
    },
    close() {
      this.counter = false
      this.show = false
      this.survey = false
    }
  },
  components: {
    SurveyDetaiView
  }
}
</script>

<style lang="stylus" scoped>
.hero-wrap
  position relative
  margin auto
  max-width 760px
</style>
