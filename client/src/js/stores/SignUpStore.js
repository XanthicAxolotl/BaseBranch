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
    var url = "./api/user/signup";

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(user));
  },
  onSignup: function(info){
    info.reputation = 0;
    this.newUser(info);
  }
});

module.exports = SignUpStore;