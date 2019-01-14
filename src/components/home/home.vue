<template>
  <el-container class="user">
  <el-header>
    <el-row class="header">
      <el-col :span="4" class="img"><div class="grid-content bg-purple "></div></el-col>
      <el-col :span="16"><h1>欢迎来到哈哈哈哈哈哈哈</h1></el-col>
      <el-col :span="4"><h3>您是荣耀黑铁3 <a href="javascript:;" @click="loginout">滚出去</a></h3></el-col>
    </el-row>
  </el-header>
    <el-container>
    <el-aside width="200px">
      <el-row class="tac">
  <el-col class="my-tac">
    <el-menu
      :default-active="$route.path.slice(1)"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      :unique-opened="true"
      active-text-color="#ffd04b">
      <el-submenu :index="item.order+''" v-for="item in leftList" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
       <el-menu-item :index="'/'+item1.path+''" v-for="item1 in item.children" :key="item1.id"><i class="el-icon-menu"></i>{{item1.authName}}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户权限</span>
        </template>
       <el-menu-item index="rights"><i class="el-icon-menu"></i>权限管理</el-menu-item>
       <el-menu-item index="roles"><i class="el-icon-menu"></i>角色管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      leftList: [],
      active: ''
    }
  },
  created () {
    this.getLeftList()
  },
  methods: {
    async getLeftList () {
      const res = await this.axios.get('menus')
      this.leftList = res.data.data
    },
    loginout () {
      this.$confirm('你确定要退出系统吗, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(res => {
          localStorage.removeItem('token')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '已成功退系统'
          })
        })
        .catch(res => {
          this.$message({
            type: 'success',
            message: '已取消操作'
          })
        })
    }
  }
}
</script>

<style scoped>
.user{
  height: 100%;
}
.el-header{
  padding-left: 0;
  background-color: blue;
}
.header{
  line-height: 60px;
}
.header h1{
  text-align: center;
  color: white
}
.header h3{
  text-align: right;
}
.header a{
  color: white
}
.img{
  height: 60px;
  width: 200px;
  background-image: url('../../assets/images/logo.png');
  background-repeat: no-repeat;
}
aside{
  background-color: #545c64;
}
</style>
