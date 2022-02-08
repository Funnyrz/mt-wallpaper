<template>
  <el-main>
    <div
      style="position: fixed; right: 0; top: 0; width: 98%; z-index: 999"
      v-if="isDowning"
    >
      <el-progress :percentage="percentage" color="#626aef" />
    </div>
    <el-row justify="space-between">
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
      <el-col :span="6">
        <el-input
          v-model="searchKey"
          class="w-50 m-2"
          size="small"
          placeholder="请输入关键字搜索"
          @keyup.enter="searchWallpaper"
        />
      </el-col>
    </el-row>

    <el-row justify="space-between" v-loading="loading">
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
              <el-col :span="3" class="hand_mouse">
                <el-icon
                  :size="20"
                  v-if="collection.indexOf(obj.id)"
                  color="#fccf07"
                  ><star
                /></el-icon>
                <el-icon :size="20" color="#fccf07" v-else
                  ><star-filled
                /></el-icon>
              </el-col>
              <el-col :span="15">
                <span class="font14">{{ obj.width }}x{{ obj.height }}</span>
              </el-col>
              <el-col :span="3" class="hand_mouse down-btn">
                <el-icon title="下载并设置" @click="downloadPic(obj)"
                  ><download
                /></el-icon>
              </el-col>
              <!-- <el-col :span="3" class="hand_mouse">
                <el-icon title="下载并应用"><setting /></el-icon
              ></el-col> -->
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-main>
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
const storage = require("electron-json-storage");
const os = require("os");
storage.setDataPath(os.tmpdir());
import { Star, StarFilled, Download } from "@element-plus/icons";
import { ElMessage } from "element-plus";

export default {
  components: { Star, StarFilled, Download },
  name: "Index",
  props: {
    msg: String,
  },
  data() {
    return {
      imgList: [],
      largeImg: "",
      dialogTableVisible: false,
      collection: ["01_igFr7hd4"],
      currObj: {},
      previewImgList: [],
      percentage: 0,
      isDowning: false,
      loading: false,
      searchKey: "",
    };
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    async searchWallpaper() {
      this.loading = true;
      let { results } = await unsplash.searchPhotos(this.searchKey, 1, 30, "");
      this.loading = false;
      this.imgList = results;
    },
    async getCollections() {
      this.loading = true;
      let { results } = await unsplash.getCollections(1, 30, "");
      this.loading = false;
      this.imgList = results;
    },
    previewImg(obj) {
      // this.dialogTableVisible = true;
      // this.currObj = obj;
      this.previewImgList[0] = obj.urls.regular;
      // this.largeImg = obj.urls.regular;
    },
    async downloadPic(object) {
      let id = object.id;
      let downing = {
        id: object.id,
        width: object.width,
        height: object.height,
        thumb: object.urls.thumb,
        downUrl: object.links.download_location,
        size: 0,
        totalSize: 0,
      };
      if (this.isDowning) {
        ElMessage.error("当前已有下载任务,请稍后重试!");
        return;
      } else {
        ElMessage("已经开始下载!");
      }
      const resp = await unsplash.trackDownload(downing.downUrl);
      const leiDownload = require("lei-download");
      const source = resp.url;
      //渲染器进程代码
      const rootPath = require("path").resolve(__dirname, this.getResPath());
      // 用于获取进度通知的函数，可以省略
      const progress = (size, total) => {
        this.percentage = parseInt((size / total) * 100);
        console.log(`进度：${size}/${total}`);
      };
      let savePath = rootPath + "/" + id + ".jpg";
      this.isDowning = true;
      leiDownload(source, savePath, progress, (err, filename) => {
        if (err) {
          console.log(`出错：${err}`);
        } else {
          this.isDowning = false;
          console.log(`已保存到：${filename}`);
          this.setWallpaperBtn(filename);
        }
      });
      // this.$router.push({ path: "/download" });
    },
    getResPath() {
      if (process.env.NODE_ENV == "development") {
        return "../../../extraResources";
      } else {
        return process.resourcesPath + "/extraResources";
      }
    },
    download(object) {
      this.$router.push({ path: "/download", query: { obj: object } });
    },
    async setWallpaperBtn(path) {
      var { setWallPaperFunc } = require("../utils/setWallPaper");
      var ret = setWallPaperFunc(path, true, function (err, val) {
        if (err) {
          throw err;
        } else {
          this.$notify.success({
            title: "设置成功",
            message: "已成功设置为桌面壁纸!",
          });
          return val;
        }
      });
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
