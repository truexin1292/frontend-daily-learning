// 表达式
// var expressionStr = '1 + 2 - 3 + 6 / 2'; // 3
// var expressionStr = '1 + 2 - 3 + 6 * 2'; // 6
// var expressionStr = '1 + 2 - 3 + 6 / 2 * 4'; // 12
// var expressionStr = '1 + 2 - 3 + 6 / 2 * 4 % 5'; // 2
// var expressionStr = '4 / 2 - 3 * 5 / 2 * 4 % 5 - 1'; // 1.5
var expressionStr = '4 % 2 * 3 + 5 / 2 * 4 % 5 - 1'; // -1

// 最快实现结果--也可以检验结果
// eval(expressionStr)

// 计算方法
var calcFunction = (expressionStr, numList, operatorList) => {
  if (!numList && typeof expressionStr !== 'string') {
    console.warn('请传入数学表达式字符串');
    return;
  }

  numList = numList || [];
  operatorList = operatorList || [];

  const expression = expressionStr && expressionStr.replace(/\s+/g, '').split('') || [];
  expression.forEach(v => {
    if (isNaN(+v)) {
      operatorList.push(v);
    } else {
      numList.push(+v);
    }
  });
  if (numList.length === 1) {
    console.log(numList[0], 'done-ok');
    return numList[0];
  }
  if (operatorList[0] === '*') {
    const firstNum = numList[0] * numList[1];
    numList.splice(0, 2);
    operatorList.splice(0, 1);
    numList = [ firstNum, ...numList ];
  } else if (operatorList[0] === '/') {
    const firstNum = numList[0] / numList[1];
    numList.splice(0, 2);
    operatorList.splice(0, 1);
    numList = [ firstNum, ...numList ];
  } else if (operatorList[0] === '%') {
    const firstNum = numList[0] % numList[1];
    numList.splice(0, 2);
    operatorList.splice(0, 1);
    numList = [ firstNum, ...numList ];
  } else if (operatorList[1] === '*') {
    const firstNum = numList[0];
    const secondNum = numList[1] * numList[2];
    numList.splice(0, 3);
    operatorList.splice(1, 1);
    numList = [ firstNum, secondNum, ...numList ];
  } else if (operatorList[1] === '/') {
    const firstNum = numList[0];
    const secondNum = numList[1] / numList[2];
    numList.splice(0, 3);
    operatorList.splice(1, 1);
    numList = [ firstNum, secondNum, ...numList ];
  } else if (operatorList[1] === '%') {
    const firstNum = numList[0];
    const secondNum = numList[1] % numList[2];
    numList.splice(0, 3);
    operatorList.splice(1, 1);
    numList = [ firstNum, secondNum, ...numList ];
  } else if (operatorList[0] === '+') {
    const firstNum = numList[0] + numList[1];
    numList.splice(0, 2);
    operatorList.splice(0, 1);
    numList = [ firstNum, ...numList ];
  } else if (operatorList[0] === '-') {
    const firstNum = numList[0] - numList[1];
    numList.splice(0, 2);
    operatorList.splice(0, 1);
    numList = [ firstNum, ...numList ];
  }
  console.log(numList, operatorList, 'next');
  calcFunction(false, numList, operatorList);
};

calcFunction(expressionStr);
