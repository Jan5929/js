// 扩展运算符  ...

console.log(...[1, 2, 3])  // 1 2 3

//替代函数的apply方法

//es5
function f(x, y, z) {
    console.log(x, y, z)
}

var args = [0, 1, 2]

f.apply(null, args)  // 0 1 2

// es6的写法

function f1(x, y, z) {
    console.log(x, y, z)
}

let args1 = [0, 1, 2]

f1(...args)  // 0 1 2

// 应用Math.max 简化求出一个数组最大元素的写法

// es5
console.log(Math.max.apply(null, [1, 2, 3])) // 3

// es6

console.log(Math.max(...[1, 2, 3, '4'])) // 4

// push， 将一个数组添加到另一个数组的尾部

// es5的写法

var arr1 = [0, 1, 2]

var arr2 = [3, 4, 5]

Array.prototype.push.apply(arr1, arr2);

console.log(arr1) // [0, 1, 2, 3, 4, 5]

// es6

let arr = [0, 1, 2]
let list = [3, 4, 5]

arr.push(...list)

console.log(arr) // [0, 1, 2, 3, 4, 5]


// 扩展运算符的应用


/*
* 1.复制数组
*
* 直接复制数组的话，只是引用，就是复制了指向底层数据结构的指针，而不是克隆一本全新的数组
*
*
* */

const a1 = [1, 2]

const a2 = a1

a2[0] = 2

console.log(a1) // [2, 2]

/*直接复制导致， a1改变了 这不是我们想要的*/

// 使用扩展运算符

const a3 = [1, 2]
//const a4 = [...a3]
const [...a4] = a3
a4[0] = 2
console.log(a3) // [1, 2]

/*a4 就是a3 的克隆， a4的改变不会影响a3*/

/*
* 2.合并数组
* */
const data = [1, 2]
const data1 = [3, 4]
const data2 = [5, 6]

//es5的合并数组
console.log(data.concat(data1, data2)); // [1,2,3,4.5,6]

//es6

console.log([...data, ...data1, ...data2])

