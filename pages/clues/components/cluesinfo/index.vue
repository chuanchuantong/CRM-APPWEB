<template>
	<view class="clueinfo">


		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">跟踪线索</block>
			</cu-custom>
			<view v-if="updateData.cstatus>-1 && updateData.cstatus!=2">
				<view class="positionLine"></view>
				<view class="cu-list menu sm-border">
				<view class="cu-item" @click="showOrHideClue(1)">
					<view class="content">
						<text class="text-grey">订单信息</text>
					</view>
					<view v-show="!showOrHide1" class="'text-grey cuIcon-unfold"></view>
					<view v-show="showOrHide1" class="'text-grey cuIcon-fold"></view>
				</view> 
				</view>
				<view class="cu-form-group"  v-show="showOrHide1">
					<view class="title">订单状态</view>
					<view>
						{{picker[updateData.cstatus-2]}}
					</view>
				</view>
				<view class="cu-form-group"  v-show="showOrHide1">
					<view class="title">销售提成</view>
					<view class="money">
						<text>￥</text>
						{{updateData.royalty}}
					</view>
				</view>
			</view>
			<view v-if="this.staticentity.rolecode == 'ADMIN' && updateData.cstatus==2">
				<view class="positionLine"></view>
				<view class="cu-list menu sm-border">
				<view class="cu-item" @click="showOrHideClue(2)">
					<view class="content">
						<text class="text-grey">订单信息</text>
					</view>
					<view v-show="!showOrHide2" class="'text-grey cuIcon-unfold"></view>
					<view v-show="showOrHide2" class="'text-grey cuIcon-fold"></view>
				</view> 
				</view>
				<view class="cu-form-group"  v-show="showOrHide2">
					<view class="title"><text class="required">*</text>订单状态</view>
					<view>
						<picker @change="SelectChange" :value="Selectindex" :range="picker">
							<view class="picker">
								{{Selectindex>0?picker[Selectindex]:'请选择'}}
							</view>
						</picker>
					</view>
				</view>
				<view class="cu-form-group" v-show="Selectindex!=2&&showOrHide2" >
					<view class="title"><text class="required">*</text>销售提成</view>
					<view class="money">
						<text class="symbol">￥</text>
						<input v-model="updateData.royalty" focus="true" placeholder="销售提成" type="number"></input>
					</view>
				</view>
			</view>
		<!-- 	<view class="cu-bar bg-white solid-bottom" v-if="updateData.cstatus!=-1">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					提交进度
				</view>
			</view> -->
			<view class="positionLine"></view>
			<view class="cu-list menu sm-border">
			<view class="cu-item" @click="showOrHideClue(3)">
				<view class="content">
					<text class="text-grey">提交进度</text>
				</view>
				<view v-show="!showOrHide3" class="'text-grey cuIcon-unfold"></view>
				<view v-show="showOrHide3" class="'text-grey cuIcon-fold"></view>
			</view> 
			</view>
			<view class="cu-timeline jindu" v-if="updateData.cstatus!=-1"  v-show="showOrHide3">
				<view>
					<evan-steps :active="updateData.cstatus>2?messages.length:messages.length-1">
						<evan-step :title="item.remarks" v-for="item in messages" :description="item.createtime |moment"></evan-step>
					</evan-steps>
				</view>
			</view>
			<approvalInfo v-if="isShowApprovalInfo" :userName='userName':communicateList="communicateList" :updateData="updateData" @showModal="showModal" :showXs="showXs" :ShowOA="ShowOA"
			 :clueid="clueid"></approvalInfo>
			 
			 

			 
			 
			 <view class="positionLine"></view>
			 
			 <view class="cu-list menu sm-border">
			 	<view class="cu-item" @click="showOrHideClue(0)">
			 		<view class="content">
			 			<text class="text-grey">线索信息</text>
			 		</view>
			 		<view v-show="!showOrHide" class="'text-grey cuIcon-unfold"></view>
			 		<view v-show="showOrHide" class="'text-grey cuIcon-fold"></view>
			 	</view>
			 </view>
			 <view v-show="showOrHide">
			 	<view class="cu-bar bg-white solid-bottom">
			 		<view class="action">
			 			<text class="cuIcon-titles text-green"></text>
			 			基本信息
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">提交人</view>
			 		<view>
			 			{{updateData.username}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">线索名称</view>
			 		<view>
			 			{{updateData.shorthand}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">线索来源</view>
			 		<view>
			 			{{updateData.source}}
			 		</view>
			 	</view>
			 	<view class="cu-bar bg-white solid-bottom">
			 		<view class="action">
			 			<text class="cuIcon-titles text-green"></text>客户信息
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">客户姓名</view>
			 		<view>
			 			{{updateData.customername}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">客户行业</view>
			 		<view>
			 			{{updateData.industry}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">联系方式</view>
			 		<view>
			 			{{updateData.contactinfo}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">学校地区</view>
			 		<view>
			 			{{updateData.customeraddress}}
			 		</view>
			 	</view>
				<view class="cu-form-group">
					<view class="title">客户信任度</view>
					<view>
						{{updateData.trusts}}
					</view>
				</view>
			 	<view class="cu-bar bg-white solid-bottom">
			 		<view class="action">
			 			<text class="cuIcon-titles text-green"></text>需求信息
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">意向车型</view>
			 		<view>
			 			{{updateData.intentioncar}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">需求</view>
			 		<view>
			 			{{updateData.needs}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">预算</view>
			 		<view>
			 			{{updateData.budget}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">是否持币</view>
			 		<view>
			 			{{updateData.isholdcash}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">现有车型</view>
			 		<view>
			 			{{updateData.exitscar}}
			 		</view>
			 	</view>
			 	<view class="cu-form-group">
			 		<view class="title">计划买车时间</view>
			 		<view>
			 			{{updateData.plantime}}
			 		</view>
			 	</view>
			 
			 </view>
			 
			 
			 
			<div class="entry"></div>
			
			
			
			
			<button v-if="(this.staticentity.rolecode == 'ZY' && updateData.cstatus==-1) " class="cu-btn block bg-blue margin-tb-sm lg btnLo"
			 @click="submit">
				<text class="cuIcon-loading2 cuIconfont-spin" v-show="isLoad"></text> 提交</button>
			<button v-if="(this.staticentity.rolecode == 'XS' && updateData.cstatus==0) " class="cu-btn block bg-blue margin-tb-sm lg btnLo"
			 @click="submit">
				<text class="cuIcon-loading2 cuIconfont-spin" isLoad="true" v-show="isLoad"></text> 提交</button>
				<button v-if="(this.staticentity.rolecode == 'XS' && updateData.cstatus==5) " class="cu-btn block bg-gradual-red margin-tb-sm lg btnLo"
				 @click="submitXSWitch">
					<text class="cuIcon-loading2  cuIconfont-spin" isLoad="true" v-show="isLoad"></text> 确认失效</button>
				<div v-if="(this.staticentity.rolecode == 'OA' && updateData.cstatus==1) " class="btnLo">
					<button class="cu-btn block bg-brown margin-tb-sm lg "  style="width: 30%; float: left;"
					 @click="submitZC"> 
						<text class="cuIcon-loading2 cuIconfont-spin" v-show="isLoad"></text> 暂存</button>
					<button  class="cu-btn block bg-gradual-red margin-tb-sm lg " style="width: 30%; float: left; margin-left: 5%"
					 @click="submitWitch"> 
						<text class="cuIcon-loading2 cuIconfont-spin"  v-show="isLoad"></text> 线索失效</button>
						<button  class="cu-btn block bg-blue margin-tb-sm lg " style="width: 30%; float: right;"
						 @click="submit"> 
							<text class="cuIcon-loading2 cuIconfont-spin"  v-show="isLoad"></text> 线索生效</button>
				</div>
			
			<button v-if="(this.staticentity.rolecode == 'ADMIN' && updateData.cstatus==2) " class="cu-btn block bg-blue margin-tb-sm lg btnLo"
			 @click="submit">
				<text class="cuIcon-loading2 cuIconfont-spin" v-show="isLoad"></text> 提交</button>
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
	import approvalInfo from '../approvalinfo/index';
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'
	import {
		selectByOA
	} from '@/api/sysUser.js'
	import {
		searchclues,
		update,
		updateold,
		getApprovalNotice
	} from '@/api/clues.js'
	import {
		getMessagesByClueId
	} from '@/api/message.js'
	import Router from '@/router'
	export default {
		components: {
			approvalInfo,
			EvanSteps,
			EvanStep
		},
		data() {
			return {
				Selectindex: 0,
				picker: ['请选择', '成功', '失败'],
				clueid: 0,
				showOrHide: false,
				showOrHide1: false,
				showOrHide2: false,
				showOrHide3: false,
				showOrHide4: false,
				animation: '',
				submitBtnLoading: false,
				animation: '',
				updateData: {},
				showUserId: false,
				showXs: false,
				ShowOA: false,
				showADMIN: false,
				staticentity: [],
				rolecode: '',
				modalName: null,
				userName: '',
				userOAs: [],
				oa: 0,
				isLoad: false,
				messages: [], 
				isJinyong:false, 
				isShowApprovalInfo:true, 
				communicateList:[],
			};
		},
		created() {
			var _this = this;
			//#ifdef APP-PLUS
			this.staticentity = uni.getStorageSync("data")
			//#endif
			//#ifdef H5
			this.staticentity = JSON.parse(localStorage.getItem("data"));
			//#endif 
			this.clueid = this.$Route.query.clueid;
			console.log("线索对应id为", this.clueid)
			console.log(this.staticentity.rolecode)
			if (this.staticentity.rolecode == 'OA') {
				this.ShowOA = true;
			}
			if (this.staticentity.rolecode == 'XS') {
				this.showXs = true;
			}
			if (this.staticentity.rolecode == 'ZY') {
				this.isShowApprovalInfo = false;
			}
			getMessagesByClueId(this.clueid).then(res => {
				this.messages = res.data;
			})
			this.init();
			this.biandOA();
			_this.loadApproval();
		},
		methods: {
			loadApproval(){
				var _this=this;
				//getApprovalNotice
				
				getApprovalNotice(_this.clueid).then(res => {
					console.log("getApprovalNotice",res)
					if(res.code!=200){
						uni.showToast({
							title: "数据获取异常请稍后重试",
							icon: "none"
						})
						return;
					}
					_this.communicateList = res.data;
					
				})
			},
			submitZC(){
				if(this.isJinyong){
					return
				}
				this.isJinyong = true;
				uni.showLoading({
					title: "提交中",
					mask: true
				})
				this.updateData.cstatus = 1;
				updateold(this.updateData).then(res => {
					
					// // 方法1：设置上一级页面，即pageA的data
					// prevPage.setData({
					//     isRefresh: true
					// });
					//#ifdef APP-PLUS
					Router.replaceAll({
						name:'main',
						animation:{
							delta: 1,
							animationType: "pop-out"
						}
						
					})
					//#endif
					//#ifdef H5
					this.$router.push({
						name:'main',
						animation:{
							delta: 1,
							animationType: "pop-out"
						}
					})
					//#endif
					uni.hideLoading();
					this.isJinyong = false
				})
			},
			submitXSWitch(){
				if(this.isJinyong){
					return
				}
				this.isJinyong = true;
				let _this = this;
				uni.showModal({
				    title: '系统提示',
				    content: '确认此线索失效吗？',
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({
								title: "提交中",
								mask: true
							})
				             _this.updateData.cstatus = 6
							 update(_this.updateData).then(res => {
							 	
							 	// // 方法1：设置上一级页面，即pageA的data
							 	// prevPage.setData({
							 	//     isRefresh: true
							 	// });
							 	//#ifdef APP-PLUS
							 	Router.replaceAll({
							 		name:'main',
							 		animation:{
							 			delta: 1,
							 			animationType: "pop-out"
							 		}
							 		
							 	})
							 	//#endif
							 	//#ifdef H5
							 	_this.$router.push({
							 		name:'main',
							 		animation:{
							 			delta: 1,
							 			animationType: "pop-out"
							 		}
							 	})
							 	//#endif
							 	uni.hideLoading();
							 	_this.isJinyong = false
							 })
				        } else if (res.cancel) {
							console.log("取消")
				           _this.isJinyong = false; 
				        }
				    }
				});
			},
			submitWitch(){
				console.log(this.isJinyong)
				if(this.isJinyong){
					return
				}
				this.isJinyong = true;
				let _this = this;
				uni.showModal({
				    title: '系统提示',
				    content: '确认此线索失效吗？',
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({
								title: "提交中",
								mask: true
							})
				             _this.updateData.cstatus = 0
							 update(_this.updateData).then(res => {
							 	
							 	// // 方法1：设置上一级页面，即pageA的data
							 	// prevPage.setData({
							 	//     isRefresh: true
							 	// });
							 	//#ifdef APP-PLUS
							 	Router.replaceAll({
							 		name:'main',
							 		animation:{
							 			delta: 1,
							 			animationType: "pop-out"
							 		}
							 		
							 	})
							 	//#endif
							 	//#ifdef H5
							 	_this.$router.push({
							 		name:'main',
							 		animation:{
							 			delta: 1,
							 			animationType: "pop-out"
							 		}
							 	})
							 	//#endif
							 	uni.hideLoading();
							 	_this.isJinyong = false
							 })
				        } else if (res.cancel) {
							console.log("取消")
				           _this.isJinyong = false; 
				        }
				    }
				});
			},
			submit() {
				if(this.isJinyong){
					return
				}
				this.isJinyong = true;
				uni.showLoading({
					title: "提交中",
					mask: true
				})
				if (this.staticentity.rolecode == 'OA') {
					this.updateData.cstatus = 2;
				}
				console.log("当前角色的值为",this.staticentity.rolecode)
				console.log("选中的值为",this.updateData.oaid)
				console.log("需要提交的线索信息为",this.updateData)
				console.log("判断条件的结果为",(this.updateData.oaid<=0||this.updateData.oaid==undefined||this.updateData.oaid==''))
				
				if (this.staticentity.rolecode == 'XS') {
					
					if(this.updateData.oaid<=0||this.updateData.oaid==undefined||this.updateData.oaid==''){
						uni.showToast({
							title: "请选择销售专员",
							icon: "none"
						})
						uni.hideLoading();
						this.isJinyong = false
						return;
					}
					this.updateData.cstatus = 1;
				}
				// return;
				if (this.staticentity.rolecode == 'ADMIN') {
					if (this.Selectindex < 1) {
						uni.showToast({
							title: "订单状态不能为空",
							icon: "none"
						})
						uni.hideLoading();
						this.isJinyong = false
						return;
					}
					if ((this.updateData.royalty == null || this.updateData.royalty < 0)&& this.Selectindex==1) {
						uni.showToast({
							title: "销售提成填写有误",
							icon: "none"
						})
						uni.hideLoading();
						this.isJinyong = false
						return;
					}

					if (this.Selectindex == 1)
						this.updateData.cstatus = 3;
					if (this.Selectindex == 2)
						this.updateData.cstatus = 4;
				}
				// // ！！！在paegB中
				// // 获取当前的页面栈
				// let pages = getCurrentPages();
				
				// // 获取上一级页面，即pageA的page对象
				// let prevPage = pages[pages.length - 2];
				
				// // 获取上一级页面，即pageA的data
				// let prevPageData = prevPage.data;
				// console.log(prevPage)
				// return
				update(this.updateData).then(res => {
					
					// // 方法1：设置上一级页面，即pageA的data
					// prevPage.setData({
					//     isRefresh: true
					// });
					//#ifdef APP-PLUS
					Router.replaceAll({
						name:'main',
						animation:{
							delta: 1,
							animationType: "pop-out"
						}
						
					})
					//#endif
					//#ifdef H5
					this.$router.push({
						name:'main',
						animation:{
							delta: 1,
							animationType: "pop-out"
						}
					})
					//#endif
					uni.hideLoading();
					this.isJinyong = false
				})
			},
			showOrHideClue(e) {
				var _this = this;
				if(e==0)
				{_this.showOrHide = !_this.showOrHide;}
				if(e==1)
				{_this.showOrHide1 = !_this.showOrHide1;}
				if(e==2)
				{_this.showOrHide2 = !_this.showOrHide2;}
				if(e==3)
				{_this.showOrHide3 = !_this.showOrHide3;}
			},
			init() {

				searchclues(this.clueid).then(res => {
					console.log("获取的数据为",res)
					if(res.code!=200){
						uni.showToast({
							title: "数据获取异常请稍后重试",
							icon: "none"
						})
						return;
					}
					this.updateData = res.data;
					this.updateData.updatetime=this.currentDateTime();
					if (this.staticentity.rolecode == 'OA' && this.updateData.cstatus == 3) {
						this.ShowOA = true;
					}
					if (this.staticentity.rolecode == 'XS' && this.updateData.cstatus == 2) {
						this.showXs = false;
					}
					//this.ShowOA = this.staticentity.id == res.data.oa
					console.log(res)
				})

			},
			currentDateTime(){
				var _this=this;
				var dateInfo = new Date();
				var year = dateInfo.getFullYear();
				var month = ((dateInfo.getMonth() + 1) > 10 ? (dateInfo.getMonth() + 1) : '0' + (dateInfo.getMonth() + 1));
				var date = dateInfo.getDate();
				return (year + '-' + month + '-' + date)
			},
			SelectChange(e) {
				this.Selectindex = e.detail.value
				console.log(this.Selectindex)
			},
			showModal(target) {
				console.log('父组件接收的值', target)
				this.modalName = target
			},
			hideModal(e) {
				this.modalName = null;
				this.userName = e.currentTarget.dataset.name;
				this.updateData.oaid = e.currentTarget.dataset.id;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			searchUser() {
				console.log('点击了搜索用户')
			},
			biandOA() {
				selectByOA().then(res => {
					this.userOAs = res.data
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.clueinfo {
		.positionLine {
			height: 10upx;
		}
		.btnLo {
			position: fixed;
			width: 100%;
			bottom: 0;
		}

		.required {
			color: red;
		}

		.entry {
			height: 0.5*300upx;
		}

		.cu-timeline>.cu-item>.content {
			padding: 6upx 30upx 30upx 30upx;
		}

		.lastApproval {
			margin-bottom: 30upx;
		}

		.jindu {
			padding-left: 100upx;
			padding-top: 20upx;
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

	.entry {
		height: 0.5*300upx !important;
	}
</style>
