<template>
	<view>
		<view class="mycode">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">{{title}}</block>
				</block>
				<block slot="right">
					<view style="margin-right: 2%;" @click="shareWeiXin" class="cuIcon-share"></view>
				</block>
				</block>
			</cu-custom>
			<view class="mycodecontent image" @longpress="saveImg()">
				<image :src="codeUrl" mode="aspectFit"></image>
				<view class="mycodetext">
					我的二维码：{{code}}
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
				title: '',
				codeUrl: '',
				code: '',
				userinfo: []
			};
		},
		created() {
			console.log("我的二维码", this)
			this.title = this.$Route.query.title;
			var data = uni.getStorageSync('data');
			//#ifdef APP-PLUS
			this.userinfo = uni.getStorageSync("data")
			//#endif
			//#ifdef H5
			this.userinfo = JSON.parse(localStorage.getItem("data"));
			//#endif 
			this.codeUrl = this.userinfo.qRCodeUrl;
			this.code = this.userinfo.incode;
			console.log(this.userinfo.qRCodeUrl)
			console.log(this.code)
		},
		methods: {
			saveImg(w) {
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				console.log('当前页：' + pages.length - 1);
				var bitmap = null;
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap, function() {
					console.log('截屏绘制图片成功');
					bitmap.save("_doc/a.jpg", {}, function(i) {
						console.log('保存图片成功：' + JSON.stringify(i));
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								bitmap.clear(); //销毁Bitmap图片  
								uni.showToast({
									title: '保存图片成功',
									mask: false,
									duration: 1500
								});
							}
						});
					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				});
				//currentWebview.append(amway_bit);    
			},
			shareWeiXin(scene) {
				let _this = this
				let sc = scene
				_this.capture(sc)
			},
			capture(scene) {
				let _this = this
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				let bitmap = null;
				let currentWebview = page.$getAppWebview();
				//currentWebview.setBounce({position:{top:'100px'},changeoffset:{top:'0px'}});
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap, function() {
					console.log('截屏绘制图片成功');
					// bitmap.save( "_doc/"+Math.random()+".jpg"
					bitmap.save("_doc/invite.jpg", {}, function(i) {
						console.log('保存图片成功：' + JSON.stringify(i));
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								_this.path = i.target
								bitmap.clear(); //销毁Bitmap图片  
								uni.showToast({
									title: '保存图片成功',
									mask: false,
									duration: 1500
								});
								uni.share({
									provider: "weixin",
									scene: scene,
									type: 2,
									imageUrl: _this.path,
									success: function(res) {
										console.log("success:" + JSON.stringify(res));
									},
									fail: function(err) {
										console.log("fail:" + JSON.stringify(err));
									}
								});
							}
						});
					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				});
			}
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
			// height: 100%;
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
