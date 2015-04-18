/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var SignUpActions = require('../actions/SignUpActions.js');
var Cookies = require('cookies-js');

var _signedInUser = {};

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
          _signedInUser = JSON.parse(http.response);
          console.log(_signedInUser);
          var seconds = 7 * 24 * 60 * 60;
          Cookies.set('basebranchuser', _signedInUser.id, {expires: seconds});
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
