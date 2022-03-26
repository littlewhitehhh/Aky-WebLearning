# JavaScript 查漏补缺

## 自定义事件 -------一头雾水

自定义事件可以传参和不可以传参的定义方式不一样

```js
//注册时间 ，不可传递参数u
const eve1 = new Event("myClick1");
//可以传递参数
const eve2 = new CustomEvent("myClick2", params);

//监听事件
dom.addEventListener("myClick1", function () {
  console.log("myClick1");
});

//触发事件
dom.dispatchEvent(eve1);
```

## var let const

|        区别        | var  | let  | const |
| :----------------: | :--: | :--: | :---: |
|  是否有块级作用域  |  ×   |  √   |   √   |
| 是否初始化变量提升 |  √   |  ×   |   ×   |
|  是否可以重复声明  |  √   |  ×   |   ×   |
|  是否可以重新赋值  |  √   |  ×   |   ×   |
| 是否必须设置初始值 |  ×   |  ×   |   √   |
|  是否添加全局变量  |  √   |  ×   |   ×   |
|   是否暂时性死区   |  ×   |  √   |   √   |

