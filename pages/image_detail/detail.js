var http = require("../../utils/http.js");

// pages/image_detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  saveToPhone: function () {
    var that = this
    var path = that.data.path

    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: function(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000,
        });
      }, 
      fail: function(res) {
        wx.showToast({
          title: '请稍后重试',
          icon: 'loading',
          duration: 1000,
        });
      }, 
    })
  },

  navToFeedback: function () {
    var that = this
    var content_type = 'cat_images'
    var id = that.data.id
    var base_url = '/pages/contact/feedback?id=' + id + '&type=' + content_type
    console.log(base_url)
    wx.navigateTo({
      url: base_url
    })
  },

  onLoad: function (options) {
    var that = this
    that.setData({
      title: options.title,
      created: options.created.split('T')[0],
      id: options.id,
      src: http.base_url.slice(0, -1) + options.src
    })
    wx.setNavigationBarTitle({
      title: that.data.title + '[id:' + that.data.id + ']'
    })

    var src = encodeURI(that.data.src)
    wx.getImageInfo({
      src: src,
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
        that.setData({
          path: res.path
        })
      },
      fail: function (res) {
        console.log('失败了')
        console.log(res)

      }
    })
    // var src = encodeURI(that.data.src)
    // wx.downloadFile({
    //   url: src, //仅为示例，并非真实的资源
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       path: res.tempFilePath
    //     })
    //   }
    // })
  },

  reBack: function () {
    wx.navigateBack()
  }
})