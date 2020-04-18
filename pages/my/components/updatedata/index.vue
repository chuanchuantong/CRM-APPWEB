<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="content">更新信息</block></cu-custom>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">{{title}}</block>
			<block slot="right">
				<view class="cu-bar btn-group">
					<button class="cu-btn bg-green" @click="savedata">保存</button>
				</view>
			</block>

		</cu-custom>
		<form>
			<view class="cu-form-group">
				<input name="input" v-model="content"></input>
			</view>

		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: ''
			};
		},
		created() {
			this.title = this.$Router.query.title;
			this.content = this.$Router.query.content;
		},
		methods: {
			savedata() {
				console.log("修改后的名称为", this.content)
			}
		}
	}
</script>

<style lang="scss">
.cu-bar.btn-group uni-button{
	 max-width:none !important;
}
</style>
