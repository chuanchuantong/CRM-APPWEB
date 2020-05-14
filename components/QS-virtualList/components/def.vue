<template>
	<view
	class="scroll-item" @tap="_click">
		<image 
		class="scroll-item-image" 
		:src="
			'http://imgsrc.baidu.com/forum/w%3D580/sign=f480662e3cadcbef01347e0e9cae2e0e/8f5b1cd8bc3eb13517d8e851ab1ea8d3fc1f4489.jpg'
		"
		 mode="aspectFill"></image>
		<view class="scroll-item-text">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: [Object, String, Number],
				default(){ return {} }
			},
			itemIndex: {
				type: Number,
				default: 0
			}
		},
		methods: {
			_click() {
				uni.showToast({title: '点击了' + this.itemIndex})
			}
		}
	}
</script>

<style scoped>
	@import url("../css/box-sizing-border-box.css");
	
	.scroll-item {
		width: 100%;
		padding: 28rpx;
		background-color: white;
		border-radius: 8px;
		display: flex;
		flex-direction: row;
		margin-bottom: 35rpx;
	}
	
	.scroll-item-image {
		background-color: #F8F8F8;
		border-radius: 8px;
		height: 220rpx;
		width: 40%;
	}
	
	.scroll-item-text {
		width: 55%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #666;
	}
</style>
