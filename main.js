import Vue from 'vue'
import App from './App'
import Router from './router'
import moment from 'moment/moment'
Vue.filter('moment', function(value, formatString) {
	formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
	return moment(value).format(formatString);

});

/**
 * 生成一个姓名的头像图片（Base64）
 * @param {stirng} name 用户的名（最多两个字）
 */
Vue.prototype.$userHead = name => {
	// const num = parseInt(Math.random() * 100);
	// const index = num % 10;
	// const bg = '#0081FF';
	// const w = 96;
	// const h = 96;
	// const fisname = name.slice(0, 1);
	// const can = uni.createCanvasContext("canvas");
	// can.canvasW = w;
	// can.canvasH = h;
	// can.setFillStyle('#0081FF')
	// can.fillRect(0,0,w,h)
	// can.font = "bold 40px 苹方";
	// can.setTextAlign("center")
	// can.fillText(fisname, w / 2, h / 2)

	// return can.draw(); 
	const num = parseInt(Math.random() * 100);
	const index = num % 10;
	const bg = '#0081FF';
	const w = 96;
	const h = 96;
	const fisname = name.slice(0, 1);
	const can = document.createElement("canvas");
	can.width = w;
	can.height = h;
	const _ctxt = can.getContext("2d");
	_ctxt.fillStyle = bg;
	_ctxt.fillRect(0, 0, w, h);
	_ctxt.font = "bold 40px 苹方";
	_ctxt.fillStyle = "#FFF";
	_ctxt.textAlign = "center";
	_ctxt.textBaseline = "middle";
	_ctxt.fillText(fisname, w / 2, h / 2);
	return can.toDataURL();
};


Vue.config.productionTip = false
import tabbarUtil from '@/utils/utils.js'
Vue.prototype.$eventHub = new Vue();
//新增的上啦和下拉加载更多组件
// 在main.js注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.prototype.$tabbarUtil = tabbarUtil
import scan from './components/scan.vue'

Vue.component('scan', scan)

import {
	RouterMount
} from 'uni-simple-router'
import myself from './pages/my/index.vue'
Vue.component('myself', myself)
import cluesmanage from './pages/clues/index.vue'
Vue.component('cluesmanage', cluesmanage)
import subordinate from './pages/subordinate/index.vue'
Vue.component('subordinate', subordinate)
import home from './pages/home/index.vue'
Vue.component('home', home)
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
App.mpType = 'app'
// import i18n from './language/index.js'
// Vue.prototype._i18n = i18n
const app = new Vue({
	// i18n,
	...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
