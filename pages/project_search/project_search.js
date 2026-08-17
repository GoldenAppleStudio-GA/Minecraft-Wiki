// pages/mods/mods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp(),
    message: {
      has_message: false,
      type: "",
      data: ""
    },
    disabled_search_button: false,
    mod_types_view: ["模组", "整合包", "资源包", "光影包"],
    mod_types: ["mod", "modpack", "resourcepack", "shader"],
    mod_search_config: {
      mod_game_version: null,
      mod_name: "",
      mod_type: 0
    },
    search_resource_list: [],
    net_request_data: String,
    search_resource_page: 1,
    search_resource_page_number: 0,
  },
  search_page_back(event) {
    if (!this.data.search_resource_page <= 1) {
      this.setData({
        'search_resource_page': --this.data.search_resource_page
      })
    };
    this.search_request(this.data.mod_search_config.mod_name, this.data.mod_types[this.data.mod_search_config.mod_type], this.data.mod_search_config.mod_game_version);
  },
  search_page_next(event) {
    if (this.data.search_resource_page < this.data.search_resource_page_number) {
      this.setData({
        'search_resource_page': ++this.data.search_resource_page
      });
      this.search_request(this.data.mod_search_config.mod_name, this.data.mod_types[this.data.mod_search_config.mod_type], this.data.mod_search_config.mod_game_version);
    };

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
  add_search_resource_page(type) {
    if (type === "+") {
      this.data.search_resource_page = ++this.data.search_resource_page;
    } else if (type === "-") {
      if (this.data.search_resource_page >= 1) {
        this.data.search_resource_page = --this.data.search_resource_page;
      }
    };
    return
  },
  getModTypeValue(data) {
    const type = data;
    // 如果是 undefined、null、空字符串或超出范围，返回默认值 0
    if (type === undefined || type === null || type === '' || type < 0 || type >= this.data.mod_types.length) {
      return 0;
    } else {
      return type
    }
  },
  mod_search_config_type_name(event) {
    this.setData({
      'mod_search_config_click.type_input': "mod_search_config_click"
    })
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:模组搜索类型改变\n", event);
    this.setData({
      'mod_search_config.mod_type': this.getModTypeValue(event.detail.value)
    })
  },
  mod_search_config_push(event) {
    this.setData({
      'search_resource_list': [],
      'disabled_search_button': true
    })
    setTimeout(() => {
      this.setData({
        'disabled_search_button': false
      })
    }, 500);
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:模组搜索表单提交\n", event);
    this.setData({
      'mod_search_config.mod_game_version': event.detail.value.mod_game_version.replace(/\s/g, '').match(/[\d.]/g)?.join('') || '',
      'mod_search_config.mod_name': event.detail.value.mod_name.replace(/\s/g, ''),
      'mod_search_config.mod_type': this.getModTypeValue(event.detail.value.mod_type)
    });
    this.data.mod_search_config.mod_type = this.getModTypeValue(this.data.mod_search_config.mod_type);
    this.data.search_resource_list = [];
    this.search_request(this.data.mod_search_config.mod_name, this.data.mod_types[this.data.mod_search_config.mod_type], this.data.mod_search_config.mod_game_version);

    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:模组搜索配置\n", this.data.mod_search_config);
  },

  mod_search_config_reset(event) {
    this.setData({
      'search_resource_list': [],
      'mod_search_config.mod_name': ""
    })
    this.search_request(this.data.mod_search_config.mod_name, this.data.mod_types[this.data.mod_search_config.mod_type], this.data.mod_search_config.mod_game_version);
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:模组搜索表单重置\n", event);
    this.setData({
      'mod_search_config.mod_game_version': null,
      'mod_search_config.mod_name': "",
      'mod_search_config.mod_type': 0
    })
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:模组搜索配置\n", this.data.mod_search_config);
  },
  //网络请求模板
  search_request(searchname, type, version) {
    wx.showLoading({
      title: "加载中",
      mask: true
    })
    var net_request_data;
    if (type === undefined || type === null || type === '') {
      if (version === undefined || version === null || version === '') {
        net_request_data = [
          ["project_type:mod"]
        ];
      } else {
        net_request_data = [
          ["game_versions:" + version]
        ];
      }
    } else if (version === undefined || version === null || version === '') {
      if (type === undefined || type === null || type === '') {
        net_request_data = [
          ["project_type:mod"]
        ];
      } else {
        net_request_data = [
          ["project_type:" + type]
        ];
      }
    } else {
      net_request_data = JSON.stringify([
        ["project_type:" + type],
        ["game_versions:" + version]
      ]);
    };
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:网络请求数据\n", net_request_data);
    wx.request({
      url: "https://api.modrinth.com/v2/search",
      data: {
        query: searchname, // 空表示搜索全部
        facets: net_request_data,
        index: 'relevance', // 排序方式:relevance | downloads | follows | newest | updated
        limit: 20,
        offset: (this.data.search_resource_page - 1) * 20
      },
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:网络请求成功\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list': this.arry_number(res.data.hits),
            'search_resource_page_number': Math.floor(res.data.total_hits / 20)
          })
        } else {
          wx.showToast({
            title: "网络请求错误:" + res.statusCode,
            icon: "none"
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败:" + err.errno,
          icon: "none"
        })
        getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:网络请求失败\n", err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  copy_project_id(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:复制ID被点击(", event.currentTarget.dataset.index, ")\n", event);
    wx.setClipboardData({
      data: this.data.search_resource_list[event.currentTarget.dataset.index].project_id,
      success: (res) => {
        getApp().globalData.RealtimeLog.info("设置剪切板成功:\n", res);
        wx.showToast({
          title: "已复制项目ID",
          icon: "success",
          duration: 1500,
          complete: () => {
            wx.hideToast
          }
        })
      },
      fail: (err) => {
        getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:设置剪切板失败\n", err);
      }
    })
  },
  copy_project_url(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:复制URL被点击(", event.currentTarget.dataset.index, ")\n", event);
    wx.setClipboardData({
      data: "https://modrinth.com/project/" + this.data.search_resource_list[event.currentTarget.dataset.index].project_id,
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:设置剪切板成功\n", res);
        wx.showToast({
          title: "已复制项目链接",
          icon: "success",
          duration: 1500
        })
      },
      fail: (err) => {
        getApp().globalData.RealtimeLog.error("pages/function_pages/project_learn/project_learn:设置剪切板失败\n", err);
      },
      complete: () => {
        wx.hideToast();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      'search_resource_list': [],
      'search_resource_page': 1,
      app: getApp()
    })
    this.search_request(this.data.mod_search_config.mod_name, this.data.mod_types[this.data.mod_search_config.mod_type], this.data.mod_search_config.mod_game_version);
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:页面加载完成\n", options);
  },
  search_resource_item_click(event) {
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:搜索项目(id=", event.currentTarget.dataset.index, ")被点击\n", event);
    wx.navigateTo({
      url: "/pages/function_pages/project_learn/project_learn?project_id=" + this.data.search_resource_list[event.currentTarget.dataset.index].project_id,
      success: (res) => {
        getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:跳转到页面/pages/function_pages/project_learn/project_learn\n", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    });
    getApp().globalData.RealtimeLog.info("pages/function_pages/project_learn/project_learn:页面渲染");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

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
});