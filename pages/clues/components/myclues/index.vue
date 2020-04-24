<template>
	<view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item" @click="openUrl(item.id)"  v-for="item in returnData" :key="item.id">
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
			<!-- <view class="cu-item" @click="openUrl(1)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索2我的线索2我的线索2我的线索2我的线索2我的线索2
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item" @click="openUrl(1)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索3
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item" @click="openUrl(1)"> -->
				<!-- <view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索4
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view> -->
			<view class="cu-item" @click="createclues">
				<view class="content" style="text-align: center;">
					<text class="cuIcon-roundadd text-grey"></text>
					<text class="text-grey">创建线索</text>
				</view>
			</view>
			<uniLoadMore :more:"more"></uniLoadMore>
		</view>
		
	</view>
</template>

<script>
	import Router from '@/router'
	import {selectAll} from '@/api/clues.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components:{uniLoadMore},
		data() {
			return {
				queryData:{
					currentPage:1,
					pageSize:20,
					params:{
						
					}
				},
				returnData:{},
				more:"more"
			}
		},
		// 下拉刷新
				onPullDownRefresh() {
					this.query();
				},
		created() {
			this.query();
		},
		methods: {
			query(){
				selectAll(this.queryData).then(res=>{
					console.log(res)
					this.returnData = res.data;
				})
			},
			
			//创建线索
			createclues(){
				//此时应该是创建线索去了
				//#ifdef APP-PLUS
				console.log("点击了路由跳转",'createclue')
				Router.push('createclue');
				//#endif
				
				//#ifdef H5
				console.log("点击了路由跳转H5",'createclue')
				this.$router.push('createclue');
				//#endif
			},
			openUrl(clueid){
				console.log("线索id",clueid)
				//#ifdef APP-PLUS
				Router.push({
					name: 'cluesdetail',
					params: {
						clueid:clueid
					}
				});
				//#endif
				
				//#ifdef H5
				this.$router.push({
					name: 'cluesdetail',
					params: {
						clueid:clueid
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
		width: 100% !important;
	}
	
	.cu-list.menu-avatar>.cu-item .action {
		width: 140upx !important;
	}
	
	.cu-list.menu-avatar>.cu-item {
		height: 80upx !important;
	}
	.cu-list.menu-avatar>.cu-item .flex .text-cut{
		max-width: 566upx !important;
	}
</style>
