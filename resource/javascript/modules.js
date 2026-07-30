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
// function file_system_read(filePath,callback) {
//   wx.getFileSystemManager().access({
//     path: filePath,
//     success:(res)=>{
//       // 文件存在
//       wx.getFileSystemManager().readFile({
//         filePath:filePath,
          
           
//             cuccess:(res)=>{
//               callback(JSON.parse(res.arrayBuffer))
//               console.info("读文件:",filePath,"成功\n",res)
//             },
//             fail:(res)=>{
//               console.error("读文件:",filePath,"失败\n",res)
//             }
          
        
//       })
//     },
//     fail:(res)=>{
//       // 文件不存在或其他错误
//       console.log("aaa")
//       console.error("读文件:",filePath,"失败\n",res)
//     }
//   })
// }
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
      console.info("modrinthAPI连接成功\n",res);
      callback(true)
    },
    fail: (err) => {
      console.error("modrinthAPI连接失败\n",err);
      callback(false)
    }
  });
};
module.exports = {
  modrinth_url_test,
  login,
  // realtime_console
};