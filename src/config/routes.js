import App from '../App.vue'
import Login from "../components/login.vue"
import Signout from "../components/signout.vue"
import Home from "../components/home.vue"
import Search from "../components/search.vue"
import Lyric from "../components/lyric.vue"


export default [
	{
		path: '/home',
		meta:{
			auth: true
		},
		component: Home,
		children: [
			{
				path: "signout",  //退出登陆
				meta:{
					auth:false
				},
				component: Signout
			}
		]
	},
	{
		path: '/search',
		component: Search
	},
	{
		path: '/lyric',
		component: Lyric
	}

]
