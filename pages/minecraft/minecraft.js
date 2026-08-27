// pages/minecraft/minecraft.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp(),
    Timeout_number: Number
  },
  item_click(event) {
    getApp().globalData.RealtimeLog.info("pages/minecraft/minecraft:项目(id=", event.currentTarget.dataset.itemid, ")被点击\n", event);
    const APP = getApp();
    const update_1 = APP.globalData.all_data.runtime_data.minecraft_data.main[event.currentTarget.dataset.itemid].style = "page_item_click";

    this.setData({
      app: {
        ...APP,
        ...update_1
      }
    });
    const update_2 = APP.globalData.all_data.runtime_data.minecraft_data.main[event.currentTarget.dataset.itemid].style = "page_item";
    this.data.Timeout_number = setTimeout(() => {
      this.setData({
        app: {
          ...APP,
          ...update_2
        }
      });
    }, 70);
    wx.navigateTo({
      url: "/pages/function_pages/menu/menu?page_id=" + event.currentTarget.dataset.itemid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/minecraft/minecraft:页面加载完成\n", options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/minecraft/minecraft:页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/minecraft/minecraft:页面渲染");
    this.data.app.reload_runtime_data();
    this.setData({
      app: getApp()
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    getApp().reload_runtime_data();
    clearTimeout(this.data.Timeout_number);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    getApp().reload_runtime_data();
    clearTimeout(this.data.Timeout_number);
  }
})