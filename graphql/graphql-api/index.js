const express = require('express')
const expressGraphql = require('express-graphql')

const app = express()

app.use('/graphql', expressGraphql(req => {
    return {
        schema: require('./graphql/schema'),  // graphql 实例
        graphiql: true,  // 是否开启可视化工具
        pretty: true,  // 任何JSON响应将被打印出来(为了好看, 方便调试)
        rootValue: 'test',  // 传递一个值(对应响应中的root参数, 一般可以用来做一些用户认证之类的操作)
        context: { startTime: Date.now() }, // 传递一个值, 对应响应中的context, 此处若不填，会自动使用req代替该参数
        extensions: ({ context }) => {// 可以用来查询的运行时或消耗​​的资源量(目前改代码中只查询api响应时间)
            const differ = ((Date.now() - context.startTime) / 1000).toFixed(3)
            return {
                runTime: `${ differ } seconds`
            }
        },
        formatError: error => ({ // 捕获所有graphql中的异常错误并加以处理
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path
        })
    }
}))

app.listen(3000, () => {
    console.log("graphql server is ok");
});
