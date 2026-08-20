// index.js
Page({
  /**
   * 页面的初始数据
   */

  data: {
    app: getApp(),
    search_resource_list: {
      mod: {
        'title': "VeinMiner",
        'project_id': "OhduvhIc",
        'author': "Miraculixx",
        'downloads': "70.0M",
        'follows': "5.7K",
        'icon_url': "https://cdn.modrinth.com/data/OhduvhIc/5ea1f538e66ee4d4e5e571ad952cba0e06e0bd5c.png",
        'description': "Mine the whole vein on mining a single ore/block. Make the tedious mining experience to something satisfying and fun!"
      },
      modpack: {
        'title': "金苹果综合优化 GoldenApple Optimized",
        'project_id': "nEPdBliE",
        'author': "GoldenAppleStudio",
        'downloads': "546",
        'follows': "1",
        'icon_url': "https://cdn.modrinth.com/data/nEPdBliE/5f65882d87881a09e89cc0b2237e257f55d36a0c.png",
        'description': "一款优化辅助类整合包,相较原版增加了诸多实用性功能. An optimisation-oriented modpack that adds numerous practical functionalities to the vanilla game."
      },
      resourcepack: {
        'title': "Fresh Animations",
        'project_id': "50dA9Sha",
        'author': "FreshLX",
        'downloads': "42.4M",
        'follows': "1.4W",
        'icon_url': "https://cdn.modrinth.com/data/50dA9Sha/3132c10e9e3c73fde9799720fd3da5561071708c_96.webp",
        'description': "Make your game like the trailers! Dynamic animated entities to freshen your Minecraft experience."
      },
      shader: {
        'title': "OPAL Shaders",
        'project_id': "w8N6pbsN",
        'author': "FENVEN",
        'downloads': "35.5W",
        'follows': "255",
        'icon_url': "https://cdn.modrinth.com/data/w8N6pbsN/976c04d34460dc4a9e4abcf59f7dd46bba487371_96.webp",
        'description': "OPAL Shaders is a shaderpack for Minecraft Java Edition based on BSL Shaders created by Capt Tatsu.\nIt aims to blend a fantasy atmosphere with natural colors and contrast while staying true to Minecraft's original style."
      },
      datapack: {}
    }
  },
  project_mod_click(event) {
    getApp().globalData.RealtimeLog.info("pages/index/index:模组推荐被点击\n", event);
    wx.navigateTo({
      url: "/pages/function_pages/project_learn/project_learn?project_id=" + this.data.search_resource_list.mod.project_id
    });
  },
  project_resourcepack_click(event) {
    getApp().globalData.RealtimeLog.info("pages/index/index:资源包推荐被点击\n", event);
    wx.navigateTo({
      url: "/pages/function_pages/project_learn/project_learn?project_id=" + this.data.search_resource_list.resourcepack.project_id
    });
  },
  project_modpack_click(event) {
    getApp().globalData.RealtimeLog.info("pages/index/index:整合包推荐被点击\n", event);
    wx.navigateTo({
      url: "/pages/function_pages/project_learn/project_learn?project_id=" + this.data.search_resource_list.modpack.project_id
    });
  },
  project_shader_click(event) {
    getApp().globalData.RealtimeLog.info("pages/index/index:光影包推荐被点击\n", event);
    wx.navigateTo({
      url: "/pages/function_pages/project_learn/project_learn?project_id=" + this.data.search_resource_list.shader.project_id
    })
  },
  search_request() {
    var search_text = "abcdefghijklmnopqrstuvwxyz" [Math.floor(Math.random() * 26)];
    wx.request({
      url: "https://api.modrinth.com/v2/search",
      data: {
        query: search_text, // 空表示搜索全部
        facets: [
          ["project_type:mod"]
        ],
        index: 'relevance', // 排序方式:relevance | downloads | follows | newest | updated
        limit: 1,
        offset: 0
      },
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/index/index:网络请求成功\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list.mod': this.arry_number(res.data.hits)[0]
          });
        } else {
          wx.showToast({
            title: "网络请求错误:" + res.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 1000)
        };
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败:" + err.errno,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 1000)
        getApp().globalData.RealtimeLog.error("pages/index/index:网络请求失败\n", err)
      }
    });
    search_text = "abcdefghijklmnopqrstuvwxyz" [Math.floor(Math.random() * 26)];
    wx.request({
      url: "https://api.modrinth.com/v2/search",
      data: {
        query: search_text, // 空表示搜索全部
        facets: [
          ["project_type:resourcepack"]
        ],
        index: 'relevance', // 排序方式:relevance | downloads | follows | newest | updated
        limit: 1,
        offset: 0
      },
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/index/index:网络请求成功\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list.resourcepack': this.arry_number(res.data.hits)[0]
          })
        } else {
          wx.showToast({
            title: "网络请求错误:" + res.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 1000)
        };
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败:" + err.errno,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 1000)
        getApp().globalData.RealtimeLog.error("pages/index/index:网络请求失败\n", err)
      }
    });
    search_text = "abcdefghijklmnopqrstuvwxyz" [Math.floor(Math.random() * 26)];
    wx.request({
      url: "https://api.modrinth.com/v2/search",
      data: {
        query: search_text, // 空表示搜索全部
        facets: [
          ["project_type:shader"]
        ],
        index: 'relevance', // 排序方式:relevance | downloads | follows | newest | updated
        limit: 1,
        offset: 0
      },
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/index/index:网络请求成功\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list.shader': this.arry_number(res.data.hits)[0]
          })
        } else {
          wx.showToast({
            title: "网络请求错误:" + res.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 1000)
          getApp().globalData.RealtimeLog.error("pages/index/index:网络请求失败\n", err)
        }
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败:" + err.errno,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 1000)
        getApp().globalData.RealtimeLog.error("pages/index/index:网络请求失败\n", err)
      }
    });
    search_text = "abcdefghijklmnopqrstuvwxyz" [Math.floor(Math.random() * 26)];
    wx.request({
      url: "https://api.modrinth.com/v2/search",
      data: {
        query: search_text, // 空表示搜索全部
        facets: [
          ["project_type:modpack"]
        ],
        index: 'relevance', // 排序方式:relevance | downloads | follows | newest | updated
        limit: 1,
        offset: 0
      },
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/index/index:网络请求成功\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list.modpack': this.arry_number(res.data.hits)[0]
          })
        } else {
          wx.showToast({
            title: "网络请求错误:" + res.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 1000)
          getApp().globalData.RealtimeLog.error("pages/index/index:网络请求失败\n", err)
        }
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败:" + err.errno,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 1000)
        getApp().globalData.RealtimeLog.error("pages/index/index:网络请求失败\n", err)
      }
    });
  },
  download_number(num) {
    if (!num || num < 0) return '0';
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'; // 10亿+
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'; // 百万+
    if (num >= 10000) return (num / 10000).toFixed(1) + 'W'; // 万+
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'; // 千+
    return num.toString();
  },
  arry_number(array) {
    return array.map(item => ({
      ...item,
      downloads: this.download_number(item.downloads),
      follows: this.download_number(item.follows)
    }));
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      app: getApp()
    });
    this.search_request();
    getApp().globalData.RealtimeLog.info("pages/index/index:页面加载完成\n", options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/index/index:页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/index/index:页面渲染");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.search_request();
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