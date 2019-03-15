<template>
  <div class="userface">
    <el-upload
      class="avatar-uploader"
      :action="actionUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button type="primary" @click="uploadAvatar">点击上传</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="700px" :modal-append-to-body="true">
      <div class="dialog-wrap">
        <div class="cropper-wrap">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :fixedBox="option.fixedBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :centerBox="option.centerBox"
            :high="option.high"
            :infoTrue="option.infoTrue"
            @realTime="realTime"
            @imgLoad="imgLoad"
            @cropMoving="cropMoving"
            :enlarge="option.enlarge"
            :mode="option.mode"
          ></vueCropper>
        </div>

        <div class="pre">
          <!-- <section class="pre-item">
						<p>固定大小 固定宽度100px</p>
						<section v-html="previews.html"></section>
          </section>-->
          <section class="pre-item">
            <p>头像预览</p>
            <div
              class="show-preview"
              :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
							'margin': '5px'}"
            >
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </section>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { changeImg } from "@/libs/tool";
import { VueCropper } from "vue-cropper";
import { uploadAvatar } from "@/api/data";
export default {
  data() {
    return {
      imageUrl: "",
      actionUrl:
        (process.env.NODE_ENV == "development"
          ? "/proxyApi"
          : process.env.ROOT) + "/upload",
      dialogVisible: false,
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},
      lists: [
        // {
        // 	img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
        // },
        {
          img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4"
        },
        {
          img: "http://cdn.xyxiao.cn/Landscape_1.jpg"
        },
        {
          img: "http://cdn.xyxiao.cn/Landscape_2.jpg"
        },
        {
          img: "http://cdn.xyxiao.cn/Landscape_3.jpg"
        },
        {
          img: "http://cdn.xyxiao.cn/Landscape_4.jpg"
        },
        {
          img: "http://cdn.xyxiao.cn/Portrait_1.jpg"
        },
        {
          img: "http://cdn.xyxiao.cn/Portrait_2.jpg"
        }
      ],
      option: {
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 200,
        autoCropHeight: 200,
        centerBox: false,
        high: true,
        cropData: {},
        enlarge: 1,
        mode: "contain"
      },
      example2: {
        img: "http://cdn.xyxiao.cn/Landscape_1.jpg",
        info: true,
        size: 1,
        outputType: "jpeg",
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 250,
        fixed: true,
        // 真实的输出宽高
        infoTrue: true,
        fixedNumber: [4, 3]
      },
      example3: {
        img: "http://cdn.xyxiao.cn/Landscape_1.jpg",
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      downImg: "#",
      previewStyle1: {},
      previewStyle2: {},
      code0: "",
      code1: "",
      code2: "",
      code3: "",
      preview3: ""
    };
  },
  computed: {
    ...mapState({
      avatar: state => state.avatar
    })
  },
  mounted() {},
  methods: {
    ...mapActions({ handleInfo: "handleInfo" }),
    initAvatar() {
      this.imageUrl = changeImg(this.avatar);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.handleInfo();
      this.$message({
        message: "头像上传成功",
        type: "success"
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.dialogVisible = true;
      // this.imageUrl = URL.createObjectURL(file);
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file);
      });

      return false;
    },
    // cropper 插件方法
    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img;
    },
    startCrop() {
      // start
      this.crap = true;
      this.$refs.cropper.startCrop();
    },
    stopCrop() {
      //  stop
      this.crap = false;
      this.$refs.cropper.stopCrop();
    },
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop();
    },
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh();
    },
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data);
          this.dialogVisible = false;
          this.modelSrc = img;
          this.imageUrl = this.modelSrc;
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.dialogVisible = false;
          this.modelSrc = data;
          this.imageUrl = this.modelSrc;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      var previews = data;
      var h = 0.5;
      var w = 0.2;
      this.previewStyle1 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: h
      };
      this.previewStyle2 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: w
      };
      this.previews = data;
    },
    finish2(type) {
      this.$refs.cropper2.getCropData(data => {
        this.model = true;
        this.modelSrc = data;
      });
    },
    finish3(type) {
      this.$refs.cropper3.getCropData(data => {
        this.model = true;
        this.modelSrc = data;
      });
    },
    down(type) {
      // event.preventDefault()
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      }
    },
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log(msg);
    },
    cropMoving(data) {
      this.option.cropData = data;
    },
    // 弹窗确认
    confirm() {
      this.finish("base64");
    },
    // 点击上传
    uploadAvatar() {
      const file = this.dataURLtoFile(this.modelSrc, "file.png");
      let data = new FormData();
      data.append("file", file);
      uploadAvatar(data).then(res => {
        if (res.data.status == 1) {
          this.handleInfo();
          this.$message({
            message: "头像上传成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "头像上传失败",
            type: "error"
          });
        }
      });
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: "image/png" });
    }
  },
  components: {
    VueCropper
  },
  watch: {
    avatar: {
      handler: function(after, before) {
        this.initAvatar();
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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

.dialog-wrap {
  display: flex;
  width: 400px;
  height: 400px;
  .cropper-wrap {
    flex: 0 0 400px;
    width: 400px;
    .pre-item {
      margin-left: 20px;
    }
  }
}
</style>
