# 面试题：
## 1.form提交和ajax提交区别？
-

```text
在使用form表单的时候，一旦点击提交触发submit事件，
一般会使得页面跳转，页面间的跳转等行为的控制权往往在后端，
后端会控制页面的跳转及数据传递，
但是在某些时候不希望页面跳转，或者说想要将控制权放在前端，
通过js来操作页面的跳转或数据变化。
```
- 1.页面是否跳转；
- 2.form提交只需要在form上面设置action=【url】，
method=【get/post】
按钮[input/button]里面type=submit;提交后，
请求会自动获取表单input的值；
而ajax提交的url，method，data需要在ajax的请求中手动设置，并且需要一个点击方法onclick=submit()进行触发提交数据；
- 3.默认提交请求的contentType不一样：
form【application/x-www-form-urlencoded】
而ajax的是application/json;


https://blog.csdn.net/zoulonglong/article/details/80501029

## 2.
