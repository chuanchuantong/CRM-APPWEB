<template>
	<view class="cashDetail">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">提现详情</block>
		</cu-custom>
		<view class="detail">
			<view class="cu-card case">
				<view class="cu-item shadow">
					
					<view class="cashDeatil">
						<view class="money">
							￥100.00
						</view>
						<view class="statusText text-xs">
							代付款
						</view>
						
					</view>
					
					
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							提现信息
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">建设银行(7950)</view>
						<view class="text-xs">童川川</view>
					</view>
					<view class="cu-bar bg-white solid-bottom">
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
						<view class="cu-item lastApproval">
							<view class="content">
								已完成
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		created() {
			var _this = this;
			console.log(_this.$Route.query.cashid)
		}
	}
</script>

<style scoped lang="scss">
	.cashDetail {
		.detail {
			.cashDeatil{
				margin: 80upx;
				.money{
					text-align: center;
					font-size: 60upx;
					color: red;
					
				}
				.statusText{
					font-size: 24upx;
					color: #666666;
					text-align: center;
				}
			}
			.cu-timeline>.cu-item>.content{
				padding: 6upx 30upx 30upx 30upx;
			}
			.lastApproval{
				margin-bottom: 30upx;
			}
		}
	}
</style>
