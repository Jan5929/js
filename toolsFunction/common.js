// 时间格式化
function dateFormated(formate = 'YYYY-MM-DD HH:mm:ss', t) {
  const date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds()
  return formate.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, ( m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)

}

// 获取url 返回一个对象
function GetUrlParam() {
  const url = document.location.toString()
  let arrObj = url.split('?')
  const params = Object.create(null)
  if (arrObj.length > 1) {
    arrObj = arrObj[1].split('&')
    arrObj.forEach(item => {
      item = item.split('=')
      params[item[0]] = item[1]
    })
  }
  return params
}

// base64数据导出文件， 文件下载
function downloadFile(filename, data){
  let DownloadLink = document.createElement('a');
  if ( DownloadLink ){
    document.body.appendChild(DownloadLink);
    DownloadLink.style = 'display: none';
    DownloadLink.download = filename;
    DownloadLink.href = data;

    if ( document.createEvent ){
      let DownloadEvt = document.createEvent('MouseEvents');

      DownloadEvt.initEvent('click', true, false);
      DownloadLink.dispatchEvent(DownloadEvt);
    }
    else if ( document.createEventObject )
      DownloadLink.fireEvent('onclick');
    else if (typeof DownloadLink.onclick == 'function' )
      DownloadLink.onclick();

    document.body.removeChild(DownloadLink);
  }
}

// isNaN 检查数据是否是非数字
/*
* 原生的isNaN会把参数转换成数字(valueof)，而null、true、false以及长度小于等于1的数组(元素为非NaN数据)
* 会被转换成数字，这不是我想要的。Symbol类型的数据不具有valueof接口，所以isNaN会抛出错误，
* 这里放在后面，可避免错误
* */
function _isNaN(v){
  return !(typeof v === 'string' || typeof v === 'number') || isNaN(v)
}

// 求取数组中的最大值
function max(arr) {
  arr = arr.filter(item => !_isNaN(item))
  return arr.length ? Math.max.apply(null, arr) : undefined
}
// 求取数组中的最小值
function min(arr) {
  arr = arr.filter(item => !_isNaN(item))
  return arr.length ? Math.min.apply(null, arr) : undefined
}

window.onload = function(){
  setTimeout(function(){
    const t = performance.timing
    console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
    console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
    console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
    console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
    console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
    console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
    console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))
    const G = performance.memory
    if(G){
      console.log('js内存使用占比 ：' + (G.usedJSHeapSize / G.totalJSHeapSize * 100).toFixed(2) + '%')
    }
  })
}

// 禁止键盘事件

document.addEventListener('keydown', function(event){
  return !(
    112 === event.keyCode || //F1
    123 === event.keyCode || //F12
    event.ctrlKey && 82 === event.keyCode || //ctrl + R
    event.ctrlKey && 78 === event.keyCode || //ctrl + N
    event.shiftKey && 121 === event.keyCode || //shift + F10
    event.altKey && 115 === event.keyCode || //alt + F4
    "A" === event.srcElement.tagName && event.shiftKey //shift + 点击a标签
  ) || (event.returnValue = false)
})

  // 禁止右键 选择 复制
const arr = ['contextmenu', 'selectstart', 'copy']
const newArray = arr.forEach(function(ev){
  document.addEventListener(ev, function(event){
    return event.returnValue = false
  })
})