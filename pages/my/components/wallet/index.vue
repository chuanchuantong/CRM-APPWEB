<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">我的钱包</block>
		</cu-custom>
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总佣金</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>已提现</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>可提现</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>等待中</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总订单</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总销售提成</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总邀请</text>
			</view>
			<view class="cu-item">
				<view class="cuIcon-moneybag"></view>
				<text>总推广佣金</text>
			</view>
		</view>

		<view class="positionLine"></view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item">
				<view class="content text-center padding">
					<view class="text-sm flex">
						<view class="text-cut">
							内容
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">时间</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-roundadd text-grey"></text>
					<text class="text-grey">创建线索</text>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.positionLine {
		height: 10upx;
	}
	.cu-list.menu-avatar>.cu-item .content {
		position: absolute;
		left: 10px !important;
		line-height: 1.6em;
	}

	.cu-list.menu-avatar>.cu-item .action {
		width: 70px !important;
	}

	.cu-list.menu-avatar>.cu-item {
		height: 35px !important;
	}
</style>
