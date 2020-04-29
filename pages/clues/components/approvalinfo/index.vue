<template>
	<view class="approvalInfoClass">
 
		<view class="positionLine"></view>
		<form>
			<view class="cu-bar bg-white solid-bottom" v-if="showXs">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					审核信息
				</view>
			</view>
			<view class="cu-form-group" v-if="showXs">
				<view class="title"><text class="required">*</text>选择OA专员</view>
				<picker @change="pickerChange" :value="oauserindex" :range="oausers">
					<view class="picker">
						{{oauserindex>-1?oausers[oauserindex]:'请选择'}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group" v-if="ShowOA">
				<view class="title"><text class="required">*</text>客户级别</view>
				<radio-group class="block" @change="radioChange">
					<radio class='round blue margin-left-sm' :class="leave=='A+'?'checked':''" :checked="leave=='A+'?true:false" value="A+"></radio>A+
					<radio class='round blue margin-left-sm' :class="leave=='A'?'checked':''" :checked="leave=='A'?true:false" value="A"></radio>A
					<radio class='round blue margin-left-sm' :class="leave=='A-'?'checked':''" :checked="leave=='A-'?true:false" value="A-"></radio>A-
				</radio-group>
			</view>
			<view class="cu-form-group" v-if="ShowOA">
				<view class="title usertrait"><text class="required">*</text>客户特点</view>
				<textarea v-model="approvalObject.usertrait" maxlength="500" placeholder="请输入客户特点"></textarea>
			</view>
			<view class="cu-form-group" v-if="ShowOA">
				<view class="title"><text class="required">*</text>进度记录</view>
				<picker mode="date" :value="date" start="1990-01-01" end="3000-12-31" @change="dateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		props: {
			clueid: {
				type: [Number],
				default: -1
			}, 
			showXs:{
				type:[Boolean,String],
				default:false
			},
			ShowOA:{
				type:[Boolean,String],
				default:false
				}
		},
		data() {
			return {
				//选择oa的索引
				oauserindex: -1,
				//oa集合
				oausers: [],
				//自定义匹配选择的OA的用户id
				oauserinfo: {},
				leave: '',
				date: '',
				approvalObject:{
					//选择的oa专员
					oauser:-1,
					//客户等级
					userleave:'',
					//客户特点
					usertrait:'',
					//进度记录
					date:''
				}
			};
		},
		created() {
			var _this = this;
			//1、销售经理显示OA下拉框（此角色为销售经理所有）
			//2、客户级别单选按钮 A+   A  A-（此选项为OA所有）
			//3、客户特点多行文本（此选项为OA所有）
			//4、进度记录（此选项为OA所有）
			var oauserlist = [{
				value: 100,
				text: 'test1'
			}, {
				value: 200,
				text: 'test2'
			}, {
				value: 300,
				text: 'test3'
			}];
			oauserlist.forEach((info, index) => {
				_this.$set(_this.oauserinfo, index, info.value);
				_this.oausers.push(info.text);
			})
			//处理日期
			var dateInfo = new Date();
			var year = dateInfo.getFullYear();
			var month=((dateInfo.getMonth() + 1)>10?(dateInfo.getMonth() + 1):'0'+(dateInfo.getMonth() + 1));
			var date=dateInfo.getDate();
			_this.date=year+'-'+month+'-'+date;
		},
		methods: {
			pickerChange(e) {
				var _this = this;
				_this.oauserindex = e.detail.value;
				_this.approvalObject.oauser=e.detail.value;
			},
			radioChange(e) {
				var _this = this;
				_this.leave = e.detail.value;
				_this.approvalObject.userleave=e.detail.value;
				console.log(_this.leave)
			},
			dateChange(e) {
				var _this=this;
				_this.date = e.detail.value;
				_this.approvalObject.date=e.detail.value;
			},
			submit(){
				var _this=this;
				console.log("这是子组件的提交方法")
				console.log("此处需要验证数据信息啥的")
				console.log(_this.approvalObject)
				uni.showToast({
					title:"客户特点为空",
					icon:'none',
				})
			}
		}


	}
</script>

<style scoped lang="scss">
	.approvalInfoClass{
		.positionLine {
			height: 10upx;
		}
		
		.cu-form-group .required {
			color: red;
			line-height: 60upx;
			margin-right: 10upx;
		}
		
		.cu-form-group .title {
			min-width: calc(6em + 40upx);
			text-align: right;
		}
		
		.margin-left-sm {
			margin-right: 10upx !important;
		}
		.usertrait{
			margin-top: -100upx;
		}
	}

</style>
