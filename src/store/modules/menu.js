import {
  requestListData
} from '../../utill/request'

const state = {
  list: []
}

const mutations = {
  getList(state, arr) {
    state.list = arr
  }
}

const actions = {
  getListAction(context) {
    requestListData({
      istree: true
    }).then(res => {
      context.commit('getList', res.data.list)
    })
  }
}

const getters={
    list(state){
        return state.list
    }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
