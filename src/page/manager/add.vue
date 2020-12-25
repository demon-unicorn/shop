<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form>
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
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
        <el-button type="primary" v-if="info.isAdd" @click="updata"
          >修 改</el-button
        >
        <!-- <el-button type="primary" @click="queding" v-else>确 定</el-button> -->
        <el-button type="primary" @click="add" v-else>添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestAddManager,
  requestManagerDetail,
  requestUpdataManager,
  requestManagerCount
} from "../../utill/request";
import { successAlert, warnAlert } from "../../utill/alert/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },

  data() {
    return {
      formLabelWidth: "120px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    cancel() {
      this.info.isShow = false;
      this.form = {
        roleid: '',
        username: "",
        password: "",
        status: 1,
      };
    },
    ...mapActions({
      requestRoleList: "role/getListActions",
      requestManagerList: "manager/getManagerActions",
    }),
    add() {
      requestAddManager(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestManagerList()
          this.requestManagerCount()
        } else {
          warnAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestManagerDetail({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = id;
          this.form.password = "";
        }
      });
    },
    updata() {
      requestUpdataManager(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.cancel()
          this.requestManagerCount()
          this.requestManagerList() 
        }else{
          warnAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestRoleList();
    
  },
};
</script>

<style>
</style>