<!--<template>-->
<!--<div id="app">-->
<!--<h1>{{ msg }}</h1>-->
<!--<img src="./img/logo.png">-->
<!--<input type="text" v-model="msg">-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import getData from './util';-->

<!--export default {-->
<!--name: 'app',-->
<!--data() {-->
<!--return {-->
<!--msg: 'Welcome to Your Vue.js'-->
<!--}-->
<!--},-->
<!--created() {-->
<!--this.fetchData();-->
<!--},-->
<!--methods: {-->
<!--async fetchData() {-->
<!--const data = await getData();-->
<!--this.msg = data;-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style lang="scss">-->
<!--#app {-->
<!--font-family: "Avenir", Helvetica, Arial, sans-serif;-->

<!--h1 {-->
<!--color: green;-->
<!--}-->
<!--}-->
<!--</style>-->

<template>
	<div id="app">
		<drawing-board v-if='this.player == 1'></drawing-board>
		<showing-board v-if='this.player == 2'></showing-board>
		<button v-if='this.player == 0' @click='draw'>我来画</button>
		<button v-if='this.player == 0' @click='guess'>我来猜</button>
		<button v-if='this.player == 2' @click='replay'>重新开始</button>
	</div>
</template>

<script>
	import DrawingBoard from './components/drawing-board.vue'
	import ShowingBoard from './components/showing-board.vue'

	export default {
		name: 'app',
		data() {
			return {
				player: 0
			}
		},
		components: {
			DrawingBoard,
			ShowingBoard
		},
		methods: {
			draw() {
				this.player = 1
			},
			guess() {
				this.player = 2
			},
			replay() {
				this.player = 0
				location.reload()
			}
		}
	}
</script>

<style lang="less">
	body {
		background: #fff;
	}
</style>

