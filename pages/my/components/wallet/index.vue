<template>
	<view class="myWallet">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">我的钱包</block>
		</cu-custom>
		<view class="bg-white padding bgimg">
			<view class="grid margin-bottom text-center col-3">
				<view class="gradpadding">
					<view class="text-grey textcolor">{{homeEntity.amountCon}}</view>
					<view class="text-gray text-sm fontsize">
						总佣金
					</view>
				</view>
				<view class="gradpadding">
					<view class="text-grey textcolor">{{homeEntity.amountApply}}</view>
					<view class="text-gray text-sm fontsize">
						已提现
					</view>
				</view>
				<view class="gradpadding">
					<view class="text-grey textcolor">{{homeEntity.amountLoad}}</view>
					<view class="text-gray text-sm fontsize">
						等待中
					</view>
				</view>
				<view class="gradpadding">
					<view class="text-grey textcolor">{{homeEntity.preAmount}}</view>
					<view class="text-gray text-sm fontsize">
						可提现
					</view>
				</view>
			</view>
		</view>
		<view class="positionLine"></view>
		<view class="cu-list menu-avatar">
			<view v-for="(info,index) in capitalList" :key="index" class="cu-item" @click="openUrl('cashdetail',info.id)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							申请提现￥{{info.amount}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">{{statusObject[info.status]}}</view>
					<view class="text-xs">{{info.createtime|formatTime}}</view>
				</view>
			</view>
		</view>

		<view class="positionLine"></view>
		<!-- <view class="cu-list menu-avatar">
			<view v-for="(info,index) in capitalList" :key="index" class="cu-item" @click="openUrl('cashdetail',info.id)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							申请提现￥{{info.amount}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">{{statusObject[info.status]}}</view>
					<view class="text-xs">{{info.createtime|formatTime}}</view>
				</view>
			</view>
		</view> -->



	</view>
</template>

<script>
	import dictionary from '@/utils/dictionary.js';
	import {
		selectCapitalApply
	} from '@/api/pay.js';
	import {
		queryHomeAmount
	} from '@/api/money.js'
	import Router from '@/router'
	export default {
		data() {
			return {
				capitalList: [],
				statusObject: dictionary.capitalStatus,
				homeEntity: {}
			};
		},
		created() {
			var _this = this;
			queryHomeAmount().then(res => {
				this.homeEntity = res.data
				console.log(res)
			});
			console.log("状态对象为", _this.statusObject);
			_this.loadCapitalList();

		},
		filters: {
			'formatTime': function(value) {
				var _this = this;
				console.log(value)
				if (value != undefined && value != null && value != '') {
					return value.split('T')[0];
				}
			}
		},
		methods: {
			loadCapitalList() {
				var _this = this;
				selectCapitalApply().then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载失败，请稍后重试',
							icon: "none"
						});
						return;
					}
					_this.capitalList = response.data;
				})

			},
			isNullOrEmpty(value) {
				return (value == undefined || value == null || value == '')
			},
			openUrl(url, cashid) {
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
	.myWallet {

		.gradpadding {
			padding: 30upx 0px;
			width: 25% !important;
		}

		.bgimg {
			background-image: url(@/static/home/bg.png);
			font-size: 36upx;
			color: #FFFFFF !important;
		}

		.textcolor {
			//color: #333333 !important;
			font-size: 40upx;
		}

		.fontsize {
			font-size: 26upx;
		}

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
