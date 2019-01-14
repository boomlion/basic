<template>
  <div id="goods-add">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" description="基本信息"></el-step>
      <el-step title="步骤 2" description="图片信息"></el-step>
      <el-step title="步骤 3" description="商品内容"></el-step>
    </el-steps>
     <el-tabs tab-position="left" v-model="step" @tab-click="handleclick">
      <el-tab-pane label="基本信息" name='basic'>
        <!-- 基本信息的表单 -->
              <el-form ref="form" :model="addgoodsForm" label-width="80px">
                <el-form-item label="商品名称">
                  <el-input v-model="addgoodsForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                  <el-input v-model="addgoodsForm.goods_price"></el-input>
                </el-form-item>
                 <el-form-item label="商品重量">
                  <el-input v-model="addgoodsForm.goods_weight"></el-input>
                </el-form-item>
                 <el-form-item label="商品数量">
                  <el-input v-model="addgoodsForm.goods_number"></el-input>
                </el-form-item>
                 <el-form-item label="商品分类">
                    <el-cascader
                    v-model="addgoodsForm.goods_cat"
                    :options="addUserList"
                    :props="{value:'cat_id',label:'cat_name',children:'children'}"
                    change-on-select
                  ></el-cascader>
                </el-form-item>
                 <el-form-item label="是否促销">
                   <template>
                  <el-radio v-model="addgoodsForm.radio" label="true">是</el-radio>
                  <el-radio v-model="addgoodsForm.radio" label="false">否</el-radio>
                </template>
                </el-form-item>
              </el-form>
        <el-button type="success" @click="onepice(1,'ok')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name='ok'>
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="{Authorization:header}"
          :on-success="onsuccess"
          list-type="picture-card">
          <el-button size="small" class="avatar-uploader" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button type="success" @click="onepice(2,'roles')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name='roles'>
          <quill-editor
              v-model="addgoodsForm.goods_introduce"
              ref="myQuillEditor"
            >
    </quill-editor>
    <el-button type="success" @click="addgo">提交</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      step: 'basic',
      addUserList: [],
      ljl: [],
      addgoodsForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: 0,
        goods_cat: [],
        radio: 'false',
        pics: {},
        attrs: '',
        goods_introduce: ''
      }
    }
  },
  created () {
    this.getUserList()
  },
  computed: {
    header () {
      return localStorage.getItem('token')
    }
  },
  methods: {
    async addgo () {
      // const {
      //   goods_name,
      //   goods_cat,
      //   goods_price,
      //   goods_number,
      //   goods_weight,
      //   is_promote,
      //   goods_introduce,
      //   pics
      // } = this.addgoodsForm
      // await this.axios.post('goods', {
      //   goods_name,
      //   goods_cat: goods_cat.join(','),
      //   goods_price,
      //   goods_number,
      //   goods_weight,
      //   is_promote,
      //   goods_introduce,
      //   pics
      // })
      this.$router.push('/goods')
      this.$message({
        type: 'success',
        message: '提交成功了铁子'
      })
    },
    onsuccess (response, file, fileList) {
      this.addgoodsForm.pics.push({
        pic: response.data.tmp_path
      })
    },
    async getUserList () {
      const res = await this.axios.get('categories', {params: {type: 2}})
      this.addUserList = res.data.data
    },
    handleclick (to, from) {
      if (to._props.name === 'ok') {
        this.active = 1
      } else if (to._props.name === 'roles') {
        this.active = 2
      } else {
        this.active = 0
      }
    },
    onepice (num, step) {
      this.active = num
      this.step = step
    }
  }
}
</script>

<style scoped>

</style>
