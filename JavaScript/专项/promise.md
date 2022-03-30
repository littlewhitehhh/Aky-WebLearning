```js
Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
      console.log("then1-1");
    });
  })
  .then(() => {
    console.log("then2");
  });

// then1  then1-1   then2
```

链式调用中，只有前一个 then 的回调执行完毕后，跟着的 then 中的回调才加入为任务队列

```js
let p = Promise.resolve();

p.then(() => {
  console.log("then1");
  Promise.resolve().then(() => {
    console.log("then1-1");
  });
}).then(() => {
  console.log("then1-2");
});

p.then(() => {
  console.log("then2");
});

// then1 then2 then1-1 then1-2
```

每个链式调用的开端会首先一次进入微任务队列

```js
let p = Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
      console.log("then1-1");
    });
  })
  .then(() => {
    console.log("then2");
  });

p.then(() => {
  console.log("then3");
});

// then1 then1-1 then2 then1-2
```

同一个 Promise 的每个链式调用的开端首先一次进入微任务队列
