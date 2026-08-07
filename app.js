// app.js
App({
  globalData: {
    app_base_info: {},
    all_data: {
      init_data: {
        minecraft_data: {
          main: {}
        }
      },
      runtime_data: {}
    },
    page_head_info: {
      start: Number,
      height: Number,
      start_nopx: Number,
      height_nopx: Number
    },
    system_info: {},
    has_modrinth_connect: false,
    device_info: {},
    modules: {},
    login_code: "",
    debug_mode: false,
    modrinth_api_test_url: "https://staging-api.modrinth.com",
    modrinth_api_url: "https://api.modrinth.com",
    search_resource_list: [],
    showPrivacy: true,
    PrivacyName: "",
    privacyResolve: null
  },

  // 检查隐私状态
  privacy_test() {
    wx.getPrivacySetting({
      success: (res) => {
        console.info("隐私设置:", res);
        this.globalData.PrivacyName = "《我的世界百科小程序隐私保护指引》";

        if (res.needAuthorization) {
          console.info("需要用户授权隐私协议");
          this.globalData.showPrivacy = true;
        } else {
          console.info("用户已授权隐私协议");
          this.globalData.showPrivacy = false;
        }
      },
      fail: (err) => {
        console.error("获取隐私设置失败:", err);
      }
    });
  },

  reload_runtime_data() {
    this.globalData.all_data.runtime_data = JSON.parse(
      JSON.stringify(this.globalData.all_data.init_data)
    );
  },

  load_data() {
    this.globalData.all_data.init_data = {
      minecraft_data: {
        main: require("resource/data/minecraft/main").main()
      }
    };
    this.reload_runtime_data();
  },

  on_debug_mode() {
    wx.setEnableDebug({
      enableDebug: true
    });
    this.globalData.debug_mode = true;
    console.warn("调试已启用");
    wx.showToast({
      title: '调试已启用',
      icon: 'none'
    });
  },

  onLaunch(res) {
    wx.navigateTo({
      url: "pages/agreePrivacy/agreePrivacy"
    })
    wx.onNeedPrivacyAuthorization((resolve) => {
      console.info("触发隐私授权请求 (onNeedPrivacyAuthorization)");
      this.globalData.privacyResolve = resolve;
      this.globalData.showPrivacy = true;

      // 跳转到隐私协议页
      wx.navigateTo({
        url: "/pages/agreePrivacy/agreePrivacy",
        fail: (err) => {
          console.error("跳转隐私协议页失败:", err);
        }
      });
    });

    this.privacy_test();

    wx.loadBuiltInFontFace({
      family: 'WeChatSansSS',
      source: 'WeChatSansSS',
      global: true,
      success: (res) => {
        console.info("微信内置字体加载成功:", res);
      },
      fail: (err) => {
        console.error("微信内置字体加载失败:", err);
      }
    });

    this.globalData.app_base_info = wx.getAppBaseInfo();
    wx.onMemoryWarning((res) => {
      console.warn("内存不足告警:", res);
    });
    wx.setKeepScreenOn({
      keepScreenOn: true
    });
    this.globalData.modules = require("resource/javascript/modules");
    this.globalData.login_code = this.globalData.modules.login();
    this.globalData.device_info = wx.getDeviceInfo();
    this.load_data();

    if (this.globalData.device_info.platform === "devtools") {
      wx.setEnableDebug({
        enableDebug: true
      });
      this.globalData.debug_mode = true;
      console.warn("调试已启用");
    } else {
      wx.setEnableDebug({
        enableDebug: false
      });
      this.globalData.debug_mode = false;
      console.warn("调试已禁用");
    }

    this.globalData.modules.modrinth_url_test((state) => {
      this.globalData.has_modrinth_connect = state;
    });

    this.globalData.page_head_info = {
      start_nopx: wx.getMenuButtonBoundingClientRect().top,
      height_nopx: wx.getMenuButtonBoundingClientRect().height,
      start: wx.getMenuButtonBoundingClientRect().top + "px",
      height: wx.getMenuButtonBoundingClientRect().height + "px"
    };

    console.info("APP初始化完成:", res);
    console.info("APP_globalData:", this.globalData);
    console.info("微信APP基础信息:", this.globalData.app_base_info);
  },

  onShow() {
    console.info("APP渲染完成");
  },

  onError(msg) {
    console.error("错误:", msg);
  }
});