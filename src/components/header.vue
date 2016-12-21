<template>
	<div class="app-header">
		<div class="header-title">
			<div class="header-logo">
				<img src="../assets/logo.png">
			</div>	
		    <div class="header-download">
		    	<a herf="a.txt">{{headTitle}}</a>
		    </div>
		    <div class="header-search">
		    	<img src="http://m.kugou.com/v3/static/images/index/search.png" alt="search" @click="gotoSearch">
		    </div>
		</div>
	    <div class="header-nav" v-show="bShowNav">
			<mt-navbar v-model="bangumiId">
			  <mt-tab-item id="1" @click.native="setNav(1)">推荐</mt-tab-item>
			  <mt-tab-item id="2" @click.native="setNav(2)">排行</mt-tab-item>
			  <mt-tab-item id="3" @click.native="setNav(3)">歌单</mt-tab-item>
			  <mt-tab-item id="4" @click.native="setNav(4)">歌手</mt-tab-item>
			  <mt-tab-item id="5" @click.native="setNav(5)">彩铃</mt-tab-item>
			</mt-navbar>
		</div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
	export default {
		data(){
			return {
				headTitle: "点击下载",
				bangumiId: '2'
			}
		},
		computed: {
	      ...mapState(['headNav', 'bShowNav'])
	    },
		methods:{
			setNav(id){
				this.$store.commit('setHeadNav', id)
				switch(id){
					case 1:
						this.$router.push({path:'/home'})
						break
					case 2:
						this.$router.push({path:'/rank'})
						break
					case 3:
						this.$router.push({path:'/plist'})
						break
					case 4:
						this.$router.push({path:'/singer'})
						break
					case 5:
						this.$router.push({path:'/ring'})
						break

				}
			},
			gotoSearch(){
				this.$router.replace("/search")
			}
		}
	}
</script>
<style scope>
	.header-title{
	    box-sizing: border-box;
	    background-color: #2CA2F9;
	    width: 100%;
	    height: 4rem;
	    padding: 0.5rem 0.1rem;
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	}
	.header-title .header-logo{
		width:40%;
		vertical-align: middle;
		flex:2 1 200px;
	    display: flex;
    	justify-content: flex-start;
    	padding-left:5px;
	}
	.header-logo img{
		display: block;
		height: 100%;
		vertical-align: center;
	}
	.header-title .header-download{
		color:#fff;
		font-size:1rem;
		margin-left:2%;

		width:40%;
		height: 100%;
		font-family: 'helvetica neue','hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
		display: flex;
		flex:1 0 80px;
		justify-content: center;
	}
	.header-download a{
	    display: block;
	    color: #fff;
	    padding: 4px 10px;
	    border: 2px solid #fff;
	    border-radius: 4px;
	    align-self: flex-end;
	    font-size: 0.5rem;
	}
	.header-title .header-search{
		color:#fff;
		align-self: flex-end;
		flex: 0 1 40px;
	}
	.header-nav{
/*		position: fixed;
		top:5rem;
		left:0px;*/
		width:100%;
		height: 50px;
		margin-right: 20px;
		margin-bottom: 3px;
	}
	.header-nav .mint-tab-item-label {
	    color: inherit;
	    font-size: 1rem;
	    font-family: microsoft yahei;
	}

</style>