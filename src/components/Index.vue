<template>
  <el-container>
    <el-aside width="200px" style="border-right: #fff solid 1px"
      >对方对方的</el-aside
    >
    <el-container>
      <el-main>
        <el-row style="margin-left: 1.6rem">
          <el-col :span="8">
            <el-button-group>
              <el-button color="#626aef" style="color: white" size="mini"
                >最新</el-button
              >
              <el-button color="#626aef" style="color: white" size="mini"
                >最热</el-button
              >
              <el-button color="#626aef" style="color: white" size="mini"
                >最酷炫</el-button
              >
            </el-button-group>
          </el-col>
        </el-row>

        <el-row justify="space-between" :gutter="22">
          <el-col :span="7" v-for="(obj, i) in imgList" :key="i">
            <div class="img-item" align="center">
              <el-image
                :src="obj.urls.thumb"
                class="img"
                @click="previewImg(obj)"
                :preview-src-list="previewImgList"
              />
              <div class="img-desc">
                <el-row justify="space-between">
                  <el-col :span="3">
                    <el-icon :size="20"><star /></el-icon>
                  </el-col>
                  <el-col :span="14">
                    <span class="font14">1920x1080</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="font14">下载</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
  <!-- <el-dialog v-model="dialogTableVisible" title="图片详情" width="55%">
    <div class="large" v-if="largeImg">
      <el-image :src="largeImg" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="setWallpaperBtn">设置桌面</el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script>
import unsplash from "../utils/unsplash";
import { Star } from "@element-plus/icons";
export default {
  components: { Star },
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
      previewImgList: [],
    };
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    async getCollections() {
      let { results } = await unsplash.getCollections(1, 30, "");
      this.imgList = results;
      console.log(this.imgList);
    },
    previewImg(obj) {
      // this.dialogTableVisible = true;
      // this.currObj = obj;
      this.previewImgList[0] = obj.urls.regular;
      // this.largeImg = obj.urls.regular;
    },
    async setWallpaperBtn() {
      const resp = await unsplash.trackDownload(
        this.currObj.links.download_location
      );

      var { setWallPaperFunc } = require("../utils/setWallPaper");
      var ret = setWallPaperFunc(
        "D:\\wallpaper\\Mojave Day.jpg",
        true,
        function (err, val) {
          if (err) {
            throw err;
          } else {
            return val;
          }
        }
      );
      console.log(resp);
      console.log(ret);
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
