window.onload = function () {
  let X1 = 165, Y1 = 172;//眼睛定位
  let X2 = 250, Y2 = 172;

  let eyeCircle = 30;//眼圈半径
  let ball_route = 10;//眼球转动的圆半径
  let r_b = 20;
  let r_a = 20;//小圆半径
  let TIMEOUT_OF_STOP_MOVE = 3000;
  let cxt = document.getElementById('canvas').getContext('2d');//访问绘画上下文。
  let offsetLeft = canvas.offsetLeft;
  let offsetTop = canvas.offsetTop;
  //声明左眼夹角a1、右眼夹角a2
  let angle, angle1;//夹角
  let flag = true;//眨眼判断
  staticParts(cxt);
  cxt.fillStyle = '#fff';
  route(cxt, X1, Y1, eyeCircle, eyeCircle);//眼圈
  cxt.fill();
  route(cxt, X2, Y2, eyeCircle, eyeCircle);
  cxt.fill();
  cxt.fillStyle = '#000';
  route(cxt, X1, Y1, r_a, r_b);//眼球
  cxt.fill();
  route(cxt, X2, Y2, r_a, r_b);
  cxt.fill();
  cxt.fillStyle = "white";
  route(cxt, X1 + 10, Y1 - 10, 4, 4);//眼光
  cxt.fill();
  route(cxt, X2 + 10, Y2 - 10, 4, 4);
  cxt.fill();
  //     centercircle(cxt);//
  useEyeblink(cxt, eyeCircle, r_a, r_b, flag, X1, Y1, X2, Y2);
  document.onmousemove = function (e) {
    e = e || event;
    //获取鼠标坐标
    let x = e.clientX;
    let y = e.clientY;
    let x1j = x - X1 - offsetLeft;
    let y1j = y - Y1 - offsetTop;
    let x2j = x - X2 - offsetLeft;
    let y2j = y - Y2 - offsetTop;
    //更新夹角a1、a2
    /* atan2 方法返回一个 -pi 到 pi 之间的数值，表示点 (x, y) 对应的偏移角度。
    这是一个逆时针角度，以弧度为单位，正X轴和点 (x, y) 与原点连线 之间。
    注意此函数接受的参数：先传递 y 坐标，然后是 x 坐标。 */
    angle = Math.atan2(x1j, y1j);
    angle1 = Math.atan2(x2j, y2j);

    //更新夹角a1、a2

    //更新左眼、右眼的left、
    //更新左眼、右眼的left、
    cxt.clearRect(0, 0, 1024, 768);
    staticParts(cxt);
    cxt.fillStyle = '#fff';
    route(cxt, X1, Y1, eyeCircle, eyeCircle);
    cxt.fill();
    route(cxt, X2, Y2, eyeCircle, eyeCircle);
    cxt.fill();
    arcRoute(cxt, X1, Y1, ball_route, angle, r_a, true);
    arcRoute(cxt, X2, Y2, ball_route, angle1, r_a, true);

    // 终止鼠标停止事件处理,debounce()防抖，只在最后一次触发函数
    clearTimeout(this.timer);
    // 重新绑定鼠标停止事件处理
    this.timer = setTimeout(function () {
      cxt.clearRect(0, 0, 1024, 768);
      staticParts(cxt);
      cxt.fillStyle = '#fff';
      route(cxt, X1, Y1, eyeCircle, eyeCircle);
      cxt.fill();
      route(cxt, X2, Y2, eyeCircle, eyeCircle);
      cxt.fill();
      cxt.fillStyle = '#000';
      route(cxt, X1, Y1, r_a, r_b);
      cxt.fill();
      route(cxt, X2, Y2, r_a, r_b);
      cxt.fill();
      cxt.fillStyle = "white";
      route(cxt, X1 + 10, Y1 - 10, 4, 4);//眼圈
      cxt.fill();
      route(cxt, X2 + 10, Y2 - 10, 4, 4);
      cxt.fill();
      //centercircle(cxt);
      useEyeblink(cxt, eyeCircle, r_a, r_b, flag, X1, Y1, X2, Y2);
    }, TIMEOUT_OF_STOP_MOVE);
  }
};

function staticParts(cxt) {
  /* 发型 */
  cxt.fillStyle = '#000000';
  cxt.beginPath();//准备绘制一个新的形状路径开始
  cxt.moveTo(51, 196);//将笔触移动到指定的坐标x以及y上。
  cxt.lineTo(5, 196);//绘制一条从当前位置到指定x以及y位置的直线。
  cxt.stroke();//通过线条来绘制图形轮廓
  cxt.beginPath();
  cxt.moveTo(389, 196);
  cxt.lineTo(435, 196);
  cxt.moveTo(5, 196);
  cxt.bezierCurveTo(55, -55, 385, -55, 435, 196);//绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
  cxt.stroke();
  cxt.fill();//通过填充路径的内容区域生成实心的图形。
  /* 头部*/
  cxt.fillStyle = '#fffed7';
  //let step = 1 / 200 ;
  cxt.beginPath();
  cxt.lineWidth = 2;//线宽度为1
  cxt.strokeStyle = '#000';//笔触的颜色
  cxt.moveTo(45, 150);
  cxt.bezierCurveTo(45, 350, 395, 350, 395, 150);
  cxt.stroke();
  cxt.fill();
  /*刘海*/
  cxt.fillStyle = '#fffed7';
  cxt.beginPath();
  // cxt.fillStyle = '#fff';
  cxt.moveTo(45, 151);//将路径移到点（110，110），不创建线条
  //cxt.quadraticCurveTo(-10, 200, 120, 315);//创建二次贝塞尔曲线,控制点(-10,200),结束点(120,315)
  cxt.lineTo(70, 151);//添加一个新点，然后在画布中创建从（110，110）到（280，315）的线条
  // cxt.quadraticCurveTo(410, 210, 290, 110);
  cxt.lineTo(82, 120);
  cxt.lineTo(110, 138);
  cxt.lineTo(120, 100);
  cxt.lineTo(161, 120);
  cxt.lineTo(188, 88);
  cxt.lineTo(215, 125);
  cxt.lineTo(262, 99);
  cxt.lineTo(272, 124);
  cxt.lineTo(306, 109);
  cxt.lineTo(319, 137);
  cxt.lineTo(353, 124);
  cxt.lineTo(363, 151);
  cxt.lineTo(395, 151);
  cxt.stroke();
  cxt.fill();
  /*耳朵*/
  cxt.fillStyle = '#fffed7';
  cxt.beginPath();
  cxt.moveTo(45, 173);
  cxt.bezierCurveTo(30, 173, 43, 196, 50, 196);
  cxt.stroke();
  //cxt.beginPath();
  cxt.moveTo(395, 173);
  cxt.bezierCurveTo(412, 173, 399, 196, 390, 196);
  cxt.stroke();
  cxt.fill();
  /*嘴*/
  cxt.fillStyle = '#ff0021';
  cxt.beginPath();
  cxt.moveTo(170, 234);
  //cxt.quadraticCurveTo(207.5, 290, 245, 234);
  cxt.bezierCurveTo(170, 270, 245, 270, 245, 234);
  cxt.moveTo(170, 234);
  cxt.lineTo(245, 234);
  cxt.stroke();
  cxt.fill();
  /*上衣*/
  cxt.beginPath();
  cxt.lineWidth = 3;//线宽度为1
  cxt.strokeStyle = '#000';
  cxt.fillStyle = '#ff98d8';
  // cxt.fillStyle = '#fff';
  cxt.moveTo(207, 301);//将路径移到点（110，110），不创建线条
  //cxt.quadraticCurveTo(-10, 200, 120, 315);//创建二次贝塞尔曲线,控制点(-10,200),结束点(120,315)
  cxt.lineTo(207, 305);//添加一个新点，然后在画布中创建从（110，110）到（280，315）的线条
  cxt.arc(211, 305, 4, 0, 1 * Math.PI);
  cxt.moveTo(215, 305);
  cxt.lineTo(215, 301);
  cxt.moveTo(207, 305);
  cxt.lineTo(54, 292);
  cxt.lineTo(54, 308);
  cxt.lineTo(170, 325);
  cxt.moveTo(170, 325);
  cxt.quadraticCurveTo(165, 358, 173, 394);
  cxt.lineTo(260, 394);
  cxt.moveTo(260, 394);
  cxt.quadraticCurveTo(268, 360, 260, 325);
  cxt.lineTo(387, 308);
  cxt.lineTo(388, 291);
  cxt.lineTo(215, 305);
  cxt.stroke();
  cxt.fill();
  /*手*/
  cxt.beginPath();
  cxt.lineWidth = 3;//线宽度为1
  cxt.strokeStyle = '#000';
  cxt.fillStyle = '#fffed7';
  cxt.arc(43, 298, 10, 0, 2 * Math.PI);
  cxt.arc(400, 298, 10, 0, 2 * Math.PI);
  cxt.stroke();
  cxt.fill();
  /*裙子*/
  cxt.beginPath();
  cxt.lineWidth = 3;//线宽度为1
  cxt.strokeStyle = '#000';
  cxt.fillStyle = '#fffb70';
  cxt.moveTo(173, 396);
  cxt.lineTo(132, 434);
  cxt.lineTo(296, 434);
  cxt.lineTo(260, 396);
  cxt.stroke();
  cxt.fill();
  /*腿*/
  cxt.beginPath();
  cxt.lineWidth = 2;//线宽度为1
  cxt.strokeStyle = '#000';
  cxt.fillStyle = '#fffed7';
  cxt.moveTo(202, 436);
  cxt.lineTo(202, 486);
  cxt.lineTo(180, 494);
  cxt.lineTo(212, 489);
  cxt.lineTo(212, 436);
  cxt.moveTo(235, 436);
  cxt.lineTo(235, 486);
  cxt.lineTo(254, 494);
  cxt.lineTo(225, 489);
  cxt.lineTo(225, 436);
  cxt.stroke();
  cxt.fill();

}

//每3秒眨一次眼睛
function useEyeblink(cxt, eyeCircle, ball_route, r_b, flag, X1, Y1, X2, Y2) {
  //let h=false;
  let h = setInterval(function () {
    eyeblink(cxt, eyeCircle, ball_route, r_b, flag, X1, Y1, X2, Y2);
  }, 3000);
}

function eyeblink(cxt, eyeCircle, ball_route, r_b, flag, X1, Y1, X2, Y2) {
  //let a=false;
  let i = 0;
  let a = setInterval(function () {
    cxt.clearRect(0, 0, 1024, 768);
    if (flag) {
      r_b -= 1;//椭圆短轴自减
      if (r_b <= 0) {
        flag = false;
      }
    } else {
      r_b += 1;//椭圆短轴自减
      if (r_b >= 20) {
        flag = true;
      }
    }
    staticParts(cxt);
    cxt.fillStyle = '#fff';
    route(cxt, X1, Y1, eyeCircle, eyeCircle);
    cxt.fill();
    route(cxt, X2, Y2, eyeCircle, eyeCircle);
    cxt.fill();
    cxt.fillStyle = '#000';
    route(cxt, X1, Y1, ball_route, r_b);
    cxt.fill();
    route(cxt, X2, Y2, ball_route, r_b);
    cxt.fill();
    cxt.beginPath();
    cxt.strokeStyle = '#ffffff';
    cxt.fillStyle = "white";
    route(cxt, X1 + 10, Y1 - 10, 4, 4);//眼光
    cxt.fill();
    route(cxt, X2 + 10, Y2 - 10, 4, 4);
    cxt.fill();
    i++;
    if (i === 40) {//眼球闭睁为一次眨眼，之后清理掉定时器
      clearInterval(a);
    }
  }, 0);
}

//绘制椭圆，a为长轴半径，b为短轴半径
function route(context, x, y, a, b) {
  let step = 1 / 20;
  context.beginPath();
  context.moveTo(x + a, y); //从椭圆的右端点开始绘制
  for (let i = 0; i < 2 * Math.PI; i += step) {
    context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
  }
  context.closePath();
  context.stroke();
}

//椭圆上小球运动的实现
function arcRoute(context, x, y, a, angle, b) {//a为运动圈半径，b为眼球半径
  context.fillStyle = '#000';
  context.beginPath();
  context.arc(x + a * Math.sin(angle), y + a * Math.cos(angle), b, 0, 2 * Math.PI, true);
  /* arc(x, y, radius, startAngle, endAngle, anticlockwise)
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，
按照anticlockwise给定的方向（默认为顺时针）来生成。 */
  context.closePath();
  context.fill();
  context.fillStyle = "white";
  route(context, x + a * Math.sin(angle) + 5, y + a * Math.cos(angle) - 10, 4, 4);//眼圈
  context.fill();
  route(context, x + a * Math.sin(angle) + 5, y + a * Math.cos(angle) - 10, 4, 4);
  context.fill();
}
