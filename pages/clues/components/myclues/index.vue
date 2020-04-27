<template>
	<view>

		<view class="cu-list menu-avatar bottom_cu">
			<view class="cu-item newslist" @click="openUrl(item.id)" v-for="(item,index) in returnData" :key="index">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							{{item.shorthand}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">{{item.createtime.slice(0, 10)}}</view>
				</view>
			</view>
			<view class="cu-item" @click="createclues">
				<view class="content" style="text-align: center;">
					<text class="cuIcon-roundadd text-grey"></text>
					<text class="text-grey">创建线索</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Router from '@/router'
	import {
		selectAll
	} from '@/api/clues.js'
	export default {

		data() {
			return {
				queryData: {
					currentPage: 1,
					pageSize: 20,
					params: {

					}
				},
				returnData: [],
				more: "more"
			}
		},
		onLoad: function(options) {
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh:function() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		created() {
			this.query();
		},
		methods: {
			query() {
				selectAll(this.queryData).then(res => {
					console.log(res)
					this.returnData = res.data;
				})
			},

			//创建线索
			createclues() {
				//此时应该是创建线索去了
				//#ifdef APP-PLUS
				console.log("点击了路由跳转", 'createclue')
				Router.push('createclue');
				//#endif

				//#ifdef H5
				console.log("点击了路由跳转H5", 'createclue')
				this.$router.push('createclue');
				//#endif
			},
			openUrl(clueid) {
				console.log("线索id", clueid)
				//#ifdef APP-PLUS
				Router.push({
					name: 'cluesdetail',
					params: {
						clueid: clueid
					}
				});
				//#endif

				//#ifdef H5
				this.$router.push({
					name: 'cluesdetail',
					params: {
						clueid: clueid
					}
				});
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.myCluesClass {
		.cu-list.menu-avatar>.cu-item .content {
			left: 20upx !important;
			width: 100% !important;
		}

		.bottom_cu {
			margin-bottom: 120px;
			padding-top: 110upx;
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
	}
</style>
