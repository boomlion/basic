<template>
  <div id="goods">
    <el-button type="success" plain @click="$router.push('/goods-add')">添加商品</el-button>
  <el-table
    ref="singleTable"
    :data="goodsList"
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="goods_name"
      label="商品名称"
      width="120">
    </el-table-column>
    <el-table-column
      property="goods_price"
      label="商品价格"
      width="120">
    </el-table-column>
    <el-table-column
      property="goods_weight"
      label="商品重量">
    </el-table-column>
      <el-table-column
      property="add_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      label="操作">
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
  background
  layout="prev, pager, next"
  :total="total"
  :current-page="pagenum"
  :page-size="pagesize"
  @current-change="currentchange"
  >
</el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsList: [],
      total: 0,
      pagenum: 1,
      pagesize: 5
    }
  },
  created () {
    const num = this.$route.params.id
    this.getGoodsList(num)
  },
  methods: {
    currentchange (page) {
      this.$router.push(`/goods/${page}`)
      this.getGoodsList(page)
    },
    handleCurrentChange (page) {
      console.log(page)
    },
    async getGoodsList (pagenum = 1, query = '') {
      const res = await this.axios.get('goods', {params: {
        query,
        pagenum,
        pagesize: 5
      }})
      if (res.data.meta.status === 200) {
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum - 0
        console.log(this.pagenum)
      }
    }
  }
}
</script>

<style>

</style>
