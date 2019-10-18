<!-- author:min date：2019/10/16  17:50:56 -->
<template>
  <div class="d3-box">
    <div class="tree-container">
      <h2>d3-tree</h2>
      <router-link to="/home" tag="a">主页</router-link>

      <svg :width="this.width" :height="this.height" />
    </div>
  </div>
</template>

<script>
import { json } from "d3";
export default {
  name: "World",
  props: {},
  data() {
    return {
      csv: null,
      selected: null,
      search: "force",
      width: 0,
      height: 0
    };
  },
  mounted() {
    const svg = this.$d3.select("svg");
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    const margin = { top: 0, right: 50, bottom: 0, left: 75 };
    const innerWidth = this.width - margin.left - margin.right;
    const innerHeight = this.height - margin.top - margin.bottom;

    const treeLayout = this.$d3.tree().size([innerHeight, innerWidth]);

    const zoomG = svg
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g");

    const g = zoomG
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.call(
      this.$d3.zoom().on("zoom", () => {
        zoomG.attr("transform", event.transform);
      })
    );
    json("/world.json").then(res => {
      // res = JSON.parse(res);
      console.log(res);
      const root = this.$d3.hierarchy(res);
      const links = this.$d3.treeLayout(root).links();
      // const linkPathGenerator = this.$d3.linkHorizontal().x(d => d.y).y(d => d.x);

      g.selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("d", linkPathGenerator);

      g.selectAll("text")
        .data(root.descendants())
        .enter()
        .append("text")
        .attr("x", d => d.y)
        .attr("y", d => d.x)
        .attr("dy", "0.32em")
        .attr("text-anchor", d => (d.children ? "middle" : "start"))
        .attr("font-size", d => 3.25 - d.depth + "em")
        .text(d => d.data.data.id);
    });
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
