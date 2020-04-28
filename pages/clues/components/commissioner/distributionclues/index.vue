<template>
	<view>
		<view class="cu-list  menu-avatar bottom_cu">
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							线索结果1
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
							线索结果2
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
							线索结果3
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
							线索结果4
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
		// width: 100% !important;
	}

	.cu-list.menu-avatar>.cu-item .action {
		width: 240upx !important;
	}

	.bottom_cu {
		margin-bottom: 120px;
		padding-top: 110upx;
	}

	.cu-list.menu-avatar>.cu-item {
		height: 80upx !important;
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		max-width: 566upx !important;
	}
</style>
