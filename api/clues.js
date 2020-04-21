import http from '../utils/http.js'

/**
 * 新增线索接口
 * @param {Object} data
 */
export function insertclue(data){
	return http.post("/clue/insert",data)
}
/**
 * 搜索线索接口
 * @param {Object} data
 */
export function searchclues(data){
	return http.post("/clue/selectById",data)
}