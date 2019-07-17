// 1，写React，Vue项目时为什么要在列表组件中写Key，起作用是什么
/*
* React，Vue 都是采用虚拟dom替换，diff算法，
*
* 在普通列表渲染中，在没有key的情况，虚拟新旧节点对比会更快，没有key的情况，节点会复用（就地复用）
*
*当数组的顺序改变的时候，在没有绑定key的时候，dom节点会复用，改变的只会是dom的innerHTML的值，dom顺序不会变
*
* 而有绑定key的情况下，节点不会复用，key是唯一标识，新旧节点对比的时候，会把原来不存在的节点给删除，然后重新建立，所以所需时间比没有绑定key多
* 列表渲染，值不会改变，而是dom节点的位置发生了改变
*
* key的作用是： 给每一个vnode（虚拟dom）有一个唯一的id，可以依靠key，更准确的，更快的拿到oldVnode中对应的节点
* */

// 2, ['1', '2', '3'].map(parseInt)?
const arr = [1, 2, 3]
function test(arr) {
  return arr.map(parseInt) // arr.map(parseInt) => arr.map((item, index) => { return parseInt(item, index)})
}
test(arr) // [1, NaN, NaN]
/*
*
* parseInt(string, radix)
* string 必须，要被解析的字符串，
* radix 选填，表示要解析字符串的基础，该值介于2-36之间
* radix  为零时，或者没有参数时，parseInt()会根据字符串来判断数字的基数
*
*以'0x开头' radix = 16，0开头有，8或16进制，1-9开头，10进制
*
* 当parseInt(1, 0) => 1; parseInt(2, 1) => NaN; parseInt(3, 2) => NaN
*
*/

// 3, 什么是防抖和节流,有什么区别，如何实现?

//防抖， 触发高频时间后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算事件

function debounce(fn, await) {
  let timeout = null // 创建一个标记用来存放定时器的返回值
  return function () {
    clearInterval(timeout) // 每当用户输入的时候把前一个setTimeout clear
    timeout = setTimeout(() => {
      fn.apply(this, arguments) // 这里使用apply的原因是 sayHi该函数定义在window下若不用apply this会指向window
    }, await)
  }
}

/*
不明白这里的  arguments  ？

待解决。。。。。。

*/
let count = 1
let container = document.getElementById('container')
function sayHi(e) {
  container.innerHTML = count++;
  console.log(e)
}

//节流, 高频事件触发，但在n秒内只会执行一次，节流会稀释函数的执行频率
function throttle(fn, await) {
  let canRun = true // 用过闭包保存一个标记
  return function () {
    if (!canRun) return
    canRun = false // 下面定时器不走完，函数不会调用
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true // 定时器走完，状态更改
    }, await)
  }
}

function underscore(fn, await, immediate) {  // 进阶版防抖
  let timeout, result
  let newDebounce = function () {
    let context = this
    let args = arguments
    if (timeout) clearInterval(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, await)
      if (callNow) result = fn.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, args)
      }, await)
    }
    return result
  }

  newDebounce.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  }
  return newDebounce
}

// 4, 介绍 Set，Map，WeakSet，WeakMap的区别？

/*
Es6提供的新数据结构 Set 它类似于数组 但是成员的值都是唯一的 Set 本身是一个构造函数

Set 实例的属性和方法

属性：Set.prototype.constructor 构造函数，默认就是Set函数

     Set.prototype.size：返回Set实例的成员总数

方法：操作方法
        add(value) 添加某个值，返回Set结构本身
        delete(value) 删除一个值，返回一个布尔值，表示是否删除成功
        has(value) 返回一个布尔值，表示该值是否是Set成员
        clear() 清除所有成员，没有返回值


     遍历方法
        keys() 返回键名
        values() 返回键值    keys values 都一样，
        entries() 返回键值对
        forEach() 使用回调函数遍历每个成员


需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。


WeakSet：
        结构与Set类似，也是不重复值的集合，但是与 Set 有两个区别
        成员只能是对象 弱引用 垃圾回收机制不会考虑对象是否存在与WeakSet中 外部消失，自动消失
        不可遍历
        WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏

Map：

   Map js对象，本质上是键值对的集合，传统的对象只能用字符串来当作键

   ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

   Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应

实例的属性和方法

属性：
    size 返回Map结构成员的总数

操作方法：
    set(key, value) 设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键

    set方法返回的是当前的Map对象，因此可以采用链式写法。

    let man = new Map().set(1, 'a').set(2, 'b')
    console.log(man) Map(2) {1 => "a", 2 => "b"}

    get(key) get方法读取key对应的键值，如果找不到key，返回undefined。

    has(key) has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

    delete(key) delete方法删除某个键，返回true。如果删除失败，返回false。

    clear() clear方法清除所有成员，没有返回值。

 遍历方法：
    keys()：返回键名
    values()：返回键值
    entries()：返回所有成员
    forEach()：遍历 Map 的所有成员 可以接受两个参数，第二参数用来绑定this

    let man = new Map().set(1, 'a').set(2, 'b')
      man.forEach(function (value, key, map) {  // 第一个是value， 第二个是key
        console.log(this, key, value, map) // window 1 a Map(2) {1 => "a", 2 => "b"}  window 2 b Map(2) {1 => "a", 2 => "b"}
      }, window)


    Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）



    与其他数据结构的互相转换

    Map 转为数组最方便的方法，就是使用扩展运算符（...）  将数组传入 Map 构造函数，就可以转为 Map

    如果所有 Map 的键都是字符串，它可以无损地转为对象    如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

    对象转为 Map  Map 转为 JSON  JSON 转为 Map......


WeakMap:
       WeakMap结构与Map结构类似，也是用于生成键值对的集合。
       两点区别：
              WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名 （没有size）
              WeakMap的键名所指向的对象，不计入垃圾回收机 （不能遍历）


*/

//5, setTimeout、Promise、Async/Await 的区别 ?

/*
先了解事件循环机制

js 的事件分两种，宏任务(macro-task) 和 微任务(micro-task)

宏任务：包括整体代码 script， setTimeout, setInterval

微任务：Promise.then(非new Promise)，process.nextTick(node中)

事件执行顺序： 宏任务 -> 微任务

setTimeOut执行需要满足两个条件：
                           主进程必须是空闲的状态，如果到时间了，主进程不空闲也不会执行你的回掉函数
                           这个回掉函数需要等到插入异步队列时前面的异步函数都执行完了，才会执行




Promise、Async/Await

首先，new Promise是同步的任务，会被放到主进程中去立即执行。而.then()函数是异步任务会放到异步队列中去，那什么时候放到异步队列中去呢？当你的promise状态结束的时候，就会立即放进异步队列中去了。
带async关键字的函数会返回一个promise对象，如果里面没有await，执行起来等同于普通函数；如果没有await，async函数并没有很厉害是不是
await 关键字要在 async 关键字函数的内部，await 写在外面会报错；await如同他的语意，就是在等待，等待右侧的表达式完成。此时的await会让出线程，
阻塞async内后续的代码，先去执行async外的代码。等外面的同步代码执行完毕，才会执行里面的后续代码。就算await的不是promise对象，是一个同步函数，也会等这样操作
*/
// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }
// async function async2() {
//   console.log('async2');
// }
// console.log('script start');
// async1();
// new Promise(function(resolve) {
//   console.log('promise1');
//   resolve();
// }).then(function() {
//   console.log('promise2');
// });
// console.log('script end');
// 1、执行console.log('script start')，输出script start；xk
// 2、执行setTimeout，是一个异步动作，放入宏任务异步队列中；
// 3、执行async1()，输出async1 start，继续向下执行；
// 4、执行async2()，输出async2，并返回了一个promise对象，await让出了线程，把返回的promise加入了微任务异步队列，所以async1()下面的代码也要等待上面完成后继续执行;
// 5、执行 new Promise，输出promise1，然后将resolve放入微任务异步队列；
// 6、执行console.log('script end')，输出script end；
// 7、到此同步的代码就都执行完成了，然后去微任务异步队列里去获取任务
// 8、然后执行resolve（new Promise的），输出了promise2。
// 9、接下来执行resolve（async2返回的promise返回的），输出了async1 end。
// 10、最后执行setTimeout，输出了setTimeout。



// 6, 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
// let newArr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
// const a = Array.from(new Set(newArr.flat(Infinity))).sort((a,b)=>{ return a-b})
// console.log(a)
// flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。


// 7, JS 异步解决方案的发展历程以及优缺点

// 1. 回调函数（callback）
// setTimeout(() => {
//  callback 函数体
// }, 1000)

// 缺点：回调地狱，不能用 try catch 捕获错误，不能 return

// 回调地狱的根本问题在于：
                       // 缺乏顺序性，
                       // 嵌套函数存在耦合性，一但有所改动，就会导致整个都有所变动
                       // 嵌套过多，错误很难处理

// 优点：
       // 解决了同步的问题

// 2 Promise 为了解决callback的问题而产生的
/*
*  Promise 实现了链式调用 每次then后返回的都是全新的promise 在then中return，return结果就会被Promise.resolve()包装
*
* 优点： 解决了回调地狱的问题
*
* 缺点，无法取消promise，错误需要用函数捕获
*
*
* */

//3， Generator

/*
*  function *funName() {
*   yield function(){}
*   yield function(){}
*   yield function(){}
*   yield function(){}
*   yield function(){}
* }
*  let it = funName()
*  it.next()
*
*
* 特点: 可以控制函数的执行
* */

// 4 Async/await

/*
*  是异步的终极解决方法
*  优点： 代码清晰， 不像Promise一样写很多then
*  缺点： 异步改造为同步。
* */


