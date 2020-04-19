<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
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
	export default {
		components: {
			myclues,
			followup,
			distribution
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				clues: ["我的线索", "跟进线索", "分配线索"]
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">

</style>
