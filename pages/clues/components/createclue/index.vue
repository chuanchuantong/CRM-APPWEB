<template>

	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">新建线索</block>
			<block slot="right">
				<view class="cu-bar btn-group">
					<button class="cu-btn bg-green" @click="saveclueinfo">
						<text v-if="isRotate" class="cuIcon-loading2 cuIconfont-spin"></text>
						保存
					</button>
				</view>
			</block>
		</cu-custom>

		<form>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					基本信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>线索名称</view>
				<input v-model="cluesInfo.shorthand" placeholder="请输入线索名称" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>线索来源</view>
				<input v-model="cluesInfo.source" placeholder="请输入线索来源" name="input"></input>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>客户信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>客户姓名</view>
				<input v-model="cluesInfo.customername" placeholder="请输入客户姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>客户级别</view>
				<input v-model="cluesInfo.level" placeholder="请输入客户级别" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>客户行业</view>
				<input v-model="cluesInfo.industry" placeholder="请输入客户行业" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>联系方式</view>
				<input v-model="cluesInfo.contactinfo" placeholder="请输入联系方式" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>邮箱</view>
				<input v-model="cluesInfo.email" placeholder="请输入邮箱" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>地址</view>
				<input v-model="cluesInfo.customeraddress" placeholder="请输入地址" name="input"></input>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>需求信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>意向车型</view>
				<input v-model="cluesInfo.intentioncar" placeholder="请输入意向车型" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>需求</view>
				<input v-model="cluesInfo.needs" placeholder="请输入需求" name="input"></input>
			</view>
			<view class="cu-form-group">

				<view class="title"><text class="required">*</text>预算</view>
				<input v-model="cluesInfo.budget" placeholder="请输入预算" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>是否持币</view>
				<input v-model="cluesInfo.isholdcash" placeholder="请输入是否持币" name="input"></input>
			</view>
			<view class="cu-form-group">

				<view class="title"><text class="required">*</text>现有车型</view>
				<input v-model="cluesInfo.exitscar" placeholder="请输入现有车型" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>计划提车时间</view>
				<input v-model="cluesInfo.plantime" placeholder="请输入计划提车时间" name="input"></input>
			</view>
		</form>

	</view>
</template>

<script>
	var graceChecker = require("@/js_sdk/graceui-dataChecker/graceChecker.js")
	import {insertclue} from '../../../../api/clues.js'
	export default {
		data() {
			return {
				//线索对象
				cluesInfo: {
					shorthand: '',
					source: '',
					customername: '',
					customeraddress: '',
					contactinfo: '',
					industry: '',
					intentioncar: '',
					needs: '',
					budget: '',
					isholdcash: '',
					exitscar: '',
					plantime: '',
					level: '',
					email: ''
				},
				isRotate: false, //是否加载旋转
			};
		},
		methods: {
			saveclueinfo() {
				var _this = this;
				//登录
				if (_this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				_this.isRotate = true;
				var rule = [{
						name: "shorthand",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入线索名称"
					},
					{
						name: "source",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入线索来源"
					},
					{
						name: "customername",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入客户姓名"
					},
					{
						name: "customeraddress",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入地址"
					},
					{
						name: "contactinfo",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入联系方式"
					},
					{
						name: "industry",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入客户行业"
					},
					{
						name: "intentioncar",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入意向车型"
					},
					{
						name: "needs",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入需求"
					},
					{
						name: "budget",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入预算"
					},
					{
						name: "isholdcash",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入是否持币"
					},
					{
						name: "exitscar",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入现有车型"
					},
					{
						name: "plantime",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入计划提车时间"
					},
					{
						name: "level",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入客户级别"
					},
					{
						name: "email",
						checkType: "notnull",
						checkRule: "",
						required: true,
						errorMsg: "请输入邮箱"
					},
				];
				var checkRes = graceChecker.check(_this.cluesInfo, rule);
				if (checkRes) {
					_this.isRotate = false;
					//新增线索接口
					insertclue(_this.cluesInfo).then(response => {
						_this.isRotate = false;
						if (response.code!=200) {
							uni.showToast({
								title: '保存线索异常请稍后再试',
								icon: "none"
							});
							_this.isRotate = false;
							return;
						}
						uni.showToast({
							title: '保存成功',
							icon: "none",
							success:function(){
								// #ifdef H5
								_this.$router.push("cluesmanage")
								//#endif
								//#ifdef APP-PLUS
								Router.push({
									name: 'cluesmanage'
								});
								// #endif
							}
						});
					}).finally(response => {
						_this.isRotate = false
					})
				}
				else{
					_this.isRotate = false;
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #EEEEEE;
	}

	.cu-form-group .title {
		min-width: calc(6em + 40upx);
		text-align: right;
	}

	.cu-form-group .required {
		color: red;
		line-height: 60upx;
		margin-right: 10upx;
	}

	.cu-bar.btn-group uni-button {
		max-width: none !important;
	}
</style>
