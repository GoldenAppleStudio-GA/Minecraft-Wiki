// packages/packageA/pages/id_0/id_0.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp(),
    page_data: "<h3>加载中...</h3>",
    item_name: "1_0_0_0_0"
  },
  navigate_back(event) {
    getApp().globalData.RealtimeLog.info("packageA>>pages/id_1/id_1:返回被点击\n", event);
    wx.navigateBack();
  },
  cleanHtml(htmlText) {
    if (!htmlText) return '';

    let result = htmlText;

    // 1. 提取 body 内容
    const bodyMatch = result.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      result = bodyMatch[1];
    }

    // 2. 移除所有图片相关标签（增强版）
    // 移除 img 标签（所有写法）
    result = result.replace(/<img\s+[^>]*\/?>/gi, '');
    result = result.replace(/<img[^>]*>/gi, '');

    // 移除 picture 标签
    result = result.replace(/<picture[^>]*>[\s\S]*?<\/picture>/gi, '');

    // 移除 figure 标签
    result = result.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '');

    // 移除带有背景图片的标签
    result = result.replace(/<[^>]*background-image[^>]*>/gi, '');

    // 移除 object 标签
    result = result.replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '');

    // 移除 embed 标签
    result = result.replace(/<embed[^>]*>/gi, '');

    // 3. 移除 script 和 style
    result = result.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    result = result.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    result = result.replace(/<link[^>]*>/gi, '');

    // 4. 移除所有 style 属性（包括背景图片）
    result = result.replace(/style\s*=\s*["'][^"']*["']/gi, '');

    // 5. 移除所有 data-* 属性（可能包含图片路径）
    result = result.replace(/\s+data-[a-z-]*\s*=\s*["'][^"']*["']/gi, '');

    // 6. 移除 srcset 属性
    result = result.replace(/\s+srcset\s*=\s*["'][^"']*["']/gi, '');

    // 7. 移除 background 属性
    result = result.replace(/\s+background\s*=\s*["'][^"']*["']/gi, '');

    // 8. 移除 poster 属性（视频封面）
    result = result.replace(/\s+poster\s*=\s*["'][^"']*["']/gi, '');

    // 9. 移除包含图片路径的链接
    result = result.replace(/\s+src\s*=\s*["'][^"']*\.(png|jpg|jpeg|gif|svg|webp)[^"']*["']/gi, '');

    // 10. 移除空的图片相关标签残留
    result = result.replace(/<a[^>]*><\/a>/gi, '');
    result = result.replace(/<div[^>]*><\/div>/gi, '');

    // 11. 清理多余的空行和空白
    result = result.replace(/^\s*[\r\n]/gm, '');
    result = result.replace(/\n{3,}/g, '\n\n');
    result = result.trim();

    return result;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      app: getApp(),
      item_name: options.name
    });
    wx.request({
      url: "https://zh.minecraft.wiki/w/%E7%83%A7%E7%82%BC",
      data: {},
      success: (res) => {
        getApp().globalData.RealtimeLog.info("packageA>>pages/id_1/id_1:网络请求成功\n", res);
        if (res.statusCode === 200) {
          this.setData({
            page_data: this.cleanHtml(res.data)
          });
        } else {
          getApp().globalData.RealtimeLog.error("packageA>>pages/id_1/id_1:网络请求错误\n", res);
          wx.showToast({
            title: "加载错误",
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000);
        };
      },
      fail: (err) => {
        getApp().globalData.RealtimeLog.error("packageA>>pages/id_1/id_1:网络请求失败\n", err);
        wx.showToast({
          title: "加载失败",
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }
    });
    getApp().globalData.RealtimeLog.info("packageA>>pages/id_1/id_1:页面加载\n", options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("packageA>>pages/id_1/id_1:页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("packageA>>pages/id_1/id_1:页面渲染");
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

})