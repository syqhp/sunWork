// pages/hys/editGr/editGr.js
const app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      nickName: '',
      email:''
    } 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      params: {
        nickName: options.name,
        email: options.email
      } 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  formSubmit:function(e){
    this.setData({
      params: {
        nickName: e.detail.value.name,
        email: e.detail.value.email
      }
    })
    util.requestLoading('/rest/api/updateUserInfo', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          app.globalData.userInfo.nickName = res.user.userName
          //跳转不同页面
          wx.switchTab({
            url: '../userInfo/userInfo'
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
          util.login({ url: '../index' });
        }
      }, function () {
        wx.showToast({
          title: '提交失败',
        })
      })
  }
})