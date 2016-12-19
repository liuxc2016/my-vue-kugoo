import Vue from 'vue'
import Vuex from 'vuex'
import {Toast, Indicator } from 'mint-ui'
import axios from 'axios'


Vue.use(Vuex)

const SIG_LOGIN_ACTION = 'SIG_LOGIN_ACTION'
const SIG_SIGNOUT = 'SIG_SIGNOUT'

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    state: {
		count: 0,
		overCount: 5,
		ggg : '333',
		twoSideCount: 99,
		user:{
			id:0,
			name:'guest',
		},
		audio:{
			isPlaying:false,
			musicSrc:'http://fs.open.kugou.com/379bfd21b76c4fe2a4d83229f29894e9/5856a182/G018/M00/0A/04/Ug0DAFVw-LCAYoUkAD_FoLiLEPc990.mp3',
			totalLen:100,
			playedLen:20,
			name:'薛之谦',
			author:'演员',
			currentTime:0,//当前播放时间
			currentLength:0,
			totalTime:261,
			currentSetFlag:false  //是否在调整时间
		},
		songIsLogin:false
	},
	getters: {
	    audio: state => state.audio,
	    songIsLogin: state => state.songIsLogin
  	},
	mutations: {
		setCurrentTime: (state, time) => {
			state.audio.currentTime = time
		},
		setCurrentFlag(state, flag){
	      state.audio.currentSetFlag = flag;
	    },
		togglePlayStatus: (state ,val)=>{
			state.audio.isPlaying = val
		}
	},
	actions: {
		playNextSong(context, val){
			alert("将要播放下一首了！");
		},
		actIncrement(context, val){
			context.commit('increment')
		},
		[SIG_LOGIN_ACTION](context, val){
			Indicator.open({
			  text: '登陆中...',
			  spinnerType: 'fading-circle'
			});
			return new Promise((resolve, reject) => {
				axios.get('http://localhost:8081/')
				  .then(function (response) {
				  	Indicator.close();
				    context.commit('SIG_LOGIN', val)
				    // Toast('登陆成功');
				    resolve('登陆成功');
				  })
				  .catch(function (error) {
				  	Indicator.close();
				    // Toast(" 登陆失败: " + error)
				    reject(" 登陆失败: " + error);
				  });
		    })


		}
	}
})