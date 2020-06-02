<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">提现</block>
		</cu-custom>

		<view class="cashapply">
			<view class="positionLine"></view>
			<view class="positionLine"></view>
			<view class="cu-list menu menu-avatar">
				<view class="cu-item arrow" @click="showSelectCashMode()">
					<view class="content flex-sub">
						<view class="myname">{{selectCashModeInfo.bankaccount}}</view>
						<view class="text-gray text-sm flex justify-between myincode">
							{{selectCashModeInfo.account}}
						</view>
					</view>
				</view>
				<view class="cu-item cash">
					<view class="cashContent">
						<view class="text-grey tips">提现金额</view>
						<view class="money">
							<text class="symbol">￥</text>
							<input v-model="willCashMoney" :disabled="currentSurplusMoney<=0" focus="true" type="number"></input>
						</view>
						<view class="lastText">
							<text class="text-grey tips">当前余额剩余 {{currentSurplusMoney}} 元，
								<text class="allcash" @click="takeOutAllMoney">全部提现</text>
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" :disabled="disabled" @click="submitCash()">
				<text v-if="submitBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
				提交
			</button>
		</view>
		<view @tap="defaultCashMode" class="cu-modal bottom-modal" :class="isShowSelectCashMode?'show':''">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block">
					<view class="cu-list menu text-left">
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">
									<view class="modeName">
										选择到账银行卡
									</view>
									<view class="modeNumber text-grey">
										请注意到账时间
									</view>
								</view>
							</label>
						</view>

						<view class="cu-item" v-for="(cash,index) in cashModeArray" :key="index" @click="hideSelectCashMode(cash)">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">
									<view class="modeName">
										{{cash.bankaccount}}
									</view>
									<view class="modeNumber text-grey">
										{{cash.account}}
									</view>
								</view>
								<radio class="round" :class="selectCashModeValue==cash.id?'checked':''" :checked="selectCashModeValue==cash.id"
								 :value="index+''"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<div class="entry"></div>
			</view>
		</view>
	</view>
</template>

<script>
	import Router from '@/router'
	import {
		getPayMethods,
		capitalApply
	} from '@/api/pay.js';
	import {queryAmountByUserId} from '@/api/money.js'
	import dictionary from '@/utils/dictionary.js'
	export default {
		data() {
			return {
				//提现方式集合
				modeArray: [],
				//将要提现的金额
				willCashMoney: null,
				//当前剩余金额
				currentSurplusMoney: 200,
				//是否加载按钮
				submitBtnLoading: false,
				//是否显示选择提现方式的选择框
				isShowSelectCashMode: false,
				//选中的提现方式为
				selectCashModeValue: '',
				//可供选择的提现方式
				cashModeArray: [],
				//选中的现金方式
				selectCashModeInfo: {},
				capitalApply: {
					amount: 0,
					remaamount: 0,
					status: 0,
					paytype: -1
				},
				disabled: false,
				isRotate: false,
			};
		},
		onShow() {
			var _this=this;
			_this.willCashMoney=null;
			_this.disabled=_this.isNullOrEmpty(_this.willCashMoney);
		},
		watch: {
			'willCashMoney':function(newValue, oldValue) {
				var _this = this;
				if (newValue > _this.currentSurplusMoney) {
					_this.disabled = true;
				} else if (newValue <= 0 || _this.isNullOrEmpty(newValue)) {
					_this.disabled = true;
				} else {
					_this.disabled = false;
				}
			}
		},
		created() {
			var _this = this;
			_this.willCashMoney=null;
			queryAmountByUserId().then(res=>{
				this.currentSurplusMoney = res.data.amount;
			})
			_this.disabled=_this.isNullOrEmpty(_this.willCashMoney);
			_this.getPayMethodList();
		},
		methods: {
			
			//提现提交申请
			submitCash() {
				var _this = this;
				_this.selectCashModeInfo.remaamount= _this.currentSurplusMoney -_this.selectCashModeInfo.amount;
				if (_this.selectCashModeInfo.status < 0 || _this.isNullOrEmpty(_this.selectCashModeInfo.status)) {
					uni.showToast({
						title: '请选择提现方式',
						icon: "none"
					});
					_this.isRotate = false;
					return;
				}
				_this.isRotate=true;
				_this.submitBtnLoading=true;
				_this.capitalApply.amount = _this.willCashMoney;
				_this.capitalApply.remaamount = (_this.currentSurplusMoney - _this.willCashMoney);
				_this.capitalApply.paytype = _this.selectCashModeInfo.id;
				capitalApply(_this.capitalApply).then(response => {
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
					uni.showToast({
						title: '保存成功',
						icon: "none",
						success: function() {
							// #ifdef H5
							_this.$router.push("wallet")
							//#endif
							//#ifdef APP-PLUS
							Router.replaceAll({
								name: 'wallet'
							});
							// #endif
						}
					});
				}).finally(response => {
					_this.submitBtnLoading = false;
					_this.isRotate = false
				})
			},
			isNullOrEmpty(value) {
				return (value == undefined || value == null || value == '')
			},
			getPayMethodList() {
				var _this = this;
				getPayMethods().then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载失败，请稍后重试',
							icon: "none"
						});
						return;
					}
					for (var i = 0; i < response.data.length; i++) {
						var info = response.data[i];
						if (info.status == 1) {
							info.account = "尾号(" + info.account.substr(info.account.length - 4) + ")";
						} else {
							info.bankaccount = dictionary.payMethodStatus[info.status];
						}
						_this.cashModeArray.push(info);
					}
					_this.selectCashModeInfo = _this.cashModeArray[0];
					_this.selectCashModeValue = _this.selectCashModeInfo.value;
					_this.disabled = (_this.cashModeArray.length <= 0 || _this.currentSurplusMoney <= 0)
					_this.disabled = (_this.isNullOrEmpty(_this.willCashMoney));
				})
			},
			//全部提现
			takeOutAllMoney() {
				var _this = this;
				_this.willCashMoney = _this.currentSurplusMoney;
			},
			//显示选择现金方式
			showSelectCashMode() {
				var _this = this;
				_this.isShowSelectCashMode = true;
			},
			//隐藏选择现金方式
			hideSelectCashMode(info) {
				var _this = this;
				_this.selectCashModeInfo = info;
				_this.selectCashModeValue = info.value;
				_this.isShowSelectCashMode = false;
			},
			//设置默认的现金方式
			defaultCashMode() {
				var _this = this;
				_this.isShowSelectCashMode = false;
			},
			//新增一种提现方式
			addCashMode() {
				//此时应该是创建线索去了
				//#ifdef APP-PLUS
				Router.push('addcashmode');
				//#endif

				//#ifdef H5
				this.$router.push('addcashmode');
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.cashapply {
		.cu-list.menu-avatar>.cu-item .content {
			left: 80upx !important;
		}

		.positionLine {
			height: 10upx;
		}

		.cash {
			height: 280upx;

			.cashContent {
				margin-left: 50upx;

				.money {
					font-size: 50upx;
					display: flex;
					border-bottom: solid 1px #EEEEEE;

					.symbol {
						margin-top: 26upx;
					}

					uni-input {
						font-size: 50upx;
						height: 2.4em !important;
					}
				}

				.tips {
					font-size: 24upx;
				}

				.lastText {
					margin-top: 10px;

					.allcash {
						color: #39b54a;
					}
				}

			}

		}

		.cu-modal {
			.modeNumber {
				font-size: 24upx !important;
			}
			.cu-dialog{
				padding-bottom: 100upx;
			}
		}
	}
</style>
