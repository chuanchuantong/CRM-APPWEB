import http from '../utils/http.js'

/**
 * 获取下级
 */
export function getChildsByUserId(){
	return http.post("/system/getChildsByUserId")
}
 