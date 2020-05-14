<template>
	<view>
		<block v-if="type === 'xxx'">
			
		</block>
		<block v-else>
			<def :item="item" :itemIndex="itemIndex"></def>
		</block>
	</view>
</template>

<script>
	import def from './components/def.vue'
	export default {
		components:{ def },
		props: {
			type: {
				type: String,
				default: 'def'
			},
			item: {
				type: [Object, String, Number],
				default() {
					return {}
				}
			},
			itemIndex: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style scoped>
</style>
