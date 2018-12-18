<template lang="pug">
  el-card.box-card(shadow='hover')
    .clearfix(slot='header')
      span(style='font-weight: bold;') {{ title }}
      a(:href='href', target='_blank')
        el-button(style='float: right; padding: 3px 0', type='text') 打开 
          i.el-icon-d-arrow-right
      a(:href='href')
        el-button(style='float: right; padding: 3px 0; margin-right: 10px', type='text') 转到 
          i.el-icon-arrow-right
    .text.item(v-for='o in features', :key='o') {{ o }}
</template>

<script>
export default {
  props: {
    title: String,
    href: String,
    features: Array
  }
}
</script>

<style lang="stylus" scoped>
.text
  font-size 14px
.item
  margin-bottom 1em
.clearfix:before, .clearfix:after
  display table
  content ''
.clearfix:after
  clear both
.box-card
  margin-bottom 10px
  text-align left
  width 100%
</style>
