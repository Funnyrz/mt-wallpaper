<template>
  <router-view />
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
