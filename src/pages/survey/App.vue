<template lang="pug">
  .page
    el-card(shadow='never')
      el-table(size='mini', :data='survey', style='width: 100%')
        el-table-column(label='#', type='index')
        el-table-column(label='问卷名称', prop='survey_title')
        el-table-column(label='问卷状态', prop='survey_enable')
        el-table-column(label='创建时间', prop='survey_create_datetime')
        el-table-column(align='right')
          template(slot='header', slot-scope='scope')
            el-button(type='primary', icon='el-icon-plus', @click='handleCreate') 新建
          template(slot-scope='scope')
            el-button(size='mini', @click='handleEdit(scope.$index, scope.row)') Edit
            el-button(size='mini', type='danger', @click='handleDelete(scope.$index, scope.row)') Delete
    dialog-create-survey(ref='dialog-create-survey')
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import DialogCreateSurvey from './components/DialogCreateSurvey'

export default {
  mounted() {
    this.fetch()
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['survey'])
  },
  methods: {
    ...mapActions(['fetch']),
    handleEdit(index, row) {
      // console.log(index, row)
    },
    handleDelete(index, row) {
      // console.log(index, row)
    },
    handleCreate() {
      this.$refs['dialog-create-survey'].open()
    }
  },
  components: {
    DialogCreateSurvey
  }
}
</script>
