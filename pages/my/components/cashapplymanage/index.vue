<template>
	<view class="cashmanage">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">提现管理</block>
		</cu-custom>
		
		<view class="positionLine"></view>
		<view class="cu-list menu-avatar">
			<view v-for="(info,index) in capitalList" :key="index" class="cu-item" @click="openUrl('cashapproval',info.id)">
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

		
	</view>
</template>

<script>
	import dictionary from '@/utils/dictionary.js';
	import {
		selectCapitalApply
	} from '@/api/pay.js';
		import Router from '@/router'
	export default {
		data() {
			return {
				capitalList: [],
				statusObject: dictionary.capitalStatus,
			};
		},
		created() {
			var _this = this;
			_this.loadCapitalList();
		},
		filters: {
			'formatTime': function(value) {
				var _this = this;
				if (value != undefined && value != null && value != '') {
					return value.split('T')[0];
				}
			}
		},
		methods:{
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
	.cashmanage{
		.positionLine {
			height: 10upx;
		}
		.cu-list.menu-avatar>.cu-item .content {
			left: 20upx !important;
			// width: 100% !important;
		}
		
		.cu-list.menu-avatar>.cu-item .action {
			width: 240upx !important;
		}
		
		.cu-list.menu-avatar>.cu-item {
			height: 80upx !important;
		}
		
		.cu-list.menu-avatar>.cu-item .flex .text-cut {
			max-width: 566upx !important;
		}
	}
</style>
