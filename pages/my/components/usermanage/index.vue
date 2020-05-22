<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :url="'main'">
			<block slot="content">用户管理</block>
		</cu-custom>
		<view class="positionLine"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" v-for="(roleInfo,index) in roleList" :key="index" @click="openUrl(roleInfo.rolename,roleInfo.id)">
				<view class="content">
					<text class="text-grey">{{roleInfo.rolename}}</text>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import Router from '@/router';
	import {selectRoleList} from '@/api/sysUser.js';
	export default {
		data() {
			return {
				roleList:[]
			};
		},
		created() {
			var _this=this;
			_this.loadRoleList();
		},
		methods: {
			loadRoleList(){
				var _this=this;
				console.log("此处是加载数据的地方")
				selectRoleList().then(response=>{
					if (response.code != 200) {
						uni.showToast({
							title: '加载角色列表异常请稍后再试',
							icon: "none"
						});
						return;
					}
					_this.roleList=response.data;
				})
			},
			openUrl(title, id) {
				//#ifdef APP-PLUS
				Router.push({
					name: 'userlist',
					params: {
						title: title,
						roleId:id,
					}
				});
				//#endif

				//#ifdef H5
				this.$router.push({
					name: 'userlist',
					params: {
						title: title,
						roleId:id,
					}
				});
				//#endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.positionLine {
		height: 10upx;
	}
</style>
