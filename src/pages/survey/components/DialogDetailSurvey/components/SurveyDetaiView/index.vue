<template lang="pug">
  .wrap
    h1 {{ data.survey_title }}
    template(v-if='qss.length')
      template(v-for='(item, index) in qss')
        template(v-if='item.type === "select"')
          type-select(:qs='item', :index='index')
    template(v-else)
      p(style='text-align: center; color: #c0c4cc; padding: 2em 1em;')
        i.el-icon-info
        |  暂无问卷内容
</template>

<script>
import TypeSelect from './components/TypeSelect'

export default {
  name: 'SurveyDetaiView',
  props: ['data'],
  mounted() {
    this.qss = JSON.parse(this.data.survey_doc).questions
  },
  data() {
    return {
      qss: []
    }
  },
  components: {
    TypeSelect
  }
}
</script>

<style lang="stylus" scoped>
h1
  text-align center
  font-weight 100
  color #303133
</style>
