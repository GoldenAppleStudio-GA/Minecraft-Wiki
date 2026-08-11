//resource/javascript/modules.js

// function realtime_console() {
//   const logger = wx.getRealtimeLogManager();
//   return {
//     info(data) {
//       console.info(data);
//       logger.info({
//         str: data
//       }, "log-info");
//     },
//     warn(data) {
//       console.warn(data);
//       logger.warn({
//         str: data
//       }, "log-warn");
//     },
//     error(data) {
//       console.error(data);
//       logger.error({
//         str: data
//       }, "log-error");
//     }
//   };
// }
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

// function modrinth_url_test(callback) {
//   const app = getApp();
//   wx.request({
//     url: "https://staging-api.modrinth.com",
//     data: {},
//     method: "GET",
//     header: {
//       'content-type': 'application/json'
//     },
//     success: (res) => {
//       app.globalData.RealtimeLog.info("modrinthAPI连接成功", res.statusCode, "\n", res);
//       callback(true)
//     },
//     fail: (err) => {
//       app.globalData.RealtimeLog.error("modrinthAPI连接失败\n", err);
//       callback(false)
//     }
//   });
// };
module.exports = {
  
};