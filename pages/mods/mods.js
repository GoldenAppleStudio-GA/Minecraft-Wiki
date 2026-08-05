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
    search_resource_page: 1
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
    return (this.data.search_resource_page - 1) * 20
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
    console.info("模组搜索类型改变:\n", event);
    this.setData({
      'mod_search_config.mod_type': this.getModTypeValue(event.detail.value)
    })
  },
  mod_search_config_push(event) {
    this.setData({
      'disabled_search_button': true
    });
    setTimeout(() => {
      this.setData({
        'disabled_search_button': false
      })
    }, 300)
    console.info("模组搜索表单提交:\n", event);
    this.setData({
      'mod_search_config.mod_game_version': event.detail.value.mod_game_version.replace(/\s/g, '').match(/[\d.]/g)?.join('') || '',
      'mod_search_config.mod_name': event.detail.value.mod_name.replace(/\s/g, ''),
      'mod_search_config.mod_type': this.getModTypeValue(event.detail.value.mod_type)
    });
    this.data.mod_search_config.mod_type = this.getModTypeValue(this.data.mod_search_config.mod_type);
    if (!this.data.mod_search_config.mod_game_version) {
      this.setData({
        'net_request_data': [
          ["project_type:" + this.data.mod_types[this.data.mod_search_config.mod_type]]
        ]
      })
    } else {
      this.setData({
        'net_request_data': [
          ["project_type:" + this.data.mod_types[this.data.mod_search_config.mod_type]]
        ]
      })
    }
    console.info("page_mods:网络请求数据:\n", this.data.net_request_data)
    wx.request({
      url: "https://api.modrinth.com/v2/search",
      data: {
        query: this.data.mod_search_config.mod_name, // 空表示搜索全部
        facets: this.data.net_request_data,
        index: 'downloads', // 排序方式：relevance | downloads | follows | newest | updated
        limit: 20,
        offset: 0
      },
      success: (res) => {
        console.info("page_mods:网络请求成功:\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list': this.arry_number(res.data.hits)
          })
        } else {
          wx.showToast({
            title: "page_mods:网络请求错误:" + res.statusCode,
            icon: "none"
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: "网络请求失败",
          icon: "none"
        })
        console.error("page_mods:网络请求失败:\n", err)
      }
    })
    console.info("page_mods:模组搜索配置:\n", this.data.mod_search_config);
  },

  mod_search_config_reset(event) {
    console.info("page_mods:模组搜索表单重置:\n", event);
    this.setData({
      'mod_search_config.mod_game_version': null,
      'mod_search_config.mod_name': "",
      'mod_search_config.mod_type': 0
    })
    console.info("page_mods:模组搜索配置:\n", this.data.mod_search_config);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: "https://api.modrinth.com/v2/search",
      data: {
        query: "", // 空表示搜索全部
        facets: '[["project_type:mod"]]',
        index: 'downloads', // 排序方式：relevance | downloads | follows | newest | updated
        limit: 20,
        offset: 0
      },
      success: (res) => {
        console.info("page_mods:网络请求成功:\n", res)
        if (res.statusCode === 200) {
          this.setData({
            'search_resource_list': this.arry_number(res.data.hits)
          })
        }
      },
      fail: (err) => {
        console.error("page_mods:网络请求失败:\n", err)
      }
    })
    this.setData({
      app: getApp()
    });
    console.info("page_mods:页面加载完成\n", options);
  },
  search_resource_item_click(event) {
    console.info("page_mods:搜索项目(id:", event.currentTarget.dataset.index, ")被点击\n", event)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      app: getApp()
    });
    console.info("page_mods:页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      app: getApp()
    });
    console.info("page_mods:页面渲染");
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