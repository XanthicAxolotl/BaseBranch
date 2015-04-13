/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var mui = require('material-ui');
var LoginActions = require('../actions/LoginActions.js');
var Toggle = mui.Toggle;

/*================ CREATE CURRICULA STORE =================*/
var CourseStore = Reflux.createStore({
  listenables: LoginActions,
  newUser: function(user){
    // send login info to the server
    var http = new XMLHttpRequest();
    var url = "./api/user/login";

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(user);
  },
  onLogin: function(user){
    var userInfo = JSON.stringify(user);
    this.newUser(userInfo);
  }
});

module.exports = CourseStore;