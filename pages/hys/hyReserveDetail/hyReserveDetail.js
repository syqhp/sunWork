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
      randomIds:'',
      dateTime:''
    },
    dataListAll: [],
    dataList: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
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
    that.findScheduleInfoByConference();
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
  onShareAppMessage: function (from, target) {
    var that = this;
    return {
      title: that.data.hydate.hysConferenceList[0].conferenceName + ' - ' + that.data.hydate.hysConferenceList[0].remark
    }
  },
  goConferenceList:function(){
    wx.switchTab({
      url: '../conferenceList/conferenceList'
    })
  },
  goReserve:function(e){
    var name = e.currentTarget.dataset.randomid + '';    
    var fs = true;
    for (var i = 0; i < app.globalData.selectId.length;i++){
      if (app.globalData.selectId[i] == name){
        fs = false;
        break;
      }
    }
    
    if (fs){
      app.globalData.selectId.push(name);
    }
    wx.switchTab({
      url: '../reserve/reserve'
    })
  },
  clickDate:function(e){
    var that = this;
    that.setData({
      params: {
        randomIds: that.data.params.randomIds,
        dateTime: e.currentTarget.dataset.time
      }
    })
    that.findScheduleInfoByConference();
  },
  goScheduleDetail:function(e){
    wx.navigateTo({
      url: '../hyDetail/hyDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  getMore: function (e) {
    var that = this;
    if (that.data.type == 'true') {
      wx.showActionSheet({
        itemList: ['二维码', '编辑'],
        success: function (res) {
          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '../wxCode/wxCode?randomId=' + that.data.params.randomIds
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
    } else {
      wx.showActionSheet({
        itemList: ['取消关注'],
        success: function (res) {
          if (res.tapIndex == 0) {
            util.requestLoading('/rest/api/unFollow', that.data.params, '正在取消',
              function (res) {
                if (res.code == 200) {
                  wx.switchTab({
                    url: '../conferenceList/conferenceList'
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
                  title: '取消失败',
                })
              })
          }
        },
        fail: function (res) {

        }
      })
    }
  },
  findScheduleInfoByConference:function(){
    var that = this;
    util.requestLoading('/rest/api/findScheduleInfoByConference', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          var dataList = res.dateList;
          var dataListAll = [dataList.slice(0, 7), dataList.slice(7, 14), dataList.slice(14, 21), dataList.slice(21, 28)];

          //跳转不同页面
          that.setData({
            hysConferenceList: res.hysConferenceList,
            date: res.date,
            hysScheduleList: res.data,
            type: res.hysConferenceList[0].code,
            dataList: res.dateList,
            dataListAll: dataListAll,
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
  }
})