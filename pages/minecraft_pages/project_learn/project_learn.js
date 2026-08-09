// pages/minecraft_pages/project_learn/project_learn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp(),
    project_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.info("/pages/minecraft_pages/project_learn/project_learn:页面加载\n", options);
    this.setData({
      app: getApp(),
      project_id: options.project_id
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    })
    console.info("/pages/minecraft_pages/project_learn/project_learn:初次渲染完成\n", options);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    })
    console.info("/pages/minecraft_pages/project_learn/project_learn:页面显示\n", options);
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