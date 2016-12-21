<template>
	<div id="rank">
		<div class="rank-list">
			<mt-cell-swipe :title="rank.title" v-for="rank in ranks">
			  <span><router-link :to="{ name: 'rankinfo', params: { id: rank.id }}">点击浏览</router-link></span>
			  <img slot="icon" :src="rank.imgUrl" style="width:90px;height:90px;">
			</mt-cell-swipe>
		</div>
	</div>
</template>

<script>
import { mapStates } from 'vuex'
export default {
	data(){
		return {
			ranks:[
				{
					id: 6666,
					title: '经典老歌',
					imgUrl: require("../assets/rank/ktv.png")

				},
				{
					id:8888,
					title: '酷狗top500',
					imgUrl: require("../assets/rank/ktv.png")
				},
				{
					id:24307,
					title: 'ktv',
					imgUrl: require("../assets/rank/ktv.png")
				},
				{
					id: 23784,
					title: '网络红歌榜',
					imgUrl: require("../assets/rank/ktv.png")

				},
				{
					id:24978,
					title: 'DJ热歌榜',
					imgUrl: require("../assets/rank/ktv.png")
				},
				{
					id: 27,
					title: '华语新歌榜',
					imgUrl: require("../assets/rank/ktv.png")

				},
				{
					id:24047,
					title: '日语新歌',
					imgUrl: require("../assets/rank/ktv.png")
				},
				{
					id: 21101,
					title: 'vivo分享榜',
					imgUrl: require("../assets/rank/ktv.png")

				},
				{
					id:21609,
					title: '中国音乐榜上榜',
					imgUrl: ''
				},
				{
					id:22096,
					title: '影视金曲',
					imgUrl: ''
				}
			]
		}
	}
}
	
</script>
<style scope>
#rank{
	flex:1;
}
.rank-list .mint-cell
{
	height: 6rem;
}
.rank-list .mint-cell-title
{
	display: flex;
	justify-content: flex-start;
}
.rank-list .mint-cell-wrapper {
    margin: 0;
    font-size: 2rem;
}
.mint-cell-wrapper img{
	margin: 3px 0px;
}
.rank-list .mint-cell-text{
	line-height: 6rem;
	margin-left:1rem;
}
</style>