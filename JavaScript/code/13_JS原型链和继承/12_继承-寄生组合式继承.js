// function createObject(o) {
//     function Fn() {}
//     Fn.prototype = o
//     return new Fn()
// }

// function inheritPrototype(SubType, SuperType) {
//     SubType.prototype = Object.create(SuperType.prototype)
//     Object.defineProperty(SubType.prototype, "constructor", {
//         enumerable: false,
//         configurable: true,
//         writable: true,
//         value: SubType
//     })
// }

// function Person(name, age, friends) {
//     this.name = name
//     this.age = age
//     this.friends = friends
// }

// Person.prototype.running = function() {
//     console.log("running~")
// }

// Person.prototype.eating = function() {
//     console.log("eating~")
// }


// function Student(name, age, friends, sno, score) {
//     Person.call(this, name, age, friends)
//     this.sno = sno
//     this.score = score
// }

// inheritPrototype(Student, Person)

// Student.prototype.studying = function() {
//     console.log("studying~")
// }

// var stu = new Student("why", 18, ["kobe"], 111, 100)
// console.log(stu)
// stu.studying()
// stu.running()
// stu.eating()

// console.log(stu.constructor.name)
function Person(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
}
// 2、定义父类的方法
Person.prototype.running = function() {
    console.log(this.name + "is running")
}


//3、定义子类
//3.1子类属性继承
function Student(name, age, friends, height, score) {
    //组合式继承属性
    Person.call(this, name, age, friends)
    this.height = height
    this.score = score
}
//3.2子类方法继承
//第一种：利用上面封装的寄生式函数
// function inheritProtptype(Student, Person)

//第二种：利用Object.create()方法和Object.defineProperty
Student.prototype = Object.create(Person.prototype)
Object.defineProperty(Student.prototype, "constructor", {
    configurable: true,
    enumable: false,
    writable: true,
    value: Student
})
Student.prototype.studying = function() {
    console.log("studying~")
}

var stu = new Student("why", 18, ["kobe"], 111, 100)
console.log(stu)
    // Student { name: 'why', age: 18, friends: [ 'kobe' ],height:1.88, score: 100}
stu.studying() // studying~
stu.running() //why is running