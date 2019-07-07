// 数组去重 几种常用的方法

// 1. 利用对象属性去重
function uniqueObj(array) { 
  if (!Array.isArray(array)) {
    console.log('不是数组')
    return array
  }
  const res = [],
    obj = {}
  for (let i = 0; i < array.length; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i])
      obj[arr[i]] = 1
    } else {
      obj[arr[i]] ++ 
    }
  }
  return res
}
/*
 数组去重还有很多种方法， 双重for循环，indexOf es6 数据结构set， 
*/
