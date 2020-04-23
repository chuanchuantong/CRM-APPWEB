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
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">线索名称</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">线索来源</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
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
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">客户级别</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">客户行业</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">地址</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
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
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">需求</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">预算</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">是否持币</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">现有车型</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">计划提车时间</view>
				<view>
					这是线索名称这是线索名称这是线索名称这是线索名称这是线索名称
				</view>
			</view>

		</view>

		<approvalInfo :clueid="clueid"></approvalInfo>

	</view>
</template>

<script>
	import approvalInfo from '../approvalinfo/index';
	export default {
		components: {
			approvalInfo
		},
		data() {
			return {
				clueid: 0,
				showOrHide: false,
				animation:''
			};
		},
		created() {
			var _this = this;
			_this.clueid = _this.$route.params.clueid;
			console.log("线索对应id为", _this.clueid)
		},
		methods: {
			showOrHideClue() {
				var _this = this;
				_this.showOrHide = !_this.showOrHide;
			},
		}
	}
</script>

<style scoped lang="scss">
	.cu-form-group .title {
		min-width: calc(6em + 40upx);
		text-align: right;
	}
</style>
