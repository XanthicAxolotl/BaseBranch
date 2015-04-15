/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var GraphActions = require('../actions/GraphActions.js');

/*================ CREATE LOGIN STORE =================*/
var resourceList = [];

var GraphSideBarStore = Reflux.createStore({
  listenables: GraphActions,
  onSaveCurriculum: function(curriculum, id){
    var data = {name: 'example', description:'hardcoded', channelId: id, resources: curriculum};
    // send login info to the server
    var http = new XMLHttpRequest();
    var url = "./api/curriculum";

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function(){
      if (http.readyState === 4){
      
      }
    };
    http.send(JSON.stringify(data));
  },

  onResourceToSide: function(user){
    resourceList.push(user);
    this.trigger(resourceList);
  }
});

module.exports = GraphSideBarStore;