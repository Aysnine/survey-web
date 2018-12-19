<template lang="pug">
  .page
    el-card(shadow='never')
      el-table(size='mini', :data='survey', style='width: 100%')
        el-table-column(label='问卷名称', prop='date')
        el-table-column(label='Name', prop='name')
        el-table-column(align='right')
          template(slot='header', slot-scope='scope')
            el-input(v-model='search', size='mini', placeholder='输入关键字搜索')
          template(slot-scope='scope')
            el-button(size='mini', @click='handleEdit(scope.$index, scope.row)') Edit
            el-button(size='mini', type='danger', @click='handleDelete(scope.$index, scope.row)') Delete
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  mounted() {
    this.fetch()
  },
  data() {
    return {
      search: ''
    }
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
    }
  }
}
</script>
