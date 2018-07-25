// pages/hys/management/management.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    params:{
      beginDateTime:'',
      endDateTime:'',
      type:'all'
    }
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
    this.findScheduleByUser();
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
  onSelect:function (e) {
    this.findScheduleByUser();
  },
  bindDateChangeByBengin: function (e) {
    this.setData({
      params:{
        beginDateTime: e.detail.value,
        endDateTime: this.data.params.endDateTime,
        type: 'all'
      }
    })
  },
  bindDateChangeByEnd: function (e) {
    this.setData({
      params: {
        beginDateTime: this.data.params.beginDateTime,
        endDateTime: e.detail.value,
        type: 'all'
      }
    })
  },
  findScheduleByUser:function(){
    var that = this;
    util.requestLoading('/rest/api/findScheduleByUser', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          //跳转不同页面
          that.setData({
            dataList: res.data,
            params: {
              beginDateTime: res.beginDateTime,
              endDateTime: res.endDateTime,
              type: 'all'
            }
          });
          console.info(that.data.beginDateTime);
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