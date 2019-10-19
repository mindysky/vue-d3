<template>
  <div class="d3-box">
    <div class="tree-container" ref="box">
      <h2>d3-world</h2>
      <router-link to="/home" tag="a">主页</router-link>
      <svg />
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
    };
  },
  created(){
    
  },
  mounted() {
    const svg = this.$d3.select("svg");
    const width = this.$refs.box.clientWidth;
    const height = this.$refs.box.clientHeight;
    console.log(height);
    const margin = { top: 0, right: 50, bottom: 0, left: 75 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const treeLayout = this.$d3.tree().size([innerHeight, innerWidth]);

    const zoomG = svg
      .attr("width", width)
      .attr("height", height)
      .append("g");

    const g = zoomG
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.call(
      this.$d3.zoom().on("zoom", () => {
        zoomG.attr("transform", event.transform);
      })
    );
    json("./world.json").then(data => {
      console.log(data);
      const root = this.$d3.hierarchy(data);
      const links = treeLayout(root).links();
      const linkPathGenerator = this.$d3.linkHorizontal().x(d => d.y).y(d => d.x);

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
body {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  overflow: hidden;
}

path {
  fill: none;
  stroke: #56c2a3;
}

text {
  text-shadow:
   -1px -1px 3px white,
   -1px  1px 3px white,
    1px -1px 3px white,
    1px  1px 3px white;
  pointer-events: none;
  font-family: 'Playfair Display', serif;
}
</style>
