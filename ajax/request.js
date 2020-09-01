var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://db.leyaoyao.com/lyy/rest/group/distributor/login',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'SESSION=d3899bbe-8cc5-404f-837a-96a796b76ad7'
  },
  form: {
    'userName': '13168341703',
    'password': 'e10adc3949ba59abbe56e057f20f883e'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
