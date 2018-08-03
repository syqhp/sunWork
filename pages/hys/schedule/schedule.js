var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      beginDateTime:'',
      endDateTime:''
    },
    hysConferenceList:[],
    dataListAll:[],
    dataList:[],
    dataTime: '',
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hyDate:[]
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
    // this.loadDate()
    // console.log(e);
    // console.log(e.beginDateTime);
    
    this.setData({
      // dataTime: e.currentTarget.dataset.time,
      
      params: {
        beginDateTime: e.currentTarget.dataset.time,
        endDateTime: e.currentTarget.dataset.time 
      },

    })
    this.loadDate();
  },    
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadDate();
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
  loadDate: function (e) {
    var that = this;
    //每次进入日程预定页触发该方法，先给定参数，这里将之前会议室列表页面的选中随机id拼接成字符串并赋给params中已经定义好的randomIds，通过接口获取页面显示参数，这边你还需要在全端选择日期的时候把选中的日期赋给params中的dateTime，onLoad方法只有在页面加载的时候触发一次，像这种每次访问页面都需更新页面数据的接口调用以后就写在onShow这个方法内

    util.requestLoading('/rest/api/findScheduleGetUser', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          console.info(res);
          var hyDate = res.data;
          var dataList = res.dateList;
          var dataListAll = [dataList.slice(0, 7), dataList.slice(7, 14), dataList.slice(14, 21), dataList.slice(21, 28)];
          var hysConferenceList = res.hysConferenceList;
          //跳转不同页面
          that.setData({
            dataList: res.dateList,
            dataTime: res.beginDateTime,
            dataListAll: dataListAll,
            hysConferenceList: res.hysConferenceList,
            hyDate: res.data
          })
          console.log(that.data.dataTime)



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
  goDetail: function (event) {
    wx.navigateTo({
      url: '../hyReserveDetail/hyReserveDetail?randomId=' + event.currentTarget.dataset.id
    })
  },
  goHyDetail: function (event) {
    wx.navigateTo({
      url: '../hyDetail/hyDetail?id=' + event.currentTarget.dataset.id
    })
  },
})