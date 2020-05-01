import axios from '@/js_sdk/gangdiedao-uni-axios'
import Router from '@/router'
/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("请求地址：" + req.url, req.data || req.params)
	}

	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	if (process.env.NODE_ENV === 'development') {
		console.log(`${res.config.url}响应结果：`, res)
	}
}

// 创建自定义接口服务实例
const http = axios.create({
	baseURL: 'http://localhost:6688',
	// baseURL: 'https://www.huimopei.com',
	timeout: 60000, // 不可超过 manifest.json 中配置 networkTimeout的超时时间
	// #ifdef H5
	withCredentials: true,
	// #endif
	headers: {
		'Content-Type': 'application/json',
		//'X-Requested-With': 'XMLHttpRequest',
	},
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
	uni.showLoading({
		title: "正在加载中",
		mask: true
	})
	// code...
	// 获取本地存储的Cookie
	const cookie = uni.getStorageSync('Token')
	// 设置Cookie
	config.headers.Authorization = cookie
	_reqlog(config)
	return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
	uni.hideLoading();
	console.log("拦截器",response)

	
	
	_reslog(response)

	// code...
	// 获取cookie
	// let headerStr = JSON.stringify(response.headers)
	// let cookie = (/(?:Set-Cookie).+;/.exec(headerStr)[0]).replace(/Set-Cookie|:|"/g, "")
	// if (cookie) {
	// uni.setStorage({
	// key: 'cookie',
	// data: cookie.split(';')[0]
	// })
	// }

	return response.data
}, error => {
	uni.hideLoading();
	if (error.response) {
		// console.log(error.response)
		// if (error.response.status == 500) {
		// 	uni.showToast({
		// 		title: "登录超时，请重新登录",
		// 		icon: "none"
		// 	});
			
		// }
		if (error.response.status == 500) {
			uni.showModal({
				title:"系统提示",
				content:"登录超时请重新登录",
				confirmText:"确定",
				showCancel:false,
				success:function(){
					 uni.removeStorageSync("Token")
					//#ifdef APP-PLUS 
					Router.push({
						name: 'login'
					});
					//#endif
					
					//#ifdef H5 
					Router.push("/");
					//#endif
					return
				}
			})
			
		}
		if (error.response.status == 502) {
			uni.showToast({
				title: "服务器异常",
				icon: "none"
			});
			
		}
		console.log(error.response.status)
		if (error.response.status == 404) {
			uni.showToast({
				title: "服务器异常",
				icon: "none"
			});
		}
	}

	return Promise.reject(error.message)
})

export default http
