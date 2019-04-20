var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var app = getApp()
var http = require("../../utils/http.js");
var demo = new QQMapWX({
  key: 'N7EBZ-WYE3F-O6CJQ-NK2ZB-YQHQE-Z2BFX' // 必填
});

Page({
  data: {
    src: '/static/images/4.png',
    loc: '',
    has_get_image: false,
    value: ''
  },

  gotoShow: function () {
    var that = this
    wx.chooseImage({
      count: 1, 
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          src: res.tempFilePaths[0], 
          has_get_image: true
        })
      }
    })
  },

  upload: function (page, path, form_data) {
    var url = 'https://cityblack1.cc/api/images/upload-images/'
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
      wx.uploadFile({
        url: url,
        filePath: path,
        name: 'file',
        header: { "Content-Type": "multipart/form-data" },
        formData:form_data,
        success: function (res) {
          console.log(res);
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          wx.showModal({
            title: '提示',
            content: '上传成功, 管理员审核中',
            confirmText: '继续上传',
            showCancel: false
          })
        },
        fail: function (e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          page.setData({
            src: '', 
            value: ''
          })
          wx.hideToast();  //隐藏Toast
        }
      })
  },

  formSubmit: function (e) {
    var form_data = e.detail.value
    var that = this
    if (!that.data.has_get_image) {
      wx.showModal({
        title: '提示',
        content: '请先上传图片',
        showCancel: false
      })
      return
    }
    that.upload(this, this.data.src, form_data)
  },

  formReset: function () {
    this.setData({
      src : ''
    })
  }
  
})