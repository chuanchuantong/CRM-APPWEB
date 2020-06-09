<template>
	<view class="cashApproval">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">提现详情</block>
		</cu-custom>
		<view class="detail">
			<view class="cu-card case btnBottom">
				<view class="cu-item shadow">
					<view class="cashDeatil">
						<view class="money">
							￥{{detailInfo.amount}}
						</view>
						<view class="statusText text-xs">
							{{statusObject[detailInfo.capitalStatus]}}
						</view>

					</view>
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							提现信息
						</view>
					</view>
					<view class="cu-form-group contentClass">
						<view v-if="detailInfo.payMethodType == 4" class="title">
							<view>
								{{detailInfo.bankaccount}}
							</view>
							<view>
								{{detailInfo.account}}
							</view>
						</view>
						<view v-else>
							<view>
								其他方式
							</view>
							
						</view>
						<view class="text-xs">{{detailInfo.payeename}}</view>
					</view>
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							备注信息
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title usertrait">备注</view>
						<textarea v-model="remark" maxlength="500" placeholder="请输入备注"></textarea>
					</view>
					<view class="cu-form-group">
						<button class="cu-btn bg-green btnClass" @click="updatecashapply(1)">
							<text v-if="agreeBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
							成功
						</button>
						<button class="cu-btn bg-red btnClass" @click="updatecashapply(2)">
							<text v-if="rejectBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
							失败
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selectCapitalApplyDetail,
		updateCashApproval
	} from '@/api/pay.js'
	import dictionary from '@/utils/dictionary.js';
	import Router from '@/router'
	export default {
		data() {
			return {
				detailInfo: {},
				statusObject: dictionary.capitalStatus,
				bankText: '',
				remark: '',
				isRotate: false, //是否加载旋转
				agreeBtnLoading: false,
				rejectBtnLoading: false,
				payMethodStatus: dictionary.payMethodStatus,
				saveInfo: {
					applyId: 0,
					remark: '',
					status: 0
				},
			};
		},
		created() {
			var _this = this;
			_this.saveInfo.applyId = _this.$Route.query.cashid;
			_this.loadApplyInfo(_this.saveInfo.applyId);
		},
		methods: {
			loadApplyInfo(id) {
				var _this = this;
				selectCapitalApplyDetail(id).then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '获取提现信息异常请稍后再试',
							icon: "none"
						});
						return;
					}
					_this.detailInfo = response.data;
					console.log("返回的信息为ADMIN",response)
					if (response.data.payMethodType == 4) {
						_this.bankText = (response.data.bankaccount + "(" + response.data.account + ")");
					} else {
						_this.bankText = '其他方式';
					}
				})
			},
			updatecashapply(applyState) {
				var _this = this;
				if (_this.isRotate) {
					return;
				}
				_this.isRotate = true;
				_this.saveInfo.remark = _this.remark;
				_this.saveInfo.status = applyState;
				if (applyState == 1) {
					_this.agreeBtnLoading = true;
				}
				if (applyState == 2) {
					_this.rejectBtnLoading = true;
				}
				console.log("需要提交的数据为", _this.saveInfo)
				updateCashApproval(_this.saveInfo).then(response => {
					console.log("修改是否成功", response)
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载失败，请稍后重试',
							icon: "none"
						});
						_this.rejectBtnLoading = false;
						_this.agreeBtnLoading = false;
						_this.isRotate = true;
						return;
					}
					uni.showToast({
						title: '保存成功',
						icon: "none",
						success: function() {
							// #ifdef H5
							_this.$router.push("approvallist")
							//#endif
							//#ifdef APP-PLUS
							Router.push({
								name: 'approvallist'
							});
							// #endif
						}
					});
				});
				console.log("修改后的状态为", applyState);
				console.log("当前填写的备注为", _this.remark);
			}
		}
	}
</script>

<style scoped lang="scss">
	.cashApproval {
		.detail {
			.cashDeatil {
				margin: 80upx;

				.money {
					text-align: center;
					font-size: 60upx;
					color: red;

				}

				.statusText {
					font-size: 24upx;
					color: #666666;
					text-align: center;
				}
			}

			.cu-timeline>.cu-item>.content {
				padding: 6upx 30upx 30upx 30upx;
			}

			.lastApproval {
				margin-bottom: 30upx;
			}

			.usertrait {
				margin-top: -96upx;
			}

			.cu-btn {
				width: 40% !important;
				margin-top: 10px !important;
				margin-bottom: 10px !important;
			}

			.cu-bar.btn-group uni-button {
				max-width: none !important;
			}

			.btnBottom {
				padding-bottom: 100upx;
			}

			.btnClass {
				height: 100upx;
			}

			.contentClass {
				.title {
					height: 140upx;
				}
			}
		}

	}
</style>
