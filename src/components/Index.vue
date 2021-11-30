<template>
  <div class="box-wrapper">
    <div class="img-list">
      <img
        v-for="(obj, i) in imgList"
        :key="i"
        :src="obj.urls.thumb"
        class="box"
        @click="previewImg(obj)"
      />
    </div>
  </div>
  <el-dialog v-model="dialogTableVisible" title="图片详情" width="55%">
    <div class="large" v-if="largeImg">
      <el-image :src="largeImg" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="setWallpaperBtn">设置桌面</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import unsplash from "../utils/unsplash";

export default {
  name: "Index",
  props: {
    msg: String,
  },
  data() {
    return {
      imgList: [],
      largeImg: "",
      dialogTableVisible: false,
      currObj: {},
    };
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    async getCollections() {
      let { results } = await unsplash.getCollections();
      this.imgList = results;
      console.log(this.imgList);
    },
    previewImg(obj) {
      this.dialogTableVisible = true;
      this.currObj = obj;
      this.largeImg = obj.urls.regular;
    },
    async setWallpaperBtn() {
      const resp = await unsplash.trackDownload(
        this.currObj.links.download_location
      );
      console.log(resp);
    },

    closeApp() {},
    toTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
@import "../assets/css/index.css";
</style>
