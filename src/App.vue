<template>
  <el-container class="main">
    <el-aside width="200px" style="border-right: #fff solid 1px">
      <el-menu
        default-active="1"
        background-color="#00000011"
        text-color="#fff"
        active-text-color="#ffd04b"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item-group>
          <template #title
            ><span class="main-text font400">在线壁纸</span></template
          >
          <el-menu-item index="1-1" @click="toIndex()">
            <span class="ml-15 font600">精选推荐</span></el-menu-item
          >
          <el-menu-item index="1-2">
            <span class="ml-15 font600">热门推荐</span></el-menu-item
          >
          <el-menu-item index="1-3">
            <span class="ml-15 font600">风景推荐</span></el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <template #title
            ><span class="main-text font400">我的壁纸</span></template
          >
          <el-menu-item index="2-1" @click="toDownload()">
            <span class="ml-15 font600">我的下载</span></el-menu-item
          >
          <el-menu-item index="2-2">
            <span class="ml-15 font600">我的收藏</span></el-menu-item
          >
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-container>
      <router-view />
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toDownload() {
      this.$router.push("/download");
    },
    toIndex() {
      this.$router.push("/index");
    },
  },
};
</script>

<style lang="stylus">
body{
  background-color: #909090;
}
</style>
