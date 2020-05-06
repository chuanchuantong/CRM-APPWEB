<template>
	<view class="userList">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">{{title}}</block>
		</cu-custom>

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
		<view class="positionLine"></view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item" v-for="(userInfo,index) in userList" :key="index" @click="openUrl(userInfo.id,userInfo.nickname)">
				<view class="content">
					<text class="text-grey">{{userInfo.nickname}}({{userInfo.usercode}})</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {selectUserByRoleId} from '@/api/sysUser.js';
		import Router from '@/router';
	export default {
		data() {
			return {
				userList: [],
				requestInfo:{roleId:0,username:''},
				title:''
			};
		},
		created(){
			var _this=this;
			//#ifdef H5
			_this.title=_this.$route.params.title;
			_this.requestInfo.roleId=_this.$route.params.roleId;
			//#endif
			//#ifdef APP-PLUS
			_this.title=_this.$Route.query.title;
			_this.requestInfo.roleId=_this.$Route.query.roleId;
			//#endif
			if(_this.isNullOrEmpty(_this.requestInfo.roleId)){
				//#ifdef H5
				_this.requestInfo.roleId=localStorage.getItem('usermanagerroleid')
				//#endif
				//#ifdef APP-PLUS
				_this.requestInfo.roleId=uni.getStorageSync("usermanagerroleid");
				//#endif
			}
			else{
				//#ifdef H5
				localStorage.setItem('usermanagerroleid', _this.requestInfo.roleId)
				//#endif
				//#ifdef APP-PLUS
				uni.setStorageSync("usermanagerroleid", _this.requestInfo.roleId);
				//#endif
			}
			
			_this.loadUserList();
		},
		methods: {
			loadUserList(){
				var _this=this;
				selectUserByRoleId(_this.requestInfo).then(response=>{
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载异常请稍后再试',
							icon: "none"
						});
						return;
					}
					_this.userList=response.data;
				})
			},
			isNullOrEmpty(value) {
				return (value == undefined || value == null || value == '')
			},
			searchUser() {
				var _this = this;
				_this.loadUserList();
			},
			openUrl(id,nickname) {
				var _this=this;
				//#ifdef APP-PLUS
				Router.push({
					name: 'userdetail',
					params: {
						userid: id,
						nickname:nickname,
						roleid:_this.requestInfo.roleId,
						entity:_this.requestInfo
					}
				});
				//#endif

				//#ifdef H5
				_this.$router.push({
					name: 'userdetail',
					params: {
						userid: id,
						nickname:nickname,
						roleid:_this.requestInfo.roleId,
						entity:_this.requestInfo
					}
				});
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.userList {
		.positionLine {
			height: 10upx;
		}

		.cu-list.menu-avatar>.cu-item .content {
			left: 20upx !important;
			// width: 100% !important;
		}

		.cu-list.menu-avatar>.cu-item .action {
			width: 240upx !important;
		}

		.cu-list.menu-avatar>.cu-item {
			height: 80upx !important;
		}

		.cu-list.menu-avatar>.cu-item .flex .text-cut {
			max-width: 566upx !important;
		}
	}
</style>
