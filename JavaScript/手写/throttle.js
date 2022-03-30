//节流

function throttle(fn, delay) {
    const startDate = 0;

    return function() {
        const nowDate = Date.now().getTime();

        if (nowDate - startDate > delay) {
            fn.call(this, args);
            nowDate = startDate;
        }
    };
}