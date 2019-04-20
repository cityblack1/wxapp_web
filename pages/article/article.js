var app = getApp() 
Page({ 
 data: { 
  title: '',
  content: '',
  navbar: ['联系我', '关于我'], 
  currentTab: 0, 
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
   if (this.data.content && this.data.title) {
     var context = this;
     var url = 'https://cityblack1.cc/feedback/contact/';
     wx.showToast({
       title: '提交中',
       icon: 'loading',
       duration: 100000
     });
     wx.request({
       url: url,
       data: {
         title: context.data.title,
         content: context.data.content
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
             duration: 1000,
             success: function (res) {
               context.setData({
                 content: "", 
                 title: ''
               });
             },
            //  complete: function (e) {
            //    wx.navigateBack({
            //      delta: 1, // 回退前 delta(默认为1) 页面
            //    })
            //  }
           });
         }else{
           var map_dic = {'title': '标题', 'content':'内容'}
           var errors = res.data
           var error_msg = ''
           for(var i in errors){
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

 navbarTap: function(e){ 
  this.setData({ 
   currentTab: e.currentTarget.dataset.idx 
  }) 
 }

}) 