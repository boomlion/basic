<template>
  <div id="roles">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
<el-dialog title="权限列表" :visible.sync="dialogTableVisible">
<el-tree
  :data="rolesDataAll"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>
 <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="giveinformation">确 定</el-button>
  </span>
</el-dialog>
  <el-table
    :data="rolesListInfo"
    stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
         <el-row
         v-for="level1 in props.row.children"
         :key="level1.id"
         class="ljlList"
         >
         <!-- 这个就是左边的一级目录 -->
           <el-col :span="4">
            <el-tag closable>{{ level1.authName }}</el-tag>
            <i class="el-icon-arrow-right"></i>
           </el-col>
           <!-- 这边就是二级一大片-->
            <el-col :span="20">
            <el-row v-for="level2 in level1.children" :key="level2.id"  class="ljlcol">
              <!-- 这个是实际的二级目录 -->
              <el-col :span="4">
                <el-tag closable>{{ level2.authName }}</el-tag>
            <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20" >
                  <el-tag closable v-for="level3 in level2.children" :key="level3.id" class="ljlspan">{{ level3.authName }}</el-tag>
              </el-col>
            </el-row>
           </el-col>
         </el-row>
      </template>
    </el-table-column>
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" plain></el-button>
        <el-button type="danger" icon="el-icon-delete" plain @click="openinfo(scope.row.id)"></el-button>
        <el-button type="primary" icon="el-icon-loading" plain @click="giveMorePower(scope.row)">分配权限</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rolesListInfo: [],
      dialogTableVisible: false,
      rolesDataAll: [],
      rolesId: -1,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.getRolesList()
    this.getAllList()
  },
  methods: {
    async giveinformation () {
      const arr = this.$refs.tree.getHalfCheckedKeys()
      let newArr = this.$refs.tree.getCheckedKeys()
      newArr = [...arr, ...newArr]
      const res = await this.axios.post(`roles/${this.rolesId}/rights`, {rids: newArr.join(',')})
      if (res.data.meta.status === 200) {
        this.dialogTableVisible = false
        this.getRolesList()
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      }
    },
    async getAllList () {
      const res = await this.axios.get('rights/tree')
      this.rolesDataAll = res.data.data
    },
    async giveMorePower (info) {
      this.dialogTableVisible = true
      const newArr = []
      this.rolesId = info.id
      this.$nextTick(() => {
        info.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            item2.children.forEach(item3 => {
              newArr.push(item3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(newArr)
      })
    },
    async getRolesList () {
      const res = await this.axios.get('roles')
      this.rolesListInfo = res.data.data
    },
    async openinfo (info) {
      try {
        const res = await this.$confirm('此操作将删除该角色, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        if (res === 'confirm') {
          await this.axios.delete(`roles/${info}`)
          this.getRolesList()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      } catch (error) {
      }
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
  line-height: 50px;
  background-color: #D4DAE0;
  padding: 0 10px;
}
.ljlList{
  padding: 20px 0;
  border-bottom: 1px dashed #ccc;
}
.ljlList:last-of-type{
  border: 0;
}
.ljlcol{
/* margin: 10px 0; */
}
.ljlspan{
  margin:  5px 10px;
}
</style>
