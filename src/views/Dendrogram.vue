<!-- author:min date：2019/10/18  18:07:27 -->
<template>
  <div class="d3-box">
    <div class="tree-container">
      <h2>d3-dendrogram</h2>
      <router-link to="/home" tag="a">主页</router-link>

      <svg :width="this.width" :height="this.height" />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
function autoBox() {
  const {x, y, width, height} = this.getBBox();
  return [x, y, width, height];
}
export default {
  name: "Dendrogram",
  props: {},
  data() {
    return {
      width: "1280",
      height: "500",
      data: {}
    };
  },
  mounted() {
    d3.json("./data/flare.json").then(data => {
      console.log(data);
      this.data = data;
    });



    const treeRoot = d3.hierarchy(data);
    d3.tree(treeRoot);
    const root = d3.tree(this.data);
    const svg = d3
      .create("svg")
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif")
      .style("margin", "5px");

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr(
        "d",
        d => `
        M${d.target.y},${d.target.x}
        C${d.source.y + root.dy / 2},${d.target.x}
         ${d.source.y + root.dy / 2},${d.source.x}
         ${d.source.y},${d.source.x}
      `
      );

    const node = svg
      .append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("fill", d => (d.children ? "#555" : "#999"))
      .attr("r", 2.5);

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", d => (d.children ? -6 : 6))
      .text(d => d.data.name)
      .filter(d => d.children)
      .attr("text-anchor", "end")
      .clone(true)
      .lower()
      .attr("stroke", "white");

    svg.node();

    svg.attr("viewBox", autoBox);
  },
  methods: {}
};
</script>

<style scoped lang="scss">
</style>
