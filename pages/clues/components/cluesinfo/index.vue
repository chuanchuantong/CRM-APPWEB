<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">线索详情</block>
		</cu-custom>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clueid:0,
			};
		},
		created(){
			var _this=this;
			_this.clueid=_this.$route.params.clueid;
			console.log("线索对应id为",_this.clueid)
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">

</style>
