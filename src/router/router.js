import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home"
import Bar from "../views/Bar"
import Relation from "../views/Relation"


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);


const routes =  [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/bar",
    name: "bar",
    component: Bar
  },
  {
    path: "/relation",
    name: "relation",
    component: Relation
  }]

const router = new Router(
  {
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  }
)

/**
 * to:表示目标路由
 * from:表示来源路由
 * next:表示执行下一步操作
 */
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') { // 当路由为login时就直接下一步操作
//       next();
//   } else { // 否则就需要判断
//       if(sessionStorage.username){  // 如果有用户名就进行下一步操作
//         next()
//       }else{
//         next({path: '/login'})  // 没有用户名就跳转到login页面
//       }
//   }
// })

export default router;