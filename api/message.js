import http from '../utils/http.js'

/**
 * 根据线索id获取操作记录信息
 * @param {Object} data
 */
export function getMessagesByClueId(data){
	return http.get("/message/getMessagesByClueId?clueId="+data)
}

/**
 * 获取当前登录人信息
 * @param {Object} data
 */
export function getMessagesByUserId(){
	return http.post("/message/getMessagesByUserId")
}

/**
 * 获取首页消息信息
 */
export function selectMessage(){
	return http.post("/tm/selectMess")
}

/**
 * 获取首页消息信息
 */
export function update(data){
	return http.post("/tm/update",data)
}