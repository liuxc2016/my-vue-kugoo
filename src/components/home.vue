<template>
	<div id="home">
		<div class="musiclist">
			<mt-cell :title="song.title" v-for="song in songs">
			  <span>{{song.linktitle}}</span>
			  <img slot="icon" :src="song.imgsrc" width="24" height="24">
			</mt-cell>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				songs: [
					{
						title:'美梦成真',
						linktitle:"右侧文字",
						musiclink: "",
						imgsrc: require("../assets/icon1.png")
					},
					{
						title:'美梦成真1',
						linktitle:"点击下载",
						musiclink: "",
						imgsrc: require("../assets/icon2.png")
					},


				]
			}
		}
	}
</script>
<style scope>
.musiclist{
	    text-align: left;
}
</style>