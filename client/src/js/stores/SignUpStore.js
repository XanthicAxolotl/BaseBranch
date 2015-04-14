/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var mui = require('material-ui');
var SignUpActions = require('../actions/SignUpActions.js');
var Toggle = mui.Toggle;

var _newUser = {};

/*================ CREATE SIGNUP STORE =================*/
var SignUpStore = Reflux.createStore({
  listenables: SignUpActions,
  newUser: function(user){
    // send signup info to the server
    var http = new XMLHttpRequest();
    var url = "./api/user/";

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(user);
  },
  onSignup: function(info){
    var user = JSON.stringify(info);
    console.log();
    this.newUser(user);
  }
});

module.exports = SignUpStore;