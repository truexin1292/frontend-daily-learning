# 批量更新数据

replace into 跟 insert 功能类似，不同点在于：replace into首先尝试插入数据到表中。
 1、如果发现表中已经有此行数据（根据主键或者唯一索引判断）则先删除此行数据，然后插入新的数据。
 2、 否则，直接插入新数据。
要注意的是：插入数据的表必须有主键或者是唯一索引！否则的话，replace into会直接插入数据，这将导致表中出现重复的数据。

```mysql
create table categories(id int,display_order varchar(200),title varchar(255)) engine=innodb default charset=utf-8;
update categories set display_order = case id
  when 1 then 3
  when 2 then 4
  when 3 then 5
  end
  where id in (1,2,3);
#这里使用了case when 这个小技巧来实现批量更新。
# 这句sql的意思是，更新display_order 字段，如果id=1 则display_order 的值为3，
# 如果id=2 则 display_order 的值为4，如果id=3 则 display_order 的值为5。
#这里的where部分不影响代码的执行，但是会提高sql执行的效率。确保sql语句仅执行需要修改的行数，
# 这里只有3条数据进行更新，而where子句确保只有3行数据执行。
update categories set display_order = case id
 when 1 then 3 
 when 2 then 4
 when 3 then 5
 end,
 title = case id
 when 1 then 'new title 1'
 when 2 then 'new title 2'
 when 3 then 'new title 3'
 end
 where id in (1,2,3);
# 到这里，已经完成一条mysql语句更新多条记录了。
```


```mysql
# 性能分析
create table test_tbl(id int,dr varchar(200),title varchar(255)) engine=innodb default charset=utf-8;
# 当我使用上万条记录利用mysql批量更新，发现使用最原始的批量update发现性能很差，将网上看到的总结一下一共有以下三种办法：
# 1.批量update，一条记录update一次，性能很差
update test_tbl set dr='2' where id=1;
# 2.replace into 或者insert into …on duplicate key update
replace into test_tbl (id,dr) values (1,'2'),(2,'3'),…(x,'y');
insert into test_tbl (id,dr) values (1,'2'),(2,'3),…(x,'y') on duplicate key update dr=values(dr);
# 3.创建临时表，先更新临时表，然后从临时表中update
25 create temporary table tmp(id int(4) primary key,dr varchar(50));
26 
27 insert into tmp values (0,’gone’), (1,’xx’),…(m,’yy’);
28 
29 update test_tbl, tmp set test_tbl.dr=tmp.dr where test_tbl.id=tmp.id;
30 
31 注意：这种方法需要用户有temporary 表的create 权限。
32 就测试结果来看，测试当时使用replace into性能较好。
33 
34 replace into 和insert into on duplicate key update的不同在于：
35 
36 replace into　操作本质是对重复的记录先delete 后insert，如果更新的字段不全会将缺失的字段置为缺省值
37 
38 insert into 则是只update重复记录，不会改变其它字段。

2.批量更新性能分析
```
