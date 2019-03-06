<template>
  <div class="home">
    <div class="list-wrap">
      <div
        class="article-list"
        v-for="(item,index) in articleList"
        :key="index"
        @click="goDetail(item)"
      >
        <div class="avatar">
          <img width="45" height="45" :src="changeImg(item.author.avatar)">
        </div>
        <div class="description">
          <div class="line1">
            <el-tag size="small">{{item.tips}}</el-tag>
            <span v-html="item.title"></span>
          </div>
          <div class="line2">
            <span>{{item.author.username}}&nbsp;&nbsp;&nbsp;&nbsp;{{changeTime(item.updatedAt)}}</span>
            <span>
              <i class="el-icon-document"></i>
              {{item.commentNum}}
            </span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { articleList } from "@/api/data";
export default {
  data() {
    return {
      pageNum: 1,
      articleList: [],
      pageSize: 5,
      total: 0,
      currentPage: 1
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      articleList(this.pageNum).then(res => {
        this.articleList = res.data.artList;
        this.total = res.data.maxNum;
      });
    },
    changeImg(url) {
      return process.env.ROOT + url;
    },
    changeTime(time) {
      return new Date(time).toLocaleString();
    },
    currentChange(val) {
      this.pageNum = val;
      this.init();
    },
    goDetail(item) {
      this.$router.push({
        name: "article-detail",
        params: item
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  .list-wrap {
    background: #fff;
    .article-list {
      display: flex;
      height: 80px;
      border-bottom: 1px dotted #e2e2e2;
      align-items: center;
      .avatar {
        flex: 0 0 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .description {
        width: 100%;
        .line1 {
          display: block;
          max-width: 100%;
          overflow: hidden;
          margin-bottom: 5px;
        }
        .line2 {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 10px;
          box-sizing: border-box;
          color: gray;
          font-size: 12px;
        }
      }
    }
    .el-pagination {
      width: 100%;
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>
