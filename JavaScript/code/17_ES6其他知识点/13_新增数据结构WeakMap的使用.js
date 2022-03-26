const obj = { name: "obj1" }
    // 1.WeakMap和Map的区别二: 弱引用
const map = new Map()
map.set(obj, "aaa")

const weakMap = new WeakMap()
weakMap.set(obj, "aaa")

// 2.区别一: 不能使用基本数据类型
// weakMap.set(1, "ccc")

// 3.常见方法
// get方法
console.log(weakMap.get(obj))

// has方法
console.log(weakMap.has(obj))

// delete方法
console.log(weakMap.delete(obj))
    // WeakMap { <items unknown> }   不能遍历
console.log(weakMap)
    //应用场景  VUE3响应式原理