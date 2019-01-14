<template>
 <div id="users">
   <el-dialog title="修改角色" :visible.sync="writeRoles">
  <el-form :model="rolesUsers" ref="rolesList">
    <el-form-item label="用户名" :label-width="'100px'">
      <el-button type="primary">{{rolesUsers.username}}</el-button>
    </el-form-item>
    <el-form-item label="角色列表" :label-width="'100px'">
      <template>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="writeRoles = false">取 消</el-button>
    <el-button type="primary" @click="writeRolesOk">确 定</el-button>
  </div>
</el-dialog>
   <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="resetForm">
  <el-form :model="addUserInfoForm" :rules="rules" ref="addUserForm">
    <el-form-item label="用户名称" prop="username" :label-width="'100px'">
      <el-input v-model="addUserInfoForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="password" :label-width="'100px'">
      <el-input v-model="addUserInfoForm.password" type="password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" :label-width="'100px'">
      <el-input v-model="addUserInfoForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile" :label-width="'100px'">
      <el-input v-model="addUserInfoForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addNewOne">确 定</el-button>
  </div>
</el-dialog>
   <el-dialog title="添加用户" :visible.sync="writeForm">
  <el-form :model="writeUser" ref="writeUserInfo">
    <el-form-item label="用户名称" :label-width="'100px'">
      <el-button type="primary">{{writeUser.username}}</el-button>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="'100px'">
      <el-input v-model="writeUser.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" :label-width="'100px'">
      <el-input v-model="writeUser.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="writeForm = false">取 消</el-button>
    <el-button type="primary" @click="weiteNewOne">确 定</el-button>
  </div>
</el-dialog>
   <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="resetForm">
  <el-form :model="addUserInfoForm" :rules="rules" ref="addUserForm">
    <el-form-item label="用户名称" prop="username" :label-width="'100px'">
      <el-input v-model="addUserInfoForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="password" :label-width="'100px'">
      <el-input v-model="addUserInfoForm.password" type="password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" :label-width="'100px'">
      <el-input v-model="addUserInfoForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile" :label-width="'100px'">
      <el-input v-model="addUserInfoForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addNewOne">确 定</el-button>
  </div>
</el-dialog>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
    </el-breadcrumb>
<el-row :gutter="20">
  <el-col :span="8">
    <el-input placeholder="请输入内容" v-model="searchName" class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click="iWantSearch"></el-button>
  </el-input>
  </el-col>
  <el-col :span="8">  <el-button type="primary" plain @click="dialogFormVisible = true">添加用户</el-button></el-col>
</el-row>
    <el-table
    :data="formList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobble"
      label="电话"
      >
    </el-table-column>
     <el-table-column
      prop="mg_state"
      label="所处状态"
      >
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.mg_state"
          @change="changeStatus(scope.row)"
          >
        </el-switch>
      </template>
    </el-table-column>
     <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
  <el-button type="primary" icon="el-icon-edit" plain @click="wantWrite(scope.row)"></el-button>
  <el-button type="danger" icon="el-icon-delete" plain @click="open2(scope.row.id)"></el-button>
  <el-button type="primary" icon="el-icon-loading" plain @click="writeRolesList(scope.row)">修改权限</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size=3
  :total="total"
  :current-page="pagenum"
  @current-change="changePage">
</el-pagination>
 </div>
</template>

<script>
export default {
  created () {
    this.getAllRoles()
    this.getinfor()
  },
  data () {
    return {
      options: [],
      value: '',
      rolesUsers: '',
      writeRoles: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '请输入正确邮箱', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      rolesLjlId: -1,
      writeForm: false,
      writeUser: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      formList: [],
      pagenum: 1,
      total: 0,
      searchName: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      addUserInfoForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    async getAllRoles () {
      const res = await this.axios.get('roles')
      this.options = res.data.data
    },
    async writeRolesOk () {
      const res = await this.axios.put(`users/${this.rolesLjlId}/role`, {rid: this.value})
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '分配角色成功'
        })
        this.writeRoles = false
        this.getinfor(this.pagenum)
      }
    },
    writeRolesList (data) {
      this.rolesLjlId = data.id
      this.writeRoles = true
      this.rolesUsers = data
      let res = this.options.find(item =>
        item.roleName === data.role_name
      )
      this.value = res ? res.id : 0
    },
    async open2 (id) {
      try {
        const num = await this.$confirm('您确定要删除这个用户吗, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log(num)
        if (num) {
          this.deleteUser(id)
          this.pagenum = 1
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      } catch (error) {
      }
    },
    deleteUser (id) {
      this.axios.delete(`users/${id}`)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.getinfor()
            this.$message({
              type: 'success',
              message: '删除成功了那'
            })
          }
        })
    },
    weiteNewOne () {
      this.axios.put(`users/${this.writeUser.id}`, this.writeUser)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.writeForm = false
            this.$message({
              type: 'success',
              message: '修改成功了那'
            })
            this.getinfor(this.pagenum)
          }
        })
    },
    wantWrite (info) {
      this.writeForm = true
      for (var key in info) {
        this.writeUser[key] = info[key]
      }
    },
    addNewOne () {
      this.$refs['addUserForm'].validate(volid => {
        if (!volid) {
          return false
        } else {
          this.axios.post('users', this.addUserInfoForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.dialogFormVisible = false
                this.pagenum = 1
                this.getinfor()
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            })
        }
      })
    },
    resetForm () {
      this.$refs['addUserForm'].resetFields()
    },
    iWantSearch () {
      this.getinfor(1, this.searchName)
    },
    changeStatus (info) {
      this.axios.put(`users/${info.id}/state/${info.mg_state}`)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '状态修改成功'
            })
          }
        })
    },
    changePage (pagenum) {
      this.pagenum = pagenum
      this.getinfor(pagenum)
    },
    getinfor (pagenum = 1, query = '') {
      this.axios.get('users', {params: {query, pagesize: 3, pagenum}})
        .then(res => {
          if (res.data.meta.status === 200) {
            this.formList = res.data.data.users
            this.total = res.data.data.total
          }
        })
    }
  }
}
</script>
<style scoped>
.el-breadcrumb{
  line-height: 50px;
  font-size: 16px
}
</style>
