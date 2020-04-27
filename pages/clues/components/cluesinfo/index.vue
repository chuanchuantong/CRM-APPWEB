<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">线索详情</block>
		</cu-custom>

		<view class="cu-list menu sm-border">
			<view class="cu-item" @click="showOrHideClue()">
				<view class="content">
					<text class="text-grey">线索信息</text>
				</view>
				<view v-show="!showOrHide" class="'text-grey cuIcon-unfold" ></view>
				<view v-show="showOrHide" class="'text-grey cuIcon-fold" ></view>
			</view>
		</view>
		<view v-show="showOrHide">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					基本信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">提交人</view>
				<view>
					{{updateData.username}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">线索名称</view>
				<view>
					{{updateData.shorthand}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">线索来源</view>
				<view>
					{{updateData.source}}
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>客户信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">客户姓名</view>
				<view>
					{{updateData.customername}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">客户级别</view>
				<view>
					{{updateData.level}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">客户行业</view>
				<view>
					{{updateData.industry}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<view>
					{{updateData.contactinfo}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<view>
{{updateData.contactinfo}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">地址</view>
				<view>
					{{updateData.customeraddress}}
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>需求信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">意向车型</view>
				<view>
					{{updateData.intentioncar}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">需求</view>
				<view>
					{{updateData.needs}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">预算</view>
				<view>
					{{updateData.budget}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">是否持币</view>
				<view>
					{{updateData.isholdcash}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">现有车型</view>
				<view>
					{{updateData.exitscar}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">计划提车时间</view>
				<view>
					{{updateData.plantime}}
				</view>
			</view>

		</view>

		<approvalInfo :showXs="showXs" :ShowOA="ShowOA" :clueid="clueid"></approvalInfo>

	</view>
</template>

<script>
	import approvalInfo from '../approvalinfo/index';
	import {searchclues} from '@/api/clues.js'
	export default {
		components: {
			approvalInfo
		},
		data() {
			return {
				clueid: 0,
				showOrHide: false,
				animation:'',
				updateData:[],
				showUserId:false,
				showXs:false,
				ShowOA:false,
				staticentity:[]
			};
		},
		created() {
			var _this = this;
			//#ifdef APP-PLUS
			this.staticentity =uni.getStorageSync("data")
			//#endif
			//#ifdef H5
			this.staticentity = JSON.parse(localStorage.getItem("data"));
			//#endif 
			this.clueid = this.$route.params.clueid;
			console.log("线索对应id为", this.clueid)
			this.init();
		},
		methods: {
			showOrHideClue() {
				var _this = this;
				_this.showOrHide = !_this.showOrHide;
			},
			init(){
				searchclues(this.clueid).then(res=>{
					this.updateData = res.data;
					this.ShowOA = this.staticentity.id==res.data.oa
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-form-group .title {
		min-width: calc(6em + 40upx);
		text-align: right;
	}
</style>
