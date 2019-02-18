 // 回顾一下es5

 //生成实例对象的传统方法是通过构造函数
 function Point( x, y ) {
     this.x = x
     this.y = y
 }

 Point.prototype.toString = function () {
     return `${this.x}==${this.y}`
 }

 var p = new Point(1,2)

 console.log(p.toString()) // 1==2


 //es6

 class Person {
     constructor(x, y) {
         this.x = x
         this.y = y
     }

     toString() {
         console.log('加油')
         console.log(`${this.x }  ${this.y}`)
     }
 }
 /*定义类里有个 constructor方法，这就是构造方法
 * 而this关键字则代表实例对象
 *
 * es6的类，完全可以看作构造函数的另一种写法
 * */
 console.log(typeof Person) // function

 console.log(Person === Person.prototype.constructor) // true

 // 类的数据类型就是函数，类本身就指向构造函数

 //使用的时候，也就直接对类使用new 命令，跟构造函数的用法完全一致

 let bar = new Person(1, 3)

 bar.toString() // 加油  1  3

 /*
 * 构造函数的prototype属性，在es6的 类 上面继承存在
 *
 * 类的所有方法都定义在类的prototype属性上
 * */
