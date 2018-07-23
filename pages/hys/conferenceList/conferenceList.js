var app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
    currentTab: 0,
    followList:[],
    createList:[],
    params:{
      type:'follow',
      formId: ''
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.loadData();
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if (e.detail.current == 0){
      that.setData({
        params: {
          type: 'follow'
        }
      });
    }else{
      that.setData({
        params: {
          type: 'create'
        }
      });
    }
    this.loadData();
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  testSubmit: function(e){
    var that = this;
    util.requestLoading('/rest/api/test', this.data.params, '正在加载',
      function (res) {
        if (res.code == 200) {
          //跳转不同页面
          
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
  loadData: function(e){
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
            that.setData({
              createList: res.data
            })
            console.info(that.data.createList);
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
  }
})