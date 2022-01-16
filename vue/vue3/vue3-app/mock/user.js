export default [{
    url: '/api/get/users',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'succes',
        data: ['tom', 'jerry']
      }
    },
  },
  {
    url: '/api/set/user',
    method: 'post',
    response: (body) => {
      console.log('log:', body);
      return {
        code: 0,
        message: '添加成功',
        data: {}
      }
    },
  }
]
