const {
    GraphQLString
} = require('graphql')

module.exports = {
    type: GraphQLString,
    description: '修改名字',
    args: {
        name: {
            type: GraphQLString,
            description: '名字'
        }
    },
    resolve: (root, params) => {
        let { name } = params
        return name
    }
}


// 调用例子
// mutation updateNameData {
//   updateData(
//     name: 'alex'
//   )
// }
