// app.js
const modules = require("./resource/javascript/modules")
App({
  globalData:{
    has_modrinth_connect:false,
    modrinth_api_test_url: "https://staging-api.modrinth.com",
    modrinth_api_url: "https://api.modrinth.com",
    main_color:"#fffd6b"
  },
  onShow(){
  modules.modrinth_url_test((state)=>{
    this.globalData.has_modrinth_connect = state
  });
  },
})
