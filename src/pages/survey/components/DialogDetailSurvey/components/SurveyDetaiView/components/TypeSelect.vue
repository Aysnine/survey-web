<template lang="pug">
  el-card.card(shadow='never', :body-style='{ "padding-left": "4em" }')
    .header(slot='header')
      span.index # {{ index + 1 }}
      span.title {{ qs.title }}
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
    color #303133
    .index
      font-weight bold
    .title
      margin-left 1em
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
