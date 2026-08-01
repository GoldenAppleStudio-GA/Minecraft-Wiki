// app.js
App({
  globalData: {
    all_data: {
      init_data: {
        app_data: {
          url: {}
        },
        minecraft_data: {
          main: {},
          minecraft_net_images: {},
          item_version: {}
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
    modrinth_api_url: "https://api.modrinth.com"
  },
  reload_runtime_data() {
    this.globalData.all_data.runtime_data = JSON.parse(
      JSON.stringify(this.globalData.all_data.init_data)
    );
  },
  load_data() {
    this.globalData.all_data.init_data = {
      app_data: {
        url: require("resource/data/app/url").url()
      },
      minecraft_data: {
        main: require("resource/data/minecraft/main").main(),
        minecraft_net_images: require("resource/data/minecraft/minecraft_net_images").minecraft_net_images(),
        item_version: require("resource/data/minecraft/item_version").item_version()

      }

    };
    this.reload_runtime_data();
  },
  onLaunch(res) {
    this.globalData.modules = require("resource/javascript/modules");
    this.globalData.login_code = this.globalData.modules.login();
    this.globalData.device_info = wx.getDeviceInfo();
    this.load_data();
    if (this.globalData.device_info.platform === "devtools") {
      wx.setEnableDebug({
        enableDebug: true
      });
      this.globalData.debug_mode = true;
      console.warn("调试已开启");
    } else {
      wx.setEnableDebug({
        enableDebug: false
      });
      this.globalData.debug_mode = true;
      console.warn("调试已禁用");
    };
    this.globalData.modules.modrinth_url_test((state) => {
      this.globalData.has_modrinth_connect = state;
    });
    this.globalData.page_head_info = {
      start_nopx: wx.getMenuButtonBoundingClientRect().top,
      height_nopx: wx.getMenuButtonBoundingClientRect().height,
      start: wx.getMenuButtonBoundingClientRect().top + "px",
      height: wx.getMenuButtonBoundingClientRect().height + "px"
    }
    console.info("APP初始化完成");
    console.info("globalData:\n", this.globalData)
  },
  onShow() {
    console.info("APP渲染完成");
  },
  onError(msg) {
    console.error("error\n", msg);
  }
})

// {
//   "subPackages": [
//     {
//       "root": "packages/packageA",
//       "name": "packageA",
//       "entry": "page/page.js",
//       "pages": [
//         "page/page"
//       ]
//     },
//     {
//       "root": "packages/packageB",
//       "name": "packageB",
//       "entry": "page/page.js",
//       "pages": [
//         "page/page"
//       ]
//     },
//     {
//       "root": "packages/packageC",
//       "entry": "page/page.js",
//       "name": "packageC",
//       "pages": [
//         "page/page"
//       ]
//     }
//   ],
//   "preloadRule": {
//     "pages/index/index": {
//       "network": "all",
//       "packages": [
//         "packageA",
//         "packageB",
//         "packageC"
//       ]
//     }
//   }
// }