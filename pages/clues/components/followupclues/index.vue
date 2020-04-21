<template>
	<view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							跟进线索内容1
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							跟进线索内容2
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							跟进线索内容2
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							跟进线索内容3
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
