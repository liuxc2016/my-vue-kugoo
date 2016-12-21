<template>
	<div class="rankinfo">
		<div class="top-goback" id="top-goback">
			<p class="page-title">酷狗飙升榜</p>
			<div class="goback" id="goback">
	    		<i @click="navGoback"></i>
	    	</div>
		</div>
		<div class="rankinfo-list">
			<mt-cell :title="rank.title" v-for="rank in rankinfos">
			  <span @click="playIt">点击试听</span>
			  <img slot="icon" :src="rank.imgUrl" width="24" height="24">
			</mt-cell>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	data(){
		return {
			rankinfos:[
				{
					title: '经典老歌',
					imgUrl: require("../assets/rank/ktv.png")
				},
				{
					title: '日语新歌',
					imgUrl: ''
				}
			]
		}
	},
	computed:{
		...mapState(['bShowNav'])
	},
	methods:{
		playIt(){
			console.log('将要播放歌曲')
		},
		navGoback(){
			this.$router.push("/rank")
		}
	},
	created(){
		this.$store.commit("setbShowNav", false)
	},
	destroyed(){
		this.$store.commit("setbShowNav", true)
	}
}
</script>

<style scope>
	.rankinfo{
		position: relative;
		flex:1;
		display: flex;
    	flex-direction: column;
	}
	.header-nav{
		display: block;
	}
	.top-goback{
		flex:0 0 3rem;
		width:100%;
		height: 3rem;
	    background: -webkit-linear-gradient(top,rgb(44, 162, 249),rgba(0,0,0,0));
		box-sizing: border-box;
		padding:0 1rem;
		color:#fff;
	}
	.top-goback .page-title{
	    margin: 0;
	    line-height: 3rem;
	}
	.goback{
		position: absolute;
		left:0;
		top:0;
	}
	.goback i{
		display: block;
		background: url("../assets/goback_1.png") center no-repeat;
		width:3rem;
		height: 3rem;
	}
	.rankinfo-list{
		flex:1;
	}
</style>