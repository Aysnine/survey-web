<template lang="pug">
  .page
    .hero-inner
      img(src='@/assets/logo/vue.png', style='height: 40px')
      img(src='@/assets/logo/element.svg', style='height: 40px')
      h1.hero-title= process.env.VUE_APP_TITLE
      el-tips
        | 小型问卷调查 Demo，包含问卷管理、调查填写页面，点击下方入口即可体验。
        | 部分数据存储于浏览器本地，需要重置数据请在本页面底部点击重置按钮。
    .hero-inner
      el-row(:gutter='20')
        el-col(:xs='24', :sm='12')
          entry-card(title='问卷管理', href='survey.html', :features='["💻 支持桌面端", "📵 不支持移动端", "✔️ 查看所有问卷", "✔️ 新建问卷", "✔️ 删除问卷", "✔️ 修改问卷状态", "✔️  问卷统计"]')
        el-col(:xs='24', :sm='12')
          entry-card(title='问卷填写', href='reply.html', :features='[ "💻 支持桌面端", "📱 支持移动端","✔️ 查看问卷列表", "✔️ 查看单个问卷", "✔️ 填写问卷"]')
      el-row(style='margin-top: 1em; border-top: 1px solid #ebeef5')
        el-col(:span='24', style='text-align: center; padding-top: 1em')
          el-button(icon='el-icon-error', @click='handleClean') 重置数据
</template>

<script>
import EntryCard from './components/EntryCard'
import db from '@/mock/db'

export default {
  methods: {
    handleClean() {
      db.unset('survey').write()
      this.$message.success('数据已重置！')
    }
  },
  components: {
    EntryCard
  }
}
</script>

<style lang="stylus" scoped>
.page
  text-align center
  .hero-title
    font-weight 100
    text-transform uppercase
  .hero-inner
    position relative
    margin 3em auto 1em
    max-width 600px
</style>
