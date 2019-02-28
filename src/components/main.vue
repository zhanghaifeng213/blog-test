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
        <el-button type="text" @click="login">登陆</el-button>
        <el-button type="text" @click="reg">注册</el-button>
      </div>
    </div>
    <login-and-reg ref="model"></login-and-reg>
    <router-view/>
  </div>
</template>
<script>
import LoginAndReg from "./login-and-reg.vue";
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    login() {
      this.$refs.model.init(0);
    },
    reg() {
      this.$refs.model.init(1);
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
}
</style>

