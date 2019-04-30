# 项目描述：


### 1. nginx 缓存设置
```nginx

location ~* \.(png|jpg|jpeg|gif)$ {
    expires 365d;
    add_header Cache-Control "public, no-transform";
}

location ~* \.(js|css|pdf|html|swf)$ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
}


```


### 2.访问不存在

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
