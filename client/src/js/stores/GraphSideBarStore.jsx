/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var GraphActions = require('../actions/GraphActions.js');

/*================ CREATE GRAPHSIDEBAR STORE =================*/
var resourceList = [];

var GraphSideBarStore = Reflux.createStore({
  listenables: GraphActions,
  onSaveCurriculum: function(curriculum, id, name, desc, userId){
    console.log('storeonsave', curriculum);
    var data = {name: name, description: desc, channelId: id, resources: curriculum, userId: userId};
    // send login info to the server
    var http = new XMLHttpRequest();
    var url = "./api/curriculum";

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function(){
      if (http.readyState === 4){
      
      }
    };xw
    http.send(JSON.stringify(data));
  },

  onDeleteFromSide: function(item, curric) {
    var arr = curric;
    arr.splice(item.payload-1, 1);
    this.trigger(arr);
  },

  onResourceToSide: function(info){
    var found = false;

    for (var i = 0; i<resourceList.length; i++) {
      if (info.id === resourceList[i].id) {
        found = true;
      }
    }
    if (!found) {
      resourceList.push(info);
      this.trigger(resourceList);
    }
    
  }
});

module.exports = GraphSideBarStore;