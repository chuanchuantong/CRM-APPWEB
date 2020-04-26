<template>
	<view>
		<view class="myCluesClass">
			<scroll-view scroll-x class="bg-white nav nav_heard clueHead">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in clues" :key="index" @tap="tabSelect"
					 :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view>

			<mescroll-body class="clueData" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			 :up="upOption">
				<myclues v-if="TabCur=='0'"></myclues>
				<followup v-if="TabCur=='1'"></followup>
				<distribution v-if="TabCur=='2'"></distribution>
			</mescroll-body>





		</view>

	</view>
</template>


<script>
	import myclues from './components/myclues/index.vue';
	import followup from './components/followupclues/index.vue';
	import distribution from './components/distributionclues/index.vue';
	import {
		getMenu
	} from '@/api/appsys.js'
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			id: {
				type: [Number, String],
				default: -1
			}
		},
		components: {
			myclues,
			followup,
			distribution
		},
		created() {
			var _this = this;
			_this.getCuleMenu();
		},
		data() {
			return {
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
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
			};
		},
		methods: {
			//页面滚动执行方式
			onPageScroll(e) {
				this.scrollTop = e.scrollTop
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			getCuleMenu() {
				var _this = this;
				console.log(_this.id)
				//获取线索id
				getMenu({
					parentId: parseInt(_this.id)
				}).then(res => {
					console.log("线索管理的获取菜单数据", res)

				})
			},
			mescrollInit() {
				console.log("初始化")
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				// 第1种: 请求具体接口
				uni.request({
					url: 'xxxx',
					success: () => {
						// 请求成功,隐藏加载状态
						this.mescroll.endSuccess()
					},
					fail: () => {
						// 请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				})
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				this.mescroll.endSuccess()
				// 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
			},
			/*上拉加载的回调*/
			upCallback(page) {
				console.log("上啦刷新")
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
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

			}


		}
	}
</script>

<style scoped lang="scss">
	.myCluesClass {
		.clueHead {
			position: fixed;
			z-index: 1000;
			width: 100%;
			margin-top: -110upx !important;
		}

		.clueData {
			width: 100%;
			margin-top: 110upx;

			.mescroll-body-content {
				margin-top: -10px;
			}

			margin-bottom: 150upx;
		}
	}
</style>
