/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var CurriculumBarActions = require('../actions/CurriculumBarActions.js');

var _relatedChannels = []; 

/*================ CREATE Language STORE =================*/
var ChannelStore = Reflux.createStore({
  listenables: CurriculumBarActions,
  init: function(){

  },
  getRelatedChannels: function(channelName){
    var context = this;
    // get Language info from the server
    var http = new XMLHttpRequest();
    var url = "./api/channel/channels/" + channelName;
    http.open("GET", url, true);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        _relatedChannels = JSON.parse(http.response);
        context.trigger(_relatedChannels);
      }
    };
    http.send();
  }
});

module.exports = ChannelStore;