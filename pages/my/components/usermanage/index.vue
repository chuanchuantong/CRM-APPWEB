<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">用户管理</block>
		</cu-custom>
		<view class="positionLine"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @click="openUrl('销售专员',1)">
				<view class="content">
					<text class="text-grey">销售专员</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="openUrl('销售经理',2)">
				<view class="content">
					<text class="text-grey">销售经理</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="openUrl('OA',3)">
				<view class="content">
					<text class="text-grey">OA</text>
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
				userInfo: {}
			};
		},
		created() {

		},
		methods: {
			openUrl(title, id) {
				//#ifdef APP-PLUS
				Router.push({
					name: 'userlist',
					params: {
						title: id
					}
				});
				//#endif

				//#ifdef H5
				this.$router.push({
					name: 'userlist',
					params: {
						title: id
					}
				});
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.positionLine {
		height: 10upx;
	}
</style>
