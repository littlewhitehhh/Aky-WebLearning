// const ocrData = {
//     index_info: {
//         35215641: [
//             { xmml_bj_mzi: "hahaha" },
//             { tjz_bj_mzi: "444" },
//             { dasad_bj_mzi: "555" },
//             { adsasd_bj_mzi: "ggg" },
//             { bz_bj_mzi: "五莽夫" },
//         ],
//         55646546: [
//             { xmml_bj_mzi: "hehehe" },
//             { tjz_bj_mzi: "666" },
//             { dasad_bj_mzi: "777" },
//             { adsasd_bj_mzi: "aaa" },
//             { bz_bj_mzi: "4am" },
//         ],
//         65656565: [
//             { xmml_bj_mzi: "lalal" },
//             { tjz_bj_mzi: "999" },
//             { dasad_bj_mzi: "000" },
//             { adsasd_bj_mzi: "jjj" },
//             { bz_bj_mzi: "pero" },
//         ],
//     },
// };

// var arr = Object.keys(ocrData.index_info)
// console.log(arr);
// const res = arr.reduce((prev, key) => {
//     const original = ocrData.index_info[key]
//     console.log(original)
//     prev[key] = Object.assign(...original)
//     console.log(prev);
//     // console.log(prev, cur);
//     return prev

// })
// console.log(res);

/**
 *
 * @param {*} maxConcurrency   最大并行执行数
 * @param {*} source        异步任务数组
 * @param {*} iteratorFn   异步执行函数
 * @returns
 */
async function runParallel(maxConcurrency, source, iteratorFn) {
    const ret = []; // 构造一个异步执行函数的数组提供给promise.all调用

    const executing = []; // 并行任务的异步执行队列数组，  并行池
    for (const item of source) {
        console.log(item);
        //循环异步任务
        //往异步任务队列添加任务
        const p = Promise.resolve().then(() => iteratorFn(item));
        ret.push(p); //构造调用promise.all 调用执行的异步函数数组
        if (maxConcurrency <= source.length) {
            // 如果最大并行执行数小于或等于异步任务，则不需要进行限制
            //构建异步任务执行回调的then方法，在then方法中删除 并行执行的异步任务队列数组中已经执行并返回结果的异步任务
            const e = p.then(() => {
                console.log("executing.splice", item);
                executing.splice(executing.indexOf(e), 1);
            });
            // console.log(executing);
            executing.push(e); //往并行池中添加异步任务
            console.log("222");
            if (executing.length >= maxConcurrency) {
                console.log("333");
                //当并行执行的异步任务数已经大于或等于最大并行执行数时

                await Promise.race(executing);
                console.log("444"); // 执行并行执行的异步任务队列数组executing中的异步任务
            }
        }
    }
    return Promise.all(ret);
}

const source = [2000, 1000, 3000, 6500];
async function build(target) {
    console.log("target", target);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("build", target);
            resolve("success");
        }, target);
    });
}
// debugger
runParallel(2, source, build);