<template>
	<view class="oaClueResult">
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="CustomBar+80" :bottom="0.5*250" @down="downCallback" @up="upCallback"
			 :down="downOption" :up="upOption">
				<view class="cu-card case no-card bottom_cu">
					<view class="cu-item shadow">
						<view class="cu-list menu-avatar">
							<view class="cu-item" @click="openUrl(item.id)" v-for="(item,index) in resultOAData" :key="index">
								<view class="content flex-sub">
									<view class="text-grey flex justify-between">{{item.shorthand}}
										<view class="text-gray text-sm">
											<text class="margin-lr-xs"></text><span v-if="item.cstatus==3&&item.royalty!=-1000" class="cusser">已完成(￥{{item.royalty}})</span>
											<span v-if="item.cstatus==4" class="error">失败</span>
											<span v-if="item.royalty==-1000" class="error">已失效</span>
										</view>
									</view>
									<view class="text-gray text-sm flex justify-between">
										{{item.oaname}}
										<view class="text-gray text-sm">
											<text class="margin-lr-xs"></text> {{item.createtime==null?"":item.createtime.slice(0, 10)}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		
	</view>
</template>

<script>
import Router from '@/router';
import { selectClueResult } from '@/api/clues.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	props: {
		parmaData: []
	},
	data() {
		return {
			queryData: {
				currentPage: 1,
				pageSize: 20,
				params: {
					cstatus: 1
				}
			},
			resultOAData: [],
			more: 'more',
			// 下拉刷新的常用配置
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				native: false, // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效
				textLoading: '正在玩命加载中。。。',
				//bgColor:'#FFFFFF',
				textColor: '#DDDDDD'
			},
			// 上拉加载的常用配置
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 20 // 每页数据的数量,默认10
				},
				noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				},
				textLoading: '正在玩命加载中。。。',
				textNoMore: '没有更多数据了',
				textColor: '#DDDDDD'
			}
		};
	},
	created() {
		//this.query();
	},
	methods: {
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			console.log('下拉刷新一开始');
			this.mescroll.resetUpScroll();
			// 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
		},
		/*上拉加载的回调*/
		upCallback(page) {
			console.log('上拉刷新一开始');
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			selectClueResult(this.queryData).then(res => {
				if (page.num == 1) this.resultOAData = []; //如果是第一页需手动置空列表
				this.resultOAData = this.resultOAData.concat(res.data.list); //追加新数据
				console.log(res.data.list);
				// 请求成功,隐藏加载状态
				//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				this.mescroll.endByPage(res.data.size, res.data.pages);
			});
		},
		query() {
			selectClueResult().then(res => {
				this.resultOAData = res.data;
			});
		},

		openUrl(clueid) {
			console.log('线索id', clueid);
			//#ifdef APP-PLUS
			Router.push({
				name: 'cluesdetail',
				params: {
					clueid: clueid
				},
				animation: {
					animationType: 'slide-in-right',
					animationDuration: 500
				}
			});
			//#endif

			//#ifdef H5
			this.$Router.push({
				name: 'cluesdetail',
				params: {
					clueid: clueid
				},
				animation: {
					animationType: 'slide-in-right',
					animationDuration: 500
				}
			});
			//#endif
		}
	}
};
</script>

<style scoped lang="scss">
.oaClueResult {
	.cusser {
		font-weight: bold;
		color: #007AFF;
	}
	
	.cu-list.menu-avatar>.cu-item .content {
		left: 20upx;
	}
	
	.error {
		font-weight: bold;
		color: red;
	}
	
	.bottom_cu {
	//	margin-bottom: 120px;
		padding-top: 110upx;
	}
	
	.cu-list.menu-avatar>.cu-item .content.flex-sub {
		width: calc(100% - 30px);
	}
}
</style>
