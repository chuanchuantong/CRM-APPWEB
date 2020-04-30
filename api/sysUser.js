import http from '../utils/http.js'

/**
 * 获取下级
 */
export function getChildsByUserId(){
	return http.post("/system/getChildsByUserId")
}
 
 /**
  * 获取OA信息
  */
 export function selectByOA(){
 	return http.post("/system/selectByOA")
 }
  