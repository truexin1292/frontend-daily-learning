var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  'userName': '13168341703',
  'password': 'e10adc3949ba59abbe56e057f20f883e'
});
var config = {
  method: 'post',
  url: 'https://db.leyaoyao.com/lyy/rest/group/distributor/login',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'SESSION=d3899bbe-8cc5-404f-837a-96a796b76ad7'
  },
  data: data
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
