//login.js
//获取应用实例
const app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  formSubmit: function (e) {
    this.data.params = e.detail.value;
    util.requestLoading('/rest/api/userInfoSubmit', this.data.params,'正在提交',function(res){
      if (res.code == 200) {
        //跳转不同页面
        wx.redirectTo({
          url: '../../common/error/error?message=' + res.message
        })
      } else if (res.code == 400) {
        //弹窗提醒异常
        const dataInfo = { content: res.message };
        util.showMessage(dataInfo);

      } else if (res.code == 410) {
        //跳页面提醒异常
        wx.redirectTo({
          url: '../../common/error/error?message=' + res.message
        })
      } else if (res.code == 420) {
        //登陆超时
        util.login({url:'../index'});
      }
    },function(){
      wx.showToast({
        title: '提交失败',
      })
    });
  }
})