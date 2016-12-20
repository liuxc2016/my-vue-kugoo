<template>
	<div id="lyric">
		<!-- <mt-button @click="getLyric">显示歌词</mt-button> -->
		<div class="lyric-panel" id="lyric-panel">
			<!-- <input type="text" :value="audio.currentTime">:<span>{{activeLyricNo}}</span> -->
			<div v-for="(txt,key) in lycs.txts"  class="lyric-cell" :id="lycs.times[key]" v-bind:class="{ activeLyric: activeLyricNo==lycs.times[key] }"><!-- {{lycs.times[key]}} - -->{{txt}}</div>
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
			activeLyricNo(){
				// for(var i=1;i<this.lycs.times.length;i++){
				// 	if(this.lycs.times[i] >this.audio.setCurrentTime ){
				// 		console.log(lycs.times[i-1])
				// 		return this.lycs.times[i-1]
				// 	}
				// }

				let that = this

				let finds  = this.lycs.times.findIndex((item, i)=> item > that.audio.currentTime)
				// console.log(that.$store.state.audio.currentTime);
				finds = finds>1?finds-1:0
				let sh = finds * 32 - document.getElementById("lyric-panel").offsetHeight/2
				document.getElementById("lyric-panel").scrollTop = sh
				return this.lycs.times[finds]
				
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
		background-color: rgba(0,0,0,0.4);
		height: 100%;
	}
	.lyric-panel{
		height: 80%;
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
		font-size:1.5rem;
		color:red;
	}
</style>