<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form>
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--清选择--" disabled value=""> </el-option>
            <el-option label="顶级菜单" value="0"> </el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.catename"
            autocomplete="off"
            class="aa"
          ></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" @click="updata" v-if="info.isAdd"
          >修 改</el-button
        >
        <!-- <el-button type="primary" @click="queding" v-else>确 定</el-button> -->
        <el-button @click="add" type="primary" v-else>添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestAddGood,
  requestListGood,
  requestGoodDetail,
  requestGoodUpdata,
} from "../../utill/request";
import { mapGetters, mapActions } from "vuex";
import { warnAlert, successAlert } from "../../utill/alert/alert";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "200px",
      imageUrl: "",
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    changeImg(e) {
      if (e.size > 2 * 1024 * 1024) {
        warnAlert("上传图片不能超过2M");
        return;
      }

      var ext = ["jpg", "gif", "jpeg", "png"];
      var ext1 = e.name.slice(e.name.lastIndexOf("."));
      if (ext.some((item) => item == ext1)) {
        warnAlert("上传文件格式不正确");
        return;
      }

      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    ...mapActions({
      requestListGood: "cate/goodListActions",
    }),
    add() {
      requestAddGood(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestListGood();
        } else {
          if (res.data.code == 403) {
            warnAlert(res.data.msg);
            this.$route.push("/login");
          } else {
            warnAlert(res.daat.msg);
          }
        }
      });
    },
    cancel() {
      this.info.isShow = false;
      (this.form = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      }),
        (this.imageUrl = "");
    },
    getDetail(id) {
      requestGoodDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.PP + this.form.img;
      });
    },
    updata() {
      console.log(1);
      requestGoodUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestListGood();
        } else {
          warnAlert(res.data.msg);
        }
      });
    },
  },

  mounted() {
    this.requestListGood();
    console.log(this.form);
  },
};
</script>

<style scoped>
.aa {
  width: 200px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed;
  border-color: #409eff;
}
.el-icon-plus {
  border: 1px dashed;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>