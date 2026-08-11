// pages/agreePrivacy/agreePrivacy.js
Page({
  data: {
    app: getApp(),
    privacyName: "《我的世界百科小程序隐私保护指引》"
  },

  onLoad(options) {
    this.setData({
      app: getApp(),
    });
    getApp().globalData.RealtimeLog.info("page_agreePrivacy:页面加载完成\n", options);
  },

  agreePrivacy(event) {
    getApp().globalData.RealtimeLog.info("用户同意隐私协议:\n", event);
    const app = getApp();

    // 1. 调用 resolve 通知微信
    if (app.globalData.privacyResolve) {
      try {
        app.globalData.privacyResolve({
          buttonId: 'agree-btn',
          event: 'agree'
        });
        getApp().globalData.RealtimeLog.info("已调用 privacyResolve");
      } catch (e) {
        getApp().globalData.RealtimeLog.error("调用 resolve 失败:", e);
      }
    }

    // 2. 更新状态
    app.globalData.showPrivacy = false;
    app.globalData.privacyResolve = null;
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  // 用户点击"不同意"
  disagree(event) {
    getApp().globalData.RealtimeLog.info("用户不同意隐私协议:\n", event);
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  // 查看隐私协议
  agreePrivacy_page(event) {
    wx.openPrivacyContract();
  },

  onReady() {
    getApp().globalData.RealtimeLog.info("page_agreePrivacy:页面初次渲染完成");
  },

  onShow() {
    getApp().globalData.RealtimeLog.info("page_agreePrivacy:页面渲染");
  },

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {},

  onReachBottom() {},

  onShareAppMessage() {}
});