<template>
	<div>
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
	    <div class="header-nav">
			<mt-navbar v-model="bangumiId">
			  <mt-tab-item id="1">新歌</mt-tab-item>
			  <mt-tab-item id="2">排行</mt-tab-item>
			  <mt-tab-item id="3">歌单</mt-tab-item>
			  <mt-tab-item id="4">歌手</mt-tab-item>
			  <mt-tab-item id="5">彩铃</mt-tab-item>
			</mt-navbar>
		</div>
    </div>
</template>
<script>
	export default {
		data(){
			return {
				headTitle: "点击下载",
				bangumiId: '2'
			}
		},
		methods:{
			gotoSearch(){
				this.$router.replace("/search")
			}
		}
	}
</script>
<style scope>
	.header-title{
		box-sizing:border-box;
		background-color: #2CA2F9;
		width:100%;
		height: 5rem;
		position: fixed;
	    top: 0px;
	    left: 0px;
	    padding: 1rem 0.5rem;
	}
	.header-title .header-logo{
		float:left;
		width:50%;
		vertical-align: middle;

	}
	.header-logo img{
		display: block;
		width:100%;
		vertical-align: center;
	}
	.header-title .header-download{
		float:left;
		color:#fff;
		font-size:1rem;
		margin-left:2%;
		margin-top:1rem;
		height: 100%;
		font-family: 'helvetica neue','hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
	}
	.header-download a{
		display: block;
		color:#fff;
		padding:4px 10px;
		border:2px solid #fff;
		border-radius:4px;
	}
	.header-title .header-search{
		float:right;
		color:#fff;
	}
	.header-nav{
		position: fixed;
		top:5rem;
		left:0px;
		width:100%;
		margin-right: 20px;
	}
	.header-nav .mint-tab-item-label {
	    color: inherit;
	    font-size: 1rem;
	    font-family: microsoft yahei;
	}

</style>