<template>
	<view class="subords">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">查看下线</block>
		</cu-custom>
		<view class="bg-white padding bgimg">
			<view class="grid margin-bottom text-center col-3">
				<view class="gradpadding tleft">
					<view class="text-grey textcolor">0.00</view>
					<view class="text-gray text-sm">
						可提现金额 
					</view>
				</view>
				<view class="gradpadding tcenter">
					<view class="text-grey textcolor">0.00</view>
					<view class="text-gray text-sm">
						累计赚取现金额 
					</view>
				</view>
				<view class="gradpadding tright">
					<view class="text-grey textcolor">{{childsCount}}</view>
					<view class="text-gray text-sm">
						累计邀请人
					</view>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl text-bold">我的下线</text>
				</view>
			</view>

		</view>

		<view class="cu-card case no-card">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item" v-for="item in childs" :key="item.id">
						<view class="cu-avatar round lg" :style="'background-image:url('+item.img+');'"></view>
						<view class="content flex-sub">
							<view class="text-grey text-sm flex justify-between">{{item.nickname}}({{item.usercode}})
							<view class="text-gray text-sm">
								<text class="margin-lr-xs"></text><span style="font-weight: bold;">0元</span>
							</view>
							</view>
							<view class="text-gray text-sm flex justify-between">
								{{item.rolename}}
								<view class="text-gray text-sm">
									<text class="margin-lr-xs"></text> {{item.createtime==null?"":item.createtime.slice(0, 10)}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {getChildsByUserId} from '@/api/sysUser.js'
	// import {formatDate} from '@/utils/utils.js'
	export default {
		
		data() {
			return {
				childs:[],
				childsCount:0
			};
		}, 
		created() {
			this.Init()
		},
		methods:{
			Init:function(){
				getChildsByUserId().then(res=>{
					this.childs = res.data;
					this.childs.forEach(s=>{
						s.img = this.$userHead(s.nickname)
					})
					this.childsCount = res.data.length
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.subords{
		margin-bottom: 240upx;
		.bgimg{
			background-image: url(../../static/home/bg.png);
			color: #FFFFFF !important;
		}
		.tleft {
			width: 30%;
		}
		
		.tcenter {
			width: 40%;
		}
		
		.tright {
			width: 30%;
		}
		
		.gradpadding {
			padding: 30upx 0px;
		}
		
		.textcolor {
			// color: #333333 !important;
			font-size: 40upx;
		}
		
	}
	
</style>
