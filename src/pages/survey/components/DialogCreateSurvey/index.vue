<template lang="pug">
  el-dialog(title='新建问卷', :visible.sync='show', fullscreen)
    el-card(shadow='never', style='height: calc(100vh - 120px); overflow-y: scroll;')
      el-form.hero-form(:model='form', :rules='rules', ref='form', label-suffix='：', label-width='140px')
        el-form-item(label='问卷名称', prop='survey_title')
          el-input(v-model='form.survey_title', placeholder='请输入问卷名称', clearable)
        el-form-item(label='问卷状态', prop='survey_enable')
          el-switch(v-model='form.survey_enable', :active-value='1', :inactive-value='0', active-text='可以填写', inactive-text='不可填写')
        .survey-inner-list
          template(v-if='form.survey_doc.questions.length', v-for='(item, index) in form.survey_doc.questions')
            el-form-item(:label='"# " + (index+1) + " [" + getTypeInfo(item.type).label + "]"', :key='item.index')
              el-card(shadow='hover', :class='"flag-" + item.type')
                div(slot='header')
                  el-input(v-model='item.title', clearable, placeholder='请输入问题', style='margin-bottom: 1em')
                  el-input(type='textarea', clearable, autosize, placeholder='请输入问题描述或提示信息', v-model='item.tips')
                template(v-if='item.type == "select"')
                  el-row(:gutter='20', style='margin-bottom: 1em')
                    el-col(:span='6', style='text-align: right')
                      span(style='font-size: 14px; color: #606266; padding: 0 12px 0 0;') 选择类型：
                    el-col(:span='14')
                      div
                        el-radio(v-model='item.method', label='checkbox') 多选
                        el-radio(v-model='item.method', label='radio') 单选
                    el-col(:span='4', style='text-align: center')
                      span(style='font-size: 14px; color: #606266;') 默认：
                      el-button(type='text', @click='item.defaults = [], item.default = false') 清除
                  el-row(:gutter='20', style='margin-bottom: 1em')
                    el-col(:span='6', style='text-align: right')
                      span(style='font-size: 14px; color: #606266; padding: 0 12px 0 0;') 可选项：
                    el-col(:span='14')
                      div
                        template(v-for='(option, optionIndex) in item.options')
                          el-input(v-model='option.value', clearable, placeholder='请输入内容', style='margin-bottom: 10px')
                            template(slot='prepend') # {{ optionIndex + 1 }}
                            template(slot='append')
                              el-button(icon='el-icon-delete', @click='handleItemRemoveOption(optionIndex, option, item.options)')
                        el-button(type='primary', plain, icon='el-icon-plus', @click='item.options.push({ value: "", index: counter++ })') 添加可选项
                    el-col(:span='4', style='text-align: center')
                      div
                        el-radio-group.vertical-list.no-label(v-if='item.method == "radio"', v-model='item.default')
                          el-radio(v-for='(option, optionIndex) in item.options', :key='option.index', :label='option.index')
                        el-checkbox-group.vertical-list.no-label(v-if='item.method == "checkbox"', v-model='item.defaults')
                          el-checkbox(v-for='(option, optionIndex) in item.options', :key='option.index', :label='option.index')
                  el-row(:gutter='20')
                    el-col(:span='6', style='text-align: right')
                      span(style='font-size: 14px; color: #606266; padding: 0 12px 0 0; cursor: pointer') 填写其他：
                    el-col(:span='6')
                      el-checkbox(v-model='item.other') 开启“其他”选项，自行填写文字
                template(v-if='item.type == "number"')
                  el-row(:gutter='20', style='margin-bottom: 1em')
                    el-col(:span='6', style='text-align: right')
                      el-tooltip.item(effect='light', content='支持 -999999999 到 999999999 的整数', placement='top')
                        span(style='font-size: 14px; color: #606266; padding: 0 12px 0 0; cursor: pointer') 数字区间：
                    el-col(:span='8')
                      el-input-number(v-model='item.minNumber', :min='-999999999', :max='999999999', style='width: 100%')
                    el-col(:span='2', style='text-align: center; font-weight: bold;')
                      span ~
                    el-col(:span='8')
                      el-input-number(v-model='item.maxNumber', :min='-999999999', :max='999999999', style='width: 100%')
                  el-row(:gutter='20', style='margin-bottom: 1em')
                    el-col(:span='6', style='text-align: right')
                      span(style='font-size: 14px; color: #606266; padding: 0 12px 0 0; cursor: pointer') 默认填写：
                    el-col(v-if='item.default === false', :span='6')
                      el-button(type='text', @click='item.default = true') 暂未启用，点击启用
                    el-col(v-if='item.default !== false', :span='8')
                      el-input-number(v-model='item.default', :min='item.minNumber', :max='item.maxNumber', style='width: 100%')
                    el-col(v-if='item.default !== false', :span='10')
                      el-button(type='text', @click='item.default = false') 关闭
                template(v-if='item.type == "text"')
                  el-row(:gutter='20', style='margin-bottom: 1em')
                    el-col(:span='6', style='text-align: right')
                      el-tooltip.item(effect='light', content='支持 5000 字以内', placement='top')
                        span(style='font-size: 14px; color: #606266; padding: 0 12px 0 0; cursor: pointer') 文字长度：
                    el-col(:span='8')
                      el-input-number(v-model='item.minLength', :min='0', :max='5000', style='width: 100%')
                    el-col(:span='2', style='text-align: center; font-weight: bold;')
                      span ~
                    el-col(:span='8')
                      el-input-number(v-model='item.maxLength', :min='0', :max='5000', style='width: 100%')
                  el-row(:gutter='20', style='margin-bottom: 1em')
                    el-col(:span='6', style='text-align: right')
                      span(style='font-size: 14px; color: #606266; padding: 0 12px 0 0; cursor: pointer') 默认填写：
                    el-col(v-if='item.default === false', :span='6')
                      el-button(type='text', @click='item.default = ""') 暂未启用，点击启用
                    el-col(v-if='item.default !== false', :span='14')
                      div
                        el-input(type='textarea', clearable, autosize, placeholder='请输入问题描述或提示信息', v-model='item.default', :min='item.minLength', :max='item.maxLength')
                    el-col(v-if='item.default !== false', :span='4')
                      el-button(type='text', @click='item.default = false') 关闭
                .footer
                  el-row
                    el-col(:span='12')
                      div
                        el-checkbox(v-model='item.required') 必填
                    el-col(:span='12', style='text-align: right')
                      el-tooltip.item(effect='light', content='删除', placement='bottom-end')
                        el-button(type='danger', icon='el-icon-delete', circle, plain, @click='handleRemoveQuestion(index, item)')
                      el-tooltip.item(effect='light', content='上移', placement='bottom-end')
                        el-button(icon='el-icon-arrow-up', type='primary', circle, plain, @click='handleMoveUp(index, item)')
                      el-tooltip.item(effect='light', content='下移', placement='bottom-end')
                        el-button(icon='el-icon-arrow-down', type='primary', circle, plain, @click='handleMoveDown(index, item)')
          template(v-if='!form.survey_doc.questions.length')
            p(style='text-align: center; color: #c0c4cc; padding: 2em 1em;')
              i.el-icon-info
              |  暂无问卷内容，请点击下方按钮添加
          .survey-creator-wrap
            .survey-creator
              el-row(:gutter='20')
                el-col(:span='14')
                  el-select(v-model='select', placeholder='请选择')
                    el-option(v-for='item in options.type', :key='item.value', :label='item.label', :value='item.value')
                      span(style='float: left') {{ item.label }}
                      span(style='float: right; font-size: 13px')
                        i.el-icon-star-on(:class='"flag-color-" + item.value')
                el-col(:span='10')
                  el-button(type='primary', plain, icon='el-icon-plus', style='width: 100%', @click='handleAddQuestion') 添加问题
        el-form-item(label-width='0', style='text-align: right')
          el-button(type='primary', @click='submitForm("form")') 已完成
</template>

<script>
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
      counter: 1,
      options: {
        type: [
          {
            label: '选项题',
            value: 'select',
            method: [
              { label: '多选', value: 'checkbox' },
              { label: '单选', value: 'radio' }
            ],
            gen: index => ({
              index,
              title: '',
              tips: '',
              type: 'select',
              method: 'checkbox',
              options: [{ value: '', index: this.counter++ }],
              default: false,
              defaults: [],
              required: true,
              other: false
            })
          },
          {
            label: '填数字',
            value: 'number',
            gen: index => ({
              index,
              title: '',
              tips: '',
              type: 'number',
              maxNumber: 100000,
              minNumber: 0,
              default: false,
              required: true
            })
          },
          {
            label: '填文字',
            value: 'text',
            gen: index => ({
              index,
              title: '',
              tips: '',
              type: 'text',
              maxLength: 100,
              minLength: 5,
              default: false,
              required: true
            })
          }
        ]
      },
      select: 'select'
    }
  },
  computed: {
    typeInfo() {
      return this.options.type.find(i => i.value == this.select)
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
      this.select = 'select'
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
      this.form.survey_doc.questions.push(this.typeInfo.gen(this.counter++))
    },
    handleRemoveQuestion(index /* , item */) {
      this.$confirm('是否移除此问题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.survey_doc.questions.splice(index, 1)
        })
        .catch(() => {
          // ...
        })
    },
    handleItemRemoveOption(optionIndex, option, options) {
      if (options.length > 1) {
        options.splice(optionIndex, 1)
      } else {
        this.$message.warning('至少包含一个可选项')
      }
    },
    handleMoveUp(index /* , item */) {
      if (index <= 0 || this.form.survey_doc.questions.length < 2) return
      let x = this.form.survey_doc.questions.splice(index, 1)
      this.form.survey_doc.questions.splice(index - 1, 0, x[0])
    },
    handleMoveDown(index /* , item */) {
      if (
        index >= this.form.survey_doc.questions.length ||
        this.form.survey_doc.questions.length < 2
      )
        return
      let x = this.form.survey_doc.questions.splice(index, 1)
      this.form.survey_doc.questions.splice(index + 1, 0, x[0])
    },
    getTypeInfo(value) {
      return this.options.type.find(i => i.value == value)
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.hero-form
  position relative
  margin auto
  max-width 760px
  .survey-inner-list
    padding 2em 0
    margin 1em 0
    border-top 1px solid
    border-bottom 1px solid
    border-color #dcdfe6
    .el-form-item__label
      padding-top 20px
  .survey-creator-wrap
    padding-top 3em
    .survey-creator
      position relative
      margin auto
      width 300px
      padding 2em 2em 3em
      border-radius 4px
      text-align center
  .vertical-list
    label
      display block
      margin-left 0
      margin-bottom 10px
  .footer
    border-top 1px solid #ebeef5
    padding-top 1em
    margin-top 1em
</style>
