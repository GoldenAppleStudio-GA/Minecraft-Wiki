//resource/javascript/modules.js
function modrinth_url_test(callback){
  wx.request({
    url: "https://staging-api.modrinth.com", 
    data: {},
    method:"GET",
    header: {
    'content-type': 'application/json'
    },
    success: (res) =>{
    console.info("modrinth服务器连接成功",res.statusCode,res.data)
      callback(true)
  },
    fail: (err) =>{
      console.error("modrinth服务器连接失败",err);
      callback(false)
    }
    });
};
module.exports = {
  modrinth_url_test,
}