<template>
	<view>
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总佣金</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>已提现</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>可提现</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>等待中</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总订单</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总销售提成</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总邀请</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总推广佣金</text>
			</view>
		</view>

		<view class="positionLine"></view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item">
				<view class="content" style="width: 80%;text-align: center;">
					内容
				</view>
				<view class="action" style="width: 20%;text-align: center;">
					时间
				</view>
			</view>
		</view>
		<myclues></myclues>

	</view>
</template>

<script>
	import myclues from '../clues/components/myclues/index.vue'

	export default {
		components: {
			myclues
		},
		data() {
			return {};
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.positionLine {
		height: 10upx;
	}

	.cu-list.menu-avatar>.cu-item .content {
		left: 20upx !important;
		width: 100% !important;
	}

	.cu-list.menu-avatar>.cu-item .action {
		width: 140upx !important;
	}

	.cu-list.menu-avatar>.cu-item {
		height: 80upx !important;
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		max-width: 566upx !important;
	}
</style>
