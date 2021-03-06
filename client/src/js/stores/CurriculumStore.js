/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var CurriculumActions = require('../actions/CurriculumActions.js');
var CurriculumBarActions = require('../actions/CurriculumBarActions.js');

var _curricula = [];
var count = {};
/*================ CREATE CURRICULA STORE =================*/
var CurriculumStore = Reflux.createStore({
  listenables: [CurriculumActions, CurriculumBarActions],
  init: function(){
    this.load();
  },
  triggerMe: function(){
    this.trigger(_curricula);
  },
  getCurricula: function(){
    return _curricula;
  },
  load: function(){
    // use this to get the curricula data from the database
    var language = window.location.href.split('#')[1];
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/channel/curricula/" + language;
    
    if (language !== undefined && language.length > 0){
      http.open("GET", url, true);
      http.onreadystatechange = function() {
        if (http.readyState === 4) {
          _curricula = JSON.parse(http.response);
          if (_curricula.length === 0){
            context.trigger(_curricula);
          } else {
            for (var i = 0; i < _curricula.length; i++){
              count[i] = false;
            }
            for (var i = 0; i < _curricula.length; i++){
              context.loadResource(i);
            }
          }
        }
      };
      http.send();      
    } else {
      window.location.replace('./')
    }
  },
  loadResource: function(index) {
    var context = this;
    var http = new XMLHttpRequest();
    var curId = _curricula[index].id;
    var url = "./api/curriculum/resource/" + curId;

    if (curId !== undefined) {
      http.open("GET", url, true);
      http.onreadystatechange = function(){
        if (http.readyState === 4) {
          _curricula[index].resources = JSON.parse(http.response);
          count[index] = true;
          var done = true;

          for (var key in count){
            if (!count[key]){
              done = false;
            }
          }

          if (done){
            for (var i = 0; i < _curricula.length; i++){
              _curricula[i].createdAt = _curricula[i].createdAt.split('T')[0];
            }
            _curricula.sort(function(a, b){
              return (a.rating < b.rating);
            });
            context.trigger(_curricula);
          }

        }
      };
      http.send();
    }
  },
  onGetNewChannel: function(){
    this.load();
  },
  onChangeFramework: function(){
    this.load();
  },
  onUpVote: function(itemId){
    var http = new XMLHttpRequest();
    var url = "./api/curriculum/rating/up/" + itemId;
    var context = this;

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function(){
      if (http.readyState === 4){
        if (http.status === 200){
          // set the signedInUser property to the User object returned in the login response
          context.load();
        }
      }
    };
    http.send();
  },
  onDownVote: function(itemId){
    var http = new XMLHttpRequest();
    var url = "./api/curriculum/rating/down/" + itemId;
    var context = this;

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function(){
      if (http.readyState === 4){
        if (http.status === 200){
          // set the signedInUser property to the User object returned in the login response
          context.load();
        }
      }
    };
    http.send();
  }
});

module.exports = CurriculumStore;
