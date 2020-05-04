<template>
	<view>
		<view class="cu-list grid col-4 no-border bgimg">
			<view class="cu-item">
				<view class="bgimg-hg">
					{{homeEntity.amountCon}}
				</view>
				<text>总佣金</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/yitixian.png"></cover-image> -->
					{{homeEntity.amountApply}}
				</view>
				<text>已提现</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/ketixian.png"></cover-image> -->
					{{homeEntity.preAmount}}
				</view>
				<text>可提现</text>
			</view>
			<view class="cu-item" @click="openUrl('cashlist')">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/dengdaizhong.png"></cover-image> -->
					{{homeEntity.amountLoad}}
				</view>
				<text>等待中</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/zongdingdan.png"></cover-image> -->
					{{homeEntity.clueCount}}
				</view>
				<text>总订单</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/zongxiaoshouticheng.png"></cover-image> -->
					{{homeEntity.amountTC}}
				</view>
				<text>总销售提成</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/zongyaoqing.png"></cover-image> -->
					{{homeEntity.userCount}}
				</view>
				<text>总邀请</text>
			</view>
			<view class="cu-item">
				<view class="bgimg-hg">
					<!-- <cover-image src="@/static/home/zongtuiguangticheng.png"></cover-image> -->
					{{homeEntity.amountTG}}
				</view>
				<text>总推广佣金</text>
			</view>
		</view>

		<view class="positionLine"></view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item">
				<view class="contentclass content">
					内容
				</view>
				<view class="action" style="width: 20%;text-align: center;">
					时间
				</view>
			</view>
			<view class="cu-item" v-for="(item,index) in messData" :key="index" :style="item.isReadly==0?'color:#333333':'color:#666666'" @click="read(item)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							{{item.content}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs"> {{item.createtime==null?"":item.createtime.slice(0, 10)}}</view>
				</view>
			</view> 
			<view v-if="messData.length<=0" style="text-align: center;"> 暂无数据</view>
		</view>

	</view>
</template>

<script>
	import {queryHomeAmount} from '@/api/money.js'
	import {selectMessage,update} from '@/api/message.js'
	export default {
		data() {
			return {
				homeEntity:{},
				messData:[]
			};
		},
		created() {
			this.init()
		},
		methods: {
			init(){
				queryHomeAmount().then(res=>{
					this.homeEntity = res.data
				});
				selectMessage().then(res=>{
					this.messData = res.data
				})
			},
			openUrl(url) {
				//#ifdef APP-PLUS
				console.log("点击了路由跳转", url)
				Router.push(url);
				//#endif

				//#ifdef H5
				console.log("点击了路由跳转H5", url)
				this.$router.push(url);
				//#endif
			},
			read(e){
				uni.showModal({
					title:e.title,
					content:e.content,
					showCancel:false,
					confirmText:'已读',
					success:function(res){
						update({isReadly:1,id:e.id}).then(res=>{
							
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.contentclass {
		width: 60% !important;
		text-align: center;
	}

	.bgimg {
		background-image: url(../../static/home/bg.png);
		font-size: 36upx;
		color: #FFFFFF !important;

		.bgimg-hg {
			// width: 46upx;
			// height: 46upx;
			margin: 0 auto;
			margin-top: 24upx;
		}
	}

	.positionLine {
		height: 10upx;
	}

	.cu-list.menu-avatar>.cu-item .content {
		left: 20upx !important;
		// width: 100% !important;
	}

	.cu-list.menu-avatar>.cu-item .action {
		width: 140upx !important;
	}

	.cu-list.menu-avatar>.cu-item {
		height: 80upx !important;
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		max-width: 566upx !important;
	}
</style>
