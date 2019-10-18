<!-- author:min date：2019/10/16  17:37:54 -->
<template>
  <div class="home">
    <h2>
      <router-link to="/home" tag="a" target="_blank">主页</router-link>
      <router-link to="/bar" tag="a" target="_blank">柱状图</router-link>
      <router-link to="/bar2" tag="a" target="_blank">柱状图2</router-link>
      <router-link to="/relation" tag="a" target="_blank">关系图</router-link>
      <router-link to="/face" tag="a" target="_blank">face</router-link>
      <router-link to="/world" tag="a" target="_blank">world</router-link>
      <router-link to="/Dendrogram" tag="a" target="_blank">Dendrogram</router-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
.home {
  width: 1000px;
  background: wheat;
  margin: 40px auto;
  height: 100%;
  overflow: hidden;
  padding: 30px;
  a {
    padding: 0 30px;
    font-size: 16px;
  }
  a:hover {
    text-decoration: underline;
    color: blue;
  }
}
</style>
