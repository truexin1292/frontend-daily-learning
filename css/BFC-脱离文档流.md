# 脱离文档流的css属性：触发BFC机制
https://blog.csdn.net/ivana_zyf/article/details/78940251

difficult: https://www.jianshu.com/p/5583ee91217e

### 1.浮动：float不为none；
* 注意：使用float脱离文档流时，其他盒子会无视这个元素，
但其他盒子内的文本依然会为这个元素让出位置，环绕在该元素的周围。

### 2.定位：position不为static；

### 3.display不为block
 (table-cell，table-caption，inline-block, flex, inline-flex,flow-root)

### 4.overflow不为visible
（hidden，auto，scroll）

### 5.fieldset元素

![](.BFC-脱离文档流_images/2948482c.png)

```md
渲染流程基本上四个步骤： 
1.计算CSS样式 
2.构建Render Tree 
3.Layout – 定位、大小，换行，（position, overflow等属性） 
4.正式开始
```
