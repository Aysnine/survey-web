<template lang="pug">
  el-card.card(shadow='hover')
    .header(slot='header')
      //- span.index # {{ index + 1 }}
      //- span.title {{ qs.title }}
      //- el-alert(v-if='qs.tips', :title='qs.tips', type='info', show-icon, :closable='false')
      el-alert(:title='"#" + (index+1) + " " + qs.title', type='info', :description='qs.tips ? qs.tips : " "', :closable='false', style='padding: .5em; padding-top: 1em')
    el-radio-group.vertical-list(v-if='qs.method == "radio"', v-model='radio', style='width: 100%')
      el-radio.hovered(v-for='(option, optionIndex) in qs.options', :key='option.index', :label='option.index')
        span.fix--top {{ option.value }}
    el-checkbox-group.vertical-list(v-if='qs.method == "checkbox"', v-model='checkbox')
      el-checkbox.hovered(v-for='(option, optionIndex) in qs.options', :key='option.index', :label='option.index')
        span {{ option.value }}
</template>

<script>
export default {
  name: 'TypeSelect',
  props: ['index', 'qs'],
  data() {
    return {
      checkbox: [],
      radio: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  margin-bottom 1em
  .header
    margin -20px -20px
    color #303133
.vertical-list
  label
    display block
    margin-left 0
    // margin-bottom 10px
.hovered
  border-radius 2px
  padding .5em 1em .4em
  &:hover
    transition background .28s
    background #e6effb
.hovered.el-checkbox
  padding .3em 1em .4em
</style>
