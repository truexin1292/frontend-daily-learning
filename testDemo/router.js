var express = require('express');
var router = express.Router();

// 此处加载的中间件也可以自动更新
router.use(express.static('public'));

router.get('/', function(req, res){
  res.send('hello world truexinology 3555');
});

module.exports = router;

