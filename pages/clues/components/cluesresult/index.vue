<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">线索结果</block>
		</cu-custom>
		
		
		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="cluetitle" type="text" placeholder="请输入线索名称" confirm-type="search"></input>
				</view>
				<view class="action">
					<button @click="searchClues" class="cu-btn bg-green shadow-blur round">搜索</button>
				</view>
			</view>
		</view>
		
		
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				线索
			</view>
		</view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item" @click="clueDetail(1)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索1
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item" @click="clueDetail(2)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索2我的线索2我的线索2我的线索2我的线索2我的线索2
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item" @click="clueDetail(3)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索3
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
			<view class="cu-item" @click="clueDetail(4)">
				<view class="content">
					<view class="text-sm flex">
						<view class="text-cut">
							我的线索4
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-xs">2020-04-19</view>
				</view>
			</view>
		
		</view>
		
	</view>
</template>

<script>
	import Router from '@/router'
	var graceChecker = require("@/js_sdk/graceui-dataChecker/graceChecker.js")
	import {searchclues} from '../../../../api/clues.js'
	export default {
		data() {
			return {
				//线索标题
				cluetitle:'',
				//线索集合
				clues: [],
				
			};
		},
		created(){
			var _this=this;
			//加载线索
			//_this.loadclues();
		},
		methods:{
			//加载线索结果
			loadclues(){
				var _this=this;
				searchclues({title:_this.cluetitle}).then(response=>{
					if (response.code!=200) {
						uni.showToast({
							title: '获取线索信息异常请稍后重试',
							icon: "none"
						});
						return;
					}
					else{
						_this.clues=response.data;
						_this.cluetitle='';
					}
				})
			},
			//搜索线索
			searchClues(){
				var _this=this;
				console.log("搜索的标题",_this.cluetitle)
				//加载线索
				//_this.loadclues();
			},
			//线索详情
			clueDetail(clueid){
				//#ifdef APP-PLUS
				Router.push({name:'cluesdetail',params:{clueid:clueid}});
				//#endif
				
				//#ifdef H5
				this.$router.push({name:'cluesdetail',params:{clueid:clueid}});
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-list.menu-avatar>.cu-item .content {
		left: 20upx !important;
		width: 100% !important;
	}
	
	.cu-list.menu-avatar>.cu-item .action {
		width: 140upx !important;
	}
	
	.cu-list.menu-avatar>.cu-item {
		height: 80upx !important;
	}
	.cu-list.menu-avatar>.cu-item .flex .text-cut{
		max-width: 566upx !important;
	}
	.box {
		margin: 20upx 0;
	}
	
	.box view.cu-bar {
		margin-top: 20upx;
	}
</style>
