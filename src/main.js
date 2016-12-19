import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(MintUI)

import store from './store/newstore'
import routes from "./config/routes.js" 

const router = new VueRouter({
	routes
})


// router.beforeEach(({meta, path}, from, next) => {
//     var { auth = true } = meta
//     var isLogin = store.state.user.id //true用户已登录， false用户未登录
//     console.log(isLogin);
//     if (auth && !isLogin && path!="/") {
//         return next({ path: '/login' })
//     }
//     next()
// })

//方案一
// const app = new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app')

// console.log(app.$route)

//方案二
const app = new Vue({ store, router, render: h => h(App) }).$mount('#app')


