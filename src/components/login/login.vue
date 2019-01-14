<template>
  <el-row class="login" type="flex" align="middle" justify="center">
    <el-col
    :xl="8"
    :md="8"
    :lg="8"
    :xs="8"
    :sm="8"
    >
          <el-form label-position="top" :model="formList" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formList.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formList.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      formList: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      await this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {
          axios.post('login', this.formList)
            .then(res => {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push({name: 'home'})
              this.$message(
                {type: 'success', message: '登录成功'}
              )
            })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.login{
  height: 100%;
}
form{
  background-color: goldenrod;
  padding: 20px 30px;
  border-radius: 20px;
}
</style>
