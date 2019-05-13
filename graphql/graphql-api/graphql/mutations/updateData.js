const {
    GraphQLInt
} = require('graphql')

let count = 0

module.exports = {
    type: GraphQLInt,
    description: '修改数量',
    args: {
        num: {
            type: GraphQLInt,
            description: '数量'
        }
    },
    resolve: (root, params) => {
        let { num } = params
        count += num
        return count
    }
}


// 调用例子
// mutation updateData {
//   updateData(
//     num: 2
//   )
// }
