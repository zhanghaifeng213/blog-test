<template>
  <div class="userface">
    <el-upload
      class="upload-demo"
      action="http://116.62.147.91:3000/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList2"
      list-type="picture"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { changeImg } from "@/libs/tool";
export default {
  data() {
    return {
      fileList2: [
        {
          name: "food.jpeg",
          url: ""
        }
      ]
    };
  },
  computed: {
    ...mapState({
      avatar: state => state.avatar
    })
  },
  mounted() {
    this.initAvatar();
  },
  methods: {
    initAvatar() {
      console.log(this.avatar);
      this.fileList2 = [
        {
          name: "food.jpeg",
          url: ""
        }
      ];
      this.fileList2[0].url = changeImg(this.avatar);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      console.log(file);
    },
    onSuccess() {
      console.log("success");
      console.log(this.avatar);
      this.initAvatar();
    }
  }
};
</script>

