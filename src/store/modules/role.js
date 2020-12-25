import {requestRoleList} from '../../utill/request'
const state = {
  list: []
}

const mutations = {
  getRoleList(state, arr) {
    state.list = arr
  }
}

const actions = {
  getListActions(context) {
    requestRoleList().then(res => {
      if (res.data.code == 200) {
        context.commit('getRoleList', res.data.list)
      }
    })
  }
}
const getters = {
  list(state) {
    return state.list
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
