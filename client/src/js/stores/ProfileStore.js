/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');

var _profile = [{id: 1, name:'Xander Xanthic', email: 'Xander@xander.com', reputation: 100}, [{id:1,name:"Javascript Ninja"},{id:2,name:"Finding Ruby"}],[{id:3,name:"Javascript latte"},{id:4,name:"PHP got nothing on me"}]]; 
// var _profile = [];
/*================ CREATE PROFILE STORE =================*/
var ProfileStore = Reflux.createStore({
  init: function(){
    this.getProfile();
    // var userId = 1;
  },
  getProfile: function(){
    // var context = this;
    // // get Profile info from the server
    // var http = new XMLHttpRequest();
    // var url = "./api/user/" + userId;
    // http.open("GET", url, true);
    // http.onreadystatechange = function() {
    //   if (http.readyState === 4) {
    //     _profile.push( JSON.parse(http.response) );
    //     context.trigger(_profile);
    //   }
    // };
    // http.send();
    this.trigger(_profile);
  }
  // ,getSubscribedCurricula: function(){
  //   var context = this;
  //   var http = new XMLHttpRequest();
  //   var url = "./api/user/curricula/subscribed/" + userId;
  //   http.open("GET", url, true);
  //   http.onreadystatechange = function(){
  //     if(http.readyState === 4){
  //       _profile.push( JSON.parse(http.response) );
  //     }
  //   }
  // },
  // getCreatedCurricula: function(){
  //   var context = this;
  //   var http = new XMLHttpRequest();
  //   var url = "./api/user/curricula/created/" + userId;
  //   http.open("GET", url, true);
  //   http.onreadystatechange = function(){
  //     if( http.readyState === 4){
  //       _profile.push( JSON.parse(http.response) );
  //     }
  //   }
  // }
});

module.exports = ProfileStore;