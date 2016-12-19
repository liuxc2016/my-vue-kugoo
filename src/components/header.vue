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
		    	<img src="http://m.kugou.com/v3/static/images/index/search.png" alt="search">
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
		<div class="header-swipper">
			<mt-swipe :show-indicators="false">
			  <mt-swipe-item><img src="../assets/slide/1.jpg"></mt-swipe-item>
			  <mt-swipe-item><img src="../assets/slide/2.jpg"></mt-swipe-item>
			</mt-swipe>
		</div>
    </div>
</template>
<script>
	export default {
		data(){
			return {
				headTitle: "流光音乐盒",
				bangumiId: '2'
			}
		}
	}
</script>
<style scope>
	.header-title{
		background-color: #2CA2F9;
		width:100%;
		height: 60px;
		position: fixed;
	    top: 0px;
	    left: 0px;
	    padding: 10px 20px;
	}
	.header-title .header-logo{
		margin-left: 10%;
		float:left;
		height:40px;
		vertical-align: middle;

	}
	.header-logo img{
		/*display: block;*/
		height: 40px;
		vertical-align: center;
	}
	.header-title .header-download{
		float:left;
		color:#fff;
		font-size:26px;
		margin-left: 60px;	
		font-family: 'helvetica neue','hiragino sans gb',stheiti,'wenquanyi micro hei',\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
	}
	.header-download a{
		color:#fff;
		padding:4px 100px;
		border:2px solid #fff;
		border-radius:4px;
	}
	.header-title .header-search{
		margin-right: 30px;
		float:right;
		color:#fff;
	}
	.header-nav{
		position: fixed;
		top:61px;
		left:0px;
		width:100%;
		margin-right: 20px;
	}
	.header-nav .mint-tab-item-label {
	    color: inherit;
	    font-size: 18px;
	    font-family: microsoft yahei;
	}
	.header-swipper{
		position: absolute;
	    top: 116px;
	    height: 240px;
		width: 100%;
		border:1px solid #DADBDC;
	}
	.header-swipper img{
		height: 100%;
	}
</style>