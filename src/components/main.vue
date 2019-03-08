<template>
  <div class="main">
    <div class="header-wrap">
      <div class="nav">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">one</el-menu-item>
          <el-menu-item index="3">two</el-menu-item>
          <el-menu-item index="4">three</el-menu-item>
          <el-menu-item index="5">four</el-menu-item>
          <el-menu-item index="6">five</el-menu-item>
        </el-menu>
      </div>
      <div class="reg-and-login">
        <div class="user-info" v-if="hasLogin">
          <el-button type="text">个人中心</el-button>
          <el-dropdown @command="logout">
            <span class="avatar-wrap">
              <img width="40" height="40" :src="changeImg(avatar)">
              <span>{{username}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退了</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <el-button type="text" @click="login">登陆</el-button>
          <el-button type="text" @click="reg">注册</el-button>
        </div>
      </div>
    </div>
    <div class="publish-article">
      <el-button type="primary" v-if="$route.name==='home'" @click="publishArticle">发表文章</el-button>
    </div>
    <login-and-reg ref="model"></login-and-reg>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="spanVal">
          <div class="grid-content bg-purple">
            <router-view/>
          </div>
        </el-col>
        <el-col :span="6" v-if="spanVal!=24">
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
import LoginAndReg from "./login-and-reg.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      spanVal: 18
    };
  },
  mounted() {
    this.getRoute();
  },
  computed: {
    ...mapState({
      username: state => state.username,
      hasLogin: state => state.hasLogin,
      avatar: state => state.avatar
    })
  },
  methods: {
    ...mapMutations({
      setLogout: "setLogout"
    }),
    handleSelect(key, keyPath) {
      this.$router.push({
        name: "home"
      });
    },
    login() {
      this.$refs.model.init(0);
    },
    reg() {
      this.$refs.model.init(1);
    },
    logout() {
      console.log("logout");
      this.setLogout();
    },
    changeImg(url) {
      return process.env.ROOT + url;
    },
    publishArticle() {
      this.$router.push({
        name: "publish-article"
      });
    },
    getRoute() {
      if (this.$route.name == "publish-article") {
        this.spanVal = 24;
      } else {
        this.spanVal = 18;
      }
    }
  },
  watch: {
    $route() {
      this.getRoute();
    }
  },
  components: {
    LoginAndReg
  }
};
</script>
<style lang="scss">
.main {
  & > .header-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 200px;
    background: #fff;
    .user-info {
      display: flex;
      .el-button {
        margin-right: 20px;
      }
      .avatar-wrap {
        display: flex;
        align-items: center;
      }
    }
  }
  & > .publish-article {
    text-align: right;
    margin-bottom: 20px;
    background: #fff;
    padding: 0 200px;
  }
  & > .content {
    padding: 0 200px;
    margin-bottom: 20px;
  }
}
</style>

