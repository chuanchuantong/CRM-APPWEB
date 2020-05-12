<template>
	<view class="userDetail">

		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true" :indexV="'userlist'">
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
						<text class="text-grey text-sm">{{userName}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showModal" data-id="2" data-target="viewModal">
					<view class="content">
						<text class="text-grey">销售经理</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{selectXSManager.nickName==''?'请选择':selectXSManager.nickName}}</text>
					</view>
				</view>
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
				<view class="cu-item arrow" @click="openUrl('adminupdatepwd', '更改密码')">
					<view class="content">
						<text class="text-grey">密码</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">修改密码</text>
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
								<input v-model="requestInfo.userName" type="text" placeholder="请输入人员名称" confirm-type="search"></input>
							</view>
							<view class="action">
								<button @click="searchUser" class="cu-btn bg-green shadow-blur round">搜索</button>
							</view>
						</view>
					</view>
				</view>
				<view v-for="(userInfo,index) in userList" :key="index" :data-id="userInfo.id" :data-index="index" :data-name="userInfo.nickname"
				 class="cu-item" @tap="hideModal">
					<view class="content">
						<text class="text-grey">{{userInfo.nickname}}({{userInfo.usercode}})</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import {
		selectUserByRoleId,
		selectRoleList,
		queryUserXS,
		updateRoleStatus,
		getUserByUserId
	} from '@/api/sysUser.js';
	import Router from '@/router'
	export default {
		data() {
			return {
				index: -1,
				picker: [],
				submitBtnLoading: false,
				userName: '',
				modalName: '',
				currentid: 0,
				isDelete: false,
				userList: [],
				currenttype: 0,
				requestInfo: {
					roleId: 1,
					userName: ''
				},
				selectXSManager: {
					userId: 0,
					nickName: "",
				},
				//权限集合
				authorizeList: [],
				managerObject: {},
				userid: 0,
				roleid: 0,
				saveInfo: {
					isdeleted: 0,
					leveid: 0,
					roleid: 0,
					userid: 0
				},
				entity:[],
				isRotate: false,
				userInfo:[]
			};
		},
		created() {
			var _this = this;
			//#ifdef H5
			_this.userName = _this.$route.params.nickname;
			_this.userid = _this.$route.params.userid;
			_this.roleid = _this.$route.params.roleid;
			_this.entity = _this.$route.params.entity;
			//#endif
			//#ifdef APP-PLUS
			_this.userName = _this.$Route.query.nickname;
			_this.userid = _this.$Route.query.userid;
			_this.roleid = _this.$Route.query.roleid;
			_this.entity = _this.$Route.params.entity;
			//#endif
			console.log("获取数据集合0",_this.entity)
			_this.loadXSName();
			_this.loadUserList();
			_this.loadRoleList();
			_this.loadUserInfo();
		},
		methods: {
			loadUserInfo(){
				var _this = this;
				getUserByUserId(_this.userid).then(res=>{
					if (res.code != 200) {
						uni.showToast({
							title: '数据加载异常请稍后再试',
							icon: "none"
						});
						return;
					}
					this.userInfo = res.data;
					this.isDelete = !res.data.isdeleted;
				})
			},
			loadXSName() {
				var _this = this;
				queryUserXS(_this.userid).then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载异常请稍后再试',
							icon: "none"
						});
						return;
					}
					
					if (response.data != null) {
						_this.selectXSManager.nickName = response.data.nickName;
						_this.selectXSManager.userId = response.data.userId;
					}
				})
			},
			loadUserList() {
				var _this = this;
				selectUserByRoleId(_this.requestInfo).then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载异常请稍后再试',
							icon: "none"
						});
						return;
					}
					_this.userList = response.data;
				})
			},

			loadRoleList() {
				var _this = this;
				selectRoleList().then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载异常请稍后再试',
							icon: "none"
						});
						return;
					}
					this.authorizeList = response.data;
					for (let i = 0; i < response.data.length; i++) {
						var info = response.data[i];
						_this.$set(_this.managerObject, i, info.id)
						_this.picker.push(info.rolename);
						if (_this.roleid == info.id) {
							_this.index = i;
						}
					}
				})
			},
			searchUser() {
				var _this = this;
				_this.loadUserList();
			},
			PickerChange(e) {
				this.index = e.detail.value;
				console.log("当前选中的权限组为", this.authorizeList[this.index].id)
			},
			isEnabled(e) {
				this.isDelete = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
				this.currentid = e.currentTarget.dataset.id;
			},
			hideModal(e) {
				var _this = this;
				_this.modalName = null;
				_this.selectXSManager.nickName = e.currentTarget.dataset.name;
				_this.selectXSManager.userId = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				var index = e.currentTarget.dataset.id;
				console.log("选中的销售经理id为", _this.selectXSManager)
			},
			save() {
				var _this = this;
				if (_this.isRotate) {
					return;
				}
				_this.isRotate = true;
				if (_this.selectXSManager == null || _this.selectXSManager.nickName == '') {
					uni.showToast({
						title: '请选择销售经理',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				_this.saveInfo.userid = _this.userid;
				_this.saveInfo.roleid = this.authorizeList[this.index].id;
				_this.saveInfo.isdeleted = _this.isDelete ? 0 : 1;
				_this.saveInfo.leveid = _this.selectXSManager.userId;
				console.log("需要传输的对象值为", _this.saveInfo)
				updateRoleStatus(_this.saveInfo).then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '数据保存异常请稍后再试',
							icon: "none"
						});
						_this.isRotate = false;
						return;
					}
					uni.showToast({
						title: '保存成功',
						icon: "none",
						success: function() {
							// #ifdef H5
							_this.$router.replace("userlist")
							//#endif
							//#ifdef APP-PLUS
							Router.replace({
								name: 'userlist'
							});
							// #endif
						}
					});
				})
			},
			openUrl(url, title) {
				
				var _this=this;
				
				//#ifdef APP-PLUS
				Router.push({
					name: url,
					params: {
						title: title,
						id:_this.userid
					}
				});
				//#endif
				
				
				//#ifdef H5
				this.$Router.push({
					name: url,
					params: {
						title: title,
						id:_this.userid
					}
				});
				//#endif
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
