<template>
	<view class="myWallet">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">设置</block>
		</cu-custom>
		<view class="cu-list menu sm-border">
			<!-- 	<view class="cu-item arrow" @click="openUrl('setup')">
				<view class="content">
					<text class="cuIcon-settings text-grey"></text>
					<text class="text-grey">多语言</text>
				</view>
			</view> -->
			<!-- <view class="cu-form-group margin-top">
				<view class="title">普通选择</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view> -->
			<!-- #ifdef APP-PLUS -->

			<view class="cu-item" @click="openUrl('setup')">
				<view class="content">

					<text class="text-grey">APP版本</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-blue light">V{{version}}</view>
				</view>
			</view>
			<!-- #endif -->

			<button class="cu-btn bg-white" @click="outLogin">
				退出登录
			</button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: '',
				index: -1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
			};
		},
		created() {
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				console.log(wgtinfo);
				this.version = wgtinfo.version; //版本号
			})
			//#endif
		},

		methods: {
			//退出登录
			outLogin() {
				uni.showModal({
					title: "系统提示",
					content: "登录超时请重新登录",
					confirmText: "确定",
					success: function(res) {
						if (res.confirm) {
							uni.removeStorageSync("Token")
							//#ifdef APP-PLUS 
							Router.push({
								name: 'login'
							});
							//#endif

							//#ifdef H5 
							Router.push("/");
							//#endif
							return
						} else if (res.cancel) {

						}

					}
				})

			},
			PickerChange(e) {
				this.index = e.detail.value
			},
		}
	}
</script>

<style scoped lang="scss">
	.myWallet {
		.cu-list.menu-avatar>.cu-item .content {
			left: 20upx !important;
			// width: 100% !important;
		}

		.positionLine {
			height: 10upx;
		}

		.cu-btn {
			width: 80%;
			margin: 5% 10%;
			color: red;
			height: 100upx;
		}

		.cu-list.menu-avatar>.cu-item .action {
			width: 140upx !important;
		}

		.cu-list.menu-avatar>.cu-item {
			height: 100upx !important;
		}

		.cu-list.menu-avatar>.cu-item .flex .text-cut {
			max-width: 566upx !important;
		}

		.cu-list+.cu-list {
			margin-top: 2px;
		}
	}
</style>
