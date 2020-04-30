<template>
	<view>


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
				<view class="cu-form-group">
					<view class="title">客户级别</view>
					<view>
						{{updateData.level}}
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
					<view class="title">邮箱</view>
					<view>
						{{updateData.contactinfo}}
					</view>
				</view>
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
			<approvalInfo :userName='userName' @showModal="showModal" :showXs="showXs" :ShowOA="ShowOA" :clueid="clueid"></approvalInfo>
			<div class="entry"></div>

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

				<view class="cu-item" @tap="hideModal" :data-name="'小明(CODE'+index+')'" v-for="(item,index) in 20" :key="index">
					<view class="content">
						<text class="text-grey">小明(CODE{{index}})</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import approvalInfo from '../approvalinfo/index';
	import {
		searchclues
	} from '@/api/clues.js'
	export default {
		components: {
			approvalInfo
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
				userName: ''
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
			this.init();
		},
		methods: {
			showOrHideClue() {
				var _this = this;
				_this.showOrHide = !_this.showOrHide;
			},
			init() {
				searchclues(this.clueid).then(res => {
					this.updateData = res.data;
					this.ShowOA = this.staticentity.id == res.data.oa
					console.log(res)
				})
			},
			showModal(target) {
				console.log('父组件接收的值', target)
				this.modalName = target
			},
			hideModal(e) {
				this.modalName = null;
this.userName=e.currentTarget.dataset.name;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			searchUser() {
				console.log('点击了搜索用户')
			}
		}
	}
</script>

<style scoped lang="scss">
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
