<template>
	<view class="clueinfo">


		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">线索审核</block>
			</cu-custom>
			<view class="cu-list menu sm-border">
				<view class="cu-item" @click="showOrHideClue()">
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
				<!-- 	<view class="cu-form-group">
					<view class="title">客户级别</view>
					<view>
						{{updateData.level}}
					</view>
				</view> -->
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
				<!-- <view class="cu-form-group">
					<view class="title">邮箱</view>
					<view>
						{{updateData.contactinfo}}
					</view>
				</view> -->
				<view class="cu-form-group">
					<view class="title">地址</view>
					<view>
						{{updateData.customeraddress}}
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
					<view class="title">计划提车时间</view>
					<view>
						{{updateData.plantime}}
					</view>
				</view>

			</view>
			<view v-if="updateData.cstatus>-1">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						订单信息
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">订单状态</view>
					<view>
						{{updateData.plantime}}
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">销售提成</view>
					<view>
						{{updateData.plantime}}
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom" v-if="updateData.cstatus!=-1">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					提交进度
				</view>
			</view>
			<view class="cu-timeline jindu" v-if="updateData.cstatus!=-1">
				<view>
					<evan-steps :active="messages.length-1">
						<evan-step :title="item.remarks" v-for="item in messages" :description="item.createtime |moment"></evan-step>

					</evan-steps>
				</view>
			</view>
			<approvalInfo :userName='userName' :updateData="updateData" @showModal="showModal" :showXs="showXs" :ShowOA="ShowOA"
			 :clueid="clueid"></approvalInfo>
			<div class="entry"></div>
			<button v-if="(this.staticentity.rolecode == 'ZY' && updateData.cstatus==-1) " class="cu-btn block bg-blue margin-tb-sm lg btnLo"
			 @click="submit">
				<text class="cuIcon-loading2 cuIconfont-spin" v-show="isLoad"></text> 提交</button>
			<button v-if="(this.staticentity.rolecode == 'XS' && updateData.cstatus==0) " class="cu-btn block bg-blue margin-tb-sm lg btnLo"
			 @click="submit">
				<text class="cuIcon-loading2 cuIconfont-spin" v-show="isLoad"></text> 提交</button>
			<button v-if="(this.staticentity.rolecode == 'OA' && updateData.cstatus==1) " class="cu-btn block bg-blue margin-tb-sm lg btnLo"
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
		update
	} from '@/api/clues.js'
	import {
		getMessagesByClueId
	} from '@/api/message.js'
	export default {
		components: {
			approvalInfo,
			EvanSteps,
			EvanStep
		},
		data() {
			return {
				clueid: 0,
				showOrHide: true,
				animation: '',
				submitBtnLoading: false,
				animation: '',
				updateData: [],
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
				messages: []
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
			console.log("线索对应id为", this.$route)
			console.log(this.staticentity.rolecode)
			if (this.staticentity.rolecode == 'OA') {
				this.ShowOA = true;
			}
			if (this.staticentity.rolecode == 'XS') {
				this.showXs = true;
			}
			getMessagesByClueId(this.clueid).then(res => {
				this.messages = res.data;
			})
			this.init();
			this.biandOA();
		},
		methods: {
			submit() {
				if (this.staticentity.rolecode == 'OA') {
					this.updateData.cstatus = 2;
				}
				if (this.staticentity.rolecode == 'XS') {
					this.updateData.cstatus = 1;
				}
				update(this.updateData).then(res => {
					uni.navigateBack({
						delta: 1,
						animationType: "pop-out"
					})
				})
			},
			showOrHideClue() {
				var _this = this;
				_this.showOrHide = !_this.showOrHide;
			},
			init() {

				searchclues(this.clueid).then(res => {
					this.updateData = res.data;
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
		.btnLo {
			position: fixed;
			width: 100%;
			bottom: 0;
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
