Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'出错了呢'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.message != null){
      this.setData({
        message: options.message
      })
    }
  }
})