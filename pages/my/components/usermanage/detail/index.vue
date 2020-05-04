<template>
	<view class="userDetail">

		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">权限设置</block>
				<block slot="right">
					<button class="cu-btn bg-green buttonRight" @click="save()">
						<text v-if="submitBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
						保存
					</button>
				</block>
			</cu-custom>
			<view class="positionLine"></view>
			<view class="cu-list menu sm-border">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">用户名称</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">小明明</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showModal" data-id="2" data-target="viewModal">
					<view class="content">
						<text class="text-grey">销售经理</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{xsName==''?'请选择':xsName}}</text>
					</view>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">权限组</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
						</view>
					</picker>
				</view> -->
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">权限组</text>
					</view>
					<view class="action">
						<picker @change="PickerChange" :value="index" :range="picker">
							<view class="picker">
								{{index>-1?picker[index]:'请选择'}}
							</view>
						</picker>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">是否启用</text>
					</view>
					<view class="action">
						<switch @change="isEnabled" :class="isDelete?'checked':''" :checked="isDelete"></switch>
					</view>
				</view>

			</view>

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
				<view data-name="销售人员1" class="cu-item" @tap="hideModal">
					<view class="content">
						<text class="text-grey">销售人员1(001)</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				submitBtnLoading: false,
				userName: '',
				modalName: '',
				currentid: 0,
				isDelete: false,
				userList: [],
				userid: [],
				currenttype: 0,
				xsName: '',
				oaName: '',
			};
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value;
				console.log("当前选中的权限组为",this.index)
			},
			isEnabled(e) {
				this.isDelete = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
				this.currentid = e.currentTarget.dataset.id;
			},
			hideModal(e) {
				this.modalName = null;
				console.log("this.currenttype的值为", this.currenttype)
				this.xsName = e.currentTarget.dataset.name;
			},
			save() {
				var _this = this;

			}
		}
	}
</script>

<style scoped lang="scss">
	.userDetail {
		.positionLine {
			height: 10upx;
		}

		.buttonRight {
			margin-right: 10upx;
		}

		.text-sm {
			font-size: 28upx;
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
	}
</style>
