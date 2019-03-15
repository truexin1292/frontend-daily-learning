# 项目描述：

## Q1: git log 模式如何退出？
![](.index_images/315cc8aa.png)

```
1.英文状态下：按 q 就可以了；

2.同时按 ctrl + z；
```

## Q2: git commit -m ""内容写错，如何重新编辑?
```node
git commit --amend -m 'revise'
```
 
## Q3: git commit了多个文件，如何撤销某个提交的单个文件？
```node
1.git status 查看多个文件的具体名称
1.git log 查看commit的commitId[versionId]
2.复制倒数第二个commitId[versionId] : 如下：655af407806f35bfb8dca56774b831b7f9a9f7a4
3.git checkout <sha1-of-a-commit> </path/to/your/file>
例如：git checkout 655af407806f35bfb8dca56774b831b7f9a9f7a4 ./css/index.html
```
 或者 ![](.index_images/83787258.png)
 
 
 ## Q4:撤销本地所有修改？
 ```node
git checkout . && git clean -xdf
```
