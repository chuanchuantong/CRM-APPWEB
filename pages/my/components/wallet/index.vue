<template>
	<view class="myWallet">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :url="'main'">
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
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="CustomBar+300" :bottom="0" @down="downCallback" @up="upCallback"
		 :down="downOption" :up="upOption">
		<view class="cu-list menu-avatar">

			<view class="cu-item" v-for="(info,index) in capitalList" :key="index"
			 @click="openUrl('cashdetail',info.id)" :data-target="'move-box-' + index">
				<!-- <view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view> -->
				<view class="content" v-if="info.is_ru==0">
					<view class="text-grey">提现</view>
					<view class="text-gray text-sm">
						<text v-if="info.status==0" style="color: #cce6ff;" class="cuIcon-infofill     margin-right-xs"></text> 
						<text v-if="info.status==1" class="cuIcon-roundcheckfill text-blue margin-right-xs"></text>
						<text v-if="info.status==2" class="cuIcon-roundclosefill text-red margin-right-xs"></text>
						{{statusObject[info.status]}}</view>
				</view>
				<view class="content" v-if="info.is_ru==1">
					<view class="text-grey" v-if="info.status==0">提成</view>
					<view class="text-grey" v-if="info.status==1">返佣</view>
					<view class="text-gray text-sm">
						<text  class="cuIcon-roundcheckfill text-blue margin-right-xs"></text>
						收入</view>
				</view>
				<view class="action">
					<view v-if="info.status==0 && info.is_ru==0" class="text-grey text-xs fill">￥ -{{info.amount}}</view>
					<view v-if="info.status==1 && info.is_ru==0" class="text-grey text-xs">￥ -{{info.amount}}</view>
					<view v-if="info.status==2 && info.is_ru==0" class="text-grey text-xs text-red">￥ {{info.amount}}</view>
					<view v-if=" info.is_ru==1" class="text-grey text-xs text-yellow">￥ {{info.amount}}</view>
					<view class="text-grey text-sm">{{info.createtime|formatTime}}</view>
				</view>
			</view>
		</view>
</mescroll-uni> 
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
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				capitalList: [],
				statusObject: dictionary.capitalStatus,
				homeEntity: {},
				queryData: {
					currentPage: 1,
					pageSize: 20,
					params: {
						cstatus: 1
					}
				},
				XSGData:[],
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false, // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效
					textLoading: '正在玩命加载中。。。',
					//bgColor:'#FFFFFF',
					textColor: '#DDDDDD'
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 20 // 每页数据的数量,默认10
					},
					noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					},
					textLoading: '正在玩命加载中。。。',
					textNoMore: '没有更多数据了',
					textColor: '#DDDDDD'
				
				}
			};
		},
		created() {
			var _this = this;
			queryHomeAmount().then(res => {
				this.homeEntity = res.data
				console.log(res)
			});
			console.log("状态对象为", _this.statusObject);
			// _this.loadCapitalList();

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
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				console.log("下拉刷新一开始")
				this.mescroll.resetUpScroll();
				// 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
			},
			/*上拉加载的回调*/
			upCallback(page) {
				console.log("上拉刷新一开始")
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				selectCapitalApply(this.queryData).then(res => {
					if (page.num == 1) this.capitalList = []; //如果是第一页需手动置空列表
					this.capitalList = this.capitalList.concat(res.data.list); //追加新数据
					console.log(res.data.list)
					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(res.data.size, res.data.pages);
				})
			},
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
		.text-xs{
			font-weight: bold;
			// color: red;
		}
		.fill{
			color: #666666;
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
