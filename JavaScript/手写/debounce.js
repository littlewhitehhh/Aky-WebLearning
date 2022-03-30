//防抖

function debounce(fn, delay) {
    let timer = null;

    return function() {
        //真正的防抖函数
        if (timer !== null) clearTimeout(timer);

        timer = setTimeout(() => {
            fn();
        }, delay);
    };
}