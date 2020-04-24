import http from '../utils/http.js'

/**
 * 登录接口
 * @param {Object} data
 */
export function login(data){
	return http.post("/system/login",data)
}

/**
 * 注册接口
 * @param {Object} data
 */
export function reg(data){
	return http.post("/system/reg",data)
}

/**
 * 注册接口
 * @param {Object} data
 */
export function getUserInfo(){
	return http.post("/system/getUserById")
}