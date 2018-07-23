// pages/hys/hyDetail/hyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
   getMore:function(e){
     wx.showActionSheet({
       itemList: ['邀请', '删除'],
       success: function (res) {
         console.log(res.tapIndex)
         if (res.tapIndex == 1) {
           wx.showModal({
             cancelText: "取消",
             confirmText: '确定',
             title: '确定删除',
             content: '您确认删除本次日程吗？',
             success: function (res) {
               if (res.confirm) {
                 console.log('用户点击确定')
               } else if (res.cancel) {
                 console.log('用户点击取消')
               }
             }
           })
         }
       },
       fail: function (res) {
           console.log(deleteId)
         
        
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
  
  }
})