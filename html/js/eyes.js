window.onload = function () {
  // first Step
  // 动态语言直接 var eyes = document.querySelectorAll(".eye-in");
  var eyes = [];
  eyes = document.querySelectorAll(".eye-in");

  // second Step	为元素添加事件处理
  document.onmousemove = function (event) {
    var mouseLeft = event.clientX,
      mouseTop = event.clientY;
    // console.log(getViewportSize().height);

    throttle(function () {
        $forEach(eyes, function (o, i) {
          var chaX = mouseLeft - getOffset(eyes[i]).left;
          var chaY = mouseTop - getOffset(eyes[i]).top;
          var viewportWidth = getViewportSize().width / 2;
          var viewportHeight = getViewportSize().height / 2;
          //mouseLeft 与 mouseTop的值有时候太小，导致差值太小
          eyes[i].style.left = ((chaX / viewportWidth) * 50) + "%";
          eyes[i].style.top = ((chaY / viewportHeight) * 50) + "%";
        });
      }
    );
    // clearTimeout(tId);

    // var tId = function(){
    // 	setTimeout(function(){
    // 		$forEach(eyes, function(o, i){
    // 			var chaX = mouseLeft - getOffset(eyes[i]).left;
    // 			var chaY = mouseTop  - getOffset(eyes[i]).top;
    // 			var viewportWidth = getViewportSize().width /2;
    // 			var viewportHeight = getViewportSize().height /2;
    // 			//mouseLeft 与 mouseTop的值有时候太小，导致差值太小
    // 			eyes[i].style.left = ((chaX / viewportWidth)*50) + "%";
    // 			eyes[i].style.top  = ((chaY / viewportHeight)*50) + "%";
    // 		});
    // 	},70);
    // }();

  };


  // 要用到的函数
  function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
      method.call(context);
    }, 70);
  }


  function $forEach(arr, callback, thisp) {
    if (arr.forEach) {
      arr.forEach(callback, thisp);
    } else {
      for (var i = 0, len = arr.length; i < len; i++) {
        callback.call(thisp, arr[i], i, arr);
      }
    }
  }


  // 单位？？？？
  function getOffset(element) {
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    // var actualTop = element.offsetWidth / 2;
    // var actualLeft = element.offsetHeight /2;
    var current = element.offsetParent;

    while (current !== null) {
      actualTop += current.offsetTop;
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    return { left: actualLeft, top: actualTop };
  }

  function getViewportSize() {
    var pageWidth = window.innerWidth,
      pageHeight = window.innerHeight;

    if (typeof pageWidth != "number") {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageWidth = document.body.clientWidth;
      pageHeight = document.body.clientHeight;
    }

    // console.log(pageWidth);
    return { width: pageWidth, height: pageHeight }
  }
};
