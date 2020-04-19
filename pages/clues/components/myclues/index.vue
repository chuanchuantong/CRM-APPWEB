<template>
	<view>
		<view class="cu-list  menu-avatar">
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
			<view class="cu-item" @click="createclues">
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
			return {
				
			}
		},
		methods: {
			//创建线索
			createclues(){
				//此时应该是创建线索去了
				//#ifdef APP-PLUS
				console.log("点击了路由跳转",'createclue')
				Router.push('createclue');
				//#endif
				
				//#ifdef H5
				console.log("点击了路由跳转H5",'createclue')
				this.$router.push('createclue');
				//#endif
			}
		}
	}
</script>

<style lang="scss">
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
