<template>
  <div class="container">
    <div class="image" v-for="data in list" :key="data.id">
      <img :src="data.thumbnail" alt="" class="image-item" />
    </div>
  </div>
</template>

<script>
import { getWallpaper } from "@arifszn/wallpaper-js";

export default {
  name: "Index-Page",
  data() {
    return { list: [] };
  },
  components: {},
  mounted() {
    this.getData();
  }
  , methods: {
    getData() {
      getWallpaper( {
        total: 20,
        allowNSFW:false
      }).then((result) => {
        console.table(result);
        this.list = result;
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

.image {
  flex-basis: 25%;
  padding: 10px 0;

}

.image-item {
  height: 60%;
  width: 70%;
  background-color: #fff;
  padding: 20px 12px;
}

.image :hover {
  cursor: pointer;
}
</style>
