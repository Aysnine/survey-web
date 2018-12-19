<template lang="pug">
  el-dialog(title='新建问卷', :visible.sync='show', fullscreen)
    el-card(shadow='never', style='height: calc(100vh - 120px); overflow: auto;')
      el-form.hero-form(:model='form', :rules='rules', ref='form', label-suffix='：', label-width='100px')
        
        el-form-item(label='问卷名称', prop='survey_title')
          el-input(v-model='form.survey_title', placeholder='请输入问卷名称')
        
        el-form-item(label='问卷状态', prop='survey_enable')
          el-switch(v-model='form.survey_enable', :active-value='1', :inactive-value='0', active-text='可以填写', inactive-text='不可填写')

        .survey-inner-list

          template(v-if='form.survey_doc.questions.length', v-for='item, index in form.survey_doc.questions')
            el-form-item(:label='"# " + (index+1)')
              el-card(shadow='hover')
                div(slot='header')
                  el-input(v-model='item.title', placeholder='请输入问题', style='margin-bottom: 1em')
                  el-input(type='textarea', autosize, placeholder='请输入问题描述或提示信息', v-model='item.tips')
                template(v-if='item.type=="radio"')
                  .survey-inner-item 单选
                template(v-if='item.type=="checkbox"')
                  .survey-inner-item 多选
                template(v-if='item.type=="number"')
                  .survey-inner-item 数值
                template(v-if='item.type=="text"')
                  .survey-inner-item 文本
                .footer
                  el-row(style='text-align: right')
                    el-button(type='danger', icon='el-icon-delete', circle, plain, @click='handleRemoveQuestion(index, item)')

          template(v-if='!form.survey_doc.questions.length')
            p(style='text-align: center; color: #c0c4cc; padding: 2em 1em;') 😅 暂无问卷内容，请添加

          .survey-creator-wrap
            .survey-creator
              el-row(:gutter='20')
                el-col(:span='14')
                  el-select(v-model='select', placeholder='请选择')
                    el-option(v-for='item in options.type', :key='item.value', :label='item.label', :value='item.value')
                el-col(:span='10')
                  el-button(type='primary', plain, icon='el-icon-plus', style='width: 100%', @click='handleAddQuestion') 添加问题

        el-form-item(label-width='0', style='text-align: right')
          el-button(type='primary', @click='submitForm("form")') 已完成
</template>

<script>
import SurveyItem from './components/SurveyItem'

export default {
  name: 'DialogCreateSurvey',
  data() {
    return {
      show: true,
      form: {
        survey_title: '',
        survey_enable: 1,
        survey_doc: {
          questions: []
        }
      },
      rules: {
        survey_title: [
          { required: true, message: '请输入问卷名称', trigger: 'blur' },
          { min: 5, max: 32, message: '长度在 5 到 32 个字符', trigger: 'blur' }
        ]
      },
      options: {
        type: [
          {
            label: '单选',
            value: 'radio',
            gen: () => ({
              title: '',
              tips: '',
              type: 'radio',
              options: [],
              default: false,
              required: false,
              other: false
            })
          },
          {
            label: '多选',
            value: 'checkbox',
            gen: () => ({
              title: '',
              tips: '',
              type: 'checkbox',
              options: [],
              default: false,
              other: false
            })
          },
          {
            label: '数值',
            value: 'number',
            gen: () => ({
              title: '',
              tips: '',
              type: 'number',
              maxNumber: 999999,
              minNumber: 0,
              default: false
            })
          },
          {
            label: '文本',
            value: 'text',
            gen: () => ({
              title: '',
              tips: '',
              type: 'text',
              maxLength: 24,
              minLength: 5,
              default: false
            })
          }
        ]
      },
      select: 'radio'
    }
  },
  watch: {
    show(val) {
      val ? this.open() : this.close()
    }
  },
  methods: {
    open() {
      if (!this.show) this.show = true
    },
    close() {
      if (this.show) this.show = false
      this.reset()
    },
    reset() {
      this.select = 'radio'
      this.form = {
        survey_title: '',
        survey_enable: 1,
        survey_doc: {
          questions: []
        }
      }
      this.resetForm()
    },
    handleAddQuestion() {
      this.form.survey_doc.questions.push(
        this.options.type.find(i => (i.value == this.select)).gen()
      )
    },
    handleRemoveQuestion(index, item) {
      this.form.survey_doc.questions.splice(index, 1)
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    }
  },
  components: {
    SurveyItem
  }
}
</script>

<style lang="stylus" scoped>
.hero-form
  position relative
  margin auto
  max-width 720px
  .survey-inner-list
    padding 2em 0
    margin 1em 0
    border-top 1px solid #ebeef5
    border-bottom 1px solid #ebeef5
    .el-form-item__label
      padding-top 20px
  .survey-creator-wrap
    padding-top 3em
    .survey-creator
      position relative
      margin auto
      width 300px
      padding 2em 2em 3em
      // border-top 1px dashed #bcc2d1
      border-radius 4px
      text-align center
</style>
