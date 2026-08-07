// pages/agreePrivacy/agreePrivacy.js
Page({
  data: {
    app: null,
    privacyName: ''
  },

  onLoad(options) {
    const app = getApp();
    this.setData({
      app: app,
      privacyName:  "《我的世界百科小程序隐私保护指引》"
    });
    console.info("page_agreePrivacy:页面加载完成", options);
  },

  agreePrivacy(event) {
    console.info("用户同意隐私协议:", event);
    const app = getApp();

    // 1. 调用 resolve 通知微信
    if (app.globalData.privacyResolve) {
      try {
        app.globalData.privacyResolve({
          buttonId: 'agree-btn',
          event: 'agree'
        });
        console.info("已调用 privacyResolve");
      } catch (e) {
        console.error("调用 resolve 失败:", e);
      }
    }

    // 2. 更新状态
    app.globalData.showPrivacy = false;
    app.globalData.privacyResolve = null;

    // 3. 返回上一页
    wx.navigateBack({
      fail: () => {
        // 如果没有上一页，跳转到首页
        wx.reLaunch({
          url: '/pages/index/index'
        });
      }
    });
  },

  // ✅ 用户点击"不同意"
  disagree(event) {
    console.info("用户不同意隐私协议:", event);
    wx.navigateBack()
  },

  // ✅ 查看隐私协议
  agreePrivacy_page(event) {
    wx.openPrivacyContract({});
  },

  onReady() {
    console.info("page_agreePrivacy:页面初次渲染完成");
  },

  onShow() {
    console.info("page_agreePrivacy:页面渲染");
  },

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {},

  onReachBottom() {},

  onShareAppMessage() {}
});