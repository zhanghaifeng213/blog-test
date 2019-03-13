<template>
  <div class="publish-article">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        :rules="rules"
        ref="formInline"
      >
        <el-form-item label="文章分类" prop="type">
          <el-select v-model="formInline.type" placeholder="文章分类">
            <el-option label="vue" value="vue"></el-option>
            <el-option label="react" value="react"></el-option>
            <el-option label="node" value="node"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formInline.title" placeholder="输入标题"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="tinymce">
      <Tinymce ref="tinymce" :id="'tinymce'" v-model="content"></Tinymce>
    </div>
    <div class="btn-wrap">
      <el-button type="primary" @click="publish">立即发布</el-button>
    </div>
  </div>
</template>
<script>
import Tinymce from "@/components/Tinymce";
import { publishArticle } from "@/api/data";
export default {
  data() {
    return {
      formInline: {
        type: "",
        title: ""
      },
      content: "",
      rules: {
        type: [{ required: true, message: "请选择文章分类", trigger: "blur" }],
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }]
      },
      tinymceHtml: "请输入内容",
      init: {
        language_url: "/static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/lightgray",
        height: 300,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false
      }
    };
  },
  mounted() {
    // tinymce.init({});
  },
  components: { Tinymce },
  methods: {
    publish() {
      if (this.content) {
        this.$refs.formInline.validate(valid => {
          if (valid) {
            let data = {
              content: this.content,
              tips: this.formInline.type,
              title: this.formInline.title
            };
            publishArticle(data).then(res => {
              if (res.data.status == 1) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.$router.push({
                  name: "home"
                });
              } else {
                this.$message({
                  message: "发表文章失败",
                  type: "error"
                });
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$message({
          message: "请输入文章内容",
          type: "error"
        });
      }
    }
  }
};
</script>
<style lang="scss">
.publish-article {
  background: #fff;
  padding: 20px;
  .title {
    margin-top: 20px;
    .el-form {
      .el-form-item {
        & + .el-form-item {
          margin-left: 40px;
        }
      }
    }
  }
  .btn-wrap {
    margin-top: 10px;
  }
}
</style>