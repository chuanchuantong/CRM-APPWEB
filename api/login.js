import http from '../utils/http.js'

/**
 * 登录接口
 * @param {Object} data
 */
export function login(data){
	return http.post("/system/login",data)
}