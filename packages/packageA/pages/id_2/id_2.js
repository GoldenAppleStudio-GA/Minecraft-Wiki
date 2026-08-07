<<<<<<<< HEAD:packages/packageA/pages/id_2/id_2.js
// packages/packageA/pages/id_0/id_0.js
========
// pages/minecraft_pages/function_page/menu/menu.js
>>>>>>>> origin/release:pages/minecraft_pages/function_page/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu_page: 0,
    app: getApp()
  },

  navigate_back(event) {
    console.info("page_minecraft_function_menu:返回被点击\n", event);
    wx.navigateBack();
  },

  item_click(event) {
    console.info("page_minecraft_function_menu:项目(name:", event.currentTarget.dataset.name, ")被点击\n", event);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.info(options);
    this.setData({
      app: getApp(),
      menu_page: options.page_id
    });
<<<<<<<< HEAD:packages/packageA/pages/id_2/id_2.js
========
    console.info("page_minecraft_function_menu:页面加载完成\n", options);
>>>>>>>> origin/release:pages/minecraft_pages/function_page/menu/menu.js
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    });
<<<<<<<< HEAD:packages/packageA/pages/id_2/id_2.js
========
    console.info("page_minecraft_function_menu:页面初次渲染完成\n");
>>>>>>>> origin/release:pages/minecraft_pages/function_page/menu/menu.js
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    });
<<<<<<<< HEAD:packages/packageA/pages/id_2/id_2.js
========
    console.info("page_minecraft_function_menu:页面渲染\n");
>>>>>>>> origin/release:pages/minecraft_pages/function_page/menu/menu.js
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

  }, navigate_back(event) {
    console.info("page_minecraft_function_menu:返回被点击\n", event);
    wx.navigateBack();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})