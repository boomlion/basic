#基本就是看文档

```
记忆最深的就是----
级联菜单---除了数组的关联之外
还要配置props属性，就是现实的属性值和属性名，
选择的value值
v-model记性绑定

一个数组进行接收
```

#element-ui-tree的使用
```
引入
npm i element-ui-tree
需要这样的偶文档里面有
Vue.component(ElementTreeFrid.name, ElementTreeFrid)

在使用的
  :indentSize="30"
  //首行缩进
              file-icon="icon icon-file"
              //icon
              folder-icon="icon icon-folder"
              //树的关键词，打开不重复
              tree-key="cat_id"
              //可以收回的关键词不设置无法收回
              parent-key="cat_pid"
              //每一个层级的层技数
              level-key="cat_level"
              //根据什么来区分孩子层级
              child-key="children"
              //显示的以什么来区分
              prop="cat_name"
              label="分类名称"
              width="220"

  仔细看文档还是可以懂一点没必要看老师的
  特别是number的时候，自我建议绑定的v-bind最好哦
```

#富文本编辑器---vue-quill-editor
直接下载 引入就好了，然后利用v-model进行绑定值
接受更改css的属性

#hash值的坑
因为path是系统返回的，所以你在利用动态设置的page的时候进行再次跳转是失败的
```
原因就是带/的hash在 进行子路由的跳转的时候，是直接替代的，并没有记性在后面进行直接挂接
如果没带/  你就会发现  goods/2  在进行点击跳转的时候，直接在后面拼接
goods/goods-add
你本身设置的this.$route.params就会监听到误以为 是参数然后进行本页面跳转

所以把系统的hash值进行修改添加/就可以
```

#step和tal的 使用

设置他们的值记性分类管理，在跳转下一步的时候，进行统一设置，
