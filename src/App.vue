<template>
  <div id="app">
    <div class="main">
      <app-header></app-header>
      <div class="app-container">
        <router-view></router-view>
      </div>
    </div>
    <app-player></app-player>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from "./components/header.vue"
import Player from "./components/player.vue"
export default {
  name: 'app',
  data () {
    return {
      selected: 1,
      swipeAuto: 4000,
      headTitle: '流光音乐盒'
      
    }
  },
  components:{
    'app-header': Header,
    'app-player': Player
  },
  // computed: mapState([
  // // 映射 this.count 为 store.state.count
  // 'count', 'overCount'
  // ]),
  computed: {
    a(){
      return 111 + Date()
    },
    b:{ 
        get(){
          return this.$store.state.twoSideCount
        },
        set(value){
         this.$store.commit('addTwoSideCount', value)
        }

    },
    ...mapState({
      overCount: state => state.overCount,
      count: state => state.count
    })
  },
  methods: {
    addIt: function(){
      this.$store.commit('increment')
      console.log(this.$store.state.count) // -> 1
    },
    subIt: function(){
      this.$store.commit('decrement')
    },
    actAdd: function(){
      this.$store.dispatch('actIncrement', {amount: 1})
    }
  }
}
</script>

<style>
html, body{
  height: 100%;
  margin:0;
  padding: 0
}
body{
    font-size: 1rem;
    line-height: 1.2rem;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: "Microsoft YaHei","微软雅黑",'\65B0\5B8B\4F53','\5B8B\4F53',Verdana;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
      width: 100%;
    height: 100%;
}
.main{
    margin: 0;
    padding:0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}
.app-header{
  flex:0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.app-container{
  width:100%;
  margin-top:0px;
  min-height: 400px;
  flex:1 1 1px;
  /*flex-grow: 1*/
  overflow: hidden;
  display: flex;
}
</style>
