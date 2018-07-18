var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    name:[],
    params: {
      randomIds: '14281909272509',
      dateTime:'',
    },
    selectLength:'0',
    dataList:[],
    dataTime:'',
    reserveTime:'',
    hysConferenceList:[],
    yydate:[
      { "date": "8:00", "dateId": "1", "text": '' },
      { "date": "4:30", "dateId": "2", "text": '' },
      { "date": "5:00", "dateId": "3", "text": '' },
      { "date": "5:30", "dateId": "1", "text": '' },
      { "date": "6:00", "dateId": "2", "text": '' },
      { "date": "6:30", "dateId": "3", "text": '' },
      { "date": "7:00", "dateId": "1", "text": '' },
      { "date": "7:30", "dateId": "2", "text": '' },
      { "date": "8:00", "dateId": "1", "text": '' },
      { "date": "8:30", "dateId": "2", "text": ''},
      { "date": "9:00", "dateId": "3", "text": ''},
      { "date": "9:30", "dateId": "1", "text": '' },
      { "date": "10:00", "dateId": "2", "text": '' },
      { "date": "10:30", "dateId": "3", "text": '' },
      { "date": "11:00", "dateId": "1", "text": '' },
      { "date": "11:30", "dateId": "2", "text": '' },
      { "date": "12:00", "dateId": "3", "text": '' },
      { "date": "12:30", "dateId": "1", "text": '' },
      { "date": "13:00", "dateId": "2", "text": '' },
      { "date": "13:30", "dateId": "3", "text": '' },
      { "date": "14:00", "dateId": "1", "text": '' },
      { "date": "14:30", "dateId": "2", "text": '' },
      { "date": "15:00", "dateId": "3", "text": '' },
      { "date": "15:30", "dateId": "1", "text": '' },
      { "date": "16:00", "dateId": "2", "text": '' },
      { "date": "16:30", "dateId": "3", "text": '' },
      { "date": "17:00", "dateId": "1", "text": '' },
      { "date": "17:30", "dateId": "2", "text": '' },
      { "date": "18:00", "dateId": "3", "text": '' },
      { "date": "18:30", "dateId": "1", "text": '' },
      { "date": "19:00", "dateId": "2", "text": '' },
      { "date": "19:30", "dateId": "3", "text": '' },
      { "date": "20:00", "dateId": "1", "text": '' },
      { "date": "20:30", "dateId": "2", "text": '' },
      { "date": "21:00", "dateId": "3", "text": '' },
      { "date": "21:30", "dateId": "1", "text": '' },
      { "date": "22:00", "dateId": "2", "text": '' },
      { "date": "22:30", "dateId": "3", "text": '' },
      { "date": "23:00", "dateId": "1", "text": '' },
      { "date": "23:30", "dateId": "2", "text": '' },
      { "date": "24:00", "dateId": "3", "text": '' },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  goSelect: function (e) {
    wx.navigateTo({
      url: '../../hys/select/select'
    })
  },
  getTime: function (a,b,c,e) {
    var num=this.data.num;
    var reserveTime = e.target.dataset.time;
    console.log(reserveTime);
    this.setData({
      reserveTime: e.target.dataset.time,
    })
    num +=1;
    this.data.num=num;
    console.log(num);
    if(num>2){
      this.data.num=0;
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
    var that = this;
    //每次进入日程预定页触发该方法，先给定参数，这里将之前会议室列表页面的选中随机id拼接成字符串并赋给params中已经定义好的randomIds，通过接口获取页面显示参数，这边你还需要在全端选择日期的时候把选中的日期赋给params中的dateTime，onLoad方法只有在页面加载的时候触发一次，像这种每次访问页面都需更新页面数据的接口调用以后就写在onShow这个方法内
    var randomIds = '';
    for (var index in app.globalData.selectId){
      randomIds += app.globalData.selectId[index] + ',';
    }
  
    this.setData({
      params: {
        randomIds:randomIds
      }
    })
    util.requestLoading('/rest/api/findScheduleByConference', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {

          //跳转不同页面
          that.setData({
            dataList: res.dateList,
            dataTime: util.formatDate(new Date()),
            hysConferenceList: res.hysConferenceList
          })
          console.info(res);

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