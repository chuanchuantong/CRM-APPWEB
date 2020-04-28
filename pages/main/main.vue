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
			<view class="action" @click="NavChange" v-for="item in menuData" :key="item.id" :data-id="item.id" :data-cur="item.menucode">
				<view class='cuIcon-cu-image'>
					<image :src="PageCur==item.menucode?item.biconurl:item.iconurl"></image>
				</view>
				<view :class="PageCur==item.menucode?'text-green':'text-gray'">{{item.menuname}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMenu
	} from '@/api/appsys.js'
	import {
		getUserInfo
	} from '@/api/login.js'
	import {
		selectAll
	} from '@/api/clues.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin 
		data() {
			return {
				PageCur: 'basics',
				menuData: {},
				id: 0,
				TabCur: 0,
				clues: ["我的线索", "跟进线索", "分配线索"],
				scrollTop: 0,
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效(native: true, 则需在pages.json中配置 "enablePullDownRefresh": true)
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 20 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				queryData: {
					currentPage: 1,
					pageSize: 20,
					params: {

					}
				},
				returnData: []
			}
		},
		created() {
			this.init();
			getMenu({
				roleId: 1,
				parentId: 0
			}).then(res => {
				this.menuData = res.data
				console.log(res)
				this.PageCur = res.data[0].menucode;
				this.id = res.data[0].id;

			});
		},
		methods: {
			mescrollInit() {
				console.log("初始化")
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				// 第1种: 请求具体接口
				// uni.request({
				// 	url: 'xxxx',
				// 	success: () => {
				// 		// 请求成功,隐藏加载状态
				// 		this.mescroll.endSuccess()
				// 	},
				// 	fail: () => {
				// 		// 请求失败,隐藏加载状态
				// 		this.mescroll.endErr()
				// 	}
				// })

				selectAll(this.queryData).then(res => {
					this.returnData = res.data.list;
					this.mescroll.endSuccess()
				})

				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				//this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				//this.mescroll.endSuccess()
				// 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
			},
			/*上拉加载的回调*/
			upCallback(page) {
				console.log("上啦刷新", page)
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.queryData.currentPage = page.num;
				this.queryData.pageSize = page.size;
				selectAll(this.queryData).then(res => {
					console.log("总页数", res.data.total)
					if (page.num == 1) this.returnData = [];
					console.log("源：", res.data.list)
					this.returnData = this.returnData.concat(res.data.list);
					console.log("返回的数据", this.returnData)
					let totalPage = res.data.pages;
					let curPageLen = res.data.size;

					this.$nextTick(() => {
						this.mescroll.endByPage(curPageLen, totalPage);
					})
				})
				// 	uni.request({
				// 		url: 'xxxx?pageNum=' + pageNum + '&pageSize=' + pageSize,
				// 		success: (data) => {
				// 			// 接口返回的当前页数据列表 (数组)
				// 			let curPageData = data.xxx;
				// 			// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				// 			let curPageLen = curPageData.length;
				// 			// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
				// 			let totalPage = data.xxx;
				// 			// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
				// 			let totalSize = data.xxx;
				// 			// 接口返回的是否有下一页 (true/false)
				// 			let hasNext = data.xxx;

				// 			//设置列表数据
				// 			if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				// 			this.dataList = this.dataList.concat(curPageData); //追加新数据

				// 			// 请求成功,隐藏加载状态
				// 			//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 			this.mescroll.endByPage(curPageLen, totalPage);

				// 			//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 			//this.mescroll.endBySize(curPageLen, totalSize); 

				// 			//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				// 			//this.mescroll.endSuccess(curPageLen, hasNext); 

				// 			//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
				// 			//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
				// 			//如果传了hasNext,则翻到第二页即可显示无更多数据.
				// 			//this.mescroll.endSuccess(curPageLen);

				// 			// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
				// 			this.$nextTick(() => {
				// 				this.mescroll.endSuccess(curPageLen)
				// 			})

				// 			//curPageLen必传的原因:
				// 			1. 使配置的noMoreSize 和 empty生效
				// 			2. 判断是否有下一页的首要依据:
				// 				当传的值小于page.size时(说明不满页了), 则一定会认为无更多数据;
				// 			比传入的totalPage, totalSize, hasNext具有更高的判断优先级;
				// 			3. 当传的值等于page.size时, 才会取totalPage, totalSize, hasNext判断是否有下一页
				// 			传totalPage, totalSize, hasNext目的是避免方法四描述的小问题

				// 			// 提示: 您无需额外维护页码和判断显示空布局,mescroll已自动处理好.
				// 			// 当您发现结果和预期不一样时, 建议再认真检查以上参数是否传正确
				// 		},
				// 		fail: () => {
				// 			//  请求失败,隐藏加载状态
				// 			this.mescroll.endErr()
				// 		}
				// 	})

			},
			NavChange: function(e) {
				console.log(e)
				console.log("id为", e.currentTarget.dataset.id);
				this.id = e.currentTarget.dataset.id;

				this.PageCur = e.currentTarget.dataset.cur;
				console.log(this.PageCur)
			},
			init: function() {
				getUserInfo().then(res => {
					//#ifdef H5
					localStorage.setItem('data', JSON.stringify(res.data))
					//#endif
					//#ifdef APP-PLUS
					uni.setStorageSync("data", res.data);
					//#endif
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
