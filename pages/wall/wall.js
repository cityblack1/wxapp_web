//index.js
var http = require("../../utils/http.js");
var app = getApp()
Page({
  data: {
    new_images: [],
    index: 0,
    phone_width: 0,
    pixel: 0,
    array: ['点击次数', '创建时间', '随机推荐'],
    order: 0,
    hidden: true,
    image_urls: [],
  },

  preview_images: function(res){
    var that = this
    var current = 'https://cityblack1.cc' + res.target.dataset.src
    var urls = that.data.image_urls
    wx.previewImage({
      current: current,
      urls: urls
    })  
  },

  navToDetail: function (e) {
    var item_data = e.target.dataset
    item_data['id'] = e.target.id
    var base_url = '/pages/image_detail/detail?'
    for (var i in item_data) {
      base_url += i+'='+item_data[i]+'&'
    }
    console.log(base_url)
    wx.navigateTo({
      url: base_url
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value == this.data.order) {
      return
    }
    this.setData({
      order: e.detail.value,
      new_images: [], 
      index: 0
    })
    this.getPopular()
  },

  tapName: function (event) {
    this.getPopular();
  },

  getWidth: function (width) {
    var context = this
    context.setData({
      phone_width: width
    });
  },

  getPopular: function () {
    var url = http.generateUrl('api/images/cat-images')
    var context = this;
    var order = context.data.order;
    var allMsg = context.data.new_images;
    var image_urls = []
    context.setData({
      hidden: false
    });
    wx.request({
      url: url,
      data: {
        'index': context.data.index,
        'phone_width': context.data.phone_width,
        'pixel': context.data.pixel,
        'order': order
      },
      method: 'GET',
      success: function (res) {
        console.log('submit success');
        for (var i = 0; i < res.data.data.length; i++) {
          allMsg.push(res.data.data[i]);
        }
        for (var item in allMsg) {
          for (var i in allMsg[item]){
            image_urls.push('https://cityblack1.cc' + allMsg[item][i].image)
          }
        }
        context.setData({
          image_urls: image_urls,
          new_images: allMsg,
          index: res.data.index,
          hidden: true
        });
      },
    })
  },

  onLoad: function () {
    wx.getSystemInfo({
      success: function (res) {
        getCurrentPages()[0].setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          phone_width: res.windowWidth,
          pixel: res.pixelRatio
        });
      }
    })
    this.getPopular()
  }
})