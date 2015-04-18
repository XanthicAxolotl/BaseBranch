/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var LoginActions = require('../actions/LoginActions.js');

var _signedInUser = {};

/*================ CREATE LOGIN STORE =================*/
var LoginStore = Reflux.createStore({
  listenables: LoginActions,
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
  }
});

module.exports = LoginStore;
