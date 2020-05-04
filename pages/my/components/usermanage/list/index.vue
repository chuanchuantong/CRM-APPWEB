<template>
	<view class="userList">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">用户列表</block>
		</cu-custom>

		<view class="search">
			<view class="box">
				<view class="cu-bar search bg-white">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input v-model="userName" type="text" placeholder="请输入人员名称" confirm-type="search"></input>
					</view>
					<view class="action">
						<button @click="searchUser" class="cu-btn bg-green shadow-blur round">搜索</button>
					</view>
				</view>
			</view>
		</view>
		<view class="positionLine"></view>
		<view class="cu-list  menu-avatar">
			<view class="cu-item" v-for="(userInfo,index) in userList" :key="index" @click="openUrl(index)">
				<view class="content">
					<text class="text-grey">{{userInfo.nickname+index}}({{userInfo.usercode+index}})</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userList: [{
						"nickname": "张三",
						"usercode": "00001"
					},
					{
						"nickname": "张三",
						"usercode": "00001"
					},
					{
						"nickname": "张三",
						"usercode": "00001"
					},
					{
						"nickname": "张三",
						"usercode": "00001"
					},
					{
						"nickname": "张三",
						"usercode": "00001"
					},
					{
						"nickname": "张三",
						"usercode": "00001"
					},
					{
						"nickname": "张三",
						"usercode": "00001"
					},
					{
						"nickname": "张三",
						"usercode": "00001"
					},
				],
				userName: '',

			};
		},
		methods: {
			searchUser() {
				var _this = this;
				console.log("点击了用户查询")
			},
			openUrl(id) {
				//#ifdef APP-PLUS
				Router.push({
					name: 'userdetail',
					params: {
						userid: id
					}
				});
				//#endif

				//#ifdef H5
				this.$router.push({
					name: 'userdetail',
					params: {
						userid: id
					}
				});
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.userList {
		.positionLine {
			height: 10upx;
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
	}
</style>
