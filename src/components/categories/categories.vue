<template>
 <div id="goods">
    <el-button type="success" plain @click="addGoods">添加商品</el-button>
<el-dialog title="添加分类" :visible.sync="dialogFormVisible">
  <el-form :label-width="'100px'">
    <el-form-item label="分类名称">
      <el-input v-model="selectId.cat_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="父级名称">
        <el-cascader
          v-model="selectId.cat_pid"
          :options="addUserList"
          :props="{value:'cat_id',label:'cat_name',children:'children'}"
          change-on-select
        ></el-cascader>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addheight">确 定</el-button>
  </div>
</el-dialog>
  <el-table
    :data="categoriesList"
    style="width: 100%"
    stripe
    v-loading="isloading"
    >
     <!-- tree-key ：区分其他菜单，不添加该key会导致所有菜单同时展开，添加该key只展开该菜单
          作用：区分不同菜单，所以，它的值应该是一个 唯一的值，一般就是：id
        parent-key ：父级菜单id，不添加该key，则无法收起子菜单
          当前菜单父级菜单的id，parentid
        level-key ：设置菜单级别，以缩进形式表示子菜单
        child-key ：指定使用哪个属性名称表示子菜单，我们数据中默认就是使用 children
         属性来表示自己分类的，所以，可以省略 -->
            <el-table-tree-column
              :indentSize="30"
              file-icon="icon icon-file"
              folder-icon="icon icon-folder"
              tree-key="cat_id"
              parent-key="cat_pid"
              level-key="cat_level"
              child-key="children"
              prop="cat_name"
              label="分类名称"
              width="220"
              >
              </el-table-tree-column>
    <el-table-column
      label="是否有效"
      prop="id">
      <template slot-scope="scope">
      {{scope.row.cat_deleted === false ? "否" : "是"}}
      </template>
    </el-table-column>
    <el-table-column
      label="层级"
      prop="cat_level">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="desc">
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="primary"
          plain
          icon="el-icon-edit"
        ></el-button>
        <el-button
          size="mini"
          type="danger"
          plain
          icon="el-icon-delete"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
<el-pagination
  :page-size="pagesize+0"
  background
  layout="prev, pager, next"
  :total="total"
  @current-change="currentChange"
  :current-page="pagenum"
  >
</el-pagination>
 </div>
</template>

<script>
export default {
  data () {
    return {
      categoriesList: [],
      total: 0,
      pagesize: 5,
      isloading: false,
      pagenum: 0,
      dialogFormVisible: false,
      addUserList: [],
      selectId: {
        cat_name: '',
        cat_pid: []
      }
    }
  },
  created () {
    this.getInfo()
    this.getAddUserForm()
  },
  methods: {
    async addheight () {
      const res = await this.axios.post('/categories', {
        cat_pid: this.selectId.cat_pid[this.selectId.cat_pid.length - 1],
        cat_name: this.selectId.cat_name,
        cat_level: this.selectId.cat_pid.length
      })
      this.dialogFormVisible = false
      this.getInfo()
      console.log(res)
    },
    currentChange (page) {
      this.pagenum = page
      this.getInfo(page)
    },
    addGoods () {
      this.dialogFormVisible = true
    },
    async getAddUserForm () {
      const res = await this.axios.get('categories', {params: {type: 2}})
      this.addUserList = res.data.data
      console.log(res)
    },
    async getInfo () {
      this.isloading = true
      const res = await this.axios.get('categories', {
        params: {
          type: 3,
          pagenum: this.pagenum,
          pagesize: 5}
      })
      this.categoriesList = res.data.data.result
      this.total = res.data.data.total
      this.isloading = false
    }
  }

}
</script>

<style>

</style>
