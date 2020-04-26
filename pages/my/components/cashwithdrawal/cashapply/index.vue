<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">提现</block>
		</cu-custom>

		<view class="cashapply">
			<view class="positionLine"></view>
			<view class="positionLine"></view>
			<view class="cu-list menu menu-avatar">
				<view class="cu-item arrow" @click="showSelectCashMode()">
					<view class="content flex-sub">
						<view class="myname">{{selectCashModeInfo.text}}</view>
						<view class="text-gray text-sm flex justify-between myincode">
							{{selectCashModeInfo.isBank?'尾号'+selectCashModeInfo.value.substr(selectCashModeInfo.value.length-4):selectCashModeInfo.value}}
						</view>
					</view>
				</view>
				<view class="cu-item cash">
					<view class="cashContent">
						<view class="text-grey tips">提现金额</view>
						<view class="money">
							<text class="symbol">￥</text>
							<input v-model="willCashMoney" :disabled="currentSurplusMoney<=0" focus="true" type="number"></input>
						</view>
						<view class="lastText">
							<text class="text-grey tips">当前余额剩余 {{currentSurplusMoney}} 元，
								<text class="allcash" @click="takeOutAllMoney">全部提现</text>
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" @click="submitCash()">
				<text v-if="submitBtnLoading" class="cuIcon-loading2 cuIconfont-spin"></text>
				提交
			</button>
		</view>
		<view @tap="defaultCashMode" class="cu-modal bottom-modal" :class="isShowSelectCashMode?'show':''">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block">
					<view class="cu-list menu text-left">
						<view class="cu-item">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">
										<view class="modeName">
											选择到账银行卡
										</view>
										<view class="modeNumber text-grey">
											请注意到账时间
										</view>
									</view>
								</label>
							</view>
						
						<view class="cu-item" v-for="(cash,index) in cashModeArray" :key="index" @click="hideSelectCashMode(cash)" >
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">
									<view class="modeName">
										{{cash.text}}
									</view>
									<view class="modeNumber text-grey">
										{{cash.isBank?'尾号'+cash.value.substr(cash.value.length-4):cash.value}}
									</view>
								</view>
								<radio class="round" 
									:class="selectCashModeValue==cash.value?'checked':''"
									:checked="selectCashModeValue==cash.value" 
									:value="index+''"
								></radio>
							</label>
						</view>
						<view class="cu-item" @click="addCashMode">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">
										<text class="cuIcon-roundadd text-grey"></text>
										使用新的方式进行提现
									</view>
								</label>
							</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	import Router from '@/router'
	export default {
		data() {
			return {
				//提现方式集合
				modeArray: [],
				//将要提现的金额
				willCashMoney: null,
				//当前剩余金额
				currentSurplusMoney: 200,
				//是否加载按钮
				submitBtnLoading: false,
				//是否显示选择提现方式的选择框
				isShowSelectCashMode: false,
				//选中的提现方式为
				selectCashModeValue: '',
				//可供选择的提现方式
				cashModeArray: [{
						text: '中国银行储蓄卡',
						value: '621440002947950',
						isBank: true
					},
					{
						text: '中国民生银行',
						value: '621440002948888',
						isBank: true
					}, {
						text: '微信',
						value: 'lijiacheng123456',
						isBank: false
					},
				],
				selectCashModeInfo:{},
			};
		},
		created(){
			var _this=this;
			_this.selectCashModeInfo=_this.cashModeArray[0];
			_this.selectCashModeValue=_this.selectCashModeInfo.value;
		},
		methods: {
			//提现提交申请
			submitCash() {

			},
			//全部提现
			takeOutAllMoney(){
				var _this=this;
				_this.willCashMoney=_this.currentSurplusMoney;
			},
			//显示选择现金方式
			showSelectCashMode() {
				var _this = this;
				_this.isShowSelectCashMode = true;
			},
			//隐藏选择现金方式
			hideSelectCashMode(info) {
				var _this = this;
				_this.selectCashModeInfo=info;
				_this.selectCashModeValue=info.value;
				_this.isShowSelectCashMode = false;
			},
			//设置默认的现金方式
			defaultCashMode(){
				var _this=this;
				_this.isShowSelectCashMode = false;
			},
			//新增一种提现方式
			addCashMode(){
				//此时应该是创建线索去了
				//#ifdef APP-PLUS
				Router.push('addcashmode');
				//#endif
				
				//#ifdef H5
				this.$router.push('addcashmode');
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.cashapply {
		.cu-list.menu-avatar>.cu-item .content {
			left: 80upx !important;
		}

		.positionLine {
			height: 10upx;
		}

		.cash {
			height: 280upx;

			.cashContent {
				margin-left: 50upx;

				.money {
					font-size: 50upx;
					display: flex;
					border-bottom: solid 1px #EEEEEE;

					.symbol {
						margin-top: 26upx;
					}

					uni-input {
						font-size: 50upx;
						height: 2.4em !important;
					}
				}

				.tips {
					font-size: 24upx;
				}

				.lastText {
					margin-top: 10px;

					.allcash {
						color: #39b54a;
					}
				}

			}

		}
		
		.cu-modal{
			.modeNumber{
				font-size: 24upx !important;
			}
		}
	}
</style>
