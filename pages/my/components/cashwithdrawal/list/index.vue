<template>
	<view class="cashList">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">提现列表</block>
		</cu-custom>
		<view class="positionLine"></view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" @click="openUrl('cashdetail',1)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							申请提现￥200
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">审核中</view>
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item" @click="openUrl('cashdetail',2)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							申请提现￥100
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">审核中</view>
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item" @click="openUrl('cashdetail',3)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							申请提现￥300
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">已完成</view>
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item" @click="openUrl('cashdetail',4)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							申请提现￥500
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">已完成</view>
					<view class="text-xs">2020-04-19</view>
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
		methods:{
			openUrl(url,cashid){
				//#ifdef APP-PLUS
				Router.push({
					name: url,
					params: {
						cashid: cashid
					}
				});
				//#endif
				//#ifdef H5
				this.$Router.push({
					name: url,
					params: {
						cashid: cashid,
					}
				});
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.cashList {

		.conetnt {
			left: 30upx;
		}

		.positionLine {
			height: 10upx;
		}

		.cu-list.menu-avatar>.cu-item .content {
			left: 20upx !important;
			// width: 100% !important;
		}

		.cu-list.menu-avatar>.cu-item .action {
			width: 140upx !important;
		}

		.cu-list.menu-avatar>.cu-item {
			height: 100upx !important;
		}

		.cu-list.menu-avatar>.cu-item .flex .text-cut {
			max-width: 566upx !important;
		}
	}
</style>
