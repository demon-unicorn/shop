import {
  requestSpecsList,requestSpecsCount
} from '../../utill/request'


const state = {
  list: [],
  count:0,
  page:1,
  size:2
}

const mutations = {
  changeList(state, arr) {
    state.list = arr
  },
  changePage(state, p) {
    state.page = p
  },
  changeCount(state, n) {
    state.count = n
  }
}

const actions={
    specsListActions(context){
       var params={
           size:context.state.size,
           page:context.state.page
       }

       requestSpecsList(params).then(res=>{
          if(res.data.code==200){
              if((res.data.list==null||res.data.list.length==0)&&context.state.page>1){
                  var page=context.state.page-1
                  context.commit('changePage',p)
                  context.dispatch('specsListActions')
                  return
              }
              context.commit('changeList',res.data.list)
          }
       })
    },
    countActions(context){
        requestSpecsCount().then(res=>{
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
        return  state.list
    },
    size(state){
        return  state.size
    },
     count(state){
        return  state.count
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
   namespaced:true
}