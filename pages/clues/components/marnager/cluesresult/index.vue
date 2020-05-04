<template>
	<view class="mangResult">

		<!-- 		<view class="cu-list menu-avatar bottom_cu">
			<view class="cu-item newslist" @click="openUrl(item.id)" v-for="(item,index) in resultOAData" :key="index">
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
			<view v-if="resultOAData.length<=0" style="text-align: center;"> 暂无数据</view>
		</view> -->
		<view class="cu-card case no-card bottom_cu">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item" @click="openUrl(item.id)" v-for="(item,index) in resultOAData" :key="index">
						<view class="content flex-sub">
							<view class="text-grey flex justify-between">{{item.shorthand}}
								<view class="text-gray text-sm">
									<text class="margin-lr-xs"></text><span v-if="item.cstatus==3" class="cusser">已完成(￥{{item.royalty}})</span>
									<span v-if="item.cstatus==4" class="error">失败</span>
								</view>
							</view>
							<view class="text-gray text-sm flex justify-between">
								{{item.oaname}}
								<view class="text-gray text-sm">
									<text class="margin-lr-xs"></text> {{item.createtime==null?"":item.createtime.slice(0, 10)}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Router from '@/router'
	import {
		selectClueResult
	} from '@/api/clues.js'
	export default {
		props: {
			parmaData: []
		},
		data() {
			return {
				queryData: {
					currentPage: 1,
					pageSize: 20,
					params: {
						cstatus: 1
					}
				},
				resultOAData: [],
				more: "more"
			}
		},
		created() {
			this.query();
		},
		methods: {
			query() {
				selectClueResult().then(res => {
					this.resultOAData = res.data
				})
			},


			openUrl(clueid) {
				console.log("线索id", clueid)
				//#ifdef APP-PLUS
				Router.push({
					name: 'cluesdetail',
					params: {
						clueid: clueid
					},
					animation: {
						animationType: 'slide-in-right',
						animationDuration: 500
					}
				});
				//#endif

				//#ifdef H5
				this.$Router.push({
					name: 'cluesdetail',
					params: {
						clueid: clueid
					},
					animation: {
						animationType: 'slide-in-right',
						animationDuration: 500
					}
				});
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	// .myCluesClass {
	// 	.cu-list.menu-avatar>.cu-item .content {
	// 		left: 20upx !important;
	// 		// width: 100% !important;
	// 	}
	.mangResult {
		.cusser {
			font-weight: bold;
			color: #007AFF;
		}

		.cu-list.menu-avatar>.cu-item .content {
			left: 20upx;
		}

		.error {
			font-weight: bold;
			color: red;
		}

		.bottom_cu {
			margin-bottom: 120px;
			padding-top: 110upx;
		}

		.cu-list.menu-avatar>.cu-item .content.flex-sub {
			width: calc(100% - 30px);
		}
	}

	// 	.cu-list.menu-avatar>.cu-item .action {
	// 		width: 240upx !important;
	// 	}

	// 	.cu-list.menu-avatar>.cu-item {
	// 		height: 80upx !important;
	// 	}

	// 	.cu-list.menu-avatar>.cu-item .flex .text-cut {
	// 		max-width: 566upx !important;
	// 	}
	// }
</style>
