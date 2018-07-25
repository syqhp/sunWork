// pages/hys/wxCode/wxCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'https://syq.onecc.net/HYS/static/qrCode/08140412193213.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   imgUrl: 'https://syq.onecc.net/HYS/static/qrCode/'+options.randomId+'.png'
    // });
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
  
  },
  show: function(e){

    wx.previewImage({
      current: this.data.imgUrl, // 当前显示图片的http链接
      urls: [this.data.imgUrl] // 需要预览的图片http链接列表
    })
  },
  saveImage: function(e){
    var that = this;
    wx.downloadFile({
      url: that.data.imgUrl,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功!',
              icon: 'success',
              duration: 1500
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success(settingdata) {
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    wx.showToast({
                      title: '授权成功，请再次点击保存图片按钮!',
                      icon: 'success',
                      duration: 1500
                    })
                    setTimeout(function () {
                      wx.hideToast()
                    }, 2000)
                  } else {
                    wx.showToast({
                      title: '授权失败，图片无法保存至本地!',
                      image: '../../../image/tx.png',
                      duration: 1500
                    })
                    setTimeout(function () {
                      wx.hideToast()
                    }, 2000)
                  }
                }
              })
            }
          }
        })
      }
    })
  }
})