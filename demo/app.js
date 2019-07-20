//app.js demo
App({
  onLaunch (options) { // 生命周期回调——监听小程序初始化。
    console.log(options, 1)
  },
  onShow(options) {  // 生命周期回调——监听小程序启动或切前台
    console.log(options, 2)
  },
  onHide() { // 生命周期回调——监听小程序切后台
    
  },
  onError(msg) { // 错误监听函数
    console.log(msg)
  },
})
