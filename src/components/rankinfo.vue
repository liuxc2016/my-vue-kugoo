<template>
	<div class="rankinfo">
		<div class="top-goback" id="top-goback">
			<p class="page-title">酷狗飙升榜</p>
			<div class="goback" id="goback">
	    		<i @click="navGoback"></i>
	    	</div>
		</div>
		<div class="rankinfo-list">
			<mt-cell :title="rank.name" v-for="rank in rankinfos">
			  <span @click="playIt(rank.hash)">点击试听</span>
			 </mt-cell>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default{
	data(){
		return {
			rankinfos:[]
		}
	},
	computed:{
		...mapState(['bShowNav'])
	},
	methods:{
		playIt(hashVal){
			console.log('将要播放歌曲'+hashVal)
			this.$store.dispatch("playAnSongWithHash", hashVal)
		},
		navGoback(){
			this.$router.push("/rank")
		},
		getSonglist(){
			let gurl = 'http://www.toudin.com/kuapi.php?id=' + this.$route.params.id
			let that = this
			axios.get(gurl).then(function(res){
				that.rankinfos = res.data;
			})
		}
	},
	watch:{
		'$route': 'getSonglist'
	},
	created(){
		this.$store.commit("setbShowNav", false)
		// console.log(this.$route);
		this.getSonglist()
	},
	activated(){
		this.$store.commit("setbShowNav", false)
	},
	deactivated(){
		this.$store.commit("setbShowNav", true)
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