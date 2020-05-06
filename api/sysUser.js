import http from '../utils/http.js'

/**
 * 获取下级
 */
export function getChildsByUserId(data) {
	return http.post("/system/getChildsByUserId",data)
}

/**
 * 获取OA信息
 */
export function selectByOA() {
	return http.post("/system/selectByOA")
}



/**
 * 更新用户信息
 */
export function updateNickNameById(data) {
	return http.post("/system/updateNickNameById", data)
}

/**
 * 获取角色集合
 */
export function selectRoleList() {
	return http.get("/role/selectRoleList")
}

/**
 * 通过角色id获取用户信息
 */
export function selectUserByRoleId(data) {
	
	return http.post("/system/selectUserByRoleId",data)
}

/**
 * 通过用户id获取销售经理信息
 */
export function queryUserXS(data) {
	
	return http.get("/system/queryUserXS?userid="+data)
}

/**
 * 更新权限组 销售经理 和账号状态
 */
export function updateRoleStatus(data) {
	
	return http.post("/system/updateRoleStatus",data)
}

export function getUserByUserId(userid){
	return http.get("/system/getUserByUserId?userid="+userid)
}