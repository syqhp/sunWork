const app = getApp()
var util = require('../../utils/util.js')
Page({
  data:{
    welcomeIndexImage:"../image/logo.jpg",
    params:{
      code:'',
      headUrl:'',
      nickName:''
    },
    goUrl: ''
  },
  onLoad: function (options){
    var that = this;
    if (options.goUrl != undefined){
      that.setData({
        goUrl: options.goUrl
      })
    }
  },
  onReady:function(){
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          this.data.params.code = res.code;
          util.requestLoading('/rest/api/login', that.data.params,'正在登录',
          function(res){
            if (!util.isBlank(res.sessionId)) {
              wx.setStorageSync('header', res.sessionId)
            }
            if (res.code == 200) {
              //跳转不同页面
              if (res.status == -1) {
                wx.redirectTo({
                  url: 'login/login'
                })
                return 
              } else if (res.status == 1) {
                //调整成功页面
                if (that.data.goUrl != ''){
                  wx.redirectTo({
                    url: that.data.goUrl
                  })
                }else{
                  wx.switchTab({
                    url: 'conferenceList/conferenceList'
                  })
                }
                return ;
              } else {
                //跳转异常页面
                wx.redirectTo({
                  url: '../common/error/error?message=' + res.message
                })
                return 
              }
            } else if (res.code == 400) {
              //弹窗提醒异常
              const dataInfo = { content: res.message };
              util.showMessage(dataInfo);
            } else if (res.code == 410) {
              //跳转异常页面
              wx.redirectTo({
                url: '../common/error/error?message=' + res.message
              })
            }
          },
          function(){
            wx.showToast({
              title: '登录失败',
            })
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})