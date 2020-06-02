<template>
	<view>
		<view class="addcashclass">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">{{showTitle}}</block>
				<block slot="right">
					<button class="cu-btn bg-green buttonRight" @click="save()">
						<text v-if="submitBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
						保存
					</button>
				</block>
			</cu-custom>
			<form class="formContent">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						提现方式
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>提现方式</view>
					<picker @change="pickerChange" :value="cashIndex" :range="cashArray">
						<view class="picker">
							{{cashIndex>-1?cashArray[cashIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group" v-if="saveCashInfo.status==1">
					<view class="title"><text class="required">*</text>开户银行</view>
					<input v-model="saveCashInfo.bankaccount" placeholder="请输入开户银行" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="required">*</text>账号</view>
					<input v-model="saveCashInfo.account" placeholder="请输入账号" name="input"></input>
				</view>
				<view class="cu-form-group" v-if="saveCashInfo.status==1">
					<view class="title"><text class="required">*</text>户主名字</view>
					<input v-model="saveCashInfo.accountowner" placeholder="请输入户主名字" name="input"></input>
				</view>
				<view class="cu-form-group " v-if="saveCashInfo.status==1">
					<view class="title usertrait">备注</view>
					<textarea v-model="saveCashInfo.methodremark" maxlength="500" placeholder="请输入备注"></textarea>
				</view>
			</form>

		</view>
	</view>
</template>

<script>
	import {
		getPayMethodById,
		updatePayMethod,
		insertPayMethod
	} from '@/api/pay.js'
	import Router from '@/router'
	export default {
		data() {
			return {
				showTitle: '新增提现方式',
				cashIndex: -1,
				cashArray: [],
				cashInfo: {},
				saveCashInfo: {
					//提现方式
					status: -1,
					//账号
					account: '',
					//开户银行
					bankaccount: '',
					//户主名字
					accountowner: '',
					//备注
					methodremark: ''
				},
				submitBtnLoading: false,
				isRotate: false
			};
		},
		created() {
			var _this = this;
			var methodId = _this.$Route.query.methodId;
			if (!_this.isNullOrEmpty(methodId) && methodId > 0) {
				_this.getMethodInfo(methodId);
				_this.showTitle = '修改提现方式'
			}
			var cashlist = [{
				value: 1,
				text: '银行卡'
			}, {
				value: 2,
				text: '微信'
			}, {
				value: 3,
				text: '支付宝'
			}];
			cashlist.forEach((info, index) => {
				_this.$set(_this.cashInfo, index, info.value);
				_this.cashArray.push(info.text);
			});
			if (_this.cashArray.length > 0)
				_this.cashIndex = _this.cashArray[0];
		},
		methods: {
			getMethodInfo(id) {
				var _this = this;
				getPayMethodById(id).then(response => {
					console.log("返回的值为", response)
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载失败，请稍后重试',
							icon: "none"
						});
						return;
					}
					_this.saveCashInfo = response.data;
					_this.cashIndex = (response.data.status - 1);
					console.log("修改时候的", _this.saveCashInfo)
				});
			},
			pickerChange(e) {
				var _this = this;
				_this.cashIndex = e.detail.value;
				_this.saveCashInfo.status = (e.detail.value + 1);
				console.log(_this.cashIndex)
			},
			isNullOrEmpty(value) {
				return (value == undefined || value == null || value == '')
			},
			save() {
				var _this = this;
				//登录
				if (_this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				_this.isRotate = true;
				if (_this.saveCashInfo.status < 0 || _this.isNullOrEmpty(_this.saveCashInfo.status)) {
					uni.showToast({
						title: '请选择提现方式',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				if (_this.saveCashInfo.status == 1 && _this.isNullOrEmpty(_this.saveCashInfo.bankaccount)) {
					uni.showToast({
						title: '请填写开户银行',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				if (_this.saveCashInfo.status > 1 && _this.isNullOrEmpty(_this.saveCashInfo.account)) {
					uni.showToast({
						title: '请填写账号',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				if (_this.saveCashInfo.status == 1 && _this.isNullOrEmpty(_this.saveCashInfo.accountowner)) {
					uni.showToast({
						title: '请填写户主名字',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				if (_this.saveCashInfo.status != 1) {
					_this.saveCashInfo.bankaccount = ''
				}
				if (_this.saveCashInfo.id && !_this.isNullOrEmpty(_this.saveCashInfo.id)) {
					console.log("修改保存的数据为", _this.saveCashInfo)
					updatePayMethod(_this.saveCashInfo).then(response => {
						_this.submitBtnLoading = false;
						_this.isRotate = false;
						if (response.code != 200) {
							uni.showToast({
								title: '修改提现方式异常请稍后再试',
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
								_this.$router.push({
									name: "accountmanage",
									params: {}
								})
								//#endif
								//#ifdef APP-PLUS
								Router.push({
									name: 'accountmanage',
									params: {}
								});
								// #endif
							}
						});
					}).finally(response => {
						_this.submitBtnLoading = false;
						_this.isRotate = false
					})
				} else {
					console.log("新增保存的数据为", _this.saveCashInfo)
					insertPayMethod(_this.saveCashInfo).then(response => {
						_this.submitBtnLoading = false;
						_this.isRotate = false;
						if (response.code != 200) {
							uni.showToast({
								title: '保存线索异常请稍后再试',
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
								_this.$router.push({
									name: "accountmanage",
									params: {}
								})
								//#endif
								//#ifdef APP-PLUS
								Router.push({
									name: 'accountmanage',
									params: {}
								});
								// #endif
							}
						});
					}).finally(response => {
						_this.submitBtnLoading = false;
						_this.isRotate = false
					})
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.addcashclass {
		.buttonRight {
			margin-right: 10upx;
		}

		.formContent {
			.cu-form-group .required {
				color: red;
				line-height: 60upx;
				margin-right: 10upx;
			}

			.cu-form-group .title {
				min-width: calc(6em + 40upx);
				text-align: right;
			}
		}

		.usertrait {
			margin-top: -100upx;
		}
	}
</style>
