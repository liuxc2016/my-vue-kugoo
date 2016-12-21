import App from '../App.vue'
import Login from "../components/login.vue"
import Signout from "../components/signout.vue"

//新歌
import Home from "../components/home.vue"

//搜索
import Search from "../components/search.vue"
//歌词
import Lyric from "../components/lyric.vue"

//排行
import Rank from "../components/rank.vue"
//歌单
import Plist from "../components/plist.vue"
//歌手
import Singer from "../components/singer.vue"


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
	},
	{
		path: '/rank',
		component: Rank
	},
	{
		path: '/plist',
		component: Plist
	},
	{
		path: '/singer',
		component: Singer
	}

]
