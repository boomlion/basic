<template>
  <div id="rights">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户权限</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
  <el-table
    :data="rightsUser"
    stripe
    style="width: 100%">
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
    prop='authName'
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop='path'
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
    prop='sell'
      label="层级">
    </el-table-column>
  </el-table>
</template>
  </div>
</template>

<script>
export default {
  created () {
    this.getInfo()
  },
  data () {
    return {
      rightsUser: []
    }
  },
  methods: {
    async getInfo () {
      const res = await this.axios.get(`rights/tree`)
      res.data.data.forEach(item => {
        item.sell = '一级'
        this.rightsUser.push(item)
        item.children.forEach(children => {
          children.sell = '二级'
          this.rightsUser.push(children)
          children.children.forEach(childrens => {
            childrens.sell = '三级'
            this.rightsUser.push(childrens)
            this.rightsUser.sort((a, b) => a.id - b.id)
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
  line-height: 50px;
  background-color: #D4DAE0;
}
</style>
