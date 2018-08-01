// pages/hys/editHy/editHy.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      randomId: '',
      name:'',
      remark:'',
      verification:false,
      type: 'update'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      params: {
        randomId: options.randomId
      }
    })
    util.requestLoading('/rest/api/findConferenceByRandomId', that.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          //跳转不同页面
          that.setData({
            params: {
              randomId: options.randomId,
              name: res.data.name,
              remark: res.data.remark,
              verification: res.data.verification
            }
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
          title: '加载失败',
        })
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
  setVerification: function(e){
    var that = this;
    this.setData({
      params: {
        randomId: that.data.params.randomId,
        name: that.data.params.name,
        remark: that.data.params.remark,
        verification: e.detail.value,
        type: 'update'
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    if (e.detail.value.name.length == 0) {
      wx.showToast({
        title: '请填写会议室名!',
        image: '../../../image/tx.png',
        duration: 1500
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return;
    }
    that.setData({
      params: {
        randomId: that.data.params.randomId,
        name: e.detail.value.name,
        remark: e.detail.value.remark,
        verification: that.data.params.verification,
        type: 'update'
      }
    });
    util.requestLoading('/rest/api/createOrUpdateConference', that.data.params, '正在更新',
      function (res) {
        if (res.code == 200) {
          //跳转不同页面
          wx.redirectTo({
            url: '../hyReserveDetail/hyReserveDetail?randomId=' + that.data.params.randomId
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
  deleteConference: function(){
    var that = this;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除吗，删除后无法恢复！',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            params: {
              randomId: that.data.params.randomId,
              type: 'delete'
            }
          })
          util.requestLoading('/rest/api/createOrUpdateConference', that.data.params, '正在删除',
            function (res) {
              if (res.code == 200) {
                //跳转不同页面
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
                title: '删除失败',
              }),
                wx.switchTab({
                  url: 'conferenceList/conferenceList'
                })
            })
        } else if (res.cancel) {
        }
      }
    })
    
  }
})