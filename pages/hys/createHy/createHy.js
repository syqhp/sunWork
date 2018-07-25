// pages/hys/createHy/createHy.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      name:'',
      remark:'',
      verification:false,
      type:''
    }
  },
  formSubmit:function(e){
    if (e.detail.value.name.length == 0){
      wx.showToast({
        title: '请填写会议室名!',
        image: '../../../image/tx.png',
        duration: 1500
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return ;
    }
    this.setData({
      params:{
        name: e.detail.value.name,
        remark: e.detail.value.remark,
        verification:  this.data.params.verification,
        type: 'create'
      }
    });
    util.requestLoading('/rest/api/createOrUpdateConference', this.data.params, '正在创建',
      function (res) {
        if (res.code == 200) {
          //跳转不同页面
          wx.redirectTo({
            url: '../wxCode/wxCode?randomId=' + res.randomId
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
          title: '创建失败',
        }),
        wx.switchTab({
          url: 'conferenceList/conferenceList'
        })
      })
  },
  setVerification:function(e){
    this.setData({
      params:{
        verification: e.detail.value
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})