<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">线索结果</block>
		</cu-custom>

		<view class="clueResult">
			<view class="search">
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

			</view>

			<mescroll-body class="clueData" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			 :up="upOption">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>
						线索
					</view>
				</view>
				<view class="cu-list  menu-avatar">
					<view class="cu-item" v-for="(clueInfo,index) in clues" :key="index" @click="clueDetail(clueInfo.id)">
						<view class="content">
							<view class="text-sm flex">
								<view class="text-cut">
									{{JSON.stringify(clueInfo)}}
								</view>
							</view>
						</view>
						<view class="action">
							<view class="text-xs">2020-04-19</view>
						</view>
					</view>
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
			</mescroll-body>
			<!-- <view>fixed元素需写在mescroll-body的外面,否则下拉刷新时会降级为absolute <view> -->



		</view>

	</view>
</template>

<script>
	import Router from '@/router'
	var graceChecker = require("@/js_sdk/graceui-dataChecker/graceChecker.js")
	import {
		searchclues
	} from '@/api/clues.js'
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				//线索标题
				cluetitle: '',
				//线索集合
				clues: [],
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效(native: true, 则需在pages.json中配置 "enablePullDownRefresh": true)
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},


			};
		},
		created() {
			var _this = this;
			//加载线索
			// _this.loadclues();
		},
		methods: {
			//加载线索结果
			loadclues() {
				var _this = this;
				searchclues({
					title: _this.cluetitle
				}).then(response => {
					if (response.code != 200) {
						uni.showToast({
							title: '获取线索信息异常请稍后重试',
							icon: "none"
						});
						return;
					} else {
						_this.clues = response.data;
						_this.cluetitle = '';
					}
				})
			},
			//搜索线索
			searchClues() {
				var _this = this;
				console.log("搜索的标题", _this.cluetitle)
				//加载线索
				//_this.loadclues();
			},
			//线索详情
			clueDetail(clueid) {
				//#ifdef APP-PLUS
				Router.replaceAll({
					name: 'cluesdetail',
					params: {
						clueid: clueid
					}
				});
				//#endif

				//#ifdef H5
				this.$router.push({
					name: 'cluesdetail',
					params: {
						clueid: clueid
					}
				});
				//#endif
			},
			mescrollInit() {
				console.log("初始化")
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				console.log("下拉刷新")
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				//this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				var _this = this;
				setInterval(function() {
					_this.mescroll.endSuccess()
				}, 2000)

				// 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
			},
			/*上拉加载的回调*/
			upCallback() {
				console.log("上拉刷新")
				// let pageNum = page.num; // 页码, 默认从1开始
				// let pageSize = page.size; // 页长, 默认每页10条
				var _this = this;
				setInterval(function() {
					_this.mescroll.endSuccess()
				}, 2000)
			}
		}
	}
</script>

<style scoped lang="scss">
	.clueResult {

		.search {
			position: fixed;
			z-index: 1000;
			width: 100%;
			margin-top: -150upx;

			.box {
				margin: 20upx 0;
			}

			.box view.cu-bar {
				margin-top: 20upx;
			}

		}


		.cu-list.menu-avatar>.cu-item .content {
			left: 20upx !important;
			// width: 100% !important;
		}

		.cu-list.menu-avatar>.cu-item .action {
			width: 240upx !important;
		}

		.cu-list.menu-avatar>.cu-item {
			height: 80upx !important;
		}

		.cu-list.menu-avatar>.cu-item .flex .text-cut {
			max-width: 566upx !important;
		}

		.clueData {
			width: 100%;
			margin-top: 110upx;
		}

	}
</style>
