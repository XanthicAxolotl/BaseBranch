/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var Cookies = require('cookies-js');

var _profile = [];

/*================ CREATE PROFILE STORE =================*/
var userId = Cookies.get('basebranchuser');
var ProfileStore = Reflux.createStore({
  init: function(){
    this.getProfile();
  },
  getProfile: function(){
    var context = this;
    // get Profile info from the server
    var http = new XMLHttpRequest();
    var url = "./api/user/" + userId;
    http.open("GET", url, true);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        _profile.push( JSON.parse(http.response) );
        context.getSubscribedCurricula();
      }
    };
    http.send();
  },
  getSubscribedCurricula: function(){
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/user/curricula/subscribed/" + userId;
    http.open("GET", url, true);
    http.onreadystatechange = function(){
      if(http.readyState === 4){
        _profile.push( JSON.parse(http.response) );
        context.getCreatedCurricula();
      }
    }
    http.send();
  },
  getCreatedCurricula: function(){
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/user/curricula/created/" + userId;
    http.open("GET", url, true);
    http.onreadystatechange = function(){
      if( http.readyState === 4){
        _profile.push( JSON.parse(http.response) );
        context.getCreatedResources();
      }
    }
    http.send();
  },
  getCreatedResources: function(){
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/user/resources/created/" + userId;
    http.open("GET", url, true);
    http.onreadystatechange = function(){
      if( http.readyState === 4 ){
        _profile.push( JSON.parse(http.response) );
        context.trigger(_profile);
      }
    }
    http.send();
  }
});

module.exports = ProfileStore;