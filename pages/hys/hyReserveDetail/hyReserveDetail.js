// pages/hys/hyReserveDetail/hyReserveDetail.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hysConferenceList:[],
    date:'',
    hysScheduleList:[],
    type:false,
    params:{
      randomIds:''
    }
  },
  getMore: function (e) {
    var that = this;
    if (that.data.type){
      wx.showActionSheet({
        itemList: ['二维码', '编辑'],
        success: function (res) {
          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '../wxCode/wxCode'
            })
          }
          if (res.tapIndex == 1) {
            wx.navigateTo({
              url: '../editHy/editHy?randomId=' + that.data.params.randomIds
            })
          }
        },
        fail: function (res) {



        }
      })
    }else{
      wx.showActionSheet({
        itemList: ['取消关注'],
        success: function (res) {
          if (res.tapIndex == 0) {
            
          }
        },
        fail: function (res) {



        }
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      params: {
        randomIds: options.randomId
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
    var that = this;
    util.requestLoading('/rest/api/findScheduleInfoByConference', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          console.info(res);
          //跳转不同页面
          that.setData({
            hysConferenceList: res.hysConferenceList,
            date: res.date,
            hysScheduleList: res.data,
            type: res.hysConferenceList[0].code
          });
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