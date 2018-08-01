var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hyName: '',
    hyDateTime: '',
    hyBeginDate: '',
    hyEndDate: '',
    params:{
      hideFs:false,
      theme:'',
      remark:'',
      randomId:'',
      startDateTime:'',
      endDateTime:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      hyName: options.hyName,
      hyDateTime: options.hyDateTime,
      hyBeginDate: options.hyBeginDate,
      hyEndDate: options.hyEndDate,
      params:{
        hideFs: that.data.params.hideFs,
        theme: '',
        remark: '',
        randomId: options.hyRandomId,
        startDateTime: options.hyBeginDateTime,
        endDateTime: options.hyEndDateTime
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  setVerification:function(e){
    var that = this;
    that.setData({
      params: {
        hideFs: e.detail.value,
        theme: that.data.params.theme,
        remark: that.data.params.remark,
        randomId: that.data.params.randomId,
        startDateTime: that.data.params.startDateTime,
        endDateTime: that.data.params.endDateTime
      }
    })
  },
  formSubmit: function (e){
    var that = this;
    that.setData({
      params: {
        hideFs: that.data.params.hideFs,
        theme: e.detail.value.theme,
        remark: e.detail.value.remark,
        randomId: that.data.params.randomId,
        startDateTime: that.data.params.startDateTime,
        endDateTime: that.data.params.endDateTime
      }
    })
    util.requestLoading('/rest/api/createSchedule', that.data.params, '正在创建',
      function (res) {
        if (res.code == 200) {
          wx.showModal({
            title: '预定成功',
            content: '您成功预定'+that.data.hyDateTime+' '+that.data.hyBeginDate+'至'+that.data.hyEndDate+'的 '+that.data.hyName+' 会议室',
            cancelText:'继续预定',
            confirmText:'查看详情',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                wx.switchTab({
                  url: '../reserve/reserve'
                })
              }
            }
          })
          // console.log(res)
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
        })
      })
  }
})