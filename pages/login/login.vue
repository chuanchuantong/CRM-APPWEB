<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput name="name" type="text" maxlength="11" placeholder="用户名" @input="getname"></wInput>
				<wInput name="pwd" type="password" maxlength="11" placeholder="密码" @input="getpwd"></wInput>
			</view>
			<wButton text="登 录" :rotate="isRotate" @click.native="startLogin()" class="wbutton"></wButton>

			<!-- 其他登录 -->
			<!-- 	<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>
 -->
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate" @click="reg">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import Router from '@/router'
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js")
	import {
		login
	} from '../../api/login.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '../../static/login/1240.png',

				formData: {
					name: '', //用户/电话
					pwd: '', //密码
				},
				isRotate: false, //是否加载旋转
				isModal: false
			};
		},
		components: {
			wInput,
			wButton
		},
		mounted() {
			_this = this; 
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
			getname(e) {
				_this.formData.name = e
			},
			getpwd(e) {
				_this.formData.pwd = e
			},
			startLogin() {

				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				this.isRotate = true
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入用户名"
					},
					{
						name: "pwd",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入密码"
					}
				];
				var checkRes = graceChecker.check(_this.formData, rule);
				
				if (checkRes) {
					
					  uni.removeStorageSync("Token")
					login(_this.formData).then(res => {
						_this.isRotate = false
						console.log(res.data)
						if(res.code===404){
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
							return
						}
						if(!res.data.token){ 
							uni.showToast({
								title: '账号密码输入有误',
								icon: "none"
							});
							return
						}
						uni.setStorageSync("Token",res.data.token)
						// #ifdef H5
						_this.$router.push("main")
						//#endif
						//#ifdef APP-PLUS
						Router.push({
							name: 'main'
						});
						// #endif
					}).finally(res => {
						_this.isRotate = false
					}) 


				} else {
					this.isRotate = false
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}


			},
			reg(){
				// #ifdef H5
				_this.$router.push("pwd")
				//#endif
				//#ifdef APP-PLUS
				Router.push({
					name: 'pwd'
				});
				// #endif
			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../components/watch-login/css/icon.css");

	.login {
		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			/* margin-top: 128upx; */
		}

		/* 头部 logo */
		.header {
			width: 161upx;
			height: 161upx;
			//box-shadow: 0upx 0upx 60upx 0upx rgba(0, 0, 0, 0.1);
			//border-radius: 50%;
			//background-color: #000000;
			margin-top: 128upx;
			margin-bottom: 72upx;
			margin-left: auto;
			margin-right: auto;
		}

		.header image {
			width: 161upx;
			height: 161upx;
			border-radius: 50%;
		}

		/* 主体 */
		.main {
			display: flex;
			flex-direction: column;
			padding-left: 70upx;
			padding-right: 70upx;
		}

		.tips {
			color: #999999;
			font-size: 28upx;
			margin-top: 64upx;
			margin-left: 48upx;
		}

		/* 登录按钮 */
		.wbutton {
			margin-top: 96upx;
		}

		/* 其他登录方式 */
		.other_login {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 256upx;
			text-align: center;
		}

		.login_icon {
			border: none;
			font-size: 64upx;
			margin: 0 64upx 0 64upx;
			color: rgba(0, 0, 0, 0.7)
		}

		.wechat_color {
			color: #83DC42;
		}

		.weibo_color {
			color: #F9221D;
		}

		.github_color {
			color: #24292E;
		}

		/* 底部 */
		.footer {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-top: 64upx;
			color: rgba(0, 0, 0, 0.7);
			text-align: center;
			height: 40upx;
			line-height: 40upx;
		}

		.footer text {
			font-size: 24upx;
			margin-left: 15upx;
			margin-right: 15upx;
		}
	}
</style>
