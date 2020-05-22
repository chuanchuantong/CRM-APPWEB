<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" ref="refReturn" @tap="BackPage" v-if="isBack" :url="url">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import Router from '@/router'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			indexV:{
				type: String,
				default: 'home'
			},
			url:{
				type: String,
				default: null
			},
		},
		methods: {
			BackPage() {
				var _this=this;
				if(_this.url!=''&&_this.url!=null){
					// #ifdef H5
					_this.$router.push(_this.url)
					//#endif
					//#ifdef APP-PLUS
					Router.replaceAll({
						name: _this.url
					});
					// #endif
				}
				else{
					uni.navigateBack({
						url:'main?taindex='+_this.indexV
					});
				}
				
			}
		}
	}
</script>

<style>

</style>
