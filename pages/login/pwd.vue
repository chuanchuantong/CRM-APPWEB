<template>
	<view class="reg">
		<!-- 头部logo -->
		<view v-if="isScan">
		<scan  @getCode="getScanCode" />
		</view>
		<view class="content">
			<view class="header">
				<image :src="logoImage"></image>
			</view>

			<!-- 主体表单 -->
			<view class="main">
				<wInput name="name" type="text" maxlength="11" placeholder="昵称" @input="getnickname"></wInput>
				<wInput name="loginname" type="text" maxlength="11" placeholder="登录名" @input="getname"></wInput>
				<wInput name="pwd" type="password" maxlength="11" placeholder="密码" @input="getpwd1"></wInput>
				<div class="input_span"> 
				      <span id="one"></span>
				      <span id="two"></span>
				      <span id="three"></span>
				    </div> 
				<wInput name="pwd" type="password" maxlength="11" placeholder="确认密码" @input="getpwd2"></wInput>
				<div class="input_span1">
				      <span id="one1"></span>
				      <span id="two1"></span>
				      <span id="three1"></span>
				    </div> 
				<wInput name="email" type="text" maxlength="11" placeholder="邮箱" @input="getemail"></wInput>
				<wInput name="incode" type="text" maxlength="6" isScan="true" placeholder="邀请码" @input="getfcode" @scan="getScanCode"></wInput>
				<wInput name="sex" type="radio" maxlength="11" placeholder="用户名" @input="getsex"></wInput>
			</view>
			<wButton text="注册并登录" :rotate="isRotate" @click.native="startLogin()" class="wbutton"></wButton>
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
		reg
	} from '../../api/login.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '../../static/login/1240.png',

				formData: {
					nickname: '',
					email: '',
					sex: 1,
					loginname: '', //用户/电话
					loginpwd: '', //密码
					incode: '',
					pwd1: '',
					pwd2: '',
					
				},
				msgText:'',
				msgText1:'',
				isRotate: false, //是否加载旋转
				isModal: false,
				isScan: false,
				incode:''
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
			 checkStrong(sValue) {
			      var modes = 0;
			      //正则表达式验证符合要求的
			      if (sValue.length < 1) return modes;
			      if (/\d/.test(sValue)) modes++; //数字
			      if (/[a-z]/.test(sValue)) modes++; //小写
			      if (/[A-Z]/.test(sValue)) modes++; //大写
			      if (/\W/.test(sValue)) modes++; //特殊字符
				 if(sValue.length<6)
			      //逻辑处理
			      switch (modes) {
			        case 1:
			          return 1;
			          break;
			        case 2:
			          return 2;
			          break;
			        case 3:
			        case 4:
			          return sValue.length < 4 ? 3 : 4;
			          break;
			      }
			      return modes;
			    },
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
			// //获取扫码控件
			// getScanCode(val) {
			// 	this.isScan=true;
			// 	console.log(val)
			// 	this.incode = val
			// 	if(val){
			// 		this.isScan = false
			// 	}
			// 	//this.isScan=false;
			// },
			onLoad() {
				// #ifdef APP-PLUS
				this.$eventHub.$on('portrait-primary', function(data) {
					console.log(data);
					this.text = data;
				});
				// #endif
			},
			onBackPress() {
				// #ifdef APP-PLUS
				plus.screen.lockOrientation('portrait-primary')
				// #endif
			},
			getnickname(e) {
				_this.formData.nickname = e
			},
			getname(e) {
				console.log(e)
				_this.formData.loginname = e
			},
			getemail(e) {
				_this.formData.email = e
			},
			getfcode(e) {
				console.log(e)
				_this.formData.incode = e
			},
			getsex(e) {
				_this.formData.sex = e
			},
			getpwd1(e) {
				console.log(e)
				_this.formData.pwd1 = e
				this.msgText = this.checkStrong(e);
				      if (this.msgText > 1 || this.msgText == 1) {
				        document.getElementById("one").style.background = "red";
				      } else {
				        document.getElementById("one").style.background = "#eee";
				      }
				      if (this.msgText > 2 || this.msgText == 2) {
				        document.getElementById("two").style.background = "orange";
				      } else {
				        document.getElementById("two").style.background = "#eee";
				      }
				      if (this.msgText == 4) {
				        document.getElementById("three").style.background = "#00D1B2";
				      } else {
				        document.getElementById("three").style.background = "#eee";
				      } 
			},
			getpwd2(e) {
				_this.formData.pwd2 = e
				this.msgText1 = this.checkStrong(e);
				      if (this.msgText1 > 1 || this.msgText1 == 1) {
				        document.getElementById("one1").style.background = "red";
				      } else {
				        document.getElementById("one1").style.background = "#eee";
				      }
				      if (this.msgText1 > 2 || this.msgText1 == 2) {
				        document.getElementById("two1").style.background = "orange";
				      } else {
				        document.getElementById("two1").style.background = "#eee";
				      }
				      if (this.msgText1 == 4) {
				        document.getElementById("three1").style.background = "#00D1B2";
				      } else {
				        document.getElementById("three1").style.background = "#eee";
				      } 
			},
			startLogin() {
				console.log(_this.formData)
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				this.isRotate = true
				var rule = [{
						name: "nickname",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入昵称"
					}, {
						name: "loginname",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入登录名"
					},
					{
						name: "pwd1",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入密码"
					},
					{
						name: "pwd1",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入确认密码"
					},
					{
						name: "incode",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入邀请码"
					}
				];
				if (_this.pwd1 != _this.pwd2) {
					this.isRotate = false
					uni.showToast({
						title: "两次密码输入有误",
						icon: "none"
					});
					return
				}
				if(_this.pwd1.length<6 || _this.pwd1.length>12){
					this.isRotate = false
					uni.showToast({
						title: "密码位数大于6位小于12位",
						icon: "none"
					});
					return
				}

				var checkRes = graceChecker.check(_this.formData, rule);
				_this.formData.loginpwd = _this.formData.pwd1;
				if (checkRes) {
					_this.isRotate = false


					reg(_this.formData).then(res => {
						_this.isRotate = false
						console.log(res.data)
						if (res.code != 200) {
							if (res.code == 404) {
								uni.showToast({
									title: res.msg,
									icon: "none"
								});
								return
							} else {
								uni.showToast({
									title: '注册失败',
									icon: "none"
								});
								return
							}
						} else {
							// #ifdef H5
							_this.$router.push("/")
							//#endif
							//#ifdef APP-PLUS
							Router.push({
								name: 'login'
							});
							// #endif
						}
					})
					// 	uni.setStorageSync("Token",res.data.token)
					// 	// #ifdef H5
					// 	_this.$router.push("main")
					// 	//#endif
					// 	//#ifdef APP-PLUS
					// 	Router.push({
					// 		name: 'main'
					// 	});
					// 	// #endif
					// }).finally(res => {
					// 	_this.isRotate = false
					// }) 


				} else {
					this.isRotate = false
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}


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
		},
		watch:{
			incode:{
			   handler(newName, oldName) {
			      console.log('obj.a changed');
				  this.isScan = false
			    },
			    immediate: true,
			    deep: true
}
		}
	}
</script>

<style scoped>
#inputValue {
  width: 240px;
  margin-left: 20px;
  padding-left: 10px;
  border-radius: 3px;
}
.input_span span {
	text-align: center;
  display: inline-block;
  width: 85px;
  height: 10px;
  background: #eee;
  line-height: 20px;
}

#one {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 20px;
  margin-right: 3px;
}

#two {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}

#three {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
.input_span1 span {
	text-align: center;
  display: inline-block;
  width: 85px;
  height: 10px;
  background: #eee;
  line-height: 20px;
}

#one1 {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 20px;
  margin-right: 3px;
}

#two1 {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}

#three1 {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
#font span:nth-child(1) {
  color: red;
  margin-left: 80px;
}
#font span:nth-child(2) {
  color: orange;
  margin: 0 60px;
}
#font span:nth-child(3) {
  color: #00d1b2;
}
</style> 
<style lang="scss">
	@import url("../../components/watch-login/css/icon.css");

	.reg {
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
			margin-top: 68upx;
			margin-bottom: 32upx;
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
			margin-top: 16upx;
			margin-bottom: 40upx;
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
