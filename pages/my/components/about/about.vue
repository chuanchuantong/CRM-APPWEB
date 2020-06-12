<template>
	<view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true" :url="'main'">
		<block slot="content">隐私政策</block>
	</cu-custom>
	<view class="content">
			<web-view  :src="'https://www.freeprivacypolicy.com/privacy/view/b484cadf56e0314de585b852688f64de'">//这个是自定义页面（htmlA）
			</web-view>
			
		</view>
</view>
</template>

<script>
</script>

<style>
</style>
