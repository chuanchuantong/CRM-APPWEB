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

export function selectByGZXS(data){
	return http.post("/clue/selectByGZXS",data)
}

/**
 * 分页获取当前用户的线索
 * @param {Object} data
 */
export function selectAll(data){
	return http.post("/clue/selectAll",data)
}

// export function selectAllResult(data){
// 	return http.post("/clue/selectAllResult",data)
// }

export function selectZYClueResult(data){
	return http.post("/clue/selectZYClueResult",data)
}

export function selectClueResult(data){
	return http.post("/clue/selectClueResult",data)
}

/**
 * XS查询销售经理待分线索
 */
export function selectByXSF(data){
	return http.post("/clue/selectByXSF",data);
}

/**
 * 查询跟踪线索
 */
export function selectByXSG(data){
	return http.post("/clue/selectByXSG",data);
}

/**
 * 更新线索信息
 * @param {Object} data
 */
export function update(data){
	return http.post("/clue/update",data);
}

export function updateold(data){
	return http.post("/clue/updateold",data);
}

/**
 * 销售经理提交
 * @param {Object} data
 */
export function xsInsert(data){
	return http.post("/clue/xsInsert",data);
}



/**
 * 获取审批记录日志
 * @param clueid data
 */
export function getApprovalNotice(data){
	return http.get("/approva/getlists?clueid="+data);
}