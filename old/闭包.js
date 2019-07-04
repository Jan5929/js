// function test() {
// //   var a = 0
// //   function add(){
// //     ++a
// //     console.log(a)
// //   }
// //   return add
// // }
// //
// // var demo = test()
// // demo()
// // demo()
// // demo()
// // demo()
// // demo()
// // demo()
// // demo()

//
// function test() {
//   var food = 'apple'
//   var obj = {
//     eatFood: function () {
//       if (food != '') {
//         console.log(food)
//         food = ''
//       } else {
//         console.log(food)
//       }
//     },
//     pushFood: function (val) {
//       food = val
//     }
//   }
//   return obj
// }
// var person = test()
// person.eatFood()
// person.eatFood()
// person.pushFood('banner')
// person.eatFood()



//
// function test() {
//   var arr = []
//   for (var i = 0; i < 10; i ++) {
//     (arr[i] = function () {
//       console.log(i, '0')
//     })()
//   }
//   return arr
// }
// var myarr = test()
// // console.log(myarr)
// for (var j = 0; j < 10; j++) {
//    myarr[j](0)
// }


//
// function demo(e) {
//   function e() {}
//   arguments[0] = 2
//   console.log(e)
//   // document.write(e) // 2
//   if (a) {
//     var b = 123
//     function c() {}
//   }
//   var c
//   a = 10
//   var a
//   console.log(b)
//  // document.write(b) // un
//   f = 123
//   console.log(c)
//   // document.write(c) // un
//   console.log(a)
//   // document.write(a) // 10
// }
// var a
// demo(1)
// console.log(a)
// // document.write(a) //un
// console.log(f)
// // document.write(f) // 123

//
// function test() {
//   var a = b = 100
//   console.log(a,b)
// }
// test()
// console.log(b)
// var x = 1
//
// if (function f() {}) {
//   x += typeof f
// }
// console.log(x)

var a = 5
function test() {
  console.log(this)
  a = 0
  console.log(a)
  console.log(this.a)
  var a
  console.log(a)
}
test()
