<template lang="pug">
  .el--tips(:style='{textAlign: align}')
    p(style='word-break: break-all')
      slot
</template>

<script>
export default {
  name: 'ElTips',
  props: {
    align: {
      default: 'left',
      validator(value) {
        return ['center', 'left', 'right'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.el--tips
  padding .75em .5em
  background-color #ecf8ff
  border-radius 4px
  border-left 5px solid #50bfff
  margin 20px 0
  p
    margin 5px
    font-size 14px
    color #5e6d82
    line-height 1.5em
  a
    color #409eff
    text-decoration none
  code
    background-color hsla(0, 0%, 100%, .7)
    color #445368
    padding 0 4px
    border 1px solid #eaeefb
    border-radius 4px
    font-family monospace
</style>
