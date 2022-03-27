Function.prototype.myCall = function(thisArg, ...args) {
    thisArg = thisArg || window;

    let func = Symbol();

    thisArg[func] = this;

    let res = thisArg[func](...args);

    delete thisArg[func];

    return res;
};

// apply

Function.prototype.myApply = function(thisArg, ...args) {
    thisArg = thisArg || window;

    let func = Symbol();

    thisArg[func] = this;

    args = args || [];
    let res = thisArg[func](args);

    delete thisArg[func];

    return res;
};

//bind
Function.prototype.myBind = function(thisArg, ...arg1s) {
    thisArg = thisArg || window;
    let func = Symbol();
    thisArg[func] = this;

    return function(...arg2s) {
        let args = [...arg1s, ...arg2s];
        let res = thisArg[func](args);
        delete thisArg[func];
        return res;
    };
};