/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var mui = require('material-ui');
var LoginActions = require('../actions/LoginActions.js');
var Toggle = mui.Toggle;

var _newUser = {};

/*================ CREATE CURRICULA STORE =================*/
var CourseStore = Reflux.createStore({
  listenables: LoginActions,
  init: function(){

  },
  newUser: function(){
    // use this to get the curriculum data from the database
    var courseId = window.location.href.split('#')[1];
 
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/curriculum/" + courseId;
    if (courseId !== undefined && courseId.length > 0) {
    http.open("GET", url, true);
      http.onreadystatechange = function() {
        if (http.readyState === 4) {
          _course = JSON.parse(http.response);
          _course.resources = [];
          context.getResources();
        }
      };
    http.send();
    } else {
      window.location.replace('./');
    }
  },
  onLogin: function(user){
    console.log(JSON.stringify(user));
  }
});

module.exports = CourseStore;