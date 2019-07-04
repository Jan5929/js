// 工具函数集合

// 1 检查除symbol 外的原始数据类型

function isStatic(value) {
	return (
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean' ||
		typeof value === 'undefined' ||
		value === null
	)
}

/*
* 拓展：什么叫symbol 类型
*
* symbol 是es6 中的新基本数据类型
*
* 功能：类似于一种唯一标识性的ID
*
* 解决对象key的冲突(mixin模式)
*
* 详解 见 es6
*
* */

// 检查数据是不是原始数据
function isPrimitive(value) {
	return isStatic(value) || typeof value === 'symbol'
}


// 判断数据是不是引用类型的数据
function isObject(value) {
	let type = typeof value
	return value != null && (type === 'object' || type === 'function')
}

// 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
function isObjectLike(value) {
	return value != null && typeof value === 'object'
}

// 获取数据类型 Number、String、Object、Array、symbol
function getRawType(value) {
	return Object.prototype.toString.call(value).slice(8, -1)
}

/*
* 拓展
*  toString 可以把一个值 (除外 null, undefined) 转为字符串
*  call：该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组
*  作用 改变 this 指向
*  slice： 接受两个参数 start end  从已有数组中返回选定的元素 不包含end  start 必填，end 选填， 为空则返回开始到结束的所有元素，为负数则从元素末尾开始算起
* */

