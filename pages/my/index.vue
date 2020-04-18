<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">我的</block></cu-custom>
		<view class="cu-list menu sm-border menu-avatar">
			<view class="cu-item arrow" @click="openUrl('data')">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
				<view class="content flex-sub">
					<view class="myname">凯尔</view>
					<view class="text-gray text-sm flex justify-between myincode">
						邀请码：TCC0820
					</view>
				</view>
			</view>
		</view>
		<view class="positionLine"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @click="openUrl('wallet')">
				<view class="content" > <text class="cuIcon-pay text-grey"></text>
					<text class="text-grey">我的钱包</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-rank text-grey"></text>
					<text class="text-grey">账户管理</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-redpacket text-grey"></text>
					<text class="text-grey">提现申请</text>
				</view>
			</view>
		</view>
		<view class="positionLine"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-group text-grey"></text>
					<text class="text-grey">我的推广</text>
				</view>
			</view>
		</view>
		<view class="positionLine"></view>
		<view class="cu-list menu sm-border">

			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-people text-grey"></text>
					<text class="text-grey">用户管理</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-paint text-grey"></text>
					<text class="text-grey">线索结果</text>
				</view>
			</view>
		</view>
		<view class="positionLine"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-settings text-grey"></text>
					<text class="text-grey">设置</text>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import Router from '@/router'
	export default {
		data() {
			return {};
		},
		methods: {
			openUrl(url) {
				console.log("点击了路由跳转",url)
				Router.push(url);
			}
		}
	}
</script>

<style lang="scss">
	.positionLine {
		height: 10upx;
	}
</style>
