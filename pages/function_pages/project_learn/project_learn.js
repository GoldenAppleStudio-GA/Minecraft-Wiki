// pages/minecraft_pages/project_learn/project_learn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp(),
    resource_base_path: "https://cdn.modrinth.com/",
    has_project_data: false,
    has_follow: false,
    project_id: "",
    project_data: {},
    data_ready:false,
    article: {},
    project_view_type:0
  },
  get_project_info(id, callback) {
    wx.request({
      url: "https://api.modrinth.com/v2/project/" + id,
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (result) => {
        if (result.statusCode === 200) {
          callback(result.data);
          getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:网络请求成功\n", result);
        } else {
          getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:网络请求错误\n", result);
          wx.showToast({
            title: "网络请求错误:" + result.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 500);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败:" + err.errno,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 500);
        getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:网络请求失败\n", err);
      }
    })
  },
  navigate_back(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:返回被点击\n", event);
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      app: getApp(),
      project_id: options.project_id
    });
    this.get_project_info(this.data.project_id, (res) => {
      this.setData({
        'project_data': res,
        'has_project_data': true
      });
      this.setData({
        'article': this.data.app.towxml(this.data.project_data.body, 'markdown', {
          base: this.data.resource_base_path, // 相对资源的base路径
          theme: 'dark', // 主题，默认`light`
          events: { // 为元素绑定的事件方法
            tap: (e) => {
              getApp().globalData.RealtimeLog.info('pages/function_pages/project_learn/project_learn:towxml>>\n', e);
            }
          }
        }),
        'data_ready':true
      });
    });
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:页面加载\n", options);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    })
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:初次渲染完成\n");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    })
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:页面显示\n");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})