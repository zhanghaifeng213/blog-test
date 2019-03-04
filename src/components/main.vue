<template>
  <div>
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
    <login-and-reg ref="model"></login-and-reg>
    <router-view/>
  </div>
</template>
<script>
import LoginAndReg from "./login-and-reg.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  mounted() {},
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
      console.log(key, keyPath);
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
    }
  },
  components: {
    LoginAndReg
  }
};
</script>
<style lang="scss">
.header-wrap {
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
</style>

