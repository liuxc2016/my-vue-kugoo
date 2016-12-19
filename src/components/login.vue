<template>
	<div id="login">
		<h2>登陆页面</h2>
		<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
		<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
		<mt-button size="normal"  type="primary" @click="login">登陆</mt-button>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				remLogin: true,
				username: '',
				password: ''
			}
		},
		methods:{
			login(){
				let vm = this;
				this.$store.dispatch({
					type: 'SIG_LOGIN_ACTION',
					user: {
						name: this.username,
						pass: this.password
					}
				}).then(function(msg){
					alert(msg);
					vm.$router.replace({path: "/home"})
				}, function(err){
					alert(err)
				})
			}
		}
	}

</script>