// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
    routes: [...modules]//路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log('测试')
 console.log(to)
	  // let token = uni.getStorageSync("Token")
	  // if(token.length==0 || token == null){
		  // next({path:'/'})
	  // }else{
		 //  if(to.name!='login'){
		   next()
		 //  }
		 //  else{
			//  next({path:'/main'})
		 //  }
	  // } 
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	//uni.hideLoading()
})
export default router;