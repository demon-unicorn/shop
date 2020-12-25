<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in attrArr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input v-model="item.value"></el-input>
          <el-button v-if="index == 0" type="primary" @click="addAttr"
            >新增规格属性</el-button
          >
          <el-button v-else type="danger" @click="delAttr(index)"
            >删除</el-button
          >
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="danger" @click="updata" v-else>修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  requestSpecsAdd,
  requestSpecsCount,
  requestSpecsDetail,
  requestSpecsUpdata,
} from "../../utill/request";
import { successAlert, warnAlert } from "../../utill/alert/alert";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "80px",
      attrArr: [{ value: "" }],
      form: {
        specsname: "",
        attrs: [],
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      requestSpecsList: "specs/specsListActions",
    }),
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    add() {
      if (this.attrArr.some((item) => item == "")) {
        warnAlert("规格不能为空");
        return;
      }
      this.form.attrs = this.attrArr.map((item) => item.value).join(",");
      this.form.attrs = "[" + this.form.attrs + "]";
      console.log(this.form.attrs);
      requestSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.requestSpecsList();
          this.requestSpecsCount();
        } else {
          warnAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestSpecsDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        var arr = this.form.attrs.split(",");
        console.log(arr);
        this.attrArr = [];
        for (let i in arr) {
          this.attrArr.push({ value: arr[i] });
        }
      });
    },
    updata() {
      if (this.attrArr.some((item) => item == "")) {
        warnAlert("规格不能为空");
        return;
      }
      this.form.attrs = this.attrArr.map((item) => item.value).join(",");
      requestSpecsUpdata(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestSpecsList();
      });
    },
    cancel() {
      (this.info.isShow = false),
        (this.form = {
          specsname: "",
          attrs: "",
          status: 1,
        });
      this.attrArr = [{ value: "" }];
    },
  },
};
</script>

<style>
</style>