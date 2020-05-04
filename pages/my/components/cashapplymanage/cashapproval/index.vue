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
						<view v-if="detailInfo.payMethodType == 1" class="title">
							<view>
								{{detailInfo.bankaccount}}
							</view>
							<view>
								{{detailInfo.account}}
							</view>
						</view>
						<view v-else class="title">
							<view>
								{{payMethodStatus[detailInfo.payMethodType]}}
							</view>
							<view>
								{{detailInfo.account}}
							</view>
						</view>
						<view class="text-xs">{{detailInfo.payeename}}</view>
					</view>
					<!-- <view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							提现进度
						</view>
					</view>
					<view class="cu-timeline">
						<view class="cu-item text-blue cuIcon-radioboxfill">
							<view class="content">
								已提交至财务等待打款
							</view>
						</view>
						<view class="cu-item lastApproval cuIcon-radioboxfill" :class="detailInfo.capitalStatus==1?'text-blue':''">
							<view class="content">
								已完成
							</view>
						</view>
					</view> -->
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
							同意
						</button>
						<button class="cu-btn bg-red btnClass" @click="updatecashapply(2)">
							<text v-if="rejectBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
							驳回
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selectCapitalApplyDetail
	} from '@/api/pay.js'
	import dictionary from '@/utils/dictionary.js';
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
				payMethodStatus:dictionary.payMethodStatus,
			};
		},
		created() {
			var _this = this;
			var cashid = _this.$Route.query.cashid;
			_this.loadApplyInfo(cashid);
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
					if (response.data.payMethodType == 1) {
						// _this.bankText = response.data.bankaccount + "(" + response.data.account + ")";
					} else {
						_this.bankText = dictionary.payMethodStatus[response.data.payMethodType] + "(" + response.data.account + ")";
					}
				})
			},
			updatecashapply(applyState) {
				var _this = this;
				_this.isRotate = true;
				_this.agreeBtnLoading = true;
				_this.rejectBtnLoading = true;
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
			.contentClass{
				.title{
					height: 100upx;
				}
			}
		}

	}
</style>
