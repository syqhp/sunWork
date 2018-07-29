var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectLength:'0',
    currentTab: 1,
    followList:[],
    createList:[],
    selectId: app.globalData.selectId,
    params: {
      type: 'create'
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
  },
  // 改变select获值
  
  checkboxChange: function (e) {
    
    var selectLength = e.detail.value.length;
    var name = e.detail.value;
    app.globalData.selectId = name;

    
    this.setData({
      selectLength:e.detail.value.length
    });  
  },
  // 确定select个数跳转
  goSchedule: function (e) {
    wx.switchTab({
      url: '../../hys/reserve/reserve'
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
    util.requestLoading('/rest/api/findConferenceList', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          //跳转不同页面
          if (that.data.params.type == 'follow') {
            that.setData({
              followList: res.data
            }) 
          } else {
            //判断是否需要选中，app.globalData.selectId为全局的选中id，注意selectId需要在app.js 中定义，效果等同于你之前的name，但是你之前对name没有在app.js中定义，这是有问题的，可以点开app.js查看，变量必须先定义后使用，以后注意，这里拿全局id去匹配页面所有会议室随机id，匹配上的说明是选中的，打上fs=true的标记，页面用checked=fs来使元素选中
            for (var index in res.data) {
              console.log(res.data);
              res.data[index].fs = false;
              for (var index2 in app.globalData.selectId) {
                if (res.data[index].randomId == app.globalData.selectId[index2]) {
                  res.data[index].fs = true;
                }
              }

            }
            that.setData({
              createList: res.data
            })
          }
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