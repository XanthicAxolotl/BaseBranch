/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var LoginActions = require('../actions/LoginActions.js');

/*================ CREATE LOGIN STORE =================*/
var LoginStore = Reflux.createStore({
  listenables: LoginActions,
  newUser: function(user){
    // send login info to the server
    var http = new XMLHttpRequest();
    var url = "./api/user/login";

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function(){
      console.log('hey', http.status);
      if (http.readyState === 4){
        if (http.status === 200){
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