<template>
	<view>

		<view class="cu-list menu-avatar bottom_cu">
			<view class="cu-item newslist" @click="openUrl(item.id)" v-for="(item,index) in GzData" :key="index">
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
			<view v-if="!GzData" style="text-align: center;"> 暂无数据</view>
		</view>
	</view>
</template>

<script>
	import {
		selectAll
	} from '@/api/clues.js'
	export default {

		data() {
			return {
				queryData: {
					currentPage: 1,
					pageSize: 1000,
					params: {
						cstatus: 0
					}
				},
				GzData: []
			};
		},
		created() {
			this.queryIn();
		},
		methods: {
			queryIn() {
				selectAll(this.queryData).then(res => {
					this.GzData = res.data;
					console.log(this.GzData)
				})
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
	.cu-list.menu-avatar>.cu-item .content {
		left: 20upx !important;
		// width: 100% !important;
	}

	.bottom_cu {
		margin-bottom: 120px;
		padding-top: 110upx;
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
</style>
