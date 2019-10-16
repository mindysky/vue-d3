<!-- author:min date：2019/10/16  09:04:42 -->
<template>
  <div class="d3-box">
    <div class="tree-container">
      <h2>d3-bar</h2>
      <div id="tree" ref="tree">
        <svg class="bar-chart" />
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "RelationTree",
  props: {},
  data() {
    return {};
  },
  mounted() {
    // 数据集
    let dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
    // 定义svg图形宽高，以及柱状图间距
    let svgWidth = 500,
      svgHeight = 300,
      barPadding = 5;
    // 通过图形计算每个柱状宽度
    let barWidth = svgWidth / dataset.length;

    // 绘制图形
    let svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    let barChart = svg
      .selectAll("rect")
      .data(dataset) //绑定数组
      .enter() // 指定选择集的enter部分
      .append("rect") // 添加足够数量的矩形
      .attr("y", d => svgHeight - d) // d为数据集每一项的值, 取y坐标
      .attr("height", d => d) // 设定高度
      .attr("width", barWidth - barPadding) // 设定宽度
      .attr("transform", (d, i) => {
        let translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
      });
    let text = svg
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(d => d)
      .attr("y", (d, i) => svgHeight - d - 2)
      .attr("x", (d, i) => barWidth * i)
      .attr("fill", "#A64C38");
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
  height: 380px;
  margin: 0 auto;
  background: pink;
}
.tree-container {
  #tree {
    height: 300px;
    background-color: wheat;
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
