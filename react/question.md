# react使用过程问题总结：

### 1.注意，babel在编译时会判断JSX中组件的首字母，
当首字母为小写时，其被认定为原生DOM标签，
createElement的第一个变量被编译为字符串；
当首字母为大写时，其被认定为自定义组件，
createElement的第一个变量被编译为对象；

![](.question_images/37d58457.png)

### 2.
