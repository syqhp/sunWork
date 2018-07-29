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
    hydata:[],
    selectLength:'0',
    dataListAll: [],
    dataList:[],
    dataTime:'',
    reserveTime:'',
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hysConferenceList:[],
    // 会议室位置
    hyIndex:-1,
    // 开始时间位置
    startIdex:-1, 
    // 会议室id
    endIdex: -1, 
     // 点击次数
    cek:0,
    //创建会议参数
    hyRandomId:'',
    hyName:'',
    hyDateTime:'',
    hyBeginDate:'',
    hyBeginDateTime:'',
    hyEndDate:'',
    hyEndDateTime:''
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
    var that = this;
    //每次进入日程预定页触发该方法，先给定参数，这里将之前会议室列表页面的选中随机id拼接成字符串并赋给params中已经定义好的randomIds，通过接口获取页面显示参数，这边你还需要在全端选择日期的时候把选中的日期赋给params中的dateTime，onLoad方法只有在页面加载的时候触发一次，像这种每次访问页面都需更新页面数据的接口调用以后就写在onShow这个方法内
    var randomIds = '';
    for (var index in app.globalData.selectId){
      randomIds += app.globalData.selectId[index] + ',';
    }
  
    this.setData({
      hyIndex: -1,
      // 开始时间位置
      startIdex: -1,
      // 会议室id
      endIdex: -1,
      // 点击次数
      cek: 0,
      params: {
        randomIds:randomIds
      }
    })
    that.findScheduleByConference();
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
  goSelect: function (e) {
    wx.navigateTo({
      url: '../../hys/select/select'
    })

  },
  getTime: function (e) {
    var num = this.data.num;
    var reserveTime = e.target.dataset.time;
    // console.log(reserveTime);
    this.setData({
      reserveTime: e.target.dataset.time,
    })

  },
  checkView: function (e) {
    var that = this;
    var wzindex = e.currentTarget.dataset.wzindex;
    var index = e.currentTarget.dataset.index;
    var hyIndex = that.data.hyIndex;
    var startIdex = that.data.startIdex;
    var endIdex = that.data.endIdex;
    var cek = that.data.cek;
    var hyBeginDate = '';
    var hyEndDate = '';
    if (hyIndex == -1 || hyIndex == wzindex){
      //同一个会议室
      if (cek == 0){
        //第一次点击
        hyIndex = wzindex;
        cek = 1;
        startIdex = index;
        endIdex = index;
      }else if (cek == 1){
        cek = 2;
        //第二次点击
        if (startIdex == index) {
          //点击同一区域
          cek == 0;
          startIdex = -1;
          endIdex = -1;          
        } else {
          //点击不同区域
          if(index < startIdex){
            //第一次的值比第二次大
            endIdex = startIdex;
            startIdex = index;
          }else{
            //正常
            endIdex = index
          }
          var fs = false;
          for (var i = 0; i < that.data.hydata[hyIndex].length; i++) {
            var map ={};
            map = that.data.hydata[hyIndex][i];
            if (map.type != 0 && i>=startIdex && i<=endIdex){
              fs = true;
                break;
            }
          }
          if(fs){
            cek = 1;
            startIdex = index;
            endIdex = index;
          }
        }
      }else if (cek == 2){
          cek = 1;
          startIdex = index;
          endIdex = index;
      }
    }else{
      //不同会议室
      hyIndex = wzindex;
      cek = 1;
      startIdex = index;
      endIdex = index;
    }
    if (endIdex == 47){
      hyBeginDate = that.data.hydata[hyIndex][startIdex].date;
      hyEndDate = '00:00';
    }else{
      hyBeginDate = that.data.hydata[hyIndex][startIdex].date;
      hyEndDate = that.data.hydata[hyIndex][endIdex + 1].date;
    }
    
    that.setData({
      hyIndex: hyIndex,
      startIdex: startIdex,
      endIdex: endIdex,
      cek: cek,
      hyRandomId: that.data.hysConferenceList[hyIndex].randomId,
      hyName: that.data.hysConferenceList[hyIndex].conferenceName,
      hyDateTime: that.data.dataTime,
      hyBeginDate: hyBeginDate,
      hyBeginDateTime: that.data.dataTime + ' ' + hyBeginDate,
      hyEndDate: hyEndDate,
      hyEndDateTime: that.data.dataTime + ' ' + hyEndDate
    })
  },
  createSchedule: function(){
    wx.redirectTo({
      url: '../common/error/error?message=' + res.message
    })
  },
  findScheduleByConference: function(){
    var that = this;
    util.requestLoading('/rest/api/findScheduleByConference', that.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          var dataList = res.dateList;
          var dataListAll = [dataList.slice(0, 7), dataList.slice(7, 14), dataList.slice(14, 21), dataList.slice(21, 28)];
          //跳转不同页面
          that.setData({
            dataList: res.dateList,
            hydata: res.data,
            hysConferenceList: res.hysConferenceList,
            dataList: res.dateList,
            dataTime: res.date,
            dataListAll: dataListAll,
          })
          console.log(that.data.hydata)
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
  }
  
})