<template>

	<view class="createClue">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true" :indexV="'myclues'">
				<block slot="content">新建线索</block>
			</cu-custom>

			<form class="fromClass">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						基本信息	
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>线索名称</view>
					<input v-model="cluesInfo.shorthand" placeholder="请输入线索名称，如加州凯美瑞1w预算" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>线索来源</view>
					<input v-model="cluesInfo.source" placeholder="请输入线索来源，如朋友推荐，学校活动" name="input"></input>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>客户信息
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>客户姓名</view>
					<input v-model="cluesInfo.customername" placeholder="请输入客户姓名" name="input"></input>
				</view>
				<!-- <view class="cu-form-group">
				<view class="title"><text class="required">*</text>客户级别</view>
				<input v-model="cluesInfo.level" placeholder="请输入客户级别" name="input"></input>
			</view> -->
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>客户行业</view>
					<input v-model="cluesInfo.industry" placeholder="请输入客户的身份，如学生，已经工作" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>联系方式</view>
					<input v-model="cluesInfo.contactinfo" placeholder="请输入客户的微信号/电话号码/邮箱" name="input"></input>
				</view>
				<!-- <view class="cu-form-group">
				<view class="title"><text class="required">*</text>邮箱</view>
				<input v-model="cluesInfo.email" placeholder="请输入邮箱" name="input"></input>
			</view> -->
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>学校地区</view>
					<input v-model="cluesInfo.customeraddress" placeholder="请输入客户所在学校或地区，如哥伦布，南加大" name="input"></input>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>需求信息
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>意向车型</view>
					<input v-model="cluesInfo.intentioncar" placeholder="请输入意向车型，如宝马4系" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title usertrait"><text class="required">*</text>需求</view>
					<textarea v-model="cluesInfo.needs" maxlength="500" placeholder="请输入需求，如实用，两门，远程启动"></textarea>
				</view>
				<view class="cu-form-group">

					<view class="title"><text class="required">*</text>预算</view>
					<input v-model="cluesInfo.budget" placeholder="请输入预算，如2万" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>是否持币</view>
					<input v-model="cluesInfo.isholdcash" placeholder="请输入是否持币，如父母已打钱，准备贷款" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>现有车型</view>
					<input v-model="cluesInfo.exitscar" placeholder="请输入现有车型，如无可填写“无”" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>计划买车时间</view>
					<input v-model="cluesInfo.plantime" placeholder="请输入计划买车时间，如01/09/2020，开学后" name="input"></input>
				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="userinfo.rolecode=='XS'">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						审核信息
					</view>
				</view>
				<view class="cu-form-group" @click="showModal" v-if="userinfo.rolecode=='XS'">
					<view class="title"><text class="required">*</text>选择产品专员</view>

					<view class="action">
						{{userName!=''?userName:'请选择'}}
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-form-group"  v-if=" userinfo.rolecode=='XS'">
					<view class="title"><text class="required">*</text>客户级别</view>
					<radio-group class="block" @change="radioChange">
						<radio class='round blue margin-left-sm' :checked="leave=='A+'?true:false" value="A+"></radio>A+
						<radio class='round blue margin-left-sm' :checked="leave=='A'?true:false" value="A"></radio>A
						<radio class='round blue margin-left-sm' :checked="leave=='A-'?true:false" value="A-"></radio>A-
					</radio-group>
				</view>
				<view class="cu-form-group"  v-if=" userinfo.rolecode=='XS'">
					<view class="title usertrait"><text class="required">*</text>客户特点</view>
					<textarea v-model="cluesInfo.custyles" maxlength="500" placeholder="请输入客户特点"></textarea>
				</view>
				<view class="cu-form-group"  v-if=" userinfo.rolecode=='XS'">
					<view class="title usertrait">备注</view>
					<textarea v-model="cluesInfo.remarks" maxlength="500" placeholder="请输入备注"></textarea>
				</view>

				<view class="cu-form-group">
					<button class="cu-btn bg-green" @click="saveclueinfo(true)">
						<text v-if="saveBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
						暂存
					</button>
					<button class="cu-btn bg-green" @click="saveclueinfo(false)">
						<text v-if="submitBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
						提交
					</button>
					<button class="cu-btn bg-green" @click="submitclueinfo(false)" v-if="userinfo.rolecode=='XS'">
						<text v-if="submitBtnLoading1" class="cuIcon-loading2 cuIconfont-spin"></text>
						一键提交
					</button>
				</view>
			</form>
		</scroll-view>
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="search">
					<view class="box">
						<view class="cu-bar search bg-white">
							<view class="search-form round">
								<text class="cuIcon-search"></text>
								<input v-model="userName" type="text" placeholder="请输入人员名称" confirm-type="search"></input>
							</view>
							<view class="action">
								<button @click="searchUser" class="cu-btn bg-green shadow-blur round">搜索</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item" @tap="hideModal" :data-name="item.nickname" :data-id="item.id" v-for="(item,index) in userOAs"
				 :key="index">
					<view class="content">
						<text class="text-grey">{{item.nickname}}({{item.usercode}})</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<div class="entry"></div>

	</view>
</template>

<script>
	var graceChecker = require("@/js_sdk/graceui-dataChecker/graceChecker.js")
	import {
		insertclue,
		searchclues,
		xsInsert
	} from '../../../../api/clues.js'
	import dictionary from '../../../../utils/dictionary.js'
	import Router from '@/router'
	import {
		selectByOA
	} from '@/api/sysUser.js'
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'
	export default {
		components: {
			EvanSteps,
			EvanStep
		},
		data() {
			return {
				//线索对象
				cluesInfo: {
					id: -1,
					shorthand: '',
					source: '',
					customername: '',
					customeraddress: '',
					contactinfo: '',
					industry: '',
					intentioncar: '',
					needs: '',
					budget: '',
					isholdcash: '',
					exitscar: '',
					plantime: '',
					level: '',
					email: '',
					cstatus: dictionary.cluesStatus.save, //线索状态
				},
				userOAs: [],
				modalName: '',
				leave: '',
				userName: '',
				isRotate: false, //是否加载旋转
				saveBtnLoading: false,
				submitBtnLoading: false,
				submitBtnLoading1:false,
				userinfo:[]
			};
		},
		created() {
			//#ifdef APP-PLUS
			this.userinfo = uni.getStorageSync("data")
			//#endif
			//#ifdef H5
			this.userinfo = JSON.parse(localStorage.getItem("data"));
			//#endif
			var _this = this;
		    
			var id = _this.$Route.query.clueid;
			if (id) {
				_this.cluesInfo.id = id;
				searchclues(id).then(response => {
					if (response.code == 200) {
						_this.cluesInfo = response.data;
						let oaname =response.data.oaid>0?response.data.oaname:"" ;
						let level =response.data.level ;
						this.userName = oaname;
						this.leave = level;
						console.log("ghjkhj", _this.cluesInfo)
					}
				}).finally(response => {
					console.log("获取线索信息失败", response)
				})
			}
			selectByOA().then(res => {
				this.userOAs = res.data
			})
		},
		methods: {
			submitclueinfo(){
				var _this = this;
				//登录
				if (_this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				_this.isRotate = true;
				
				var rule = []; 
					_this.submitBtnLoading1 = true;
					_this.cluesInfo.cstatus = dictionary.cluesStatus.submit;
					rule = [{
							name: "shorthand",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入线索名称"
						},
						{
							name: "source",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入线索来源"
						},
						{
							name: "customername",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入客户姓名"
						},
						{
							name: "customeraddress",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入学校地区"
						},
						{
							name: "contactinfo",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入联系方式"
						},
						{
							name: "industry",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入客户行业"
						},
						{
							name: "intentioncar",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入意向车型"
						},
						{
							name: "needs",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入需求"
						},
						{
							name: "budget",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入预算"
						},
						{
							name: "isholdcash",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入是否持币"
						},
						{
							name: "exitscar",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入现有车型"
						},
						{
							name: "plantime",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入计划买车时间"
						},
						// {
						// 	name: "level",
						// 	checkType: "notnull",
						// 	checkRule: "",
						// 	required: true,
						// 	errorMsg: "请输入客户级别"
						// },
						// {
						// 	name: "email",
						// 	checkType: "notnull",
						// 	checkRule: "",
						// 	required: true,
						// 	errorMsg: "请输入邮箱"
						// },
					]; 
				console.log(_this.cluesInfo)
				var checkRes = graceChecker.check(_this.cluesInfo, rule);
				if (checkRes) {
					_this.cluesInfo.cstatus = 2;
					//新增线索接口
					xsInsert(_this.cluesInfo).then(response => { 
						_this.submitBtnLoading1 = false;
						_this.isRotate = false;
						var message = '一键提交';
						if (response.code != 200) {
							uni.showToast({
								title: (message + '线索异常请稍后再试'),
								icon: "none"
							});
							_this.isRotate = false;
							return;
						}
						uni.showToast({
							title: (message + '成功'),
							icon: "none",
							success: function() {
				
								// #ifdef H5
								_this.$router.push("main")
								//#endif
				
								//#ifdef APP-PLUS
								Router.replaceAll({
									name: 'main'
								});
								// #endif
							}
						});
					}).finally(response => {
						_this.saveBtnLoading = false;
						_this.submitBtnLoading = false;
						_this.isRotate = false
					})
				} else {
					_this.saveBtnLoading = false;
					_this.submitBtnLoading = false;
					_this.isRotate = false;
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			hideModal(e) {
				this.modalName = null;
				console.log(e)
				this.userName = e.currentTarget.dataset.name;
				this.cluesInfo.oaid = e.currentTarget.dataset.id;
			},
			showModal() {
				this.modalName = 'viewModal';
			},
			radioChange(e) {
				var _this = this;
				_this.cluesInfo.level = e.detail.value;
				console.log(_this.leave)
			},
			saveclueinfo(isSave) {
				var _this = this;
				//登录
				if (_this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				_this.isRotate = true;

				var rule = [];
				if (!isSave) {
					_this.submitBtnLoading = true;
					_this.cluesInfo.cstatus = dictionary.cluesStatus.submit;
					rule = [{
							name: "shorthand",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入线索名称"
						},
						{
							name: "source",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入线索来源"
						},
						{
							name: "customername",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入客户姓名"
						},
						{
							name: "customeraddress",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入学校地区"
						},
						{
							name: "contactinfo",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入联系方式"
						},
						{
							name: "industry",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入客户行业"
						},
						{
							name: "intentioncar",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入意向车型"
						},
						{
							name: "needs",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入需求"
						},
						{
							name: "budget",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入预算"
						},
						{
							name: "isholdcash",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入是否持币"
						},
						{
							name: "exitscar",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入现有车型"
						},
						{
							name: "plantime",
							checkType: "notnull",
							checkRule: "",
							required: true,
							errorMsg: "请输入计划买车时间"
						},
						// {
						// 	name: "level",
						// 	checkType: "notnull",
						// 	checkRule: "",
						// 	required: true,
						// 	errorMsg: "请输入客户级别"
						// },
						// {
						// 	name: "email",
						// 	checkType: "notnull",
						// 	checkRule: "",
						// 	required: true,
						// 	errorMsg: "请输入邮箱"
						// },
					];
				} else {
					_this.saveBtnLoading = true;
					_this.cluesInfo.cstatus = dictionary.cluesStatus.save;
					rule = [{
						name: "shorthand",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入线索名称"
					}];
				}
				console.log(_this.cluesInfo)
				if(isSave){
					if(this.userinfo.rolecode=="XS")
					{
						_this.cluesInfo.cstatus=-2;
					}
				}else{
					if(this.userinfo.rolecode=="XS")
					{
						if(_this.cluesInfo.oaid<=0){
							uni.showToast({
								title:  '请选择产品专员',
								icon: "none"
							});
							_this.isRotate = false;
							return;
						}
						if(_this.cluesInfo.level=="" || _this.cluesInfo.level==null){
							uni.showToast({
								title:  '请选择客户级别',
								icon: "none"
							});
							_this.isRotate = false;
							return;
						} 
						_this.cluesInfo.cstatus=1;
					}
				}
				var checkRes = graceChecker.check(_this.cluesInfo, rule);
				if (checkRes) {
					if(this.userinfo.rolecode=="XS")
					{
						//新增线索接口
						xsInsert(_this.cluesInfo).then(response => {
							_this.saveBtnLoading = false;
							_this.submitBtnLoading = false;
							_this.isRotate = false;
							var message = isSave ? '保存' : '提交';
							if (response.code != 200) {
								uni.showToast({
									title: (message + '线索异常请稍后再试'),
									icon: "none"
								});
								_this.isRotate = false;
								return;
							}
							uni.showToast({
								title: (message + '成功'),
								icon: "none",
								success: function() {
						
									// #ifdef H5
									_this.$router.push("main")
									//#endif
						
									//#ifdef APP-PLUS
									Router.replaceAll({
										name: 'main'
									});
									// #endif
								}
							});
						}).finally(response => {
							_this.saveBtnLoading = false;
							_this.submitBtnLoading = false;
							_this.isRotate = false
						})
					}else{
						//新增线索接口
						insertclue(_this.cluesInfo).then(response => {
							_this.saveBtnLoading = false;
							_this.submitBtnLoading = false;
							_this.isRotate = false;
							var message = isSave ? '保存' : '提交';
							if (response.code != 200) {
								uni.showToast({
									title: (message + '线索异常请稍后再试'),
									icon: "none"
								});
								_this.isRotate = false;
								return;
							}
							uni.showToast({
								title: (message + '成功'),
								icon: "none",
								success: function() {
						
									// #ifdef H5
									_this.$router.push("main")
									//#endif
						
									//#ifdef APP-PLUS
									Router.replaceAll({
										name: 'main'
									});
									// #endif
								}
							});
						}).finally(response => {
							_this.saveBtnLoading = false;
							_this.submitBtnLoading = false;
							_this.isRotate = false
						})
					}
					
				} else {
					_this.saveBtnLoading = false;
					_this.submitBtnLoading = false;
					_this.isRotate = false;
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.createClue {
		.fromClass{
			input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
			  color: #666;
			  font-size: 16px;
			}
		}
		.usertrait {
			margin-top: -96upx;
		}

		.cu-btn {
			width: 30% !important;
			margin-top: 10px !important;
			margin-bottom: 10px !important;
		}

		.cu-form-group .title {
			min-width: calc(6em + 40upx);
			text-align: right;
		}

		.cu-form-group .required {
			color: red;
			line-height: 60upx;
			margin-right: 10upx;
		}

		.cu-bar.btn-group uni-button {
			max-width: none !important;
		}
	}
	
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}
	
	.money {
		font-size: 30upx;
		display: flex;
	
		.symbol {
			margin-top: 13upx;
		}
	
		uni-input {
			font-size: 30upx;
			height: 2.4em !important;
		}
	}
	
	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}
	
	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}
	
	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}
	
	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}
	
	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}
	
	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}
	
	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}
	
	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}
	
	.DrawerPage .nav {
		flex: 1;
	}
	
	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}
	
	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}
	
	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
	
	.cu-form-group .title {
		min-width: calc(6em + 40upx);
		text-align: right;
	}
</style>
