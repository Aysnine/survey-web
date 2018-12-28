<template lang="pug">
  .page
    el-card(shadow='never')
      el-table(:data='survey', style='width: 100%', size='mini')
        el-table-column(type='selection', width='40')
        el-table-column(label='#', type='index')
        el-table-column(label='问卷名称', prop='survey_title')
          template(slot-scope='scope')
            template(v-if='scope.row.survey_title__edit')
              el-input(placeholder='请输入内容', v-model='scope.row.survey_title__edit_temp', clearable, style='width: 70%; margin-right: .5em')
              el-button(type='text', icon='el-icon-check', @click='handleSurveyTitleChange(scope.$index, scope.row)')
              el-button(type='text', icon='el-icon-close', @click='scope.row.survey_title__edit = false')
            template(v-else)
              span(style='margin-right: .5em') {{ scope.row.survey_title }}
              el-button(type='text', icon='el-icon-edit', @click='scope.row.survey_title__edit = true, scope.row.survey_title__edit_temp = scope.row.survey_title')
        el-table-column(label='问卷状态', prop='survey_enable')
          template(slot-scope='scope')
            el-switch(v-model='scope.row.survey_enable', :inactive-value='0', :active-value='1', @change='handleSurveyEnableChange(scope.$index, scope.row)')
        el-table-column(label='创建时间', prop='survey_create_datetime')
        el-table-column(align='right')
          template(slot='header', slot-scope='scope')
            el-button(type='primary', plain, icon='el-icon-plus', @click='handleCreate') 新建
          template(slot-scope='scope')
            el-button(type='primary', plain, icon='el-icon-tickets', size='mini', @click='handleEdit(scope.$index, scope.row)') 查看
            el-button.fix--1px(type='danger', plain, icon='el-icon-delete', size='mini', @click='handleDelete(scope.$index, scope.row)') 删除
    dialog-create-survey(ref='dialog-create-survey')
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
    ...mapActions(['fetch', 'updateSurveyEnable', 'updateSurveyTitle']),
    handleEdit(/* index, row */) {
      // console.log(index, row)
    },
    handleDelete(/* index, row */) {
      // console.log(index, row)
    },
    handleCreate() {
      this.$refs['dialog-create-survey'].open()
    },
    async handleSurveyEnableChange(index, row) {
      let { survey_id, survey_enable } = row
      try {
        await this.updateSurveyEnable({ survey_id, survey_enable })
        // let rst = await this.updateSurveyEnable({ survey_id, survey_enable })
        // this.$message.success(rst.msg)
      } catch (error) {
        row.survey_enable = !row.survey_enable + 0
        this.$message.error(error.msg)
      }
    },
    async handleSurveyTitleChange(index, row) {
      let { survey_id, survey_title__edit_temp } = row
      try {
        await this.updateSurveyTitle({ survey_id, survey_title: survey_title__edit_temp })
        row.survey_title__edit = false
        row.survey_title = survey_title__edit_temp
      } catch (error) {
        this.$message.error(error.msg)
      }
    }
  },
  components: {
    DialogCreateSurvey
  }
}
</script>
