<template lang="pug">
  .page
    el-card(shadow='never', :body-style='{ padding: "10px" }')
      div(slot='header')
        template(v-if='selection.length')
          el-button(type='danger', plain, @click='handleSelectionDelete') 删除选中
        template(v-else)
          el-row
            el-col(:span='24', style='text-align: right')
              el-button(type='primary', plain, icon='el-icon-plus', @click='handleCreate') 新建
      el-table(:data='survey', style='width: 100%', size='mini', @selection-change='handleSelectionChange')
        el-table-column(type='selection', width='40')
        el-table-column(label='#', type='index')
        el-table-column(label='问卷名称', prop='survey_title')
          template(slot-scope='scope')
            template(v-if='scope.row.survey_title__edit')
              el-input(size='mini', placeholder='请输入内容', v-model='scope.row.survey_title__edit_temp', autofocus, style='width: 70%; margin-right: .5em')
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
          //- template(slot='header', slot-scope='scope')
          //-   el-button(type='primary', plain, icon='el-icon-plus', @click='handleCreate') 新建
          template(slot-scope='scope')
            el-button(type='primary', plain, icon='el-icon-tickets', size='mini', @click='handleDetail(scope.$index, scope.row)') 查看
            el-button.fix--1px(type='danger', plain, icon='el-icon-delete', size='mini', @click='handleDelete(scope.$index, scope.row)') 删除
    dialog-create-survey(ref='dialog-create-survey')
    dialog-detail-survey(ref='dialog-detail-survey')
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DialogCreateSurvey from './components/DialogCreateSurvey'
import DialogDetailSurvey from './components/DialogDetailSurvey'

export default {
  mounted() {
    this.fetch()
  },
  data() {
    return {
      selection: []
    }
  },
  computed: {
    ...mapState(['survey'])
  },
  methods: {
    ...mapActions([
      'fetch',
      'updateSurveyEnable',
      'updateSurveyTitle',
      'deleteSurvey'
    ]),
    handleSelectionChange(val) {
      this.selection = val
    },
    handleDetail(index, row) {
      this.$refs['dialog-detail-survey'].open(row)
    },
    handleCreate() {
      this.$refs['dialog-create-survey'].open()
    },
    handleDelete(index, row) {
      this.$confirm('是否删除此问卷?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteSurvey([row.survey_id])
        })
        .catch(() => {
          // ...
        })
    },
    handleSelectionDelete() {
      this.$confirm('是否删除所选问卷?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteSurvey(this.selection.map(i => i.survey_id))
        })
        .catch(() => {
          // ...
        })
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
      if (
        !(
          survey_title__edit_temp.length >= 5 &&
          survey_title__edit_temp.length <= 32
        )
      ) {
        return this.$message.warning('长度在 5 到 32 个字符')
      }
      try {
        await this.updateSurveyTitle({
          survey_id,
          survey_title: survey_title__edit_temp
        })
        row.survey_title__edit = false
        row.survey_title = survey_title__edit_temp
      } catch (error) {
        this.$message.error(error.msg)
      }
    }
  },
  components: {
    DialogCreateSurvey,
    DialogDetailSurvey
  }
}
</script>
