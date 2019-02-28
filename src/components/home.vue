<template>
  <div class="home">
    <div class="publish-article">
      <el-button type="primary">发表文章</el-button>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <div class="list-wrap">
              <div class="article-list" v-for="i in 10" :key="i">
                <div class="avatar">
                  <img width="45" height="45" src="../assets/logo.png">
                </div>
                <div class="description">
                  <div class="line1">
                    <el-tag size="small">小型标签</el-tag>
                    <span>评论内容</span>
                  </div>
                  <div class="line2">
                    <span>admin 2019.02.28 21:23</span>
                    <span>
                      <i class="el-icon-document"></i>
                      2
                    </span>
                  </div>
                </div>
              </div>
              <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="gonggao">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>卡片名称</span>
                </div>
                <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss">
.home {
  .publish-article {
    text-align: right;
    margin-bottom: 20px;
    background: #fff;
    padding: 0 200px;
  }
  .content {
    padding: 0 200px;
    margin-bottom: 20px;
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
          .line2 {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-right: 10px;
            box-sizing: border-box;
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
}
</style>
