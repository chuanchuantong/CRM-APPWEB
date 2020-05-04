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

export function selectByGZXS(){
	return http.post("/clue/selectByGZXS")
}

/**
 * 分页获取当前用户的线索
 * @param {Object} data
 */
export function selectAll(data){
	return http.post("/clue/selectAll",data)
}

export function selectAllResult(data){
	return http.post("/clue/selectAllResult",data)
}

export function selectClueResult(){
	return http.post("/clue/selectClueResult")
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

/**
 * 更新线索信息
 * @param {Object} data
 */
export function update(data){
	return http.post("/clue/update",data);
}