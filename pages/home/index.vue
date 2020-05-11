<template>
	<view>
		<view class="cu-list grid col-4 no-border bgimg">
			<view class="cu-item">
				<view class="bgimg-hg">
					{{homeEntity.amountCon}}
				</view>
				<text>总佣金</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/yitixian.png"></cover-image> -->
					{{homeEntity.amountApply}}
				</view>
				<text>已提现</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/ketixian.png"></cover-image> -->
					{{homeEntity.preAmount}}
				</view>
				<text>可提现</text>
			</view>
			<view class="cu-item" @click="openUrl('cashlist')">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/dengdaizhong.png"></cover-image> -->
					{{homeEntity.amountLoad}}
				</view>
				<text>等待中</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/zongdingdan.png"></cover-image> -->
					{{homeEntity.clueCount}}
				</view>
				<text>总订单</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/zongxiaoshouticheng.png"></cover-image> -->
					{{homeEntity.amountTC}}
				</view>
				<text>总销售提成</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/zongyaoqing.png"></cover-image> -->
					{{homeEntity.userCount}}
				</view>
				<text>总邀请</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/zongtuiguangticheng.png"></cover-image> -->
					{{homeEntity.amountTG}}
				</view>
				<text>总推广佣金</text>
			</view>
		</view>

		<view class="positionLine"></view>
		<mescroll-uni  ref="mescrollRef" @init="mescrollInit" :top="CustomBar+400" :bottom="0.5*250" @down="downCallback" @up="upCallback"
		 :down="downOption" :up="upOption">
		<view class="cu-list  menu-avatar">
		<!-- 	<view class="cu-item">
				<view class="contentclass content">
					内容
				</view>
				<view class="action" style="width: 20%;text-align: center;">
					时间
				</view>
			</view> -->
			
				<view class="cu-item" v-for="(item,index) in messData" :key="index" :style="item.isReadly==0?'color:#333333':'color:#666666'"
				 @click="read(item)">
					<view class="content">
						<view class="text-sm flex">
							<view class="text-cut">
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-xs"> {{item.createtime==null?"":item.createtime.slice(0, 10)}}</view>
					</view>
				</view>
			
		</view>
</mescroll-uni>
	</view>
</template>

<script>
	import {
		queryHomeAmount
	} from '@/api/money.js'
	import {
		selectMessage,
		update
	} from '@/api/message.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {	
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				queryData: {
					currentPage: 1,
					pageSize: 2000,
					params: {
						cstatus: 1
					}
				},
				homeEntity: {},
				messData: [],
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
			this.init()
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
				selectMessage(this.queryData).then(res => {
					if (page.num == 1) this.messData = []; //如果是第一页需手动置空列表
					this.messData = this.messData.concat(res.data.list); //追加新数据 
					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(res.data.size, res.data.pages);
				})
			},
			init() {
				queryHomeAmount().then(res => {
					this.homeEntity = res.data
				});
				// selectMessage().then(res=>{
				// 	this.messData = res.data
				// })
			},
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
			read(e) {
				uni.showModal({
					title: e.title,
					content: e.content,
					showCancel: false,
					confirmText: '已读',
					success: function(res) {
						update({
							isReadly: 1,
							id: e.id
						}).then(res => {

						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.contentclass {
		width: 60% !important;
		text-align: center;
	}

	.bgimg {
		background-image: url(../../static/home/bg.png);
		font-size: 36upx;
		color: #FFFFFF !important;

		.bgimg-hg {
			// width: 46upx;
			// height: 46upx;
			margin: 0 auto;
			margin-top: 24upx;
		}
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
		height: 80upx !important;
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		max-width: 566upx !important;
	}
</style>
