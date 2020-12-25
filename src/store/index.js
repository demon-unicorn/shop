import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import {state,mutations,getters} from './mutations'
import menu from './modules/menu'
import role from './modules/role'
import manager from './modules/manager'
import cate from './modules/cate'
import specs from './modules/specs'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        role,
        manager,
        cate,
        specs
    }
})


