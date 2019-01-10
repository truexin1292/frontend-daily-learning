<template>
	<div id="draw">
		<canvas id="canvas" width="520" height="350" style="border: 1px solid #999;"/>
		<div id="keyword-box">
			<span id="btn">清空画布</span>
			<span>Answer: </span>
			<span id="keyword"></span>
		</div>
	</div>
</template>

<script>
	'use strict'

	class Draw {
		constructor(el) {
			this.el = el
			this.canvas = document.getElementById('canvas');
			this.cxt = this.canvas.getContext('2d')
			this.stage_info = canvas.getBoundingClientRect()
			this.path = {
				beginX: 0,
				beginY: 0,
				endX: 0,
				endY: 0
			}
		}

		init(ws, btn) {
			if (this.isMobile()) {
				this.canvas.addEventListener("touchstart", () => {
					this.drawBegin(event, ws);
				}, false);
				this.canvas.addEventListener("touchend", () => {
					this.drawEnd(event, ws);
					ws.send('stop');
				}, false);
			} else {
				this.canvas.onmousedown = () => {
					this.drawBegin(event, ws);
				}

				this.canvas.onmouseup = () => {
					this.drawEnd(event, ws);
					ws.send('stop');
				}
			}
			this.clearCanvas(ws, btn);
		}

		drawBegin(e, ws) {
			if (this.isMobile()) {
				e = e.touches[0];
				e = {
					...e,
					clientX: Math.ceil(e.clientX),
					clientY: Math.ceil(e.clientY)
				}
			}
			window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
			this.cxt.strokeStyle = "#000";

			this.cxt.beginPath();
			this.cxt.moveTo(
				e.clientX - this.stage_info.left,
				e.clientY - this.stage_info.top
			)

			this.path.beginX = e.clientX - this.stage_info.left;
			this.path.beginY = e.clientY - this.stage_info.top;

			if (this.isMobile()) {
				document.addEventListener("touchmove", () => {
					this.drawing(event, ws);
				}, false);
				// document.addEventListener("touchend", () => {
				// 	this.drawEnd(event, ws)
				// }, false);
			} else {
				document.onmousemove = () => {
					this.drawing(event, ws);
				}
				// document.onmouseup = this.drawEnd;
			}
		}

		drawing(e, ws) {
			if (this.isMobile()) {
				e = e.touches[0];
				e = {
					...e,
					clientX: Math.ceil(e.clientX),
					clientY: Math.ceil(e.clientY)
				}
			}
			this.cxt.lineTo(
				e.clientX - this.stage_info.left,
				e.clientY - this.stage_info.top
			)

			this.path.endX = e.clientX - this.stage_info.left;
			this.path.endY = e.clientY - this.stage_info.top;

			ws.send(this.path.beginX + '.' + this.path.beginY + '.' + this.path.endX + '.' + this.path.endY);

			this.cxt.stroke();
		}

		isMobile() {
			let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
			return flag;
		}

		drawEnd(event, ws) {
			if (this.isMobile()) {
				document.removeEventListener("touchmove", () => {
					this.drawing(event, ws)
				});
				document.removeEventListener("touchend", () => {
					this.drawEnd(event, ws)
				});
			} else {
				document.onmousemove = document.onmouseup = null;
			}
		}

		clearCanvas(ws, btn) {
			btn.onclick = () => {
				this.cxt.clearRect(0, 0, 500, 500);
				ws.send('clear');
			}
		}
	}

	export default {
		name: 'draw',
		mounted() {
			// const ws = new WebSocket('ws://localhost:8090'); // todo 需要替换ip才能在手机访问哇，O(∩_∩)O哈哈~
			const ws = new WebSocket('ws://192.168.9.238:8090');
			let draw = new Draw('canvas');
			let btn = document.getElementById('btn');
			ws.onopen = () => {
				draw.init(ws, btn);
			}
			ws.onmessage = (msg) => {
				msg.data.split(':')[0] == 'keyword' ?
					document.getElementById('keyword').innerHTML = msg.data.split(':')[1] :
					false;
			}
		}
	}
</script>

<style lang="less">
	#canvas {
		background: pink;
		cursor: default;
		width: 100vw;
		height: 50vh;
	}

	#keyword-box {
		color: #999;
		font-size: 20px;
	}

	#btn {
		background: #00bcd4;
		display: inline-block;
		padding: 5px 20px;
		border-radius: 5px;
		color: #fff;
		cursor: pointer;
	}
</style>
