<template>
	<div id="lyric">
		<!-- <mt-button @click="getLyric">显示歌词</mt-button> -->
		
		<div class="lyric-panel" id="lyric-panel">
			<transition-group enter-active-class="animated pulse" leave-active-class="animated slideOutRight">
			<div  v-for="(txt,key) in lycs.txts"  :key="key" class="lyric-cell animated" :id="lycs.times[key]" v-bind:class="{willActiveLyricClass:(Math.abs(key-findIndex)<5) ,activeLyric: activeLyricNo==lycs.times[key]}" v-show="Math.abs(key-findIndex)<5">
				{{txt}}
			</div>
			</transition-group>
		</div>
		
	</div>
</template>

<script>
 	import { mapGetters } from 'vuex'
	import axios from 'axios'
	export default{
		data(){
			return {
				lycs:{
					times:[],
					txts:[]
				}
				
			}
		},
		computed:{
			willActiveLyric(){

			},
			findIndex(){
				let finds  = this.lycs.times.findIndex((item, i)=> item > this.audio.currentTime)
				// console.log(that.$store.state.audio.currentTime);
				finds = finds>1?finds-1:0
				return finds
				// 当前查到的对应歌词数组的下标key
				//如果v-for中abs key-findIndex < 5 即取出对应歌词的前五条和后四条来 
			},
			activeLyricNo(){

				// let that = this

				// let finds  = this.lycs.times.findIndex((item, i)=> item > that.audio.currentTime)
				// // console.log(that.$store.state.audio.currentTime);
				// finds = finds>1?finds-1:0

				// return this.lycs.times[finds]
				return this.lycs.times[this.findIndex]
				//根据找到的键值，直接获取当前歌词的对应秒数
				
			},
			...mapGetters(['audio', 'audioLoadding', 'showPlayer', 'isPlay'])
		},
		mounted:function(){
			// this.$store.subscribe((mutation, state) => {
			// 	if(mutation.type == "setCurrentTime"){
			// 		// console.log(this.$store.state.audio.lyric)
			// 		if(this.$store.state.audio.lyric.txts == undefined){
			// 			console.log(this.$store.state.audio.lyric.txts)
			// 			this.getLyric()
			// 		}
			// 	}
			// })
			if(this.audio.hash){
				console.log("获取歌词"+this.audio.hash)
				this.getLyric()
			}
		},
		methods:{
			getLyric(){
				let that = this
				let hash = this.audio.hash
				hash = '53df727308694879cfb2bf2c65fdb578'
				let lurl = "http://lavyun.applinzi.com/apis/getLrc.php?hash=" + this.audio.hash
				// let lurl = "getLrc.txt?hash=" + this.audio.hash
				axios.get(lurl).then(function(res){
					let lyrics = {
						times:[],
						txts:[]
					}
					let lycOrigin = res.data
				    // _regAr = /\[ar:(.+)\]/
				    // _regTi = /\[ti:(.+)\]/
				    // _regAl = /\[al:(.+)\]/
				    // _regBy = /\[by:(.+)\]/
				    // _regOffset = /\[offset:.+\]/
				    // _regTime = /\[\d+:\d+(\.\d+)?\]/g
				    let arr=lycOrigin.match(/(\[\d{2}:\d{2}\.\d{2}\])(.[^\[\]]*)?/g);
				    let times=[],txts=[];

					for(var i=0;i<arr.length;i++){
						/^(\[\d{2}:\d{2}\.\d{2}\])(.[^\[\]]*)?$/.exec(arr[i]);
						let mtime = RegExp.$1.slice(1,-1).split(":")
						let stime = parseInt(mtime[0])*60 + parseInt(mtime[1])
						// console.log(stime);
						times.push(stime);
						txts.push(RegExp.$2);
					}
					lyrics.times = times
					lyrics.txts = txts
					that.lycs = lyrics
					window.lycs = lyrics
					that.$store.commit("setLyric", lyrics)
				})
			}	
		}
	}
</script>
<style scope>
	#lyric{
		background-color: #2A95E4;
		width: 100%;
		overflow: hidden;
		flex:1;
		display: flex;
	}
	.lyric-panel{
		/*height: 80%;*/
		width:100%;
		flex:1;
		overflow: auto;
		display: flex;
    	flex-direction: column;
    	justify-content: flex-start;
    	padding-top: 2rem;
    	overflow: hidden;
	}
	.mint-cell{
		height: 10px;
		font-size:8px;
	}
	.lyric-cell{
		height: 2rem;
		line-height: 2rem;
		font-size:1rem;
	}
	.activeLyric{
		font-size:1.2rem;
		color:#fff!important;
		transition: font ease 0.5s;
		
	}
	.willActiveLyricClass{
		color:#dd9;
	}
</style>