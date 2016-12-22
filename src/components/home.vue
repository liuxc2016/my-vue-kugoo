<template>
	<div id="home">
		<div class="header-swipper">
			<mt-swipe :show-indicators="false">
			  <mt-swipe-item><img src="../assets/slide/1.jpg"></mt-swipe-item>
			  <mt-swipe-item><img src="../assets/slide/2.jpg"></mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="musiclist">
			<mt-cell :title="song.title" v-for="song in songs">
			  <span @click="playIt(song.hash)">{{song.linktitle}}</span>
			  <img slot="icon" :src="song.imgUrl" width="24" height="24">
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
						title:'薛之谦 - 演员',
						linktitle:"点击试听",
						musiclink: "http://fs.open.kugou.com/a8bf0e605ae542d36b276fb334898a1d/5857ee28/G018/M00/0A/04/Ug0DAFVw-LCAYoUkAD_FoLiLEPc990.mp3",
						imgUrl: 'http://singerimg.kugou.com/uploadpic/softhead/80/20161121/20161121115938576.jpg',
						hash: '57b83eaf673d77ee21009cbd8fd05bd6'
					},
					{
						title:'陈奕讯 - 十年',
						linktitle:"点击试听",
						musiclink: "http://fs.open.kugou.com/aac371ffaa2cc0eb1b34a171159fc4b3/5857ead2/G061/M01/19/03/3YYBAFcOrteACcwtADGCyDYBxuI134.mp3",
						imgUrl: 'http://singerimg.kugou.com/uploadpic/softhead/80/20160923/20160923162150990653.jpg',
						hash:'53df727308694879cfb2bf2c65fdb578'
					}

				]
			}
		},
		methods:{
			playIt(val){
				this.$store.dispatch("playAnSongWithHash", val)
				console.log(val)
			},
			activated(){
				console.log(111);
				this.$store.commit("setHeadNav", 1);
			},
			mounted(){
				console.log(2);
				this.$store.commit("setHeadNav", 1);
			}
		}
	}
</script>
<style scope>
#home{
	    width: 100%;
}
.header-swipper{
    height: 240px;
}
.header-swipper img{
	height: 100%;
}
.musiclist{
	    text-align: left;
}
</style>