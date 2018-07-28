var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      randomIds: '14281909272509',
      dateTime:'',
    },
    hydata:[],
    selectLength:'0',
    dataList:[],
    dataTime:'',
    reserveTime:'',
    hysConferenceList:[],
    // 会议室位置
    hyIndex:'-1',
    // 开始时间位置
    startIdex:-1, 
    // 会议室id
    endIndex: 50, 
     // 点击次数
    cek:0,
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
  getTime: function (e) {
    var num=this.data.num;
    var reserveTime = e.target.dataset.time;
    // console.log(reserveTime);
    this.setData({
      reserveTime: e.target.dataset.time,
    })

  },
  aaaa:function(e){
    var hyIndex= e.currentTarget.dataset.index;
    // console.log(hyIndex)
    var startIdex= e.target.dataset.index;
    console.log(startIdex)
    var cek = e.target.dataset.cek;
    
    // e.target.dataset.cek = 1;
    // var cek = e.target.dataset.cek;
      // cek= 1;
  
// console.log(e)
      
 
      
      this.setData({
        cek: 1
      })
    console.log(cek)

      // console.log(this.data.cek)
    

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
          // console.info(res);

          //跳转不同页面
          that.setData({
            dataList: res.dateList,
            hydata:res.data,
            dataTime: util.formatDate(new Date()),
            hysConferenceList: res.hysConferenceList
          })
          console.log(res.data)
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