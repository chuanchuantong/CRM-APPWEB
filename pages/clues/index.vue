<template>
	<view>
		<view class="myCluesClass">
			<view v-if="userinfo.rolecode=='ZY'">
				<tabControl :current="TabCur" class="clueHead" :top="CustomBar" :values="clues" bgc="#fff" :fixed="true"
				 :scrollFlag='true' :isEqually='true' @clickItem="onClickItem"></tabControl>
				<!-- 使用 swiper 配合 滑动切换 -->
				<template>
					<swiper @change='scollSwiper' :current='TabCur'>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<myclues></myclues>
							</scroll-view>
						</swiper-item>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<followup></followup>
							</scroll-view>
						</swiper-item>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<distribution></distribution>
							</scroll-view>
						</swiper-item>
					</swiper>
				</template>

				<!-- <scroll-view scroll-x class="bg-white nav nav_heard clueHead" scroll-x="true" @scroll="scroll" scroll-left="120"> 
					<view class="flex text-center">
						<view class="cu-item flex-sub" :id="'tab'+index" :scroll-into-view="'tab1'" :class="index==TabCur?' cur':''" v-for="(item,index) in clues" :key="index" @tap="tabSelect"
						 :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<myclues :returnData="returnData" v-if="TabCur=='0'"></myclues>
				<followup v-if="TabCur=='1'"></followup>
				<distribution v-if="TabCur=='2'"></distribution> -->
			</view>
			<view v-if="userinfo.rolecode=='XS'">
				<tabControl :current="TabCur" class="clueHead" :top="CustomBar" :values="cluesXS" bgc="#fff" :fixed="true"
				 :scrollFlag='true' :isEqually='true' @clickItem="onClickItem"></tabControl>
				<!-- 使用 swiper 配合 滑动切换 -->
				<template>
					<swiper @change='scollSwiper' :current='TabCur'>
						<swiper-item>
							<scroll-view scroll-y="true" style="height: 100%;">
								<managermyclues></managermyclues>
							</scroll-view>
						</swiper-item>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<managerdistribution></managerdistribution>
							</scroll-view>
						</swiper-item>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<managerfollowup></managerfollowup>
							</scroll-view>
						</swiper-item>
						
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<managerclues></managerclues>
							</scroll-view>
						</swiper-item>
					</swiper>
				</template>
				<!-- <scroll-view scroll-x class="bg-white nav nav_heard clueHead">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in cluesXS" :key="index" @tap="tabSelect"
						 :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<managerclues :returnData="returnData" v-if="TabCur=='2'"></managerclues>
				<managerfollowup v-if="TabCur=='1'"></managerfollowup>
				<managerdistribution v-if="TabCur=='0'"></managerdistribution> -->
			</view>
			<view v-if="userinfo.rolecode=='OA'">
				<tabControl :current="TabCur" class="clueHead" :top="CustomBar" :values="cluesOA" bgc="#fff" :fixed="true"
				 :scrollFlag='true' :isEqually='true' @clickItem="onClickItem"></tabControl>
				<!-- 使用 swiper 配合 滑动切换 -->
				<template>
					<swiper @change='scollSwiper' :current='TabCur'>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
						<oamyclues></oamyclues>
						</scroll-view>
						</swiper-item>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<oaclues></oaclues>
							</scroll-view>
						</swiper-item>
						
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<oafollowup></oafollowup>
							</scroll-view>
						</swiper-item>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<oadistribution></oadistribution>
							</scroll-view>
						</swiper-item>
					</swiper>
				</template>
				
				<!-- <scroll-view scroll-x class="bg-white nav nav_heard clueHead">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in cluesOA" :key="index" @tap="tabSelect"
						 :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<oaclues :returnData="returnData" v-if="TabCur=='0'"></oaclues>
				<oadistribution v-if="TabCur=='2'"></oadistribution>
				<oafollowup v-if="TabCur=='1'"></oafollowup> -->
			</view>
			<view v-if="userinfo.rolecode=='ADMIN'">
				<tabControl :current="TabCur" class="clueHead" :top="CustomBar" :values="cluesAdmin" bgc="#fff" :fixed="true"
				 :scrollFlag='true' :isEqually='true' @clickItem="onClickItem"></tabControl>
				<!-- 使用 swiper 配合 滑动切换 -->
				<template>
					<swiper @change='scollSwiper' :current='TabCur'>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<admindistribution></admindistribution>
							</scroll-view>
						</swiper-item>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<adminfollowup></adminfollowup>
							</scroll-view>
						</swiper-item>
						<swiper-item >
							<!-- 使用 scroll-view 来滚动内容区域 -->
							<scroll-view scroll-y="true" style="height: 100%;">
								<adminclues></adminclues>
							</scroll-view>
						</swiper-item>
					</swiper>
				</template>
				
				<!-- <scroll-view scroll-x class="bg-white nav nav_heard clueHead">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in cluesAdmin" :key="index"
						 @tap="tabSelect" :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<admindistribution v-if="TabCur=='0'"></admindistribution>
				<adminfollowup v-if="TabCur=='1'"></adminfollowup>
				<adminclues :returnData="returnData" v-if="TabCur=='2'"></adminclues> -->
			</view>
		</view>

	</view>
</template>


<script>
	//销售专员组件
	import myclues from './components/commissioner/myclues/index.vue';
	import followup from './components/commissioner/followupclues/index.vue';
	import distribution from './components/commissioner/distributionclues/index.vue';
	//经理组件
	import managermyclues from './components/marnager/myclues/index.vue';
	import managerclues from './components/marnager/cluesresult/index.vue';
	import managerfollowup from './components/marnager/followupclues/index.vue';
	import managerdistribution from './components/marnager/distributionclues/index.vue';
	//OA专员组件
	import oamyclues from './components/oaspecialist/myclues/index.vue';
	import oaclues from './components/oaspecialist/cluesresult/index.vue';
	import oadistribution from './components/oaspecialist/distributionclues/index.vue';
	import oafollowup from './components/oaspecialist/followupclues/index.vue';
	//管理员组件
	import adminclues from './components/administrators/cluesresult/index.vue';
	import adminfollowup from './components/administrators/followupclues/index.vue';
	import admindistribution from './components/administrators/distributionclues/index.vue';

	import {
		getMenu
	} from '@/api/appsys.js'
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		selectAll
	} from '@/api/clues.js'
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			id: {
				type: [Number, String],
				default: -1
			}
		},
		components: {
			tabControl,
			//oa专员组件
			oamyclues,
			myclues,
			followup,
			distribution,
			//经理组件
			managermyclues,
			managerclues,
			managerfollowup,
			managerdistribution,
			//OA专员组件
			oaclues,
			oadistribution,
			oafollowup,
			//管理员组件
			adminclues,
			adminfollowup,
			admindistribution,
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
			//this.userinfo.rolecode="ZY"
			// this.userinfo.rolecode="MANAGER"
			// this.userinfo.rolecode="OA"
			// this.userinfo.rolecode="ADMIN"
		},
		onShow() {
			this.$forceUpdate();
			console.log("页面展示了")
		},
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			console.log("滚动距离为：" + e.scrollTop);
		},
		data() {
			return {
				TabCur: this.$tabbarUtil.tabindex,
				userinfo: [],
				clues: ["我的草稿", "跟踪线索", "线索结果"],
				cluesXS: ["我的线索","分配线索", "跟踪线索", "线索结果"],
				cluesAdmin: ["确认线索", "线索结果"],
				cluesOA: ["我的线索","线索跟进", "跟踪线索", "线索结果"],
				scrollTop: 0,
				returnData: [],

			};
		},
		methods: {
			onClickItem(val) {
				this.$tabbarUtil.setTabindex(val.currentIndex)
				this.TabCur = Number(val.currentIndex)
			},
			scollSwiper(e) {
				this.$tabbarUtil.setTabindex(e.target.current)
				this.TabCur = Number(e.target.current)
			},
			onPageScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替
				console.log("滚动距离为：" + e.scrollTop);
				//console.log('当前滚动条的位置:' + e.scrollTop + ', 是否向上滑:'+e.isScrollUp)
			},
			scroll(e) {
				console.log(e)
			},
			tabSelect(e) {
				this.TabCur = Number(e.currentTarget.dataset.id);
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
	// uni-swiper{
	// 	height: 100% !important;
	// }
</style>
<style lang="scss">
	page {
		height: 100%;
	}

	.uni-swiper-wrapper {
		position: initial !important;
		width: inherit !important;
		height: inherit !important;
		transform: initial !important;

	}

	.myCluesClass {
		padding-top: 98rpx;
		height: 100%;
	}

	.aaa {
		.uni-swiper-wrapper {
			position: initial !important;
			transform: initial !important;
		}
	}

	.myCluesClass {
		

		// .clueHead {
		// 	position: fixed;
		// 	z-index: 1000;
		// 	width: 100%;
		// 	white-space: nowrap;

		// }

		// .clueData {
		// 	width: 100%;
		// 	margin-top: 110upx;
		// 	bottom: 0.5*300upx;

		// 	.mescroll-body-content {
		// 		margin-top: -10px;
		// 	}

		// }
	}
</style>
