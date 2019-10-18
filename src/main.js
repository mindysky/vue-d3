import Vue from "vue";
import App from "./App.vue";

// vue-router
import router from "./router/router";



// compatible for low version browser
import 'babel-polyfill';
if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;


import "./common/polyfill"

import "./common/validate"

import es6promise from "es6-promise"
es6promise.polyfill()

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

import VueUploadComponent  from "vue-upload-component"
Vue.component('file-upload', VueUploadComponent)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import VueD3 from "vue-d3"
Vue.use(VueD3);



Vue.config.productionTip = false;



new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
