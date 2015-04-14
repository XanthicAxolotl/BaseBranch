/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var SignUpActions = require('../actions/SignUpActions.js');

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
    http.onreadystatechange = function(){
      console.log('hi', http.status);
      if (http.readyState === 4){
        if (http.status === 200){
          window.location.replace('./');
        } else {
          alert('Login failed!');
        }
      }
    };
    http.send(JSON.stringify(user));
  },
  onSignup: function(info){
    info.reputation = 0;
    this.newUser(info);
  }
});

module.exports = SignUpStore;
