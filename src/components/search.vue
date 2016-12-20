<template>
	<div id="search">
		<div class="search-area">
			<div class="search-input">
				  <mt-field placeholder="请输入关键字" v-model="searchWords">
				  	<mt-button type="primary" size="normal" @click="goSearchIt">点击搜索</mt-button>
				  </mt-field>
			</div>
		</div>
		<div class="search-list">
			<mt-cell :title="list.fileName" v-for="list in searchList">
			  <span style="color: green" @click="playTheSong(list)">点击播放</span>
			</mt-cell>
		</div>
	</div>
</template>

<script type="es6">
	import { mapGetters } from 'vuex'
	export default {
	    data(){
	      return {
	        searchWords: ''
	      }
	    },
		computed: {
	      ...mapGetters(['audio', 'searchList'])
	    },
		methods:{
			goSearchIt(){
				// alert(this.searchWords)
				this.$store.dispatch("getSearchList", this.searchWords)
			},
			playTheSong(list){
				this.$store.dispatch("playAnSong", list)
			}
		}
	}
	
</script>
<style scope>
	div#search {
    	margin-top: 1rem;
    	margin-right: 1rem;
	}
</style>