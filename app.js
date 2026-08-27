// app.js
App({
  towxml: require('/resource/utils/towxml/index'),
  globalData: {
    app_info: {
      version: "2.5.1r",
      online_version: wx.getAccountInfoSync().miniProgram.version,
      type: wx.getAccountInfoSync().miniProgram.envVersion,
      app_id: wx.getAccountInfoSync().miniProgram.appId
    },
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
    device_info: {},
    login_code: "",
    debug_mode: false,
    showPrivacy: true,
    storage_data: [],
    saved_project: [],
    RealtimeLog: {
      info(...args) {
        console.info(...args);
      },
      warn(...args) {
        console.warn(...args);
        const message = args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        wx.getRealtimeLogManager().warn(wx.getAccountInfoSync().miniProgram.envVersion, "-", wx.getAccountInfoSync().miniProgram.version, ">>", "log-warn", {
          data: message
        });
      },

      error(...args) {
        console.error(...args);
        const message = args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        wx.getRealtimeLogManager().error(wx.getAccountInfoSync().miniProgram.envVersion, "-", wx.getAccountInfoSync().miniProgram.version, ">>", "log-error", {
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
        main: [{
            "id": 0,
            "name": "版本",
            "icon_path": "/resource/images/minecraft_version_icon.png",
            "navigate_data": "version",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/Minecraft"
          },
          {
            "id": 1,
            "name": "交易",
            "icon_path": "/resource/images/minecraft_trading_icon.png",
            "navigate_data": "trading",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E4%BA%A4%E6%98%93"
          },
          {
            "id": 2,
            "name": "药水酿造",
            "icon_path": "/resource/images/minecraft_brewing_icon.png",
            "navigate_data": "brewing",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E8%8D%AF%E6%B0%B4%E9%85%BF%E9%80%A0"
          },
          {
            "id": 3,
            "name": "附魔",
            "icon_path": "/resource/images/minecraft_enchantment_icon.png",
            "navigate_data": "enchantment",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E9%AD%94%E5%92%92"
          },
          {
            "id": 4,
            "name": "生物",
            "icon_path": "/resource/images/minecraft_mob_icon.png",
            "navigate_data": "mob",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9"
          },
          {
            "id": 5,
            "name": "方块",
            "icon_path": "/resource/images/minecraft_block_icon.png",
            "navigate_data": "block",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E6%96%B9%E5%9D%97"
          },
          {
            "id": 6,
            "name": "物品",
            "icon_path": "/resource/images/minecraft_item_icon.png",
            "navigate_data": "item",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E7%89%A9%E5%93%81"
          },
          {
            "id": 7,
            "name": "生物群系",
            "icon_path": "/resource/images/minecraft_biome_icon.png",
            "navigate_data": "biome",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9%E7%BE%A4%E7%B3%BB"
          },
          {
            "id": 8,
            "name": "状态效果",
            "icon_path": "/resource/images/minecraft_effect_icon.png",
            "navigate_data": "effect",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E7%8A%B6%E6%80%81%E6%95%88%E6%9E%9C"
          },
          {
            "id": 9,
            "name": "合成",
            "icon_path": "/resource/images/minecraft_crafting_icon.png",
            "navigate_data": "crafting",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E5%90%88%E6%88%90"
          },
          {
            "id": 10,
            "name": "烧炼",
            "icon_path": "/resource/images/minecraft_smelting_icon.png",
            "navigate_data": "smelting",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E7%83%A7%E7%82%BC"
          },
          {
            "id": 11,
            "name": "锻造",
            "icon_path": "/resource/images/minecraft_smithing_icon.png",
            "navigate_data": "smithing",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E9%94%BB%E9%80%A0"
          },
          {
            "id": 12,
            "name": "结构",
            "icon_path": "/resource/images/minecraft_generatedsturctuce_icon.png",
            "navigate_data": "generatedsturctuce",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E7%94%9F%E6%88%90%E7%BB%93%E6%9E%84"
          },
          {
            "id": 13,
            "name": "红石电路",
            "icon_path": "/resource/images/minecraft_redstonecircuits_icon.png",
            "navigate_data": "redstonecircuits",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E7%BA%A2%E7%9F%B3%E7%94%B5%E8%B7%AF"
          },
          {
            "id": 14,
            "name": "命令",
            "icon_path": "/resource/images/minecraft_command_icon.png",
            "navigate_data": "command",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E5%91%BD%E4%BB%A4"
          },
          {
            "id": 15,
            "name": "版本记录",
            "icon_path": "/resource/images/minecraft_versionlog_icon.png",
            "navigate_data": "versionlog",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E7%89%88%E6%9C%AC%E8%AE%B0%E5%BD%95"
          },
          {
            "id": 16,
            "name": "教程",
            "icon_path": "/resource/images/minecraft_tutorial_icon.png",
            "navigate_data": "tutorial",
            "page_data_path": "",
            "style": "page_item",
            "web_url": "https://zh.minecraft.wiki/w/%E6%95%99%E7%A8%8B"
          }
        ]
      }
    };
    this.reload_runtime_data();
  },


  onLaunch(res) {
    this.globalData.storage_data = wx.getStorageInfoSync().keys;
    this.globalData.app_base_info = wx.getAppBaseInfo();
    wx.onMemoryWarning((res) => {
      this.globalData.RealtimeLog.warn("_APP_:内存不足告警\n", res);
    });
    wx.setKeepScreenOn({
      keepScreenOn: true
    });
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
    if (this.globalData.storage_data.includes("save_projects")) {
      this.globalData.saved_project = wx.getStorageSync("save_projects");
    } else {
      wx.setStorageSync("save_projects", []);
      this.globalData.saved_project = []
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
})