const dictionary ={
	//线索状态
	cluesStatus:{
		save:-1,//保存
		submit:0,//提交
		pending:1,//审核中
		complete:2,//完成
		fail:3,//失败
	},
	payMethodStatus:{
		"1":"银行卡",
		"2":"微信",
		"3":"支付宝"
	},
	capitalStatus:{
		"0":"等待中",
		"1":"已完成",
		"2":"失败"
	}
	
}

export default dictionary