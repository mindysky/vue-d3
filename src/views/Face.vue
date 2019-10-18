<!-- author:min date：2019/10/16  17:50:56 -->
<template>
  <div class="d3-box">
    <div class="tree-container">
      <h2>d3-tree</h2>
      <router-link to="/home" tag="a">主页</router-link>
      <div class="box">
        <svg :width="settings.width" :height="settings.height" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Face",
  props: {},
  data() {
    return {
      csv: null,
      selected: null,
      search: "force",
      settings: {
        strokeColor: "#19B5FF",
        width: 960,
        height: 500
      }
    };
  },
  mounted() {
    const svg = this.$d3.select("svg");

    const w = +svg.attr("width");
    const h = +svg.attr("height");

    const g = svg.append("g").attr("transform", `translate(${w / 2},${h / 2})`);
    const circle = g.append("circle");
    circle
      .attr("r", h / 2)
      .attr("fill", "yellow")
      .attr("stroke", "black");

    const eyeSpacing = 100;
    const eyeYOffset = -70;
    const eyeRadius = 30;
    const eyebrowWidth = 70;
    const eyebrowHeight = 20;
    const eyebrowYOffset = -70;

    const eyesG = g
      .append("g")
      .attr("transform", `translate(0, ${eyeYOffset})`);

    const leftEye = eyesG
      .append("circle")
      .attr("r", eyeRadius)
      .attr("cx", -eyeSpacing);

    const rightEye = eyesG
      .append("circle")
      .attr("r", eyeRadius)
      .attr("cx", eyeSpacing);

    const eyebrowsG = eyesG
      .append("g")
      .attr("transform", `translate(0, ${eyebrowYOffset})`);

    eyebrowsG
      .transition()
      .duration(2000)
      .attr("transform", `translate(0, ${eyebrowYOffset - 50})`)
      .transition()
      .duration(2000)
      .attr("transform", `translate(0, ${eyebrowYOffset})`);

    const leftEyebrow = eyebrowsG
      .append("rect")
      .attr("x", -eyeSpacing - eyebrowWidth / 2)
      .attr("width", eyebrowWidth)
      .attr("height", eyebrowHeight);

    const rightEyebrow = eyebrowsG
      .append("rect")
      .attr("x", eyeSpacing - eyebrowWidth / 2)
      .attr("width", eyebrowWidth)
      .attr("height", eyebrowHeight);

    const mouth = g.append("path").attr(
      "d",
      this.$d3.arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: (Math.PI * 3) / 2
      })
    );
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
</style>
