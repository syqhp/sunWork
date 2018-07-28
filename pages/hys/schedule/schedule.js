var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      beginDateTime:"",
      endDateTime:"",
      type:""
    },
    hysConferenceList:[],
    dataListAll:[],
    dataList:[],
    dataTime: '',
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    date: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00','8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
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
  
  
  clickDate:function(e){
    that.setData({
      dataTime: util.formatDate(new Date()),
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //每次进入日程预定页触发该方法，先给定参数，这里将之前会议室列表页面的选中随机id拼接成字符串并赋给params中已经定义好的randomIds，通过接口获取页面显示参数，这边你还需要在全端选择日期的时候把选中的日期赋给params中的dateTime，onLoad方法只有在页面加载的时候触发一次，像这种每次访问页面都需更新页面数据的接口调用以后就写在onShow这个方法内
    
    util.requestLoading('/rest/api/findScheduleByUser', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          console.info(res);
          var dataList = res.dateList;
          var dataListAll = [dataList.slice(0,7), dataList.slice(7, 14), dataList.slice(14, 21), dataList.slice(21, 28)];
          var hysConferenceList = res.hysConferenceList;
          //跳转不同页面
          that.setData({
            dataList: res.dateList,
            dataTime: util.formatDate(new Date()),
            dataListAll: dataListAll,
            hysConferenceList:res.hysConferenceList
          })
          // console.log(res.data)
          console.log(that.data.dataListAll)

      
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