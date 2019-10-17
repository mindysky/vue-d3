<!-- author:min date：2019/10/16  17:50:56 -->
<template>
  <div class="d3-box">
    <div class="tree-container">
       <h2>d3-tree</h2>
      <router-link to="/home" tag="a">主页</router-link>
      <div class="controls">
        <div>
          <label>Chart width</label>
          <input type="range" v-model="settings.width" min="0" max="1000" />
        </div>

        <div>
          <label>Stroke color</label>
          <input type="color" v-model="settings.strokeColor" />
        </div>

        <div>
          <label>Search…</label>
          <input type="text" v-model="search" />
        </div>

        <button v-on:click="add">Add node</button>

        <div>Selected: {{ selected }}</div>
      </div>
     
      <div id="tree" ref="tree">
        <svg v-bind:width="settings.width" v-bind:height="settings.height">
          <!-- In contrast to D3’s "select" methods, we define the graphical elements explicitely here and use the template syntax to loop through collections and bind properties such as "d" or "r" to those elements. -->

          <transition-group tag="g" name="line">
            <!-- Links are represented as paths -->

            <path
              v-for="link in links"
              class="link"
              v-bind:key="link.id"
              v-bind:d="link.d"
              v-bind:style="link.style"
            />
          </transition-group>

          <!-- We can now also use events to elements that will call respective methods on the Vue instance -->

          <transition-group tag="g" name="list">
            <g
              class="node"
              v-on:click="select(index, node)"
              v-for="(node, index) in nodes"
              v-bind:key="node.id"
              v-bind:style="node.style"
              v-bind:class="[node.className, {'highlight': node.highlight}]"
            >
              <!-- Circles for each node -->

              <circle
                v-bind:r="node.r"
                v-bind:style="{'fill': index == selected ? '#ff0000' : '#bfbfbf'}"
              />

              <!-- Finally, text labels -->

              <text
                v-bind:dx="node.textpos.x"
                v-bind:dy="node.textpos.y"
                v-bind:style="node.textStyle"
              >{{ node.text }}</text>
            </g>
          </transition-group>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "Relation",
  props: {},
  data() {
    return {
      csv: null,
      selected: null,
      search: "force",
      settings: {
        strokeColor: "#19B5FF",
        width: 960,
        height: 2000
      }
    };
  },
  mounted() {
    var that = this;
    d3.csv("flare.csv", function(error, data) {
      if (error) throw error;

      // Load the CSV data
      // After the CSV has been loaded, the computed properties will automatically re-compute (root, tree, and then nodes & links…)

      that.csv = data;
    });
  },
  computed: {
    // once we have the CSV loaded, the "root" will be calculated

    root: function() {
      var that = this;

      if (this.csv) {
        var stratify = d3.stratify().parentId(function(d) {
          return d.id.substring(0, d.id.lastIndexOf("."));
        });

        // attach the tree to the Vue data object
        return this.tree(
          stratify(that.csv).sort(function(a, b) {
            return a.height - b.height || a.id.localeCompare(b.id);
          })
        );
      }
    },

    // the "tree" is also a computed property so that it is always up to date when the width and height settings change

    tree: function() {
      return d3
        .cluster()
        .size([this.settings.height, this.settings.width - 160]);
    },

    // Instead of enter, update, exit, we mainly use computed properties and instead of "d3.data()" we can use array.map to create objects that hold class names, styles, and other attributes for each datum

    nodes: function() {
      var that = this;
      if (this.root) {
        return this.root.descendants().map(function(d) {
          return {
            id: d.id,
            r: 2.5,
            className:
              "node" + (d.children ? " node--internal" : " node--leaf"),
            text: d.id.substring(d.id.lastIndexOf(".") + 1),
            highlight:
              d.id.toLowerCase().indexOf(that.search.toLowerCase()) != -1 &&
              that.search != "",
            style: {
              transform: "translate(" + d.y + "px," + d.x + "px)"
            },
            textpos: {
              x: d.children ? -8 : 8,
              y: 3
            },
            textStyle: {
              textAnchor: d.children ? "end" : "start"
            }
          };
        });
      }
    },

    // Instead of enter, update, exit, we mainly use computed properties and instead of "d3.data()" we can use array.map to create objects that hold class names, styles, and other attributes for each datum

    links: function() {
      var that = this;

      if (this.root) {
        // here we’ll calculate the "d" attribute for each path that is then used in the template where we use "v-for" to loop through all of the links to create <path> elements

        return this.root
          .descendants()
          .slice(1)
          .map(function(d) {
            return {
              id: d.id,
              d:
                "M" +
                d.y +
                "," +
                d.x +
                "C" +
                (d.parent.y + 100) +
                "," +
                d.x +
                " " +
                (d.parent.y + 100) +
                "," +
                d.parent.x +
                " " +
                d.parent.y +
                "," +
                d.parent.x,

              // here we could of course calculate colors depending on data but for now all links share the same color from the settings object that we can manipulate using UI controls and v-model

              style: {
                stroke: that.settings.strokeColor
              }
            };
          });
      }
    }
  },
  methods: {
    add: function() {
      this.csv.push({
        id: "flare.physics.Dummy",
        value: 0
      });
    },
    select: function(index, node) {
      this.selected = index;
    }
  }
};
</script>

<style lang="scss">
.node {
  opacity: 1;
}

.node circle {
  fill: #999;
  cursor: pointer;
}

.node text {
  font: 10px sans-serif;
  cursor: pointer;
}

.node--internal circle {
  fill: #555;
}

.node--internal text {
  text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
}

.link {
  fill: none;
  stroke: #555;
  stroke-opacity: 0.4;
  stroke-width: 1.5px;
  stroke-dasharray: 1000;
}

.node:hover {
  pointer-events: all;
  stroke: #ff0000;
}

.node.highlight {
  fill: red;
}

.controls {
  position: fixed;
  top: 16px;
  left: 16px;
  background: #f8f8f8;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.controls > * + * {
  margin-top: 1rem;
}

label {
  display: block;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.line-enter-active,
.line-leave-active {
  transition: all 2s;
  stroke-dashoffset: 0;
}
.line-enter, .line-leave-to /* .list-leave-active for <2.1.8 */ {
  stroke-dashoffset: 1000;
}
</style>
