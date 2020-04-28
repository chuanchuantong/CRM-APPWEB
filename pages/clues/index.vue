<template>
	<view>
		<view class="myCluesClass">
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
</template>


<script>
	import myclues from './components/myclues/index.vue';
	import followup from './components/followupclues/index.vue';
	import distribution from './components/distributionclues/index.vue';
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
			_this.getCuleMenu();
			_this.InitClues();
		},
		
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			console.log("滚动距离为：" + e.scrollTop);
		},
		data() {
			return {
				TabCur: 0,
				clues: ["我的线索", "跟进线索", "分配线索"],
				scrollTop: 0,
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
			InitClues(){
				this.queryData.currentPage=1;
				selectAll(this.queryData).then(res => {
					console.log(res)
					this.returnData = res.data.list;
				})
			}, 
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			getCuleMenu() {
				var _this = this;
				console.log(_this.id)
				//获取线索id
				getMenu({
					parentId: parseInt(_this.id)
				}).then(res => {
					console.log("线索管理的获取菜单数据", res)

				})
			},
			//创建线索
			createclues() {
				//此时应该是创建线索去了
				//#ifdef APP-PLUS
				console.log("点击了路由跳转", 'createclue')
				Router.push('createclue');
				//#endif
			
				//#ifdef H5
				console.log("点击了路由跳转H5", 'createclue')
				this.$router.push('createclue');
				//#endif
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

			.mescroll-body-content {
				margin-top: -10px;
			}

			margin-bottom: 150upx;
		}
	}
</style>
