<template>
	<div id="singer">
		<div class="p-list">
			<mt-cell :title="singer.title" v-for="singer in singers">
			  <span>点击试听</span>
			  <img slot="icon" :src="singer.imgUrl" width="24" height="24">
			</mt-cell>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			singers:[
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
#singer{
	flex:1;
}
.mint-cell-title
{
	display:flex;
	justify-content:flex-start;
}
</style>