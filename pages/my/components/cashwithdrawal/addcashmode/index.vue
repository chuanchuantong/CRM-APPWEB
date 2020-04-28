<template>
	<view>
		<view class="addcashclass">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
					<block slot="content">新增提现方式</block>
					<block slot="right">
						<button class="cu-btn bg-green buttonRight" @click="save()">
							<text v-if="submitBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
							保存
						</button>
					</block>
				</cu-custom>
				<form class="formContent">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-green"></text>
							提现方式
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title"><text class="required">*</text>提现方式</view>
						<picker @change="pickerChange" :value="cashIndex" :range="cashArray">
							<view class="picker">
								{{cashIndex>-1?cashArray[cashIndex]:'请选择'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title"><text class="required">*</text>开户银行</view>
						<input v-model="saveCashInfo.cashAccount" placeholder="请输入开户银行" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title"><text class="required">*</text>账号</view>
						<input v-model="saveCashInfo.cashBankName" placeholder="请输入账号" name="input"></input>
					</view>
					
				</form>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cashIndex: -1,
				cashArray: [],
				cashInfo: {},
				saveCashInfo: {
					//提现方式
					cashType: -1,
					//账号
					cashAccount: '',
					//开户银行
					cashBankName: ''
				},
				submitBtnLoading: false
			};
		},
		created() {
			var _this = this;
			var cashlist = [{
				value: 100,
				text: '银行卡'
			}, {
				value: 200,
				text: '微信'
			}, {
				value: 300,
				text: '支付宝'
			}];
			cashlist.forEach((info, index) => {
				_this.$set(_this.cashInfo, index, info.value);
				_this.cashArray.push(info.text);
			})
		},
		methods: {
			pickerChange(e) {
				var _this = this;
				_this.cashIndex = e.detail.value;
				_this.saveCashInfo.cashType = e.detail.value;
			},
			save() {
				var _this = this;
				_this.submitBtnLoading = true;
				console.log(_this.saveCashInfo)
			}
		}
	}
</script>

<style scoped lang="scss">
	.addcashclass{
		.buttonRight{
			margin-right: 10upx;
		}
		.formContent {
			.cu-form-group .required {
				color: red;
				line-height: 60upx;
				margin-right: 10upx;
			}
		
			.cu-form-group .title {
				min-width: calc(6em + 40upx);
				text-align: right;
			}
		}
	}

</style>
