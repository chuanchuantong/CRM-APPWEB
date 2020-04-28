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
			<view v-if="!returnData" style="text-align: center;"> 暂无数据</view>
		</view>

	</view>
</template>

<script>
	import Router from '@/router'
	import {
		selectAll
	} from '@/api/clues.js'
	export default {
		props:{
			parmaData:[]
		},
		data() {
			return {
				queryData: {
					currentPage: 1,
					pageSize: 20,
					params: {
						cstatus:-1
					}
				},
				returnData: [],
				more: "more"
			}
		}, 
		created() {
			this.query();
		},
		methods: {
			query() {
				selectAll(this.queryData).then(res => {
					
					this.returnData = res.data;
					console.log(this.returnData)
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
	}
</style>
