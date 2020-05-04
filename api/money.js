import http from '../utils/http.js'

/**
 * 获取可提现金额
 * @param {Object} data
 */
export function queryAmountByUserId(){
	return http.post("/money/queryAmountByUserId")
} 

/**
 * 获取首页金额
 * @param {Object} data
 */
export function queryHomeAmount(){
	return http.post("/money/queryHomeAmount")
} 