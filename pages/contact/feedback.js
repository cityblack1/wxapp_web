// pages/contact/feedback.js
Page({

  data: {
    title: '',
    content: '',
    object_id: 0,
    content_type: ''
  },

  onLoad: function (options) {
    var that = this
    that.setData({
      object_id: options.id,
      content_type: options.type == 'cat_images'? 12: 2
    })
    wx.setNavigationBarTitle({
      title: '举报' + '[id:' + that.data.object_id + ']'
    })
  }, 

  bindTextArea: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  bindTitleArea: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  bindSubmit: function () {
    if (this.data.content && this.data.title && this.data.object_id && this.data.content_type) {
      var context = this;
      var url = 'https://cityblack1.cc/feedback/feedback/';
      wx.showToast({
        title: '提交中',
        icon: 'loading',
        duration: 100000
      });
      wx.request({
        url: url,
        data: {
          title: context.data.title,
          content: context.data.content,
          object_id: context.data.object_id,
          content_type: context.data.content_type
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          wx.hideToast();
          if (res.statusCode == 201) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: function (res) {
                context.setData({
                  content: "",
                  title: ''
                });
              },
               complete: function (e) {
                 setTimeout(function () {
                   wx.navigateBack({
                     delta: 1, // 回退前 delta(默认为1) 页面
                   })
                 }, 1000)
                 
               }
            });
          } else {
            var map_dic = { 'title': '标题', 'content': '内容' }
            var errors = res.data
            var error_msg = ''
            for (var i in errors) {
              if(!i){i = '错误'};
              error_msg += ("[" + map_dic[i] + "]" + errors[i] + '\n')
            }
            wx.showModal({
              title: '错误',
              content: error_msg,
              showCancel: false
            })
          }
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },

})