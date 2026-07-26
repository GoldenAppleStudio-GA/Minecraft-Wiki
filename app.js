// app.js
App({
  globalData:{
    modrinth_api_test_url:"https://staging-api.modrinth.com",
    modrinth_api_url:"https://api.modrinth.com",
    has_modrinth_connect:false
  },
  onShow(){
    this.modrinth_url_test()
  },
  modrinth_url_test(){
    wx.request({
      url: this.globalData.modrinth_api_test_url, 
      data: {},
      method:"GET",
      header: {
      'content-type': 'application/json'
      },
      success: (res) =>{
      console.log(res.data)
      if (res.data.charCodeAt === 200){
        this.globalData.has_modrinth_connect = true;
      };
      },
      fail: (err) =>{
        console.error(err);
      }
      })
  }

})
