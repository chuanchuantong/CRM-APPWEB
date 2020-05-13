<template>
	<view class="updateMyData">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
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
		updateUserBaseInfo
	} from '@/api/sysUser.js';
	import Router from '@/router'
	export default {
		data() {
			return {
				title: '',
				disabled: false,
				userInfo:{
				  "id": 0,
				  "loginpwd": ''
				},
				confirmPwd:'',
				submitBtnLoading: false,
				roleid:0,
				entity:{},
				nickname:''
			};
		},
		created() {
			var _this = this;
			_this.title = _this.$Route.query.title;
			_this.userInfo.id = _this.$Route.query.id;
			_this.roleid = _this.$Route.query.roleid;
			_this.entity = _this.$Route.query.entity;
			_this.nickname = _this.$Route.query.userName;
			if(_this.isNullOrEmpty(_this.userInfo.loginpwd)&&_this.isNullOrEmpty(_this.userInfo.oldpwd)&&_this.isNullOrEmpty(_this.confirmPwd)){
				_this.disabled = true;
			}
		},
		watch:{
			'userInfo.loginpwd':function(newValue, oldValue) {
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
				if(_this.isNullOrEmpty(_this.userInfo.loginpwd)){
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
				console.log("需要修改的数据为",_this.userInfo);
				// return;
				updateUserBaseInfo(_this.userInfo).then(response => {
					console.log(response);
					_this.submitBtnLoading = false;
					_this.isRotate = false;
					if (response.code != 200) {
						uni.showToast({
							title: '保存数据失败请稍后重试',
							icon: "none"
						});
						_this.isRotate = false;
						return;
					}
					_this.successUrl();
					// //#ifdef APP-PLUS
					// Router.push('login');
					// //#endif
					
					// //#ifdef H5
					// _this.$Router.push('login');
					// //#endif
					
				}).finally(res => {
					_this.submitBtnLoading = false;
					_this.isRotate = false;
				});
			},
			isNullOrEmpty(value) {
				return (value == undefined || value == null || value == '')
			},
			successUrl(){
				var _this=this;
				//#ifdef APP-PLUS
				Router.push({
					name: 'userdetail',
					params: {
						userid: _this.userInfo.id,
						nickname:_this.nickname,
						roleid:_this.roleid,
						entity:_this.entity
					}
				});
				//#endif
				
				//#ifdef H5
				_this.$router.push({
					name: 'userdetail',
					params: {
						userid: _this.userInfo.id,
						nickname:_this.nickname,
						roleid:_this.roleid,
						entity:_this.entity
					}
				});
				//#endif
			}
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
