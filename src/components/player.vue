<template>
	<div class="player" v-show="bshow" :class="{'audio_panel_hide':toggleHide}">
		<audio :src="audio.musicSrc" loop id="audioPlay" @timeupdate="change()"></audio>
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
			</div>
			<div class="player-btn-group">
				<div class=" player-progree-bar">
					<mt-range v-model="rangeValue" :min="0" :max="audio.totalTime" :barHeight="barHeight">
					  <div slot="start" class="start-flag">0</div>
					  <div slot="end" class="end-flag">{{audio.currentTime | my-filter-time}} /{{audio.totalTime | my-filter-time}}</div>
					</mt-range>
				</div>
				<span class="player-btn" @click="toggleStatus">{{playStatusButton}}</span>
				<span class="player-btn" @click="getNextSong">^</span>
			</div>
		</div>
		
	</div>
</template>
<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'

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
      ...mapGetters(['audio', 'songIsLogin'])
    },
	methods:{
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
		getNextSong: function(){
			this.$store.dispatch('getSongDetail')
			this.$store.commit("playNextSong");
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
		border:1px solid green;
		color:#fff;
		padding:10px 30px;
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
		float:left;
		width:78px;
		height: 78px;
		border:1px solid #ccc;
	}
	.musiclogo img{
		width:100%;
		height:100%;
	}
	.player-text{
		float:left;
		margin-left: 1rem;
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
	    font-family: sim-song;
	    text-overflow: ellipsis;
	}
	.player-text .author{
		font-size:1rem;

		height: 2rem;
	}
	.player-btn-group{
		float:rigth;
		font-size:2rem;
	}
	 .player-progree-bar{
	 	position: absolute;
	 	top:6.5rem;
	 	left:8rem;
	 	width:40%;
	 	font-size:10px;
	 }
	 .start-flag{
	 	margin-right: 5px;
	 }
	 .end-flag{
	 	margin-left:4px;
	 }
</style>