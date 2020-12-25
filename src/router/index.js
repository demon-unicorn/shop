import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import login from '../page/login.vue'
import index from '../page/index.vue'
import menu from '../page/menu.vue'
import home from '../page/home.vue'
import role from '../page/role.vue'
import manager from '../page/manager.vue'
import category from '../page/category.vue'
import specs from '../page/specs.vue'
import goods from '../page/goods.vue'

import store from '../store/index'

function fun(url) {
  return store.state.user.menus_url.some(i => i == url)
}
export default new Router({
  routes: [{
      path: "/login",
      component: login
    },
    {
      path: '/',
      component: index,
      children: [{
          path: 'menu',
          name: '菜单列表',
          component: menu,
          beforeEnter(to, from, next) {
            fun('menu') ? next() : next('/')
          }
        },
        {
          path: 'home',
          name: '首页',
          component: home,
        },
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'role',
          name: '角色列表',
          component: role,
          beforeEnter(to, from, next) {
            fun('role') ? next() : next('/')
          }
        },
        {
          path: 'manager',
          name: '用户列表',
          component: manager,
          beforeEnter(to, from, next) {
            fun('manager') ? next() : next('/')
          }
        },
        {
          path:'category',
          name:'商品分类',
          component:category,
          beforeEnter(to, from, next) {
            fun('category') ? next() : next('/')
          }
        },
        {
          path:'specs',
          name:'商品规格',
          component:specs,
          beforeEnter(to, from, next) {
            fun('specs') ? next() : next('/')
          }
        },
        {
          path:'goods',
          name:'商品管理',
          component:goods,
          beforeEnter(to, from, next) {
            fun('goods') ? next() : next('/')
          }
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})
