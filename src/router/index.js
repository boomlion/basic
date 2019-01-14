import Vue from 'vue'
import Router from 'vue-router'
import roles from '@/components/roles/roles'
import rights from '@/components/rights/rights'
import goods from '@/components/goods/goods'
import categories from '@/components/categories/categories'
import goodsAdd from '@/components/goods-add/goods-add'
// import user from '@/components/user/user'
const users = r => require.ensure([], () => r(require('@/components/user/user')))
const login = l => require.ensure([], () => l(require('@/components/login/login')))
const home = h => require.ensure([], () => h(require('@/components/home/home')))

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/users',
          name: 'users',
          component: users
        },
        {
          path: '/rights',
          name: 'rights',
          component: rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: roles
        },
        {
          path: '/categories',
          name: 'categories',
          component: categories
        },
        {
          path: '/goods/:id?',
          name: 'goods',
          component: goods
        },
        {
          path: '/goods-add',
          name: 'goodsAdd',
          component: goodsAdd
        }
      ]
    }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
