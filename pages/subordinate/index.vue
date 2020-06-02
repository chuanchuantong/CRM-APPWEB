<template>
	<view class="subords">
		<cu-custom bgColor="bg-gradual-blue">
			<!-- <block slot="content">查看下线</block> -->
			<block slot="content">我邀请的</block>
		</cu-custom>
		<view class="bg-white padding bgimg">
			<view class="grid margin-bottom text-center col-2">
				<view class="gradpadding">
					<view class="text-grey textcolor">{{childsAmount}}</view>
					<!-- <view class="text-gray text-sm">
						累计返佣金额(元)
					</view> -->
					<view class="text-gray text-sm">
						累计推广佣金(美元)
					</view>
				</view>
				<view class="gradpadding">
					<view class="text-grey textcolor">{{childsCount}}</view>
					<view class="text-gray text-sm">
						累计邀请人
					</view>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<!-- <text class="text-xl text-bold">我的下线</text> -->
					<text class="text-xl text-bold">我邀请的用户</text>
				</view>
			</view>

		</view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="CustomBar+430" :bottom="0.5*250" @down="downCallback" @up="upCallback"
		 :down="downOption" :up="upOption">
			<view class="cu-card case no-card">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="item in childs" :key="item.id">
							<view class="cu-avatar round lg margin-xs" :class="'bg-blue'">
								<text class="avatar-text">{{item.nickname}}</text>
							</view> 
							<view class="content flex-sub">
								<view class="text-grey text-sm flex justify-between">{{item.nickname}}({{item.usercode}})
									<view class="text-gray text-sm">
										<text class="margin-lr-xs"></text><span style="font-weight: bold;">{{item.amount==null?0.00:item.amount}}元</span>
									</view>
								</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.rolename}}
									<view class="text-gray text-sm">
										<text class="margin-lr-xs"></text> {{item.createtime==null?"":item.createtime.slice(0, 10)}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>

	</view>
</template>

<script>
	import {
		getChildsByUserId
	} from '@/api/sysUser.js'
	import {
		queryAmountByUserId
	} from '@/api/money.js'
	// import {formatDate} from '@/utils/utils.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin

		data() {
			return {
				queryData: {
					currentPage: 1,
					pageSize: 20,
					params: {
						cstatus: 1
					}
				},
				childs: [],
				childsCount: 0,
				childsAmount: 0,
				keAmount: 0,
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
			this.amount()
			//this.Init();
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
				getChildsByUserId(this.queryData).then(res => {
					if (page.num == 1) this.childs = []; //如果是第一页需手动置空列表
					this.childs = this.childs.concat(res.data.list); //追加新数据
					console.log(res.data.list)
					this.childsAmount = res.data.amount
					this.childsCount = res.data.total
					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(res.data.size, res.data.pages);
				})
			},
			// Init: function() {
				
			// 	getChildsByUserId({queryData: {
			// 		currentPage: 1,
			// 		pageSize: 20000,
			// 		params: {
			// 			cstatus: 1
			// 		}
			// 	}}).then(res => {
			// 		let amount = 0
			// 		this.childs = res.data;
			// 		this.childs.forEach(s => {
			// 			//s.img = this.$userHead(s.nickname),
			// 			amount += parseFloat(s.amount == null ? 0 : s.amount)
			// 		})
			// 		console.log(amount)
			// 		this.childsCount = res.data.length
			// 		this.childsAmount = amount
			// 	}) 
			// },
			amount:function(){
				queryAmountByUserId().then(res => {
					this.keAmount = res.data.amount;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.subords {
		margin-bottom: 240upx;

		.bgimg {
			background-image: url(../../static/home/bg.png);
			color: #FFFFFF !important;
		}


		.gradpadding {
			padding: 30upx 0px;
		}

		.textcolor {
			// color: #333333 !important;
			font-size: 40upx;
		}

	}
</style>
