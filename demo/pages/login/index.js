//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bg: '../../assest/images/bg.png',
    icon: '../../assest/images/icon.png',
    wechat: '../../assest/images/wechat.png'
  },
  onLoad(options) {
    const userInfo = wx.getUserInfo({
      success: function(res) {
        console.log(res)
      }
    })
  },
  // 微信账号快速登录
  handleLogin(type) {
    console.log('快速登录')
  }
})
