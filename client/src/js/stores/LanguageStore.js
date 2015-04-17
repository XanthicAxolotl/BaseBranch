/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var SearchActions = require('../actions/SearchActions.js');

var _languages = []; 

/*================ CREATE Language STORE =================*/
var LanguageStore = Reflux.createStore({
  listenables: SearchActions,
  init: function(){

  },
  getLanguages: function(){
    var context = this;
    // get Language info from the server
    var http = new XMLHttpRequest();
    var url = "./api/channel/";
    http.open("GET", url, true);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        _languages = JSON.parse(http.response);
        context.trigger(_languages);
      }
    };
    http.send();
    // this.trigger(_languages);
  }
});

module.exports = LanguageStore;