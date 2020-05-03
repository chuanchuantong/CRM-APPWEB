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
			<view v-if="userinfo.rolecode=='XS'">
				<scroll-view scroll-x class="bg-white nav nav_heard clueHead">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in cluesXS" :key="index" @tap="tabSelect"
						 :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<managerclues :returnData="returnData" v-if="TabCur=='2'"></managerclues>
				<managerfollowup v-if="TabCur=='1'"></managerfollowup>
				<managerdistribution v-if="TabCur=='0'"></managerdistribution>
			</view>
			<view v-if="userinfo.rolecode=='OA'">
				<scroll-view scroll-x class="bg-white nav nav_heard clueHead">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in cluesOA" :key="index" @tap="tabSelect"
						 :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<oaclues :returnData="returnData" v-if="TabCur=='0'"></oaclues>
				<oadistribution v-if="TabCur=='2'"></oadistribution>
				<oafollowup v-if="TabCur=='1'"></oafollowup>
			</view>
			<view v-if="userinfo.rolecode=='ADMIN'">
				<scroll-view scroll-x class="bg-white nav nav_heard clueHead">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in cluesAdmin" :key="index" @tap="tabSelect"
						 :data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<admindistribution v-if="TabCur=='0'"></admindistribution>
				<adminfollowup v-if="TabCur=='1'"></adminfollowup>
				<adminclues :returnData="returnData" v-if="TabCur=='2'"></adminclues>
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
	import managerclues from './components/marnager/cluesresult/index.vue';
	import managerfollowup from './components/marnager/followupclues/index.vue';
	import managerdistribution from './components/marnager/distributionclues/index.vue';
	//OA专员组件
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
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			id: {
				type: [Number, String],
				default: -1
			}
		},
		components: {
			//oa专员组件
			myclues,
			followup,
			distribution,
			//经理组件
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
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			console.log("滚动距离为：" + e.scrollTop);
		},
		data() {
			return {
				TabCur: 0,
				userinfo: [],
				clues: ["我的草稿","跟踪线索", "线索结果"],
				cluesXS: ["分配线索","跟踪线索", "线索结果"],
				cluesAdmin: ["确认线索", "线索结果"],
				cluesOA: ["线索跟进","跟踪线索", "线索结果"],
				scrollTop: 0,
				returnData: [],
				
			};
		},
		methods: {
			onPageScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替
				console.log("滚动距离为：" + e.scrollTop);
				//console.log('当前滚动条的位置:' + e.scrollTop + ', 是否向上滑:'+e.isScrollUp)
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
