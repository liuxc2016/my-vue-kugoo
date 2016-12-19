<template>
	
	<div id="signout">
		<h2>确认要退出登陆吗？</h2>
		<mt-button size="normal"  type="primary" @click="signout">确定退出</mt-button>
	</div>
</template>

<script>
	
	export default {

		mounted:function(){
			// console.log(this.$router)
		},
		methods: {
			signout: function(){
				this.$store.commit("SIG_SIGNOUT")
				this.$router.replace({path: "/login"})
			}
		}
	}
</script>