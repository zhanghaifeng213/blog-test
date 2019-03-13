<template>
  <div class="personal">
    <el-menu default-active="2" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="1" :route="{name:'user'}">
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="2" :route="{name:'article'}">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" :route="{name:'comment'}">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4" :route="{name:'userface'}">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  methods: {}
};
</script>
<style lang="scss">
.personal {
  background: #fff;
  min-height: calc(100vh - 101px);
  display: flex;
  .el-menu {
    width: 200px;
  }
  .right-content {
    flex: 1;
    padding: 10px;
  }
}
</style>


