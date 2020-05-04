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
				<input name="input" v-model="userInfo.nickname"></input>
			</view>

		</form>
	</view>
</template>

<script>
	import {
		updateNickNameById
	} from '@/api/sysUser.js';
	import {
		getUserInfo
	} from '@/api/login.js'
			import Router from '@/router'
	export default {
		data() {
			return {
				title: '',
				disabled: false,
				userInfo: {
					id: 0,
					nickname: ''
				},
				submitBtnLoading: false
			};
		},
		created() {
			var _this = this;
			_this.title = _this.$Route.query.title;
			_this.userInfo.nickname = _this.$Route.query.content;
			_this.disabled = _this.isNullOrEmpty(_this.userInfo.nickname);

			//#ifdef APP-PLUS
			_this.userInfo.id = uni.getStorageSync("data").id
			//#endif
			//#ifdef H5
			_this.userInfo.id = JSON.parse(localStorage.getItem("data")).id;
			//#endif

			console.log(_this.userInfo)
		},
		watch: {
			'userInfo.nickname': function(newValue, oldValue) {
				var _this = this;
				_this.disabled = _this.isNullOrEmpty(newValue);
			}
		},
		methods: {
			savedata() {
				var _this = this;
				updateNickNameById(_this.userInfo).then(response => {
					console.log(response);
					_this.submitBtnLoading = false;
					_this.isRotate = false;
					if (response.code != 200) {
						uni.showToast({
							title: '申请提现成功异常请稍后再试',
							icon: "none"
						});
						_this.isRotate = false;
						return;
					}
					_this.setUserInfo()
					
				}).finally(res => {
					_this.submitBtnLoading = false;
					_this.isRotate = false;
				});
				console.log("修改后的名称为", this.content)
			},
			isNullOrEmpty(value) {
				return (value == undefined || value == null || value == '')
			},
			setUserInfo(){
				var _this=this;
				getUserInfo().then(res => {
					//#ifdef H5
					localStorage.setItem('data', JSON.stringify(res.data))
					//#endif
					//#ifdef APP-PLUS
					uni.setStorageSync("data", res.data);
					//#endif
					uni.showToast({
						title: '保存成功',
						icon: "none",
						success: function() {
							// #ifdef H5
							_this.$router.push("data")
							//#endif
							//#ifdef APP-PLUS
							Router.push({
								name: 'data'
							});
							// #endif
						}
					});
				})
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
