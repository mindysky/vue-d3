<!-- author:min date：2019/10/16  09:04:42 -->
<template>
  <div class="d3-box">
    <div class="tree-container">
      <h2>d3-bar2  <router-link to="/home" tag="a">主页</router-link></h2>
      <div id="tree" ref="tree">
        <svg class="bar2-chart" width="1280" height="500" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bar2",
  props: {},
  data() {
    return {};
  },
  mounted() {

  },
  methods: {
    // 绘制柱形
  },
  computed: {}
};
</script>

<style lang="scss">
.d3-box {
  width: 1280px;
  height: 100%;
  margin: 0 auto;
  background: pink;
}
.tree-container {
   height: 100%;
  #tree {
    height: 100%;
    background-color: rgba(240, 239, 239, 0.637);
  }
}
.bar-positive {
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
  fill: brown;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
</style>
