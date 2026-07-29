// app.js
const modules = require("./resource/javascript/modules");
App({

  globalData: {
    system_info: Object,
    has_modrinth_connect: Boolean,
    device_info: Object,
    modules: Object,
    login_code: String,
    debug_mode: Boolean,
    modrinth_api_test_url: "https://staging-api.modrinth.com",
    modrinth_api_url: "https://api.modrinth.com",
    // main_color: "#fffd6b"
  },

  onLaunch(res) {
    this.globalData.login_code = modules.login();
    this.globalData.device_info = wx.getDeviceInfo();
    this.globalData.modules = modules
    if (this.globalData.device_info.platform == "devtools") {
      wx.setEnableDebug({
        enableDebug: true
      });
      this.globalData.debug_mode = true;
      console.warn("调试已开启");
    };
  },
  onShow() {

    modules.modrinth_url_test((state) => {
      this.globalData.has_modrinth_connect = state;
    });
  },
  onError(msg) {
    console.error("error\n", msg);
  }
})