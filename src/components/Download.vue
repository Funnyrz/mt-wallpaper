<template>
  <el-main>
    <p class="font600">我的下载</p>
    <el-row v-for="downObj in downlaodQueue" :key="downObj.id" align="middle">
      <el-col :span="2"
        ><el-avatar shape="square" :size="50" :src="downObj.thumb"></el-avatar
      ></el-col>
      <el-col :span="21">
        <el-progress :percentage="50" />
        <div class="mt-10">{{ downObj.height }} x {{ downObj.width }}</div>
      </el-col>
      <el-col :span="1"
        ><el-icon><close-bold /></el-icon>
      </el-col>
      <el-divider></el-divider>
    </el-row>
  </el-main>
</template>

<script>
import { CloseBold } from "@element-plus/icons";
export default {
  components: { CloseBold },
  // props: { obj: { type: Object } },
  data() {
    return {
      downlaodQueue: {},
    };
  },
  mounted() {
    const storage = require("electron-json-storage");
    let download = storage.getSync("download");
    this.downlaodQueue = download;
  },
};
</script>

<style></style>
