<template>

	<view class="content">
		<cu-custom v-show="PageCur=='home'" bgColor="bg-gradual-blue">
			<block slot="content">首页</block>
		</cu-custom>
		<cu-custom v-show="PageCur=='cluesmanage'" bgColor="bg-gradual-blue">
			<block slot="content">线索管理</block>
		</cu-custom>
		<cu-custom v-show="PageCur=='component'" bgColor="bg-gradual-blue">
			<block slot="content">用户管理</block>
		</cu-custom>
		<myself :id="id" v-if="PageCur=='myself'"></myself>
		<cluesmanage :id="id" v-if="PageCur=='cluesmanage'"></cluesmanage>
		<subordinate v-if="PageCur=='subordinate'"></subordinate>
		<home v-if="PageCur=='home'"></home>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" v-for="item in menuData" :data-id="item.id" :data-cur="item.menucode">
				<view class='cuIcon-cu-image'>
					<image :src="PageCur==item.menucode?item.biconurl:item.iconurl"></image>
				</view>
				<view :class="PageCur==item.menucode?'text-green':'text-gray'">{{item.menuname}}</view>
			</view>
		<!-- 	<view class="action" @click="NavChange" data-cur="cluesmanage">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur=='cluesmanage'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='cluesmanage'?'text-green':'text-gray'">线索管理</view>
			</view>
			<view class="action" @click="NavChange" data-cur="subordinate">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'subordinate'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='subordinate'?'text-green':'text-gray'">用户管理</view>
			</view>
			<view class="action" @click="NavChange" data-cur="myself">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'myself'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='myself'?'text-green':'text-gray'">我的</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {getMenu} from '@/api/appsys.js'
	import {getUserInfo} from '@/api/login.js'
	export default {
		data() {
			return {
				PageCur: 'basics',
				menuData:{},
				id:0,
			}
		},
		created() {
			this.init();
			getMenu({roleId:1,parentId:0}).then(res=>{
				this.menuData = res.data
				console.log(res)
				this.PageCur = res.data[0].menucode;
				this.id=res.data[0].id;
				
			});
		},
		methods: {
			NavChange: function(e) {
				console.log(e)
				console.log("id为",e.currentTarget.dataset.id);
				this.id=e.currentTarget.dataset.id;
				
				this.PageCur = e.currentTarget.dataset.cur;
				console.log(this.PageCur)
			},
			init:function(){
				getUserInfo().then(res=>{
					localStorage.setItem('data',JSON.stringify(res.data))
					
				})
				
			}
		}
	}
</script>


<style lang="scss">
	.myself {
		width: 100%;
		height: 160rpx;
		background-color: white;

		.baseInfo {
			width: 90%;
			height: 90%;
			margin: 0 5% 30rpx 5%;
			display: flex;

			.baseInfoleft {
				width: 90%;

				.name {
					font-size: 32rpx;
					font-weight: bold;
					line-height: 80rpx;
					letter-spacing: 4rpx;
				}

				.invitationCode {
					font-size: 28rpx;
					color: #666666;
				}
			}

			.iconshare {
				width: 10%;

				image {
					width: 50rpx;
					height: 50rpx;
					margin-top: 55rpx;
				}
			}
		}

		.cashWithdrawal {
			width: 100%;
			display: flex;
			height: 80rpx;

			background-color: white;
			line-height: 80rpx;

			.iconmoney {
				image {
					width: 40rpx;
					height: 40rpx;
					margin-top: 20rpx;
					margin-left: 25rpx;
					margin-right: 25rpx;
				}

			}

			.cashWithdrawalText {
				font-size: 26rpx;

			}
		}
	}

	.content {
		margin: 0;
		padding: 0;
	}

	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}

	.baseContent {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		// align-items: flex-start;
		// align-content: flex-start;
		justify-content: space-between;

		.card {


			margin: 10px 0px;
			width: 23%;
			background-color: white;
			border-radius: 20px;
			box-shadow: 1px 1px 1px #C8C7CC;
			text-align: center;
			font-size: 12px;

			.cardContent {}
		}

	}

	@media screen and (min-width: 320px) {

		.baseContent {
			.card {
				width: 28%;
			}
		}
	}
</style>

