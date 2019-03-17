import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Layout from "./views/layout/layout.vue";
import ShoppingGuide from "./views/shoppingGuide/shoppingGuide.vue";
import AddShopping from "./views/shoppingGuide/addShopping.vue";
import SpecialGuide from "./views/specialGuide/specialGuide.vue";
import AddSpecial from "./views/specialGuide/addSpecial.vue";
import SpecialInfor from "@/views/specialGuide/aboutSpecial/specialInfor.vue";
import SpecialGood from "@/views/specialGuide/aboutSpecial/specialGood.vue";
Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "layOut",
      redirect: "/shoppingGuide",
      component: Layout,
      children: [{
          path: "/shoppingGuide",
          name: "shoppingGuide",
          meta: ['导购管理', '导购列表'],
          component: ShoppingGuide
        }, {
          path: "/addshopping",
          name: "addShopping",
          meta: ['导购管理', '导购设置'],
          component: AddShopping
        }, {
          path: "/specialguide",
          name: "specialGuide",
          meta: ['专题管理', '专题列表'],
          component: SpecialGuide
        },
        // }, {
        //   path: "/addspecial",
        //   name: "addSpecial",
        //   meta: ['专题管理', '设置'],
        //   component: AddSpecial
        // },
        {
          path: '/specialinfor',
          name: 'infor',
          meta: ['专题管理', '信息'],
          component: SpecialInfor
        },
        {
          path: '/specialgood',
          name: 'goods',
          meta: ['专题管理', '商品'],
          component: SpecialGood
        }
      ]
    }

    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});