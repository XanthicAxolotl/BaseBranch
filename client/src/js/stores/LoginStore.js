/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var mui = require('material-ui');
var LoginActions = require('../actions/LoginActions.js');
var Toggle = mui.Toggle;

/*================ CREATE LOGIN STORE =================*/
var LoginStore = Reflux.createStore({
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
    this.newUser(JSON.stringify(user));
  }
});

module.exports = LoginStore;