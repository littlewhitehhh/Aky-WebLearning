// 原理 就是提取出url里的参数并转成对象形式

function getUrlParams(url) {
    let reg = /([^?&=]+)=([^?&=]+)/g;
    let obj = {};
    console.log("：", arguments);

    url.replace(reg, function() {
        console.log(arguments);
        obj[arguments[1]] = arguments[2];
    });

    //或者
    // const search = window.location.search;
    // search.replace(/([^&=?]+)=([^&]+)/g),
    //     (m, $1, $2) => {
    //         obj[$1] = decodeURIComponent($2);
    //     };

    return obj;
}

let url = "https://www.juejin.cn?a=1&b=2";
console.log(getUrlParams(url)); //  {a:1,b:2}