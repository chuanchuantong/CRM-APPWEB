const Sys = uni.getSystemInfoSync();
console.log(JSON.stringify(Sys))
function log(t) {	//开启会影响性能
	// return console.log(t)
}

export default function ({ lazyLoadViewTop, lazyLoadViewHeight, Iv, countIv, lazyLoadItemName, lazyLoadViewName, lazyArrName, orderly }) {
	// #ifdef APP-PLUS-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	return {
		props: {
			refreshDistance: {
				type: [String, Number],
				default: 0
			},
			throttleTime: {
				type: [String, Number],
				default: 100
			},
			minStep: {
				type: [String, Number],
				default: 3
			},
			maxStep: {
				type: [String, Number],
				default: 10
			}
		},
		data() {
			let QSLAZYLOAD_lazyLoadViewTop;
			if(lazyLoadViewName) {
				QSLAZYLOAD_lazyLoadViewTop = null;
			}else{
				QSLAZYLOAD_lazyLoadViewTop = lazyLoadViewTop || Number(this.refreshDistance) || 0;
			}
			const QSLAZYLOAD_viewHeight = lazyLoadViewHeight || Sys.screenHeight;
			return {
				QSLAZYLOAD_scrollTop: 0,
				QSLAZYLOAD_countLazyStartI: 0,
				QSLAZYLOAD_countLazyLnegth: 0,
				QSLAZYLOAD_infoArr: [],
				QSLAZYLOAD_viewHeight,
				QSLAZYLOAD_Iv: Iv || 3,
				QSLAZYLOAD_orderly: orderly || 0,
				QSLAZYLOAD_orderlyEnd: false,
				QSLAZYLOAD_orderlyArr: [],
				QSLAZYLOAD_lazyLoadItemName: lazyLoadItemName || 'lazyLoadItem',
				QSLAZYLOAD_lazyLoadViewName: lazyLoadViewName || 'lazyLoadView',
				QSLAZYLOAD_countIv: countIv || 0,
				
				QSLAZYLOAD_lazyLoadViewTop,
				QSLAZYLOAD_freezyScroll: false,
				
				QSLAZYLOAD_infoHeight: 0,
				
				QSLAZYLOAD_throttle: null,
				QSLAZYLOAD_throttle_count: 1,
				QSLAZYLOAD_throttle_step: 3,
				QSLAZYLOAD_throttle_step_min: Number(this.minStep),
				QSLAZYLOAD_throttle_step_max: Number(this.maxStep),
				QSLAZYLOAD_throttle_arr: [],
				QSLAZYLOAD_throttle_time: Number(this.throttleTime) 
			}
		},
		methods: {
			QSLAZYLOAD_count_throttle_step(scrollTop) {
				try{
					const QSLAZYLOAD_throttle_arr = this.QSLAZYLOAD_throttle_arr;
					const L = QSLAZYLOAD_throttle_arr.length;
					QSLAZYLOAD_throttle_arr.push(scrollTop);
					if(L > 1) {
						const speed = Math.floor(Math.abs(QSLAZYLOAD_throttle_arr[L - 1] - QSLAZYLOAD_throttle_arr[L - 2])/10);
						this.QSLAZYLOAD_throttle_step = speed<this.QSLAZYLOAD_throttle_step_min?this.QSLAZYLOAD_throttle_step_min:speed>this.QSLAZYLOAD_throttle_step_max?this.QSLAZYLOAD_throttle_step_max:speed;
					}else{
						this.QSLAZYLOAD_throttle_step = this.QSLAZYLOAD_throttle_step_min;
					}
				}catch(e){
					//TODO handle the exception
					this.QSLAZYLOAD_throttle_step = this.QSLAZYLOAD_throttle_step_min;
				}
			},
			QSLAZYLOAD_setScrollTop(scrollTop) {
				this.QSLAZYLOAD_scrollTop = scrollTop;
				this.QSLAZYLOAD_count_throttle_step(scrollTop);
				
				if(this.QSLAZYLOAD_throttle_count % this.QSLAZYLOAD_throttle_step === 0) {
					this.QSLAZYLOAD_throttle_count = 1;
					if(this.QSLAZYLOAD_throttle) clearTimeout(this.QSLAZYLOAD_throttle);
					this.QSLAZYLOAD_setScrollTopFn()
				}else{
					if(this.QSLAZYLOAD_throttle) clearTimeout(this.QSLAZYLOAD_throttle);
					this.QSLAZYLOAD_throttle = setTimeout(this.QSLAZYLOAD_setScrollTopFn, this.QSLAZYLOAD_throttle_time);
				}
				this.QSLAZYLOAD_throttle_count++;
				if(this.QSLAZYLOAD_throttle_count > 99999) this.QSLAZYLOAD_throttle_count = 1;
			},
			QSLAZYLOAD_setScrollTopFn() {
				if(this.QSLAZYLOAD_throttle_arr.length > 0) this.QSLAZYLOAD_throttle_arr = [];
				setTimeout(() =>{
					this.QSLAZYLOAD_countLazy();
				}, 0)
			},
			QSLAZYLOAD_countLazy() {
				const QSLAZYLOAD_countIv = this.QSLAZYLOAD_countIv;
				const QSLAZYLOAD_scrollTop = this.QSLAZYLOAD_scrollTop;
				const QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr;
				const lazyArr = this[lazyArrName];
				const QSLAZYLOAD_countLazyLnegth = this.QSLAZYLOAD_countLazyLnegth;
					log('QSLAZYLOAD_countLazyLnegth：' + QSLAZYLOAD_countLazyLnegth)
				let QSLAZYLOAD_countLazyStartI = this.QSLAZYLOAD_countLazyStartI - this.QSLAZYLOAD_Iv;
					log('this.QSLAZYLOAD_Iv：' + this.QSLAZYLOAD_Iv)
					log('QSLAZYLOAD_countLazyStartI 1：' + QSLAZYLOAD_countLazyStartI)
				if(QSLAZYLOAD_countLazyStartI < 0) {
					QSLAZYLOAD_countLazyStartI = 0;
				}
				let countLazyEndI;
				if(QSLAZYLOAD_countLazyLnegth === 0) {
					countLazyEndI = QSLAZYLOAD_infoArr.length;
				}else{
					countLazyEndI = QSLAZYLOAD_countLazyStartI + QSLAZYLOAD_countLazyLnegth;
				}
					log('countLazyEndI 1：' + countLazyEndI)
				countLazyEndI += this.QSLAZYLOAD_Iv*2;
				if(countLazyEndI > lazyArr.length) {
					countLazyEndI = lazyArr.length;
				}
					log('countLazyEndI 2：' + countLazyEndI)
				
				let newQSLAZYLOAD_countLazyStartI = QSLAZYLOAD_countLazyStartI;
				let changeStartIBl = false;
				let endI;
				const lazyLoadViewBottom = QSLAZYLOAD_scrollTop + this.QSLAZYLOAD_viewHeight;
				if(QSLAZYLOAD_infoArr.length === lazyArr.length) {
					endI = countLazyEndI;
					log('QSLAZYLOAD_countLazyStartI 2：' + QSLAZYLOAD_countLazyStartI)
					log('countLazyEndI 3：' + countLazyEndI)
					for(let i = QSLAZYLOAD_countLazyStartI; i < countLazyEndI; i++) {
						const item = QSLAZYLOAD_infoArr[i];
						
						if((item.bottom >= (QSLAZYLOAD_scrollTop)) && (item.top <= (lazyLoadViewBottom + QSLAZYLOAD_countIv))) {
							if(!changeStartIBl) {
								newQSLAZYLOAD_countLazyStartI = i;
								changeStartIBl = true;
							}
							if(!this[lazyArrName][i].show) {
								this[lazyArrName][i].show = true;
							}
						}else{
							log(4)
							if(this[lazyArrName][i].show) {
								this[lazyArrName][i].show = false;
							}
						}
					}
				}else{
					endI = QSLAZYLOAD_infoArr.length;
					const newArr = Array(QSLAZYLOAD_infoArr.length).fill('').map(item=>{ return { show: false } });
					for(let i = QSLAZYLOAD_countLazyStartI; i < QSLAZYLOAD_infoArr.length; i++) {
						const item = QSLAZYLOAD_infoArr[i];
						if((item.bottom >= (QSLAZYLOAD_scrollTop)) && (item.top <= (lazyLoadViewBottom + QSLAZYLOAD_countIv))) {
							if(!changeStartIBl) {
								newQSLAZYLOAD_countLazyStartI = i;
								changeStartIBl = true;
							}
							newArr[i].show = true;
						}
					}
					this[lazyArrName] = newArr;
				}
				this.QSLAZYLOAD_countLazyStartI = newQSLAZYLOAD_countLazyStartI;
				const diff = endI - newQSLAZYLOAD_countLazyStartI;
				log('--------------diff--------------： ' + diff)
				if(this.QSLAZYLOAD_countLazyLnegth < diff) {
					this.QSLAZYLOAD_countLazyLnegth = diff;
				}
				log('计算lazyArr: ' + JSON.stringify(this[lazyArrName]))
			},
			QSLAZYLOAD_update(listLength) {
				const QSLAZYLOAD_scrollTop = this.QSLAZYLOAD_scrollTop;
				let promises = [];
				if(this.QSLAZYLOAD_orderly > 0 && this.QSLAZYLOAD_orderlyEnd) {
					this.QSLAZYLOAD_setInfoArr(listLength, false, false, true, listLength);
					return;
				}
				this.QSLAZYLOAD_freezyScroll = true;
				this.$nextTick(()=>{
					setTimeout(()=>{
						const QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr;
						let startI = 0;
						if(QSLAZYLOAD_infoArr.length >= 0) {
							startI = QSLAZYLOAD_infoArr.length;
						}
						let endLength;
						// #ifdef APP-PLUS-NVUE
						endLength = this.$refs[this.QSLAZYLOAD_lazyLoadItemName].length;
						// #endif
						// #ifndef APP-PLUS-NVUE
						endLength = listLength;
						let view = uni.createSelectorQuery().in(this);
						// #endif
						for (let i = startI; i < endLength; i++) {
							// #ifdef APP-PLUS-NVUE
							promises.push(new Promise((rs, rj) => {
								if(this.$refs[this.QSLAZYLOAD_lazyLoadItemName][i]) {
									dom.getComponentRect(this.$refs[this.QSLAZYLOAD_lazyLoadItemName][i], option => {
										rs(option.size);
									})
								}else{
									rj(false);
								}
							}))
							// #endif
							// #ifndef APP-PLUS-NVUE
							view.select('#' + this.QSLAZYLOAD_lazyLoadItemName + i).boundingClientRect();
							// #endif
						}
						// #ifdef APP-PLUS-NVUE
						Promise.all(promises).then(async res => {
							// log('获取布局信息成功: ' + JSON.stringify(res))
							if(res.length > 0) {
								if(this.QSLAZYLOAD_lazyLoadViewTop === null) {
									this.QSLAZYLOAD_lazyLoadViewTop = await new Promise((rs, rj) =>{
										dom.getComponentRect(this.$refs[this.QSLAZYLOAD_lazyLoadViewName], (options) => {
											// log('获取boxsize成功:' + JSON.stringify(options));
											rs(options.size.top);
										});
									}) 
								}
								this.QSLAZYLOAD_setInfoArr(res, startI, QSLAZYLOAD_scrollTop, false, listLength);
							}
						}).catch(err => {
							log('获取布局信息失败: ' + JSON.stringify(res))
						})
						// #endif
						// #ifndef APP-PLUS-NVUE
						view.exec((res) => {
							this.QSLAZYLOAD_setInfoArr(res, startI, QSLAZYLOAD_scrollTop, false, listLength);
						})
						// #endif
					}, 100)
				})
			},
			QSLAZYLOAD_setInfoArr(res, startI, QSLAZYLOAD_scrollTop, QSLAZYLOAD_orderlyBl, listLength) {
				log('布局信息:' + JSON.stringify(res))
				let newArr = [];
				const QSLAZYLOAD_infoArrLength = this.QSLAZYLOAD_infoArr.length;
				if(QSLAZYLOAD_orderlyBl) {
					const QSLAZYLOAD_orderlyArr = this.QSLAZYLOAD_orderlyArr;
					const diffLength = res>QSLAZYLOAD_infoArrLength?res - QSLAZYLOAD_infoArrLength:0;
					for(let i = 0; i < diffLength; i++ ) {
						const itemI = QSLAZYLOAD_infoArrLength + i;
						const QSLAZYLOAD_orderlyI = itemI % this.QSLAZYLOAD_orderly;
						newArr.push({
							top: QSLAZYLOAD_orderlyArr[QSLAZYLOAD_orderlyI].info.top + Math.floor((itemI / this.QSLAZYLOAD_orderly)) * QSLAZYLOAD_orderlyArr[QSLAZYLOAD_orderlyI].diffTop,
							bottom: QSLAZYLOAD_orderlyArr[QSLAZYLOAD_orderlyI].info.bottom + Math.floor((itemI / this.QSLAZYLOAD_orderly)) * QSLAZYLOAD_orderlyArr[QSLAZYLOAD_orderlyI].diffBottom,
						})
					}
					// setTimeout(()=>{
						for(let i = 0; i < newArr.length; i++)
							this.QSLAZYLOAD_infoArr.push(newArr[i]);
						this.QSLAZYLOAD_countLazy();
						
						if(listLength>QSLAZYLOAD_infoArrLength) {
							this.QSLAZYLOAD_infoHeight = (newArr[newArr.length - 1] || {}).bottom || 0;
						}
						else{
							this.QSLAZYLOAD_infoHeight = (this.QSLAZYLOAD_infoArr[res-1] || {}).bottom || 0;
							this.QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr.slice(0, listLength);
							this.QSLAZYLOAD_countLazyStartI = 0
						}
						log('最终获取布局信息成功: ' + JSON.stringify(this.QSLAZYLOAD_infoArr))
					// }, 0)
				}else{
					this.QSLAZYLOAD_freezyScroll = false;
					const t = this.QSLAZYLOAD_lazyLoadViewTop - QSLAZYLOAD_scrollTop;
					newArr = res.map(item => {
						if (!item) return {};
						return {
							top: item.top - t,
							bottom: item.bottom - t,
							width: item.width,
							height: item.height
						}
					});
					this.$nextTick(()=>{
						setTimeout(()=>{
							if (startI === 0) {
								this.QSLAZYLOAD_infoArr = newArr;
							} else {
								this.QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr.concat(newArr);
							}
							if(this.QSLAZYLOAD_orderly > 0) {
								this.QSLAZYLOAD_countOrderly();
								this.QSLAZYLOAD_countLazy();
							}
							
							if(listLength>QSLAZYLOAD_infoArrLength) {
								this.QSLAZYLOAD_infoHeight = (newArr[newArr.length - 1] || {}).bottom || 0;
							}
							else{
								this.QSLAZYLOAD_infoHeight = (this.QSLAZYLOAD_infoArr[res-1] || {}).bottom || 0;
								this.QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr.slice(0, listLength);
								this.QSLAZYLOAD_countLazyStartI = 0
							}
							log('最终获取布局信息成功: ' + JSON.stringify(this.QSLAZYLOAD_infoArr))
						}, 0)
					})
				}
			},
			QSLAZYLOAD_countOrderly() {
				const QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr;
				const QSLAZYLOAD_orderly = this.QSLAZYLOAD_orderly;
				if((QSLAZYLOAD_orderly !== 0) && (QSLAZYLOAD_infoArr.length < QSLAZYLOAD_orderly*2)) return;
				const QSLAZYLOAD_orderlyArr = [];
				for(let i = 0; i < QSLAZYLOAD_orderly; i++ ) {
					QSLAZYLOAD_orderlyArr.push({
						diffTop: QSLAZYLOAD_infoArr[QSLAZYLOAD_orderly + i].top - QSLAZYLOAD_infoArr[i].top,
						diffBottom: QSLAZYLOAD_infoArr[QSLAZYLOAD_orderly + i].bottom - QSLAZYLOAD_infoArr[i].bottom,
						info: {...QSLAZYLOAD_infoArr[i]}
					}) 
					
				}
				this.QSLAZYLOAD_orderlyArr = QSLAZYLOAD_orderlyArr;
				this.QSLAZYLOAD_orderlyEnd = true;
			}
		}
	}
}