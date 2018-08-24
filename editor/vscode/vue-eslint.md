# vscode 使用iView时标签报错 Parsing error: x-invalid-end-tag

> 解决方案：

修改配置文件，忽略该项检查：

1.根目录下找到或 .eslintrc.js
添加一行：

```json
"vue/no-parsing-error": [2, { “x-invalid-end-tag”: false }]
```

2.这是vetur中eslint的问题，在vscode菜单中，文件->首选项->设置

```json
"vetur.validation.template": true 将其改为false，就可关闭eslint的检查，错误消失
```

[查看链接](https://blog.csdn.net/jiaqingge/article/details/80498536)
