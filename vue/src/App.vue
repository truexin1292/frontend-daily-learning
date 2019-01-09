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
		<drawing-board v-if='this.player == 1'/>
		<showing-board v-if='this.player == 2'/>
		<div class="flex-around">
			<span class="button" v-if='this.player == 0' @click='draw'>我来画</span>
			<span class="button" v-if='this.player == 0' @click='guess'>我来猜</span>
		</div>
		<div class="flex-center">
			<span class="button" v-if='this.player !== 0' @click='replay'>重新开始</span>
		</div>
	</div>
</template>

<script>
	import DrawingBoard from './components/drawing-board.vue';
	import ShowingBoard from './components/showing-board.vue';

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
				this.player = 1;
			},
			guess() {
				this.player = 2;
			},
			replay() {
				this.player = 0;
			}
		}
	}
</script>

<style lang="less">
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	body {
		background: #fff;
	}

	.button {
		background: #00bcd4;
		display: inline-block;
		padding: 5px 20px;
		border-radius: 5px;
		color: #fff;
		cursor: pointer;
	}

	.flex-around {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 30px 0;
	}

	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30px 0;
	}
</style>

