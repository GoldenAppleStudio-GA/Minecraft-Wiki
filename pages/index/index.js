// index.js
Page({
  /**
   * 页面的初始数据
   */

  data: {
    app: getApp(),
    search_resource_list: {
      mod: {},
      modpack: {
        'title': "金苹果综合优化 GoldenApple Optimized",
        'project_id': "nEPdBliE",
        'author': "GoldenAppleStudio",
        'downloads': "546",
        'follows': "1",
        'icon_url': "https://cdn.modrinth.com/data/nEPdBliE/5f65882d87881a09e89cc0b2237e257f55d36a0c.png",
        'description': "一款优化辅助类整合包,相较原版增加了诸多实用性功能. An optimisation‑oriented modpack that adds numerous practical functionalities to the vanilla game."
      },
      resourcepack: {},
      shader: {}
    }
  },
  copy_mod_id(event) {
    console.info("复制ID被点击:\n", event);
    wx.setClipboardData({
      data: this.data.search_resource_list.mod.project_id,
      success: (res) => {
        console.info("设置剪切板成功:\n", res);
        wx.showToast({
          title: "已复制项目ID",
          icon: "success",
          duration: 1500,
          complete: (res) => {
            wx.hideToast
          }
        })
      },
      fail: (err) => {
        console.error("设置剪切板失败:\n", err);
      }
    })
  },
  copy_modpack_id(event) {
    console.info("复制ID被点击:\n", event);
    wx.setClipboardData({
      data: this.data.search_resource_list.modpack.project_id,
      success: (res) => {
        console.info("设置剪切板成功:\n", res);
        wx.showToast({
          title: "已复制项目ID",
          icon: "success",
          duration: 1500,
          complete: (res) => {
            wx.hideToast
          }
        })
      },
      fail: (err) => {
        console.error("设置剪切板失败:\n", err);
      }
    })
  },
  copy_resourcepack_id(event) {
    console.info("复制ID被点击:\n", event);
    wx.setClipboardData({
      data: this.data.search_resource_list.resourcepack.project_id,
      success: (res) => {
        console.info("设置剪切板成功:\n", res);
        wx.showToast({
          title: "已复制项目ID",
          icon: "success",
          duration: 1500,
          complete: (res) => {
            wx.hideToast
          }
        })
      },
      fail: (err) => {
        console.error("设置剪切板失败:\n", err);
      }
    })
  },
  copy_shader_id(event) {
    console.info("复制ID被点击:\n", event);
    wx.setClipboardData({
      data: this.data.search_resource_list.shader.project_id,
      success: (res) => {
        console.info("设置剪切板成功:\n", res);
        wx.showToast({
          title: "已复制项目ID",
          icon: "success",
          duration: 1500,
          complete: (res) => {
            wx.hideToast
          }
        })
      },
      fail: (err) => {
        console.error("设置剪切板失败:\n", err);
      }
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
        console.info("page_index:网络请求成功:\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list.mod': this.arry_number(res.data.hits)[0]
          });
        } else {
          wx.showToast({
            title: "page_index:网络请求错误:" + res.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 500)
        };
      },
      fail: (err) => {
        wx.showToast({
          title: "page_index:网络请求错误:" + res.statusCode,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 500)
        console.error("page_index:网络请求失败:\n", err)
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
        console.info("page_index:网络请求成功:\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list.resourcepack': this.arry_number(res.data.hits)[0]
          })
        } else {

        }
      },
      fail: (err) => {
        wx.showToast({
          title: "page_mindex:网络请求错误:" + res.statusCode,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 500)
        console.error("page_index:网络请求失败:\n", err)
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
        console.info("page_index:网络请求成功:\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list.shader': this.arry_number(res.data.hits)[0]
          })
        } else {
          wx.showToast({
            title: "page_index:网络请求错误:" + res.statusCode,
            icon: "none"
          });
          setTimeout(() => {
            wx.hideToast()
          }, 500)
          console.error("page_index:网络请求失败:\n", err)
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: "page_index:网络请求错误:" + res.statusCode,
          icon: "none"
        });
        setTimeout(() => {
          wx.hideToast()
        }, 500)
        console.error("page_index:网络请求失败:\n", err)
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
    this.search_request();
    this.setData({
      app: getApp()
    });
    console.info("page_index:页面加载完成\n", options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    });
    console.info("page_index:页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    });
    console.info("page_index:页面渲染");
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