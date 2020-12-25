<template>
  <div>
      <el-button type="primary" @click='add'>添加</el-button>
      <v-add :info='info' v-show='info.isShow' ref='add1'></v-add>
      <v-list @ed='edit($event)'></v-list>
  </div>
</template>

<script>
import vAdd from './category/add'
import vList from './category/list'
export default {
    data(){
        return {
            info:{
                isShow:false,
                title:'',
                isAdd:true
            }
        }
    },
components:{
    vAdd,
    vList
},
methods:{
    add(){
        this.info.isShow=true
        this.info.title='添加分类'
        this.info.isAdd=false
    },
    edit(id){
        this.info.isShow=true
        this.info.title='修改分类'
        this.info.isAdd=true
        this.$refs.add1.getDetail(id)
    }
}
}
</script>

<style scoped>
.el-button{
    margin-top: 20px;
}
</style>