//就是把多维数组变成一维数组

let arr = [1, [2, [3, [4, [5]]]]];

//方法一   flat

let brr = flat(arr);

//方法二 ：转成字符串，再去掉字符串中的"["","]"再转回数组

let brr1 = JSON.parse("[" + JSON.stringify(arr).replace(/\[|\]/g) + "]");

//方法三
// 用递归，用 for 循环加递归也可以，这里用 reduce
// reduce 累计器，本质上也是循环，
// cur 是循环的当前一个值，相当于 for循环里的arr[i]， pre 是前一个值，相当于for循环里的arr[i-1]
let brr3 = (arr) => {
    let crr = arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? brr3(cur) : cur);
    }, []);

    return crr;
};