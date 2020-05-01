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
 