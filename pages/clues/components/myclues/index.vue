<template>
	<view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item" @click="openUrl(1)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索1
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
			<view class="cu-item" @click="openUrl(1)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索4
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
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
	export default {
		data() {
			return {
				
			}
		},
		methods: {
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
