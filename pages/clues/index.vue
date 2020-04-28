<template>
	<view>
		<view class="myCluesClass">
			<view v-if="userinfo.rolecode=='ZY'">
				<scroll-view scroll-x class="bg-white nav nav_heard clueHead">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in clues" :key="index" @tap="tabSelect"
						 :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<myclues :returnData="returnData" v-if="TabCur=='0'"></myclues>
				<followup v-if="TabCur=='1'"></followup>
				<distribution v-if="TabCur=='2'"></distribution>
			</view>
		</view>

	</view>
</template>


<script>
	import myclues from './components/commissioner/myclues/index.vue';
	import followup from './components/commissioner/followupclues/index.vue';
	import distribution from './components/commissioner/distributionclues/index.vue';
	import {
		getMenu
	} from '@/api/appsys.js'
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		selectAll
	} from '@/api/clues.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			id: {
				type: [Number, String],
				default: -1
			}
		},
		components: {
			myclues,
			followup,
			distribution
		},
		created() {
			var _this = this;
			//#ifdef APP-PLUS
			this.userinfo = uni.getStorageSync("data")
			//#endif
			//#ifdef H5
			this.userinfo = JSON.parse(localStorage.getItem("data"));
			//#endif
			_this.getCuleMenu();
		},

		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			console.log("滚动距离为：" + e.scrollTop);
		},
		data() {
			return {
				TabCur: 0,
				userinfo: [],
				clues: ["我的线索", "跟进线索", "线索结果"],
				scrollTop: 0,
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效(native: true, 则需在pages.json中配置 "enablePullDownRefresh": true)
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 20 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				queryData: {
					currentPage: 1,
					pageSize: 20,
					params: {

					}
				},
				returnData: []
			};
		},
		methods: {
			onPageScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替
				console.log("滚动距离为：" + e.scrollTop);
				//console.log('当前滚动条的位置:' + e.scrollTop + ', 是否向上滑:'+e.isScrollUp)
			},
			aaaa(e) {
				console.log("昵称你擦撒撒旦撒旦撒旦撒大大")
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			getCuleMenu() {
				var _this = this;
				console.log(_this.id)
				let id = this.$tabbarUtil.sysUserInfo.roleid;
				console.log("获取线索管理：", id)
				//获取线索id
				getMenu({
					roleid: id,
					parentId: parseInt(_this.id)
				}).then(res => {
					console.log("线索管理的获取菜单数据", res)
					this.returnData = res.data
				})
			}

		},
		watch: {
			'TabCur': function(newVal) {
				console.log(newVal)
				if (newVal == "0") {
					console.log(this.returnData)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.myCluesClass {


		.clueHead {
			position: fixed;
			z-index: 1000;
			width: 100%;

		}

		.clueData {
			width: 100%;
			margin-top: 110upx;
			bottom: 0.5*300upx;

			.mescroll-body-content {
				margin-top: -10px;
			}

		}
	}
</style>
