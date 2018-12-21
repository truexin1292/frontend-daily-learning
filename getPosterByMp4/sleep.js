var sleep1 = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(time);
            //R;//模拟报错

            //成功返回
            resolve({
                code: 200,
                data: { name: 'true', id: 2 }
            });

            //模拟报错
            reject({ code: 500, data: null })
        }, time);
    })
};

var sleep2 = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(time);
            // R; //模拟报错

            //成功返回
            resolve({
                code: 204,
                data: { name: 'true', id: 2 }
            });

            //模拟报错
            reject({ code: 500, data: null })
        }, time);
    })
};

var start = async() => {
    console.log('start');
    let data1 = await sleep1(1000);
    /*
    1.await必须在async函数里面使用  
    2.await 表示在这里等待promise返回结果了，再继续执行。
    3.await 后面应该是用promise对象，否则与原生无异，没有什么意义了。
    */
    let data2 = await sleep2(2000);
    try {
        // 遇到错误，所以以下代码不会被执行了

        if (data1 && data1.code === 200) {
            console.log('JSON-data1', data1);
            console.log('end1');
        } else {
            console.warn('data1-err', data1);
        }
        if (data2 && data2.code === 200) {
            console.log('JSON-data2', data2);
            console.log('end2');
        } else {
            console.warn('data2-err', data2);
        }
    } catch (err) {
        console.log(err); // 这里捕捉到错误 `error`
    }
};

start();