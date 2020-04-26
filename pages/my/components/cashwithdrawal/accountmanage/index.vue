<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">账户管理</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-green"></text> 账户列表
			</view>
		</view>
		<view class="manageClass">
			<view class="cu-list menu menu-avatar">
				<view class="cu-item arrow" v-for="(item,index) in 4" :key="index" @click="openUrl(item)">
					<view class="content">
						<view class="text-grey">文晓港</view>
						<view class="text-gray text-sm">消息未送达</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Router from '@/router'
	export default {
		data() {
			return {
				modalName: null,
				listTouchStart: 10,
				listTouchDirection: null,
			};
		},
		methods: {
			openUrl(info) {
				var _this = this;
				console.log(info);
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
	.manageClass {
		.content {
			left: 64upx !important;
		}
	}
</style>
