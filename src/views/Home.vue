<!-- author:min date：2019/10/16  17:37:54 -->
<template>
    <div class="home">
      <router-link to="/home" tag="a" target="_blank">主页</router-link>
      <router-link to="/bar"  tag="a" target="_blank">柱状图</router-link>
      <router-link to="/relation"  tag="a" target="_blank">关系图</router-link>
      <router-link to="/relation2"  tag="a" target="_blank">关系图2</router-link>
      <router-link to="/home"  tag="a">主页</router-link>
      <router-link to="/home"  tag="a">主页</router-link>
    </div>
</template>

<script>
export default {
    name: "Home",
    props: {

    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>

<style lang="scss">
.home{
  width: 1000px;
  background: wheat;
  margin: 40px auto;
  height: 100%;
  overflow: hidden;
  padding: 30px;
  a{
    padding: 0 30px;
    font-size:16px;
  }
  a:hover{
    text-decoration: underline;
    color:blue;
  }
}

</style>
