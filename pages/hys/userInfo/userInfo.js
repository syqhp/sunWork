const app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightImg:"http://chuantu.biz/t6/337/1530515884x-1404817748.png",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    params: {
      headImage: '',
      nickName: ''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
    
      this.setUserInfo(app.globalData.userInfo.avatarUrl, app.globalData.userInfo.nickName)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName)
        }
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  goManagement: function () {
    wx.navigateTo({
      url: '../management/management'
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setUserInfo(e.detail.userInfo.avatarUrl, e.detail.userInfo.nickName)
  },
  setUserInfo: function (headImage, nickName) {
    var that = this;
    that.setData({
      params:{
        headImage: headImage,
        nickName: nickName
      }
    })
    util.requestLoading('/rest/api/updateUserInfo', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          //跳转不同页面
          that.setData({
            userInfo: res.user,
            hasUserInfo: true
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