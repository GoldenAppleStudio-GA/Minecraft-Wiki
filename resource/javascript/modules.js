//resource/javascript/modules.js

// function realtime_console() {
//   const logger = wx.getRealtimeLogManager().tag(tag);
//   function info(info) {
//     console.info(tag,"\n",info);
//     logger.info("info",info);
//   };
//   function warn(info) {
//     console.warn(tag,"\n",info)
//     logger.warn("warn","\n",info)
//   };
//   function error(info) {
//     console.error(tag,"\n",info)
//     logger.error("error",info)
//   };
// };
function login() {
  wx.login({
    success: (res) => {
      console.info("用户登录凭证:\n", res.code);
      return res.code;
    },
    fail: (err) => {
      this.globalData.login_code = "undefined";
      console.error("error", "用户登录凭证获取失败" + JSON.stringify(err.errMsg));
    },
  })
};

function modrinth_url_test(callback) {
  wx.request({
    url: "https://staging-api.modrinth.com",
    data: {},
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: (res) => {
      const info = "modrinthAPI链接成功\n" + JSON.stringify(res)
      console.info(info);
      callback(true)
    },
    fail: (err) => {
      const err_info = "modrinthAPI链接失败\n" + JSON.stringify(err)
      console.error("error", err_info);
      callback(false)
    }
  });
};
module.exports = {
  modrinth_url_test,
  login
  // realtime_console
};