// app.js
App({
  towxml: require('/resource/utils/towxml/index'),
  globalData: {
    app_renderer: "",
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
    privacyResolve: null,
    RealtimeLog: {
      info(...args) {
        console.info(...args);
        // 将多个参数拼接成一个字符串
        const message = args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        wx.getRealtimeLogManager().info("log-info", {
          data: message
        });
      },

      warn(...args) {
        console.warn(...args);
        const message = args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        wx.getRealtimeLogManager().warn("log-warn", {
          data: message
        });
      },

      error(...args) {
        console.error(...args);
        const message = args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        wx.getRealtimeLogManager().error("log-error", {
          data: message
        });
      }
    }
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


  onLaunch(res) {
    wx.loadBuiltInFontFace({
      family: 'WeChatSansSS',
      source: 'WeChatSansSS',
      global: true,
      success: (res) => {
        this.globalData.RealtimeLog.info("_APP_:微信内置字体加载成功\n", res);
      },
      fail: (err) => {
        this.globalData.RealtimeLog.error("_APP_:微信内置字体加载失败\n", err);
      }
    });
    this.globalData.app_base_info = wx.getAppBaseInfo();
    wx.onMemoryWarning((res) => {
      this.globalData.RealtimeLog.warn("_APP_:内存不足告警\n", res);
    });
    wx.setKeepScreenOn({
      keepScreenOn: true
    });
    // this.globalData.modules = require("resource/javascript/modules");
    wx.login({
      success: (res) => {
        this.globalData.RealtimeLog.info("_APP_:用户登录凭证\n", res.code);
        this.globalData.login_code = res.code;
      },
      fail: (err) => {
        this.globalData.RealtimeLog.error("_APP_:用户登录凭证获取失败\n", err.errMsg);
      },
    });
    this.globalData.device_info = wx.getDeviceInfo();
    this.load_data();
    this.globalData.debug_mode = this.globalData.app_base_info.enableDebug;
    wx.setStorageSync('debug_mode', this.globalData.debug_mode);
    if (this.globalData.device_info.platform === "devtools" || this.globalData.debug_mode === true) {
      wx.setEnableDebug({
        enableDebug: true
      });
      this.globalData.debug_mode = true;
      this.globalData.RealtimeLog.warn("_APP_:调试已启用");
    } else {
      wx.setEnableDebug({
        enableDebug: false
      });
      this.globalData.RealtimeLog.warn("_APP_:调试已禁用");
    };

    this.globalData.page_head_info = {
      start_nopx: wx.getMenuButtonBoundingClientRect().top,
      height_nopx: wx.getMenuButtonBoundingClientRect().height,
      start: wx.getMenuButtonBoundingClientRect().top + "px",
      height: wx.getMenuButtonBoundingClientRect().height + "px"
    };

    this.globalData.RealtimeLog.info("_APP_:APP初始化完成\n", res);
    this.globalData.RealtimeLog.info("_APP_:globalData\n", this.globalData);
    this.globalData.RealtimeLog.info("_APP_:微信APP基础信息\n", this.globalData.app_base_info);
    this.globalData.RealtimeLog.info("_APP_:RealtimeLog日志测试");
  },

  onShow() {
    this.globalData.RealtimeLog.info("_APP_:APP渲染完成");
  },

  onError(msg) {
    this.globalData.RealtimeLog.error("_APP_:错误", msg);
  }
});