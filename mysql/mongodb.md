# 文档说明

## 启动报错
```shell script
mongod --dbpath /usr/local/mongodb/data
```


```js

var list=[];
for(var i=0;i<len;i++){
  //每个sql需要匹配的字段是len数组中的一个元素
  var sql='select '+len[i]+' from user';
  (function(sql,i,len){
  dbc.query(sql,function(err,data){
     //data是一个sql查询得到的结果
    list.push(data);
    if(i==len-1){
      callback(list);
    }
  });
  }(sql,i,len);
}



 
var obj = {
        host: '127.0.0.1', //IP
        port: 3306, //端口
        database: 'page_incubator', //库名
        user: 'root', //用户名
        password: '123456', //密码
        multipleStatements: true // 支持执行多条 sql 语句
    },
    connPool = mysql.createPool(obj);
 
        connPool.getConnection(function (err, connection) {
            //获取数据库的所有表名
            var SQL = "select table_name from information_schema.tables where table_schema = '" +  obj.database + "'";
 
            connection.query(SQL, function (err, result) {
                if (err) throw err;
 
                var tableSQL = '',
                    str = 'show create table ';
 
                result.forEach( (item,index) => {
                    var tableName = item.TABLE_NAME || item.table_name;
 
                    tableSQL += str + "`" + tableName + "`" + '; '
                })
 
                if (tableSQL != '') {
                    //执行多条sql语句，获取数据库里的所有表的建表语句
                    connection.query(tableSQL, function (err, result) {
                        if (err) throw err;
                        event.returnValue = result;
                        connection.release();//释放链接
                    });
 
                } else {
                    event.returnValue = result;
                    connection.release();//释放链接
                }
            });
```
