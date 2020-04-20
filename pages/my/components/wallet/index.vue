<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">我的钱包</block>
		</cu-custom>
		<view class="bg-white padding">
			<view class="grid margin-bottom text-center col-3">
				<view class="gradpadding">
					<view class="text-grey textcolor">500</view>
					<view class="text-gray text-sm fontsize">
						总佣金
					</view>
				</view>
				<view class="gradpadding">
					<view class="text-grey textcolor">100</view>
					<view class="text-gray text-sm fontsize">
						已提现
					</view>
				</view>
				<view class="gradpadding">
					<view class="text-grey textcolor">100</view>
					<view class="text-gray text-sm fontsize">
						等待中
					</view>
				</view>
				<view class="gradpadding">
					<view class="text-grey textcolor">100</view>
					<view class="text-gray text-sm fontsize">
						可提现
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import myclues from '../../../clues/components/myclues/index.vue'

	export default {
		components: {
			myclues
		},
		data() {
			return {};
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.gradpadding {
		padding: 30upx 0px;
		width: 25% !important;
	}
	
	.textcolor {
		color: #333333 !important;
		font-size: 40upx;
	}
	.fontsize{
		font-size: 26upx;
	}
</style>
