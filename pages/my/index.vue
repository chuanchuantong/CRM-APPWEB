<template>
	<view>
		<view class="mycenterclass">
			<cu-custom bgColor="bg-gradual-blue">
				<block slot="content">我的</block>
			</cu-custom>
			<view class="cu-list menu menu-avatar">
				<view class="cu-item arrow" @click="openUrl('data')">
					<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
					<view class="content flex-sub">
						<view class="myname">{{userinfo.nickname}}({{userinfo.rolename}})</view>
						<view class="text-gray text-sm flex justify-between myincode">
							邀请码：{{userinfo.incode}}
						</view>
					</view>
				</view>
			</view>

			<view class="cu-list menu sm-border">
				<!-- <view v-for="(menuInfo,index) in menus" :key="index" class="cu-item arrow" @click="openUrl(menuInfo.url)">
					<view class="content"> <text class="'cuIcon-'+menuInfo.icon+' text-grey'"></text>
						<text class="text-grey">{{menuInfo.name}}</text>
					</view>
					<view v-if="menuInfo.bottom" class="positionLine"></view>
				</view> -->
				<view class="cu-item arrow" @click="openUrl('wallet')">
					<view class="content"> <text class="cuIcon-pay text-grey"></text>
						<text class="text-grey">我的钱包</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="openUrl('accountmanage')">
					<view class="content">
						<text class="cuIcon-rank text-grey"></text>
						<text class="text-grey">账户管理</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="openUrl('cashapply')">
					<view class="content">
						<text class="cuIcon-redpacket text-grey"></text>
						<text class="text-grey">提现申请</text>
					</view>
				</view>
			</view>
			<!-- 	<view class="positionLine"></view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow" @click="openUrl('subordinate')">
					<view class="content">
						<text class="cuIcon-group text-grey"></text>
						<text class="text-grey">我的推广</text>
					</view>
				</view>
			</view> -->
			<view class="positionLine"></view>
			<view class="cu-list menu sm-border">

				<view class="cu-item arrow" @click="openUrl('usermanage')">
					<view class="content">
						<text class="cuIcon-people text-grey"></text>
						<text class="text-grey">用户管理</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="openUrl('cluesresult')">
					<view class="content">
						<text class="cuIcon-paint text-grey"></text>
						<text class="text-grey">线索结果</text>
					</view>
				</view>
			</view>
			<view class="positionLine"></view>
			<view v-if="userinfo.rolecode=='ADMIN'" class="cu-list menu sm-border">
				<view class="cu-item arrow" @click="openUrl('approvallist')">
					<view class="content">
						<text class="cuIcon-moneybag text-grey"></text>
						<text class="text-grey">提现管理</text>
					</view>
				</view>
			</view>
			<!-- 	<view class="positionLine"></view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-settings text-grey"></text>
						<text class="text-grey">设置</text>
					</view>
				</view>
			</view> -->

			<button class="cu-btn bg-white" @click="outLogin">
				退出登录
			</button>
		</view>


	</view>

</template>

<script>
	import Router from '@/router'
	import {
		getMenu
	} from '@/api/appsys.js'
	export default {
		data() {
			return {
				//菜单集合
				menus: [],
				userinfo: {}

			};
		},
		props: {
			id: {
				type: [Number, String],
				default: -1
			}
		},
		created() {
			//#ifdef APP-PLUS
			this.userinfo = uni.getStorageSync("data")
			//#endif
			//#ifdef H5
			this.userinfo = JSON.parse(localStorage.getItem("data"));
			//#endif
			var _this = this;
			_this.getMyMenu();
		},
		methods: {
			//跳转页面
			openUrl(url) {
				//#ifdef APP-PLUS
				console.log("点击了路由跳转", url)
				Router.push(url);
				//#endif

				//#ifdef H5
				console.log("点击了路由跳转H5", url)
				this.$router.push(url);
				//#endif
			},
			//退出登录
			outLogin() {
				uni.removeStorageSync("Token")
				//#ifdef APP-PLUS 
				Router.push({
					name: 'login'
				});
				//#endif

				//#ifdef H5 
				this.$router.push("/");
				//#endif
			},
			//获取个人中心需要现实的菜单
			getMyMenu() {
				var _this = this;
				console.log(_this.id)
				//获取线索id
				getMenu({
					parentId: parseInt(_this.id)
				}).then(res => {
					console.log("个人中心获取菜单数据", res)

				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.mycenterclass {
		.positionLine {
			height: 10upx;
		}

		.cu-btn {
			width: 80%;
			margin: 5% 10%;
			color: red;
			height: 100upx;
		}
	}
</style>
