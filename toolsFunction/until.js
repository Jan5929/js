// 工具函数集合

// 1,检查除symbol 外的原始数据类型

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
*  typeof 可以返回哪些数据类型
*  number、string、boolean、undefined、object、function, symbol
* */

// 2,检查数据是不是原始数据
function isPrimitive(value) {
	return isStatic(value) || typeof value === 'symbol'
}


// 3,判断数据是不是引用类型的数据
function isObject(value) {
	let type = typeof value
	return value != null && (type === 'object' || type === 'function')
}

// 4,检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
function isObjectLike(value) {
	return value != null && typeof value === 'object'
}

// 5,获取数据类型 Number、String、Object、Array、Symbol、Function、Boolean、Null、Undefined、RegExp、Date
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

// 6,判断value是不是浏览器内置函数
function isNative(value) {
	return typeof value === 'function' && /native code/.test(value.toString())
}

// 7,记忆函数 缓存运算结果
function cached(fn) {
	let cache = Object.create(null)
	return function cachedFn(str) {
		let hit = cache[str]
		return hit || (cache[str] = fn(str))
	}
}
// 8,横线转驼峰命名
const camelizeRE = /-(\w)/g
function camelize(str) {
	return str.replace(camelizeRE, function (_, c) {
		return c ? c.toUpperCase() : ''
	})
}

// 9, 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小些
const hyphenateRe = /\B([A-Z])/g
function hyphenate(str) {
	const value = str.replace(hyphenateRe, '-$1')
	return value.toLocaleLowerCase()
}

/*
* $1 代表匹配前面的正则里的第一个（）里的字符串 1代表第一组 以此类推
* */

// 10,字符串首位大写
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

const inBrowser = typeof window !== 'undefined'

// 运行环境是微信
const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
const weexPlatform = inWeex && WXEnvironment.platform.toUpperCase()

// 浏览器 UA 判断
const UA = inBrowser && window.navigator.userAgent.toLowerCase()

const isIE = UA && /msie|trident/.test(UA)

const isIE9 = UA && UA.indexOf('msie 9.0') > 0

const isEdge = UA && UA.indexOf('edge/') > 0

const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')

const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')

const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

//11,获取浏览器信息
function getExplorerInfo() {
	let t = navigator.userAgent.toLowerCase();
	return 0 <= t.indexOf('msie') ? { //ie < 11
		type: 'IE',
		version: Number(t.match(/msie ([\d]+)/)[1])
	} : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
		type: 'IE',
		version: 11
	} : 0 <= t.indexOf('edge') ? {
		type: 'Edge',
		version: Number(t.match(/edge\/([\d]+)/)[1])
	} : 0 <= t.indexOf('firefox') ? {
		type: 'Firefox',
		version: Number(t.match(/firefox\/([\d]+)/)[1])
	} : 0 <= t.indexOf('chrome') ? {
		type: 'Chrome',
		version: Number(t.match(/chrome\/([\d]+)/)[1])
	} : 0 <= t.indexOf('opera') ? {
		type: 'Opera',
		version: Number(t.match(/opera.([\d]+)/)[1])
	} : 0 <= t.indexOf('Safari') ? {
		type: 'Safari',
		version: Number(t.match(/version\/([\d]+)/)[1])
	} : {
		type: t,
		version: -1
	}
}
// 12,检测是否为pc端浏览器
function isPCBroswer() {
	let e = navigator.userAgent.toLowerCase()
		, t = "ipad" == e.match(/ipad/i)
		, i = "iphone" == e.match(/iphone/i)
		, r = "midp" == e.match(/midp/i)
		, n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
		, a = "ucweb" == e.match(/ucweb/i)
		, o = "android" == e.match(/android/i)
		, s = "windows ce" == e.match(/windows ce/i)
		, l = "windows mobile" == e.match(/windows mobile/i);
	return !(t || i || r || n || a || o || s || l)
}

// 13
// 解决浮点数 乘法
function accMul(arg1, arg2) {
	let m = 0
	if (!arg1 || !arg2) return 0
	const s1 = arg1.toString()
	const s2 = arg2.toString()
	try {
		m += s1.split('.')[1].length
	} catch (e) {
		console.log()
	}
	try {
		m += s2.split('.')[1].length
	} catch (e) {
		console.log()
	}
	return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
