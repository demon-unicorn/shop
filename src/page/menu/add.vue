<template>
  <div>
    <el-dialog title="添加菜单" :visible.sync="info.isShow">
      <el-form>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="0">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if='form.type==1'>
          <el-select v-model="form.icon">
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option
              v-for="item in icon"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url">
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option
              v-for="item in url"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"  v-if='info.isAdd' @click="updata">修 改</el-button>
        <el-button type="primary" @click="queding" v-else>确 定</el-button>
        
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAddMenu ,requestListData,requestUpdataList,requestMenuDetail} from "../../utill/request";
import { successAlert, warnAlert } from "../../utill/alert/alert";
import {mapGetters,mapActions} from 'vuex'
export default {
  props: ["info"],

  data() {
    return {
      dialogFormVisible: true,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
      icon: [
        "el-icon-eleme",
        "el-icon-s-tools",
        "el-icon-s-help",
        "el-icon-s-home",
        "el-icon-menu",
      ],
      url: ["home", "menu", "role", "manager", "category", "specs", "goods","member","banner","seckill"],
     
    };
  },
  computed:{
...mapGetters({
  list:'menu/list'
})
  },
  methods: {
    ...mapActions({
      requestListData:'menu/getListAction'
    }),
    cancel() {
      this.info.isShow = false;
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    queding() {
      requestAddMenu(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestListData();
        } else {
          warnAlert(res.data.msg);
        }
      });
    },
    getDetail(id){
      requestMenuDetail({id:id}).then(res=>{
        this.form=res.data.list
        this.form.id=id
      })
    },
    updata(){
       requestUpdataList(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestListData();
          // console.log(id);
        } else {
          warnAlert(res.data.msg);
        }
      });
    }
   
  },
   mounted() {
      this.requestListData();
    },
};
</script>

<style>
</style>