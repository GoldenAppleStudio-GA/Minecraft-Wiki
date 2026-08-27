// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp()
  },
  contact(event) {
    getApp().globalData.RealtimeLog.warn("pages/more/more:用户进入客服会话", event);
  },
  debug(event) {
    wx.setStorageSync('debug_mode', true);
    wx.showToast({
      title: "调试已启用",
      icon: "none"
    });
    setTimeout(() => {
      wx.hideToast();
    }, 1000);
    getApp().globalData.RealtimeLog.warn("pages/more/more:调试已启用");
    wx.setEnableDebug({
      enableDebug: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/more/more:页面加载完成\n", options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/more/more:页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/more/more:页面渲染");
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

  }
})