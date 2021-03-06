import Vue from 'vue'
import Vuex from 'vuex'
import {Toast, Indicator } from 'mint-ui'
import axios from 'axios'
import VueResource from 'vue-resource'

import _ from 'lodash'


Vue.use(Vuex)
Vue.use(VueResource)

const SIG_LOGIN_ACTION = 'SIG_LOGIN_ACTION'
const SIG_SIGNOUT = 'SIG_SIGNOUT'

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    state: {
    	bShowNav: true,
    	headNav:1,	//当前naviBar对应的id
		user:{
			id:0,
			name:'guest',
		},
		playMode:2, //1单曲循环，2列表循环, 3列表随机
		songListIndex:0,  //当前歌曲在songList中的位置
		audio:{
			isPlaying:false,
			imgUrl:'http://singerimg.kugou.com/uploadpic/softhead/80/20161121/20161121115938576.jpg',
			// musicSrc:'http://fs.open.kugou.com/801798db46d88e7fc3f7c97c63783427/58580356/G018/M00/0A/04/Ug0DAFVw-LCAYoUkAD_FoLiLEPc990.mp3',
			musicSrc:'ku.mp3',
			totalLen:100,
			playedLen:20,
			name:'薛之谦',
			author:'演员',
			currentTime:0,//当前播放时间
			totalTime:261,
			currentSetFlag:false,  //是否在调整时间,
			hash:'57b83eaf673d77ee21009cbd8fd05bd6',
			lyric:{
				times:[],
				txts:[]
			}
		},
		songList:[
			{
				name:'慢慢',
				hash:'870341734B5907D83344A6C5352F2B67'
			},
			{
				name:'海角七号',
				hash:'9E8EA295D5622BBF5023E3228AD40523'
			},
			{
				name:'爱情转移',
				hash:'688EF55D43867D0065492B58EE17CA69'
			}
		],   //歌单
		willPlay:{},
		searchList:[],  //搜索列表: {name: hash}
		songIsLogin:false
	},
	getters: {
		playMode: state =>state.playMode,
	    audio: state => state.audio,
	    songIsLogin: state => state.songIsLogin,
	    searchList: state => state.searchList,
	    playMode : state => state.playMode
  	},
	mutations: {
		setHeadNav: (state , id) => state.headNav = id,
		setbShowNav: (state, val) => state.bShowNav = val,
		setPlayMode : state => state.playMode = (state.playMode + 1)%3 + 1,
		setCurrentTime: (state, time) => {
			state.audio.currentTime = time
		},
		setCurrentFlag(state, flag){
	      state.audio.currentSetFlag = flag;
	    },
		togglePlayStatus: (state ,val)=>{
			state.audio.isPlaying = val
		},
		setAudio(state, newAudio){
			state.audio = newAudio
		},
		addToSearchList(state, newSearch){
			state.searchList = newSearch
		},
		addToSongList(state, song){
			console.log('添加歌曲至列表成功'+ song.hash);
			state.songList.push(song)
			state.songList = _.uniq(state.songList, 'hash');
		},

		setLyric(state, val){
			state.audio.lyric = val
		},
		setWillPlay(state){
			let music = {}
			if(state.playMode == 2){
				music = state.songList.pop();
			}else if (state.playMode == 3) {
				music = state.songList[_.random(state.songList.length-1)];
			}
			console.log(music);
			state.willPlay = music;
		},
	},
	actions: {
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


		},

		getSearchList(context, obj){
			console.log('开始搜索歌词:'+obj);
			// let listUrl = 'https://bird.ioliu.cn/v1?url='+'http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=%E4%BB%99%E5%89%91&page=1&pagesize=10&showtype=1&callback=kgJSONP238513750'
			let listUrl = 'https://bird.ioliu.cn/v1?url='+'http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword='+obj
			let searchAudios = []
			axios.get(listUrl,{
				callback: 'kgJSONP238513750',
				format:'jsonp',
				page:1,
				pagesize:10,
				showtype:1,
			}).then(function(res){
				window.l = JSON.parse(res.data.slice(1,-1));
				let result = l.data.info;
				result.forEach( function(element, index) {
					let searchAudio = {
						fileName:   element.filename,
						hash:       element.hash,
						duration:   element.duration,
						album_id:   element.album_id,
						album_name: element.album_name
					}
					searchAudios.push(searchAudio)

				});
				context.commit('addToSearchList', searchAudios)
			},function(err){
				console.log("error get music list!");
			})
		},
		getSongDetail(context, hash){
			console.log('开始获取歌曲细节：'+ hash);
			//let durl = "http://trackercdn.kugou.com/i/v2/?cdnBackup=1&behavior=play&key=e1408b261057bd0238bd7a9ca1d33a1e&pid=6&module=&appid=2739&cmd=23&hash=88C7AE08A4A0B38552D9C33992EF1872"
			const apiurl = "https://bird.ioliu.cn/v1?url="
			const durl = apiurl+'http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash='+hash
			axios.get(durl).then(function(res){
				// console.log(res.data)
				window.p = res.data
				let dsong = {
					isPlaying: false,
					musicSrc: res.data.url,
					imgUrl:res.data.imgUrl.replace("{size}", 80),
					totalLen:res.data.timeLength,
					playedLen:0,
					name:res.data.fileName,
					author:res.data.singerName,
					currentTime:0,//当前播放时间
					currentLength:0,
					totalTime:res.data.timeLength,
					currentSetFlag:false,  //是否在调整时间
					lyric:{
						times:[],
						txts:[]
					}
				}
				context.commit('setAudio', dsong);
			},function(err){
				alert('网络错误')
			})
		},
		playAnSong(context, searchAudio){
			context.dispatch("getSongDetail", searchAudio.hash)
			context.dispatch("getLyric", searchAudio.hash)
		},
		playAnSongWithHash(context, hashVal){
			context.dispatch("getSongDetail", hashVal)
			context.dispatch("getLyric", hashVal)
		},
		getLyric(context, hashval){
			console.log('开始获取歌词了'+ hashval)
			// hashval = '53df727308694879cfb2bf2c65fdb578'
			let lurl = "http://lavyun.applinzi.com/apis/getLrc.php?hash=" + hashval
			// let lurl = "getLrc.txt?hash=" + this.audio.hash
			axios.get(lurl).then(function(res){
				let lyrics = {
					times:[],
					txts:[]
				}
				let lycOrigin = res.data
			    let arr=lycOrigin.match(/(\[\d{2}:\d{2}\.\d{2}\])(.[^\[\]]*)?/g);
			    let times=[],txts=[];

				for(var i=0;i<arr.length;i++){
					/^(\[\d{2}:\d{2}\.\d{2}\])(.[^\[\]]*)?$/.exec(arr[i]);
					let mtime = RegExp.$1.slice(1,-1).split(":")
					let stime = parseInt(mtime[0])*60 + parseInt(mtime[1])
					// console.log(stime);
					times.push(stime);
					txts.push(RegExp.$2);
				}
				lyrics.times = times;
				lyrics.txts = txts;
				context.commit("setLyric", lyrics)
			})
		},
		playNextSong(context){
			if(context.state.songList.length > 0){
				context.commit('setWillPlay')
				context.dispatch("playAnSongWithHash", context.state.willPlay.hash);
			}else{
				console.log('播放列表已经是空的了');
			}

		},


	}
})