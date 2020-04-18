<template>
	<view class="regist">
		<!-- 表单验证 -->
		<form class="from" @submit="formSubmit" @reset="formReset">
			<image src="../../static/login/head.png"></image>
			<!-- 用户名 -->
			<view class="cell"><input class="input" type="number" v-model="phone" name="phone" placeholder="用户名"
				 placeholder-class="p-active" /></view>
			 
			<!-- 密码 -->
			<view class="cell"><input class="input" v-model="pwd" :maxlength="18" type="password" name="pwd" placeholder="密码"
				 placeholder-class="p-active" /></view> 
			<view class="sure"><button class="btn btn-gradient" formType="submit">登陆</button></view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				disable: false,
				yzm: '',
				pwd: '',
				btnMsg: '',
				count: '获取验证码',
				timer: null
			};
		},
		methods: {
			 
			//注册验证
			formSubmit(e) {
				this.$router.push('/main');
			}
		}
	};
</script>

<style scoped lang="scss">
	.regist {
		background-color: $uni-login-bg-color; 
		width: 100%;
		height: 100%;
		padding: 0 42upx;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		// bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 80upx;

		.from {
			width: 100%;

			.cell::after {
				position: absolute;
				content: '';
				left: 0;
				bottom: 0;
				width: 200%;
				height: 1upx;
				transform: scale(0.5);
				transform-origin: left top;
				background-color: #cccccc;
			}

			.cell {
				position: relative;
				width: 100%;
				height: 115upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.input {
					height: 100%;
					font-size: 28upx;
					color: #181818;
				}

				.send-btn {
					width: 138upx;
					line-height: 50upx;
					height: 50upx;
					font-size: 28upx;
					padding: 0upx;
					margin: 0;
					background: rgba(0, 0, 0, 0);
					color: #888888;
				}

				.send-btn::after {
					border: none;
				}

				.isColor {
					color: #409eff;
				}
			}

			.agreement {
				width: 100%;
				margin-top: 38upx;

				.xy {
					display: flex;
					align-items: center;
					font-size: 26upx;
					color: #cccccc;
					margin-top: 24upx;

					.navigate {
						padding: 10upx 0;
						color: #cccccc;
						text-decoration: underline;
					}
				}
			}

			.sure {
				width: 100%;
				margin: 160upx auto 0upx;

				.btn::after {
					border: none;
				}
			}
		}
	}
</style>
