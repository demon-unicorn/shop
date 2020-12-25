<template>
  <div>
      <el-button type='primary' @click="add">添加</el-button>
    <v-add v-show="info.isShow" :info='info' ref='add'></v-add>
    <v-list @ed='edit($event)'></v-list>
  </div>
</template>

<script>
import vAdd from "./specs/add";
import vList from "./specs/list";
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
  components: {
    vAdd,
    vList,
  },
  methods:{
      add(){
          this.info.isShow=true
          this.info.isAdd=true
          this.info.title='添加规格'
      },
      edit(id){
          this.info.isShow=true
          this.info.isAdd=false
          this.info.title='修改规格'
          this.$refs.add.getDetail(id)
        
      }
  }
};
</script>

<style scoped>
.el-button{
    margin-top: 20px;
}
</style>