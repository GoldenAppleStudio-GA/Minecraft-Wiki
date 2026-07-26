// app.js
const modules = require("./resource/javascript/modules")
const modrinth_data = require("./resource/data/modrinth.json")
App({
  globalData:{
    has_modrinth_connect:false,
  },
  onShow(){
  modules.modrinth_url_test(modrinth_data,(state)=>(
    this.globalData.has_modrinth_connect = state
  ));
  
  },


})
