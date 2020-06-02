<template>
	<view>
		<view class="accManage">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true" :url="'main'">
				<block slot="content">账户管理</block>
				<block slot="right">
					<button class="cu-btn bg-green btnCreateClue" @click="openUrl()">
						添加
					</button>
				</block>

			</cu-custom>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-titles text-green"></text> 账户列表
				</view>
			</view>
			<view class="manageClass">
				<view class="cu-list menu menu-avatar">
					<view class="cu-item arrow" v-for="(pay,index) in payMethods" :key="index" @click="openUrl(pay.id)">
						<view class="content">
							<view class="text-grey">{{pay.bankaccount}}</view>
							<view class="text-gray text-sm">{{pay.account}}</view>
						</view>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import Router from '@/router';
	import {
		getPayMethods
	} from '@/api/pay.js';
	import dictionary from '@/utils/dictionary.js'
	export default {
		data() {
			return {
				payMethods: []
			};
		},
		created() {
			//获取提现方式列表
			var _this = this;
			console.log("提现列表页面")
			_this.getPayMethodList();
		},
		// onShow() {
		// 	//获取提现方式列表
		// 	var _this = this;
		// 	console.log("提现列表页面")
		// 	_this.getPayMethodList();
		// },
		methods: {
			getPayMethodList() {
				var _this = this;
				getPayMethods().then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '数据加载失败，请稍后重试',
							icon: "none"
						});
						return;
					}
					_this.payMethods=[];
					for (var i = 0; i < response.data.length; i++) {
						var info = response.data[i];
						if (info.status == 1) {
							info.account = "尾号(" + info.account.substr(info.account.length - 4) + ")";
						} else {
							info.bankaccount = dictionary.payMethodStatus[info.status];
						}
						_this.payMethods.push(info);
					}
				})
			},
			openUrl(id) {
				var _this = this;
				console.log(id)
				//#ifdef APP-PLUS

				Router.push({
					name: 'addcashmode',
					params: {
						methodId: id,
					}
				});
				//#endif

				//#ifdef H5
				this.$Router.push({
					name: 'addcashmode',
					params: {
						methodId: id,
					}
				});
				//#endif
			}
		}

	}
</script>

<style scoped lang="scss">
	.accManage {
		.manageClass {
			.content {
				left: 64upx !important;
			}
		}

		.btnCreateClue {
			text-align: right;
			position: absolute;
			right: 10upx;
		}
	}
</style>
