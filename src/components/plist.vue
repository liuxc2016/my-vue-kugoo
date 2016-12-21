<template>
	<div id="plist">
		<div class="p-list">
			<mt-cell :title="plist.title" v-for="plist in plists">
			  <span>点击试听</span>
			  <img slot="icon" :src="plist.imgUrl" width="24" height="24">
			</mt-cell>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			plists:[
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
#plist{
	flex:1;
}
.mint-cell-title
{
	display:flex;
	justify-content:flex-start;
}
</style>