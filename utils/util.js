// const httpURL = "http://10.100.2.42:8080";
  //const httpURL = "http://localhost:8080";
const httpURL = "https://syq.onecc.net/HYS";
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, params, message, success, fail) {
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
      icon:'none',
      mask:true,
    })
  }
  wx.request({
    url: httpURL+url,
    data: params,
    header: {
      //'Content-Type': 'application/json'
      'Cookie': 'uuid='+wx.getStorageSync('header'),
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}

//消息提醒框
const showMessage = dataInfo => {
  wx.showToast({
    title: dataInfo.content,
    mask:true
  }),
  setTimeout(function () {
    wx.hideToast()
  }, 2000)
}
//登陆超时处理
const login = dataInfo =>{
  wx.showToast({
    title: '登陆超时',
    mask: true,
    icon: 'loading',
  }),
    setTimeout(function () {
      wx.hideToast(),
      wx.redirectTo({
        url: dataInfo.url
      })
    }, 1000)
}

/**
 * 格式化时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 格式化时间(无时分秒)
 */
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

/**
 * 用于判断空，Undefined String Array Object
 */
const isBlank = str => {
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  requestLoading: requestLoading,
  showMessage: showMessage,
  formatTime: formatTime,
  login:login,
  isBlank: isBlank,
  formatDate: formatDate
}
