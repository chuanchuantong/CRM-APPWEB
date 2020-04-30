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
	return http.get("/clue/selectById?Id="+data)
}

/**
 * 分页获取当前用户的线索
 * @param {Object} data
 */
export function selectAll(data){
	return http.post("/clue/selectAll",data)
}

/**
 * XS查询销售经理待分线索
 */
export function selectByXSF(){
	return http.post("/clue/selectByXSF");
}

/**
 * 查询跟踪线索
 */
export function selectByXSG(){
	return http.post("/clue/selectByXSG");
}
