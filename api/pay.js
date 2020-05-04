import http from '../utils/http.js'



/**
 * 新增提现方式
 * @param {Object} data
 */
export function insertPayMethod(data){
	return http.post("/payMethod/insert",data)
}

/**
 * 获取提现方式列表
 */
export function getPayMethods(){
	return http.post("/payMethod/selectPayMethods")
}

/**
 * 根据id修改提现方式
 */
export function updatePayMethod(data){
	return http.post("/payMethod/update",data)
}


/**
 * 根据提现id获取提现方式信息
 */
export function getPayMethodById(data){
	console.log("此时data值为",data)
	return http.get("/payMethod/selectMethodById?Id="+data)
}

/**
 * 获取提现记录
 */
export function selectCapitalApply(){
	return http.post("/capitalApply/selectCapitalApply")
}

/**
 * 获取提现申请详情
 */
export function selectCapitalApplyDetail(data){
	return http.get("/capitalApply/selectCapitalApplyDetail?Id="+data)
}
/**
 * 新增提现申请
 */
export function capitalApply(data){
	return http.post("/capitalApply/insert",data)
}
