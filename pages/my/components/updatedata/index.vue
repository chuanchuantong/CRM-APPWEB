<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">{{title}}</block>
			<block slot="right">
				<view class="cu-bar btn-group">
					<button :disabled="disabled" class="cu-btn bg-green" @click="savedata">保存</button>
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
				content: '',
				disabled: false
			};
		},
		created() {
			var _this = this;
			_this.title = _this.$Route.query.title;
			_this.content = _this.$Route.query.content;
			_this.disabled = _this.isNullOrEmpty(_this.content);
		},
		watch: {
			'content': function(newValue, oldValue) {
				var _this = this;
				_this.disabled = _this.isNullOrEmpty(newValue);
			}
		},
		methods: {
			savedata() {
				console.log("修改后的名称为", this.content)
			},
			isNullOrEmpty(value) {
				return (value == undefined || value == null || value == '')
			},
		}
	}
</script>

<style scoped lang="scss">
	.cu-bar.btn-group uni-button {
		max-width: none !important;
	}
</style>
