<template>
	<view class="updateMyData">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :url="'data'">
			<block slot="content">{{title}}</block>
			<block slot="right">
				<button :disabled="disabled" class="cu-btn bg-green buttonRight" @click="savedata">
					<text v-if="submitBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
					保存
				</button>
			</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<input name="input" v-model="userInfo.oldpwd" password placeholder="原密码"></input>
			</view>
			<view class="cu-form-group">
				<input name="input" v-model="userInfo.loginpwd" password placeholder="新密码"></input>
			</view>
			<view class="cu-form-group">
				<input name="input" v-model="confirmPwd" password placeholder="确认新密码"></input>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		updateUserPwd
	} from '@/api/sysUser.js';
	import Router from '@/router'
	export default {
		data() {
			return {
				title: '',
				disabled: false,
				userInfo:{
				  "id": 0,
				  "loginpwd": '',
				  "oldpwd": ''
				},
				confirmPwd:'',
				submitBtnLoading: false
			};
		},
		created() {
			var _this = this;
			_this.title = _this.$Route.query.title;
			//#ifdef APP-PLUS
			_this.userInfo.id = uni.getStorageSync("data").id
			//#endif
			//#ifdef H5
			_this.userInfo.id = JSON.parse(localStorage.getItem("data")).id;
			//#endif
			if(_this.isNullOrEmpty(_this.userInfo.loginpwd)&&_this.isNullOrEmpty(_this.userInfo.oldpwd)&&_this.isNullOrEmpty(_this.confirmPwd)){
				_this.disabled = true;
			}
		},
		watch:{
			'userInfo.loginpwd':function(newValue, oldValue) {
				var _this = this;
				_this.disabled = _this.isNullOrEmpty(newValue);
			},
			'userInfo.oldpwd':function(newValue, oldValue) {
				var _this = this;
				_this.disabled = _this.isNullOrEmpty(newValue);
			},
			'confirmPwd':function(newValue, oldValue) {
				var _this = this;
				_this.disabled = _this.isNullOrEmpty(newValue);
			},
		},
		methods: {
			savedata() {
				var _this = this;
				if(_this.isNullOrEmpty(_this.userInfo.oldpwd)){
					uni.showToast({
						title: '请输入原密码',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				else if(_this.isNullOrEmpty(_this.userInfo.loginpwd)){
					uni.showToast({
						title: '请输入新密码',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				else if(_this.isNullOrEmpty(_this.confirmPwd)){
					uni.showToast({
						title: '请输入确认新密码',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				if(_this.confirmPwd!=_this.userInfo.loginpwd){
					uni.showToast({
						title: '新密码和确认新密码输入不一致',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				_this.isRotate = true;
				updateUserPwd(_this.userInfo).then(response => {
					console.log(response);
					_this.submitBtnLoading = false;
					_this.isRotate = false;
					if (response.code != 200) {
						uni.showToast({
							title: '原密码输入错误',
							icon: "none"
						});
						_this.isRotate = false;
						return;
					}
					uni.removeStorageSync("Token")
					//#ifdef APP-PLUS 
					Router.push({
						name: 'login'
					});
					//#endif
					
					//#ifdef H5 
					Router.push("/");
					//#endif
					
				}).finally(res => {
					_this.submitBtnLoading = false;
					_this.isRotate = false;
				});
			},
			isNullOrEmpty(value) {
				return (value == undefined || value == null || value == '')
			},
		}
	}
</script>

<style scoped lang="scss">
	.updateMyData {
		.cu-bar.btn-group uni-button {
			max-width: none !important;
		}

		.buttonRight {
			margin-right: 10upx;
		}
	}
</style>
