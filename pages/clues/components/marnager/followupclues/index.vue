<template>
	<view>
		<view class="managerCluesFollow">
			<view class="cu-list  menu-avatar bottom_cu">
				<view class="cu-item" @click="openUrl(item.id)" v-for="(item , index) in XSGData" :key="item.id">
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
				<view  style="text-align: center;"> 暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selectByXSG
	} from '@/api/clues.js'
	import Router from '@/router'
	export default {
		data() {
			return {
				XSGData:[]
			};
		},
		created(){
			this.initData();
		},
		methods: {
			initData() {
				selectByXSG().then(res => {
					this.XSGData = res.data
				})
			},
			openUrl(clueid){
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
	.managerCluesFollow{
		.bottom_cu {
			margin-bottom: 120px;
			padding-top: 110upx;
		}
		.cu-list.menu-avatar>.cu-item .content {
			left: 20upx !important;
			// width: 100% !important;
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
	}

</style>
