/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var CourseActions = require('../actions/CourseActions.js');

var _comments = []; 

/*================ CREATE Language STORE =================*/
var CommentStore = Reflux.createStore({
  listenables: CourseActions,
  init: function(){

  },
  onGetComments: function(resourceId){
    var context = this;
    // get Language info from the server
    var http = new XMLHttpRequest();
    var url = "./api/resource/comment/" + resourceId;
    http.open("GET", url, true);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        _comments = JSON.parse(http.response);
        context.trigger(_comments);
      }
    };
    http.send();
  },
  onNewComment: function(comment){
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/comment/";
    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        context.onGetComments(comment.resourceId)
      }
    };
    http.send(JSON.stringify(comment));
  }
});

module.exports = CommentStore;