<template>
	<div class="player app-player" v-show="bshow" :class="{'audio_panel_hide':toggleHide}">
		<audio :src="audio.musicSrc" id="audioPlay" @timeupdate="change" @ended="audioEnded"></audio>
		<div class="player-panel-control" @click="togglePanel">
			<mt-spinner type="snake" :size="27" v-show="songIsLogin"></mt-spinner>
		</div>
		<div class="player-panel">
			<div class="musiclogo">
				<img :src="audio.imgUrl" @click="goToLyricPage">
			</div>
			<div class="player-text">
				<div class="name">{{audio.name}}</div>
				<div class="author">{{audio.author}}</div>
				<div class=" player-progree-bar">
					<mt-range v-model="rangeValue" :min="0" :max="audio.totalTime" :barHeight="barHeight">
					  <div slot="start" class="start-flag">0</div>
					  <div slot="end" class="end-flag">{{audio.currentTime | my-filter-time}} /{{audio.totalTime | my-filter-time}}</div>
					</mt-range>
				</div>
			</div>
			<div class="player-btn-group">
				<span class="player-btn mplay-btn" v-bind:class="playModeClass" @click="changePlayMode" :alt="playModeAlt" :title="playModeAlt"></span>
				<span class="player-btn mplay-btn mplay-prev-btn" @click="playNextSong"></span>
				<span class="player-btn mplay-btn" :class="playingClass" @click="toggleStatus"></span>
				<span class="player-btn mplay-btn mplay-next-btn" @click="playNextSong"></span>
			</div>
		</div>
		
	</div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapStates} from 'vuex'

Vue.filter('my-filter-time', function (onlySecond) {
  // 返回处理后的值
  	let fixIt = function(val){
  		return val < 10 ? '0'+val : val
  	}
    let om = parseInt(onlySecond / 60)
    let os = parseInt(onlySecond % 60)
    return fixIt(om) + ":" + fixIt(os)
  
})
export default {
	data(){
		return {
			bshow: true,
			barHeight:3,
			toggleHide:false,
			audioLoadding:false,
			playStatusButton: '+'
		}
	},
	computed:{
		playModeClass(){
			return {
				singermodeclass: this.playMode==1,
				listrecmodeclass: this.playMode==2,
				listrandmodeclass: this.playMode==3

			}
		},
		playModeAlt(){
			if(this.playMode ==1){
				return '单曲模式'
			}else if (this.playMode ==2) {
				return '列表循环'
			}else if (this.playMode ==3) {
				return '列表随机'
			}
		},
		playingClass(){
			return this.audio.isPlaying? 'mplay-zan-btn': 'mplay-play-btn'
		},
		rangeValue:{
			get(){
				return parseInt(this.audio.currentTime);
			},
			set(val){
				this.$store.commit("setCurrentFlag", true); //打开调整时间标识
				this.$store.commit('setCurrentTime', parseInt(val))
				document.getElementById("audioPlay").currentTime =  parseInt(val);  //音乐切换到这个时间
				this.$store.commit("setCurrentFlag", false);  //关闭调整时间标识
			}
		},
      	...mapGetters(['audio', 'songIsLogin', 'playMode'])
    },
	methods:{
		changePlayMode: function(){
			this.$store.commit("setPlayMode")
		},
		togglePanel: function(){
			this.toggleHide=!this.toggleHide
		},
		toggleStatus: function(){
			this.$store.commit("togglePlayStatus", !this.audio.isPlaying);
			if(this.audio.isPlaying){
				document.getElementById("audioPlay").play();
			}else{
				document.getElementById("audioPlay").pause();
			}
		},
		goToLyricPage(){
			this.$router.replace("/lyric")
		},
		playNextSong: function(){
			// this.$store.dispatch('getSongDetail')
			this.$store.dispatch("playNextSong");
			document.getElementById('audioPlay').addEventListener('canplay', function(){
				this.$store.commit("togglePlayStatus", true);
				document.getElementById("audioPlay").play();
			}.bind(this))

		},
		getSongList: function(){
			this.$store.dispatch('getSongList', this)
		},
		change(){
			let time = document.getElementById("audioPlay").currentTime.toFixed(0);
			let duration = document.getElementById("audioPlay").duration.toFixed(0);
			// console.log(time + " / " + duration)
			if(this.audio.currentSetFlag){
				document.getElementById("audioPlay").currentTime = this.audio.currentLength;
				this.$store.commit("setCurrentTime", this.audio.currentLength);
				this.$store.commit("setCurrentFlag", false);
			}else{
				this.$store.commit("setCurrentTime", time);
			}
		},
		audioEnded(){
			console.log(this.playMode);
			if(this.playMode == 1){
				console.log("单曲模式，重新播放");
				document.getElementById("audioPlay").play();
			}else{
				this.playNextSong();
			}
			
		}
	}
}
</script>
<style>
	.player{
		width:100%;
		height: 135px;
		position: fixed;
		bottom:0px;
		background: transparent;
		transition: all ease 2s;
	}
	.player.audio_panel_hide{
		bottom:-100px;
	}
	.player-panel{

		left:0;
		width:100%;
		height: 100px;
		background: rgba(0,0,0,0.8);
		color:#fff;
		padding:10px 10px;
		display: flex;
		overflow: hidden;
		box-sizing: border-box;
	}
	.player-panel-control{
		height: 35px;
		width:35px;
		border-radius: 50%;
		background: rgba(0,0,0,0.8);
	    background-image: url("../assets/panel-control.png");
	    background-repeat:no-repeat;
	    background-position:center;
	    background-size: 25px;
	    margin-left:0;
	    margin-bottom: 0;
	    overflow: hidden;
	}
	.musiclogo{
		width:78px;
		height: 78px;
		border:1px solid #ccc;
		flex:0 0 auto;
	}
	.musiclogo img{
		width:100%;
		height:100%;
	}
	.player-text{
		margin-left: 1rem;
		flex:1 1 auto;
		align-items: flex-start;
		display: flex;
		flex-direction:column;
		font-size:1.5rem;
		text-align: left;
		text-overflow: ellipsis;
	}
	.player-text .name{
	    height: 2rem;
	    width: 9rem;
	    font-size: 15px;
	    /*font-family: sim-song;*/
	    text-overflow: ellipsis;
	}
	.player-text .author{
		font-size:1rem;

		height: 2rem;
	}

	 .player-progree-bar{
	 	top:6.5rem;
	 	width: 90%;
	 	font-size:10px;
	 }
	 .start-flag{
	 	margin-right: 5px;
	 }
	 .end-flag{
	 	margin-left:4px;
	 }
 	.player-btn-group{
		flex: 0 0 110px;
		display: flex;
		align-items: center;
	}
	 .mplay-btn{
	 	width:40px;
	 	height: 40px;
	 	background-position:center;
	 	background-size: contain;
	 	background-repeat: no-repeat;
	 }
	 .mplay-play-btn{
	 	margin:0 5px;
	 	background-image: url("../assets/play.png")
	 }
	 .mplay-zan-btn{
	 	margin:0 5px;
	 	background-image: url("../assets/zan.png")
	 }
	 .mplay-prev-btn{
	 	width:30px;
	 	height: 30px;
	 	background-image: url("../assets/prev.png")
	 }
 	 .mplay-next-btn{
	 	width:30px;
	 	height: 30px;
	 	background-image: url("../assets/next.png")
	 }
	 /*列表循环2*/
	 .listrecmodeclass{
	 	background-image: url("../assets/listrec.png")
	 }
 	 /*列表随机3*/
	 .listrandmodeclass{
	 	background-image: url("../assets/listrand.png")
	 }
	 /*单曲1*/
	 .singermodeclass{
	 	background-image: url("../assets/listsinger.png")
	 }

</style>