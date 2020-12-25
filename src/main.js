// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/reset.css'

//全局组件
import commonConponents from './components/index'

for (let i in commonConponents) {
  Vue.component(i, commonConponents[i])
}

//全局过滤
import filters from './filters/index'

for (let i in filters) {
  Vue.filter(i, filters[i])
}

//引入store
import store from './store/index.js'

//element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.PP='http://localhost:3000'

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store
})
