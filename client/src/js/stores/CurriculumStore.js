/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var CurriculumActions = require('../actions/CurriculumActions.js');
var CurriculumBarActions = require('../actions/CurriculumBarActions.js');

var _curricula = [];

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
          if (index === _curricula.length - 1){
            for (var i = 0; i < _curricula.length; i++){
              _curricula[i].createdAt = _curricula[i].createdAt.split('T')[0];
            }
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
    console.log('up', itemId);
  },
  onDownVote: function(itemId){
    console.log('down', itemId);
  }
});

module.exports = CurriculumStore;
