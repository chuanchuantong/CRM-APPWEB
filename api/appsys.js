import http from '../utils/http.js'

/**
 * 获取菜单权限
 * @param {Object} data
 */
export function getMenu(data){
	return http.post("/system/getAppMenu",data)
}