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

## 垃圾回收

V8 实现可 GC 算法，采用了分代式垃圾回收机制，所以 V8 将堆内存分为`新生代`（副垃圾回收器）和`老生代`（主垃圾回收器）两个部分

### 新生代

新生代中通常只支持 1-8M 的容量，所以主要**存放生存时间较短的对象**

新生代中使用`scavenge GC`算法，将新生代空间分为两个区域：对象区域和空闲区域。如
图： ![4f9310c7da631fa5a57f871099bfbeaf.webp](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fc1391485c840bdbede249e4fdd6058~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

顾名思义，就是说这两块空间只使用一个，另一个是空闲的。工作流程是：

- 将新分配的对象存入对象区域中，当对象区域存满了，工作流程是这样的：
- 将对象区域内的垃圾做标记，标记完成之后将对象区域中还存在的对象复制空闲区域中，已经不用的对象销毁。这个过程中不会留下内存碎片
- 复制完成后，再将对象区和空闲区互换。既回收了垃圾也能让新生代中这两块区域无限重复使用下去

正因为新生代中空间不大，所以才容易出现被塞满的情况，所以

- **经历过两次垃圾回收依然存活的对象就会被转移到老生代空间中**
- **如果空闲空间对象的占比超过 25%，为了不影响内存分配，就会将对象转移到老生代空间**

### 老生代

老生代特点就是**占用空间打**，所以主要**存放存活时间长的对象**

老生代使用**标记清除算法**和**标记压缩算法**。因为如果也采用 Scavenge GC 算法的话，复制大对象就比较花时间了

#### 标记清除

在以下情况会先启动标记清除算法：

- 某一个空间没有分块的时候

* 对象太多超过空间容量一定限制的时候
* 空间不能保证新生代中的对象转移到老生代中的时候

标记清除的流程是这样的

- 从根部(js 的全局对象)出发，遍历堆中所有对象，然后标记存活的对象
- 标记完成后，销毁没有被标记的对象

由于垃圾回收阶段，会暂停 JS 脚本执行，等垃圾回收完毕后在恢复 JS 执行这种行为称为**全停顿(stop-the-world)**

比如堆中数据超过 1G，那一次完整的垃圾回收可能需要 1 秒以上，这期间是会暂停 JS 线程执行的，这就导致页面性能和响应能力下降

#### 增量标记

V8 从 stop-the-world 标记切换到增量标记。使用增量标记算法，GC 可以将回收任务分解成很多小任务，穿插在 JS 任务中间执行，这样避免了应用出现卡顿的情况

#### 并发标记

让 GC 扫描和标记对象时，允许 JS 同时运行

#### 标记压缩

清除后会造成堆内存出现内存碎片的情况，当碎片超过一定限制后会启动标记压缩算法，将存活的对象向堆中的一端移动，到所有对象移动完成，就清理掉不需要的内存
