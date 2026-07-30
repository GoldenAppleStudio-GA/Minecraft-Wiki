// app.js
App({
  globalData: {
    all_data:{
      app_data:{
        url:{}
      },
      minecraft_data:{
        main:{}
      }
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

  onLaunch(res) {
    this.globalData.modules = require("resource/javascript/modules");
    this.globalData.login_code = this.globalData.modules.login();
    this.globalData.device_info = wx.getDeviceInfo();
    this.globalData.all_data = {
      app_data: {
        url:JSON.parse(wx.getFileSystemManager().readFileSync("resource/data/app/url.json","utf-8"))
      },
      minecraft_data: {
        main:JSON.parse(wx.getFileSystemManager().readFileSync("resource/data/minecraft/main.json","utf-8"))
      }
    };
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
    console.info("APP初始化完成");
    console.info("globalData:\n",this.globalData)
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