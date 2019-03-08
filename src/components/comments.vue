<template>
  <div class="comments">
    <div class="title">评论</div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 4}"
      placeholder="请输入内容"
      v-model="textarea"
    ></el-input>
    <el-button type="primary" @click="publishComment">发表评论</el-button>
    <ul class="comments-wrap">
      <li class="comments-list" v-for="(item,index) in comments" :key="index">
        <div class="comments-user">
          <div class="avatar">
            <img width="50" height="50" :src="changeImg(item.from.avatar)">
          </div>
          <div class="comments-userinfo">
            <div class="username">{{item.from.username}}</div>
            <div class="time">{{changeTime(item.created)}}</div>
          </div>
        </div>
        <div class="comments-content">
          <pre>{{item.content}}</pre>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { commentLists, publishComment } from "@/api/data";
import { mapState } from "vuex";
export default {
  data() {
    return {
      textarea: "",
      comments: []
    };
  },
  props: ["articleId"],
  mounted() {
    this.getComments();
  },
  computed: {
    ...mapState({ hasLogin: state => state.hasLogin })
  },
  methods: {
    getComments() {
      if (this.articleId) {
        commentLists(this.articleId).then(res => {
          if (res.data.comment.length > 0) {
            this.comments = res.data.comment;
          } else {
            this.comments = [];
          }
        });
      }
    },
    changeImg(url) {
      return process.env.ROOT + url;
    },
    changeTime(time) {
      return new Date(time).toLocaleString();
    },
    publishComment() {
      console.log(this.hasLogin);
      if (this.hasLogin) {
        if (this.textarea.trim()) {
          let data = {
            article: this.articleId,
            content: this.textarea.trim()
          };
          publishComment(data).then(res => {
            if (res.data.status == "1") {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.textarea = "";
              this.getComments();
            }
          });
        } else {
          this.$message({
            message: "评论不能为空",
            type: "info"
          });
        }
      } else {
        this.$message({
          message: "请先登陆",
          type: "info"
        });
      }
    }
  }
};
</script>
<style lang="scss">
.comments {
  width: 100%;
  margin-top: 10px;
  background: #fff;
  padding: 0 20px 10px;
  & > .title {
    text-align: center;
    font-size: 20px;
    line-height: 40px;
  }
  .el-textarea {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .comments-wrap {
    margin-top: 20px;
    .comments-list {
      border-top: 1px solid gray;
      padding: 10px 0;
      .comments-user {
        display: flex;
        .avatar {
          margin-right: 10px;
        }
        .comments-userinfo {
          .username {
            height: 25px;
            line-height: 25px;
          }
          .time {
            height: 25px;
            line-height: 25px;
            color: #bbb;
          }
        }
      }
      .comments-content {
        padding: 10px 0;
      }
    }
  }
}
</style>