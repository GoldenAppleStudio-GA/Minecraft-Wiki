//resource/javascript/modules.js
function modrinth_url_test(modrinth_data,callback){
  wx.request({
    url: modrinth_data.modrinth_api_test_url, 
    data: {},
    method:"GET",
    header: {
    'content-type': 'application/json'
    },
    success: (res) =>{
    console.log(res.data)
    if (res.statusCode === 200){
      callback(true)
    }else{
      callback(false)
    };
  },
    fail: (err) =>{
      console.error(err);
      callback(false)
    }
    });
};
module.exports = {
  modrinth_url_test,
}