<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">我的资料</block></cu-custom>
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content"><text class="text-grey">用户ID</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.usercode }}</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="openUrl('updatedata', '更改昵称', userInfo.nickname,'nickname')">
				<view class="content"><text class="text-grey">昵称</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.nickname }}</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="openUrl('updatedata', '更改用户名', userInfo.loginname,'loginname')">
				<view class="content"><text class="text-grey">用户名</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.loginname }}</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="openUrl('updatepwd', '更改密码', userInfo.loginpwd)">
				<view class="content"><text class="text-grey">密码</text></view>
				<view class="action"><text class="text-grey text-sm">修改密码</text></view>
			</view>
			<view class="cu-item arrow" @click="openUrl('updatedata', '更改邮箱', userInfo.email,'email')">
				<view class="content"><text class="text-grey">邮箱</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.email }}</text>
				</view>
			</view>
		</view>
		<view class="positionLine"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @click="openUrl('mycode', '我的二维码')">
				<view class="content"><text class="text-grey">我的邀请码</text></view>
				<view class="action">
					<text class="text-grey text-sm">{{ userInfo.incode }}</text>
				</view>
			</view>
			<!-- <view class="cu-item">
				<view class="content">
					<text class="text-grey">我的销售经理</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">马化腾</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">我的上线</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">马云</text>
				</view>
			</view> -->
			<!-- <view class="cu-item arrow">
				<view class="content">
					<text class="text-grey">我的提现信息</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">绑定支付宝/微信</text>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import Router from '@/router';
export default {
	data() {
		return {
			userInfo: {}
		};
	},
	created() {
		//#ifdef APP-PLUS
		this.userInfo = uni.getStorageSync('data');
		//#endif
		//#ifdef H5
		this.userInfo = JSON.parse(localStorage.getItem('data'));
		//#endif
	},
	onShow() {
		//#ifdef APP-PLUS
		this.userInfo = uni.getStorageSync('data');
		//#endif
		//#ifdef H5
		this.userInfo = JSON.parse(localStorage.getItem('data'));
		//#endif
		console.log('获取的用户信息为', this.userInfo);
	},
	methods: {
		openUrl(url, title, content,code) {
			//#ifdef APP-PLUS
			Router.push({
				name: url,
				params: {
					title: title,
					content: content,
					code:code
				}
			});
			//#endif
			console.log(content);
			//#ifdef H5
			this.$Router.push({
				name: url,
				params: {
					title: title,
					content: content,
					code:code
				}
			});
			//#endif
		}
	}
};
</script>

<style scoped lang="scss">
.positionLine {
	height: 10upx;
}
</style>
