<template>
	<div id="rank">
		<div class="rank-list">
			<mt-cell :title="rank.title" v-for="rank in ranks">
			  <span>点击试听</span>
			  <img slot="icon" :src="rank.imgUrl" width="24" height="24">
			</mt-cell>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			ranks:[
				{
					title: '经典老歌',
					imgUrl: ''
				},
				{
					title: '日语新歌',
					imgUrl: ''
				},
			]
		}
	}
}
	
</script>
<style scope>
#rank{
	flex:1;
}
.mint-cell-title
{
	display: flex;
	justify-content: flex-start;
}
</style>