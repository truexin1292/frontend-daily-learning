var unirest = require('unirest');
var req = unirest('POST', 'https://db.leyaoyao.com/lyy/rest/group/distributor/login')
  .headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'SESSION=d3899bbe-8cc5-404f-837a-96a796b76ad7'
  })
  .send('userName=13168341703')
  .send('password=e10adc3949ba59abbe56e057f20f883e')
  .end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
  });
