<template>
	<view>
		<view class="mycode">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">{{title}}</block>
				</block>
			</cu-custom>
			<view class="mycodecontent image">
				<image :src="codeUrl" mode="aspectFit"></image>
<view class="mycodetext">
				我的二维码：{{code}}
			</view>
			</view>
			
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				title: '',
				codeUrl: '',
				code: ''
			};
		},
		created() {
			console.log("我的二维码", this)
			this.title = this.$Route.query.title;
			var data = uni.getStorageSync('data');
			var userInfo = JSON.parse(data);
			this.codeUrl = userInfo.qRCodeUrl;
			this.code = userInfo.incode;
			console.log(userInfo.qRCodeUrl)
			console.log(this.code)
		}
	}
</script>

<style scoped lang="scss">
	.mycode {
		width: 100%;
		height: 100%;
		background-color: white;
		position: absolute;

		.mycodecontent {
			width: 100%;
			height: 100%;
			top: 15%;
			text-align: center;
			position: relative;

			image {
				width: 480upx;
				height: 480upx;
			}
			.mycodetext {
				width: 100%;
				margin-top: 10upx;
				font-size: 30upx;
			}
		}

		
	}
</style>
