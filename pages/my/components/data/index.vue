<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue"  :isBack="true"><block slot="content">我的资料</block></cu-custom>
		<view class="cu-list menu sm-border">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">用户ID</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">用户888888</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="openUrl('updatedata','更改昵称','小明明')">
					<view class="content">
						<text class="text-grey">昵称</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">小明明</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">邮箱</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">xiaomingming@qq.com</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">小明明</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">15287699085</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">密码</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">修改密码</text>
					</view>
				</view>
				<!-- <view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">微信</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">xiaoming123</text>
					</view>
				</view> -->
			</view>
			<view class="positionLine"></view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">我的邀请码</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">MYDEYAOQING</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">我的销售经理</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">马化腾</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">我的上线</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">马云</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-grey">我的提现信息</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">绑定支付宝/微信</text>
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
				
			};
		},
		methods: {
			openUrl(url,title,content) {
				console.log("点击了路由跳转",url)
				Router.push({name:url,params:{title:title,content:content}});
			}
		}
	}
</script>

<style scoped lang="scss">
.positionLine{
	height: 10upx;
}
</style>
