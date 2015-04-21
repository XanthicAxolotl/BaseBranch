/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var LoginActions = require('../actions/LoginActions.js');
var Cookies = require('cookies-js');

var _signedInUser = {};

/*================ CREATE LOGIN STORE =================*/
var LoginStore = Reflux.createStore({
  listenables: LoginActions,
  init: function(){
    if (Cookies.get('basebranchuser')){
      window.location.replace('./');
    }
  },
  isLoggedIn: function(){
    // if the user logged in successfully then the _signedInUser object will have an id property and the return value will be true
    // otherwise they will not and the return value will be false
    return !!_signedInUser.id;
  },
  newUser: function(user){
    // send login info to the server
    var http = new XMLHttpRequest();
    var url = "./api/user/login";
    var context = this;

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function(){
      console.log('hey', http.status);
      if (http.readyState === 4){
        if (http.status === 200){
          // set the signedInUser property to the User object returned in the login response
          _signedInUser = JSON.parse(http.response);
          var seconds = 7 * 24 * 60 * 60;
          Cookies.set('basebranchuser', _signedInUser.id, {expires: seconds});
          window.location.replace('./');
        } else {
          alert('Login failed!');
        }
      }
    };
    http.send(user);
  },
  onLogin: function(user){
    this.newUser(JSON.stringify(user));
  },
  onGithubLogin: function(){
    // send a request to the server to use Github for authentication
    console.log("Inside of onGithubLogin in LoginStore.js");
    var http = new XMLHttpRequest();
    var url = "./api/user/auth/github";

    http.open("GET", url, true);
    http.onreadystatechange = function(){
      console.log('Sent Github authentication request to the server');
      if (http.readyState === 4){
        if (http.status === 200){
          window.location.replace('./');
        } else {
          alert('Login with Github failed!');
        }
      }
    };
    http.send();
  }
});

module.exports = LoginStore;
