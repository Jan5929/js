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
* */


// 3, 什么是防抖和节流,有什么区别，如何实现?

//防抖， 触发高频时间后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算事件

function debounce(fn) {
  console.log(fn, 1)
  let timeout = null // 创建一个标记用来存放定时器的返回值
  return function () {
    clearInterval(timeout) // 每当用户输入的时候把前一个setTimeout clear
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, 500)
  }
}

function sayHi() {
  console.log('防抖成功')
}
