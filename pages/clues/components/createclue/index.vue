<template>

	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">我的线索</block>
			<block slot="right">
				<view class="cu-bar btn-group">
					<button class="cu-btn bg-green" @click="saveclueinfo">
						<text v-if="isloading" class="cuIcon-loading2 cuIconfont-spin"></text> 
						{{buttontext}}
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
				<input placeholder="请输入线索名称" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>线索来源</view>
				<input placeholder="请输入线索来源" name="input"></input>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>客户信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>客户姓名</view>
				<input placeholder="请输入客户姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>客户地区</view>
				<input placeholder="请输入客户地区" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>客户级别</view>
				<input placeholder="请输入客户级别" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>微信</view>
				<input placeholder="请输入微信" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>电话</view>
				<input placeholder="请输入电话" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>邮箱</view>
				<input placeholder="请输入邮箱" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>地址</view>
				<input placeholder="请输入地址" name="input"></input>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>需求信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>意向车型</view>
				<input placeholder="请输入意向车型" name="input"></input>
			</view>
			<view class="cu-form-group">

				<view class="title"><text class="required">*</text>需求</view>
				<input placeholder="请输入需求" name="input"></input>
			</view>
			<view class="cu-form-group">

				<view class="title"><text class="required">*</text>预算</view>
				<input placeholder="请输入预算" name="input"></input>
			</view>
			<view class="cu-form-group">

				<view class="title"><text class="required">*</text>是否持币</view>
				<input placeholder="请输入是否持币" name="input"></input>
			</view>
			<view class="cu-form-group">

				<view class="title"><text class="required">*</text>现有车型</view>
				<input placeholder="请输入现有车型" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="required">*</text>计划提车时间</view>
				<input placeholder="请输入计划提车时间" name="input"></input>
			</view>

		</form>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '这是创建线索页面',
				isloading:false,
				buttontext:'保存'
			};
		},
		methods:{
			saveclueinfo(){
				this.isloading=!this.isloading;
				this.buttontext=this.isloading?'保存中':'保存'
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
	.cu-bar.btn-group uni-button{
		 max-width:none !important;
	}
</style>
