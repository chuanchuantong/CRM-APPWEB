<template>

	<view class="content main">

		<cu-custom v-show="PageCur=='home'" bgColor="bg-gradual-blue">
			<block slot="content">首页</block>
		</cu-custom>
		<cu-custom v-show="PageCur=='cluesmanage'" bgColor="bg-gradual-blue">
			<block slot="content">线索管理</block>
			<block slot="right" v-if="this.sysuser.rolecode == 'ZY'">
				<button class="cu-btn bg-green btnCreateClue" @click="createclues">
					创建线索
				</button>
			</block>
		</cu-custom>
		<cu-custom v-show="PageCur=='component'" bgColor="bg-gradual-blue">
			<block slot="content">用户管理</block>
		</cu-custom>
		<view>
			<myself :id="id" v-if="PageCur=='myself'"></myself>
			<cluesmanage :id="id" v-if="PageCur=='cluesmanage'"></cluesmanage>
			<subordinate v-if="PageCur=='subordinate'"></subordinate>
			<home v-if="PageCur=='home'"></home>
		</view>
		<div class="entry"></div>
		<view class="cu-bar tabbar bg-white shadow foot submit-warp">
			<view class="action" @click="NavChange" v-for="item in menuData" :key="item.id" :data-id="item.id" :data-cur="item.menucode">
				<uni-badge v-show=" item.menucode=='home'" :text="tabCount" type="error" size="small" class="posbadge"></uni-badge>
				<view class='cuIcon-cu-image'>
					<image :src="PageCur==item.menucode?item.biconurl:item.iconurl"></image>
				</view>
				<view :class="PageCur==item.menucode?'text-green':'text-gray'">{{item.menuname}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMenu
	} from '@/api/appsys.js'
	import {
		getUserInfo
	} from '@/api/login.js'
	import {
		selectAll
	} from '@/api/clues.js'
	import {selectMessage} from '@/api/message.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import Router from '@/router'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin 
		computed: {
			tabbarIndex1() {
				return this.$tabbarUtil.tabbarIndex;
			}
		},
		components:{uniBadge},
		data() {
			return {
				PageCur: 'basics',
				menuData: {},
				id: 0,
				TabCur: "",
				clues: ["我的线索", "跟进线索", "分配线索"],
				scrollTop: 0,
				queryData: {
					currentPage: 1,
					pageSize: 2000,
					params: {

					}
				},
				returnData: [],
				sysuser:[],
				tabCount:0
			}
		},
		created() {

			this.init();

		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
		},
		methods: { 
			NavChange: function(e) {
				this.id = e.currentTarget.dataset.id;
				this.$tabbarUtil.setValue(e.currentTarget.dataset.cur);
				console.log(this.$tabbarUtil.tabbarIndex)
				this.PageCur = this.$tabbarUtil.tabbarIndex;
				console.log("roleid:", this.roleId)
				this.getMenus(this.roleId, this.id)
				selectMessage(this.queryData).then(res=>{
					let count=0
					res.data.list.forEach(s=>{
						if(s.isReadly==0){
							count+=1
						}
					})
					this.tabCount=count
					console.log("Count",count)
				})
			},
			init: function() {
				getUserInfo().then(res => {
					//#ifdef H5
					localStorage.setItem('data', JSON.stringify(res.data))
					//#endif
					//#ifdef APP-PLUS
					uni.setStorageSync("data", res.data);
					//#endif
					this.roleId = res.data.roleid;
					this.sysuser = res.data;
					this.$tabbarUtil.setInfo(res.data)
					this.getMenu(res.data.roleid, 0)
				})
				selectMessage(this.queryData).then(res=>{
					let count=0
					if(res.data.list==null){
						return
					}
					res.data.list.forEach(s=>{
						if(s.isReadly==0){
							count+=1
						}
					})
					this.tabCount=count
					console.log("Count",count)
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
			},
			getMenus(roleid, parentid) {
				getMenu({
					roleId: roleid,
					parentId: parentid
				}).then(res => {
					//this.menuData = res.data
					console.log(res)
					//this.PageCur = this.$tabbarUtil.tabbarIndex
					//this.id = res.data[0].id;

				});
			},
			getMenu(roleid, parentid) {
				getMenu({
					roleId: roleid,
					parentId: parentid
				}).then(res => {
					this.menuData = res.data
					console.log(res)
					this.PageCur = this.$tabbarUtil.tabbarIndex
					//this.id = res.data[0].id;

				});
			}
		},
		watch: {
			tabbarIndex1: function(old, newd) {
				console.log("1111111111111111111111", old)
				this.PageCur = newd;
			}
		}
	}
</script>


<style lang="scss">
	.main {
		.btnCreateClue {
			text-align: right;
			position: absolute;
			right: 10upx;
		}
.cu-bar.tabbar .action .cuIcon-cu-image uni-image{
	    width: 19px;
	    height: 19px;
	    display: inline-block;
	    margin-bottom: 3px;
}
.posbadge{
	position: absolute;
	    top: -5px;
	    right: 9px;
}
		.entry {
			height: 0.5*300upx;
		}

		.submit-warp {
			position: fixed;
			bottom: var(--window-bottom);
			left: 0;
			right: 0;
			height: 0.5*250upx;
			line-height: 0.5*250upx;
			background: #fff;
		}

		.baseInfo {
			width: 90%;
			height: 90%;
			margin: 0 5% 30rpx 5%;
			display: flex;

			.baseInfoleft {
				width: 90%;

				.name {
					font-size: 32rpx;
					font-weight: bold;
					line-height: 80rpx;
					letter-spacing: 4rpx;
				}

				.invitationCode {
					font-size: 28rpx;
					color: #666666;
				}
			}

			.iconshare {
				width: 10%;

				image {
					width: 50rpx;
					height: 50rpx;
					margin-top: 55rpx;
				}
			}
		}

		.cashWithdrawal {
			width: 100%;
			display: flex;
			height: 80rpx;

			background-color: white;
			line-height: 80rpx;

			.iconmoney {
				image {
					width: 40rpx;
					height: 40rpx;
					margin-top: 20rpx;
					margin-left: 25rpx;
					margin-right: 25rpx;
				}

			}

			.cashWithdrawalText {
				font-size: 26rpx;

			}
		}
	}

	.content {
		margin: 0;
		padding: 0;
	}

	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}

	.baseContent {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		// align-items: flex-start;
		// align-content: flex-start;
		justify-content: space-between;

		.card {


			margin: 10px 0px;
			width: 23%;
			background-color: white;
			border-radius: 20px;
			box-shadow: 1px 1px 1px #C8C7CC;
			text-align: center;
			font-size: 12px;

			.cardContent {}
		}

	}

	@media screen and (min-width: 320px) {

		.baseContent {
			.card {
				width: 28%;
			}
		}
	}
</style>
