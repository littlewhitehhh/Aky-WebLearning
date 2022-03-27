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

//方法一

// let newArr = [...new Set(arr)];
// let newArr = Array.from(new Set(arr)]);
// console.log(newArr);

//方法er
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
console.log(newArr(arr));