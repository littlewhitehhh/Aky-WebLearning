function* foo() {
    console.log("代码开始执行~")

    const value1 = 100
    try {
        yield value1 //抛出异常  gengrator.throw()
    } catch (error) {
        console.log("捕获到异常情况:", error)

        yield "abc"
    }

    console.log("第二段代码继续执行")
    const value2 = 200
    yield value2

    console.log("代码执行结束~")
}

const generator = foo()

const result = generator.next()
generator.throw("error message")
    // console.log(generator.next());