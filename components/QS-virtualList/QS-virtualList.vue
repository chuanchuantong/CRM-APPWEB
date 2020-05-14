<template>
	<view class="QSInfiniteList" :style="{ 'padding': padding }">
		<view class="QSInfiniteList">
			<view class="QSInfiniteList_real">
				<block v-if="!QSLAZYLOAD_orderlyEnd">
					<view v-for="(item, index) in list" :key="index" :id="lazyLoadItemName + index">
						<filterTem :item="virtualList[QSLAZYLOAD_countLazyStartI + index]" :itemIndex="QSLAZYLOAD_countLazyStartI + index" :type="type" :style="{ 'margin-top': space }"></filterTem>
					</view>
				</block>
			</view>
			<view class="QSInfiniteList_virtual" :style="{ 'height': QSLAZYLOAD_infoHeight + 'px' }">
				<block v-if="show">
					<block v-for="(item, index) in nVirtualList" :key="index">
						<block v-if="lazyArr[QSLAZYLOAD_countLazyStartI + index]&&lazyArr[QSLAZYLOAD_countLazyStartI + index].show" >
							<view 
							class="QSInfiniteList_virtual_item" 
							:style="{ 'top': QSLAZYLOAD_infoArr[QSLAZYLOAD_countLazyStartI + index].top + 'px' }">
								<!-- {{index}} -->
								<filterTem :item="virtualList[QSLAZYLOAD_countLazyStartI + index]" :itemIndex="QSLAZYLOAD_countLazyStartI + index" :type="type"></filterTem>
							</view>
						</block>
					</block>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import filterTem from './QS-filterTemplate.vue'

	import QSLazyLoad from './QS-lazyLoad/QS-lazyLoad.js'

	const lazyLoadItemName = 'lazyLoadItem_';
	export default {
		mixins: [QSLazyLoad({
			lazyLoadItemName,
			lazyArrName: 'lazyArr',
			orderly: 1,
			Iv: 20,
			countIv: 2000
		})],
		components: {
			filterTem
		},
		props: {
			padding: {
				type: [String, Number],
				default: '28rpx'
			},
			type: {
				type: String,
				default: 'def'
			},
			showLength: {
				type:[String, Number],
				default: 20
			},
			viewTop: {
				type: [String, Number],
				default: 0
			},
			space: {
				type: [String, Number],
				default: '20px'
			},
			show: {
				type: [String, Boolean],
				default: true
			}
		},
		data() {
			return {
				lazyArr: [],
				lazyLoadItemName,

				list: [],
				virtualList: [],
				nVirtualList: Array(Number(this.showLength)).fill('').map((item, index)=>String(index))
			}
		},
		methods: {
			setScroll(scrollTop) {
				this.QSLAZYLOAD_setScrollTop(scrollTop);
			},
			setData(arr) {
				if (!this.QSLAZYLOAD_orderlyEnd) {
					this.list = [...arr]
				}

				this.virtualList = [...arr];
				this.QSLAZYLOAD_update(this.virtualList.length)
			}
		}
	}
</script>

<style scoped>
	@import url("css/box-sizing-border-box.css");

	.QSInfiniteList {
		width: 100%;
		position: relative;
	}

	.QSInfiniteList_real {
		position: absolute;
		top: 0;
		left: 0;
		height: 200px;
		width: 100%;
		display: flex;
		flex-direction: column;
		opacity: 0;
	}

	.QSInfiniteList_virtual {
		position: relative;
		width: 100%;
	}

	.QSInfiniteList_virtual_item {
		position: absolute;
		width: 100%;
	}
</style>
