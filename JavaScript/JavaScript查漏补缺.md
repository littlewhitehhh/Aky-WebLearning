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

|        区别        | var | let | const |
| :----------------: | :-: | :-: | :---: |
|  是否有块级作用域  |  ×  |  √  |   √   |
| 是否初始化变量提升 |  √  |  ×  |   ×   |
|  是否可以重复声明  |  √  |  ×  |   ×   |
|  是否可以重新赋值  |  √  |  ×  |   ×   |
| 是否必须设置初始值 |  ×  |  ×  |   √   |
|  是否添加全局变量  |  √  |  ×  |   ×   |
|   是否暂时性死区   |  ×  |  √  |   √   |

暂时性死区：创建了变量（与变量提升），但是没有初始化，没法使用变量，直接使用就会进入暂时性死区

## Set、Map

**`Set`和`Map`都是强引用**，都可以使用 for of/forEach 进行遍历

### Set

允许存储任何类型的唯一值，只有键值（value）没有键命，常用方法`add`、`size`、`has`、`delete`等方法

```js
const set1 = new Set();

set1.add(1);

const set2 = new Set([1, 2, 3]);

set2.add("aky");

console.log(set1); // {1}
console.log(set2); // {1,2,3,‘aky'}
console.log(set2.size); // 4
console.log(set2.has("aky")); // true

set2.delete("aky");
console.log(set2); // {1,2,3}

//用set去重
const set3 = new Set([1, 2, 1, 1, 3, 2]);
const arr = [...set3];
console.log(set3); // { 1, 2, 3 }
console.log(arr); // [1, 2, 3]

//引用类型指针不一样，无法去重
const set4 = new Set([1, { name: "aky" }, 1, 2, { name: "aky" }]);
console.log(set4); // { 1, { name: 'aky' }, 2, { name: 'aky' } }
//引用类型指针一样，可以去重
const obj = { name: "aky" };
const set4 = new Set([1, obj, 1, 2, obj]);
console.log(set4); // { 1,obj, 2 }
```

## Map

是键值对的组合；常用方法：`set`、`get`、`has`、`size`、`delete`等方法

```js
const map1 = new Map();
map1.set(0, 1); //键值对
map1.set(true, 2);
map1.set(function () {}, 3);
const map2 = new Map([
  [0, 1],
  [true, 2],
  [{ name: "aky" }, 3],
]);
console.log(map1); // {0=>1 , true=>2 , function(){} => 3}
console.log(map2); // {0=>1 , true=>2 , {…} => 3}

console.log(map1.size); // 3
console.log(map1.get(true)); // 2
console.log(map1.has(true)); // true
map1.delete(true);
console.log(map1); // {0 => 1, function(){} => 3}
```

## WeakSet、WeakMap

`weakSet`和`weakMap`都是弱引用，对`Gc`更加友好,都不能进行遍历
比如 `let obj = {}`

就默认创建了一个强引用的对象，只有手动的将`obj = null`，在没有引用的情况下才会被垃圾回收机制进行回收，如果是弱引用对象，垃圾回收机制会自动帮我们进行回收，某些情况下性能更有优势，比如用来保存 DOM 节点，不容故意造成内存泄漏

### WeakMap

成员只能是对象或者数组，方法只有`add`、`has`、`delete`，

```js
const ws1 = new WeakMap();
let obj = { name: "aky" };
ws1.add(obj);
ws1.add(function () {});
console.log(ws1); // {function)(){}, {name:"aky"}}
console.log(ws1.has(obj)); // true

ws1.delete(obj);
console.log(ws1.has(obj)); //false
```

### WeakMap

键值对集合，只能用对象作为 key(null 除外)，value 可以是任意的。方法只有`get`、`set`、`has`、`delete`

```js
const wm1 = new WeakMap();

const o1 = { name: "aky" };
const o2 = function () {};
const o3 = window;

wm1.set(o1, 1); // { { name: 'aky' } : 1 } 这样的键值对
wm1.set(o2, undefined);
wm1.set(o3, o3); // value可以是任意值,包括一个对象或一个函数
wm1.set(wm1, wm2); // 键和值可以是任意对象,甚至另外一个WeakMap对象

wm1.get(o1); // 1 获取键值

wm1.has(o1); // true  有这个键名
wm1.has(o2); // true 即使值是undefined

wm1.delete(o1);
wm1.has(o1); // false
```

## 数据类型

- 基础数据类型： Number、String、Boolean、Undefined、Null、BigInt、Symbol
- 复杂数据类型： Object（Function、Array）

## 类型检测
