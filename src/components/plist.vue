<template>
	<div id="plist">
		<div class="p-list">
			<mt-cell :title="plist.name" v-for="plist in plists">
			<span><router-link :to="{ name: 'plistinfo', params: { id: plist.id }}">点击浏览{{plist.listend}}</router-link></span>
			  <img slot="icon" :src="plist.imgUrl" width="24" height="24">
			</mt-cell>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return {
			plists:[]
		}
	},
	methods:{
		getPlist(){
			let gurl = 'http://localhost/test/rank.php?type=plist'
			let that = this
			axios.get(gurl).then(function(res){
				that.plists = res.data;
			})
		}
	},
	created(){
		this.getPlist()
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