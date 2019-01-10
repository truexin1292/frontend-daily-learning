<template>
	<div id="show">
		<canvas id="showing" width="520" height="350" style="border: 1px solid #999;"/>
		<div id="answer-box">
			<span>Guess: </span>
			<input id="answer" type="text">
			<span id="submit">提交</span>
		</div>
	</div>
</template>

<script>
	'use strict'
	export default {
		name: 'show',
		mounted() {
			// const ws = new WebSocket('ws://localhost:8090');
			const ws = new WebSocket('ws://192.168.9.238:8090');
			const canvas = document.getElementById('showing');
			const cxt = canvas.getContext('2d');
			let moveToSwitch = 1;
			ws.onmessage = (msg) => {
				let pathObj = msg.data.split('.');
				cxt.strokeStyle = "#000";

				if (moveToSwitch && msg.data != 'stop' && msg.data != 'clear') {
					cxt.beginPath();
					cxt.moveTo(pathObj[0], pathObj[1]);
					moveToSwitch = 0;
				} else if (!moveToSwitch && msg.data == 'stop') {
					cxt.beginPath();
					cxt.moveTo(pathObj[0], pathObj[1]);
					moveToSwitch = 1;
				} else if (moveToSwitch && msg.data == 'clear') {
					cxt.clearRect(0, 0, 500, 500);
				} else if (msg.data == '答对了！！') {
					alert('恭喜你答对了！！');
				}

				cxt.lineTo(pathObj[2], pathObj[3]);
				cxt.stroke();
			}

			ws.onopen = () => {
				let submitBtn = document.getElementById('submit');
				submitBtn.onclick = () => {
					let keyword = document.getElementById('answer').value;
					ws.send(keyword);
				}
			}
		}
	}
</script>

<style lang="less">
	#showing {
		background: lightblue;
		width: 100vw;
		height: 50vh;
	}

	#answer-box {
		margin: 10px 0;
	}

	#answer {
		width: 50vw;
		height: 50px;
		line-height: 50px;
		border-radius: 20px;
		border: none;
		margin: 30px 0;
	}

	#submit {
		background: #00bcd4;
		display: inline-block;
		padding: 5px 20px;
		border-radius: 5px;
		color: #fff;
		cursor: pointer;
	}
</style>
