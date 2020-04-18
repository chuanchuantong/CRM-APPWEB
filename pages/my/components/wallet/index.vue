<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">我的钱包</block></cu-custom>
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
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>
