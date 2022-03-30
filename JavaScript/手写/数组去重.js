let arr = [
    1,
    1,
    "1",
    "1",
    true,
    true,
    "true",
    {},
    {},
    "{}",
    null,
    null,
    undefined,
    undefined,
];

//方法一 set

// let newArr = [...new Set(arr)];
let newArr = Array.from(new Set(arr)]);
// console.log(newArr);

//方法二   使用map集合
let newArr = (arr) => {
    let map = new Map();
    let newArr = [];
    arr.forEach((item) => {
        if (!map.has(item)) {
            map.set(item, true);
            newArr.push(item);
        }
    });

    return newArr;
};
// console.log(newArr(arr));

//方法三    arr.indexof  / arr.includes 方法
let unique3 = arr => {
    let brr = []
    arr.forEach(item => {
        // 使用 indexOf  返回数组是否包含某个值 没有就返回 -1 有就返回下标
        if (brr.indexOf(item) === -1) brr.push(item)
            // 或者使用 includes 返回数组是否包含某个值  没有就返回false  有就返回true
        if (!brr.includes(item)) brr.push(item)
    })
    return brr
}

// 方法四    filter
let unique4 = arr => {
    // 使用 filter 返回符合条件的集合
    let brr = arr.filter((item, index) => {
        return arr.indexOf(item) === index
    })
    return brr
}