import {
  requestManagerList,
  requestManagerCount
} from '../../utill/request'
const state = {
  list: [],
size:3,
page:1,
count:0
}

const mutations = {
  getManagerList(state, arr) {
    state.list = arr
  },
  changeCount(state,n){
    state.count=n
  },
  changePage(state,p){
    state.page=p
  }
}

const actions = {
  getManagerActions(context) {
    var params={
      size:context.state.size,
      page:context.state.page
    }
    requestManagerList(params).then(res => {
      if (res.data.code == 200) {
        if((res.data.list==null||res.data.list.length==0)&&context.state.page>1){
          var page=context.state.page-1
          context.commit('changePage',page)
          context.dispatch('getManagerActions')
          return 
        }
        context.commit('getManagerList', res.data.list)
      }

    })
  },
  countActions(context){
    requestManagerCount().then(res=>{
      if(res.data.code==200){
        context.commit('changeCount',res.data.list[0].total)
      }
    })
  },
  pageActions(context,p){
    context.commit('changePage',p)
  }
}

const getters={
    list(state){
        return state.list
    },
    count(state){
      return state.count
    },
    size(state){
      return state.size
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}