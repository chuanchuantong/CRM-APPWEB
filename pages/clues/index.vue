<template>
	<view> 
			<scroll-view scroll-x class="bg-white nav nav_heard">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?' cur':''" v-for="(item,index) in clues" :key="index" @tap="tabSelect"
					 :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view> 
		<myclues v-if="TabCur=='0'"></myclues>
		<followup v-if="TabCur=='1'"></followup>
		<distribution v-if="TabCur=='2'"></distribution>
	</view>
</template>


<script>
	import myclues from './components/myclues/index.vue';
	import followup from './components/followupclues/index.vue';
	import distribution from './components/distributionclues/index.vue'; 
	import {
		getMenu
	} from '@/api/appsys.js'
	export default {
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
		},
		data() {
			return {
				TabCur: 0,
				clues: ["我的线索", "跟进线索", "分配线索"],
				scrollTop:0
			};
		},
		methods: {
			//页面滚动执行方式
			onPageScroll(e) {
				this.scrollTop= e.scrollTop
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
			}

		}
	}
</script>

<style lang="scss">
 
</style>
