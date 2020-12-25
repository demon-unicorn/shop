<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="defaultKey"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
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
        <el-button type="primary"  v-if='info.isAdd' @click="updata">修 改</el-button>
        <!-- <el-button type="primary" @click="queding" v-else>确 定</el-button> -->
        <el-button @click="addRole" v-else>添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestRoleList,
  requestAddRole,
  requestListData,
  requestRoleDetail,
  requestUpdataRole
} from "../../utill/request";
import { successAlert, warnAlert } from "../../utill/alert/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],

  data() {
    return {
      dialogFormVisible: true,
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
      defaultKey: [],
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      data: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      requestListData: "menu/getListAction",
      requestRoleList: "role/getListActions",
    }),
    cancel() {
      this.info.isShow = false;
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.defaultKey = this.$refs.tree.setCheckedKeys([]);
    },
    addRole() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestAddRole(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestListData();
          this.requestRoleList(); 
        } else {
          warnAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestRoleDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.defaultKey = JSON.parse(res.data.list.menus)
        }
      });
      
    },
    updata(id) {
        console.log(id);
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      requestUpdataRole(this.form).then((res) => {
        if (res.data.code == 200) {
           
          successAlert(res.data.msg);
          this.cancel();
          this.requestRoleList(); 
        } else {
          warnAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestListData();
    this.requestRoleList();
  },
};
</script>

<style>
</style>