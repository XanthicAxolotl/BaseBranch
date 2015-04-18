/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var CourseActions = require('../actions/CourseActions.js');

var _course = {};

/*================ CREATE CURRICULA STORE =================*/
var CourseStore = Reflux.createStore({
  listenables: CourseActions,
  init: function(){
    this.load();
  },
  triggerMe: function(){
    this.trigger(_course);
  },
  load: function(){
    // use this to get the curriculum data from the database
    var courseId = window.location.href.split('#')[1];
 
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/curriculum/" + courseId;
    if (courseId !== undefined && courseId.length > 0) {
    http.open("GET", url, true);
      http.onreadystatechange = function() {
        if (http.readyState === 4) {
          _course = JSON.parse(http.response);
          _course.resources = [];
          context.getResources();
        }
      };
    http.send();
    } else {
      window.location.replace('./');
    }
  },
  getResources: function(){
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/curriculum/resource/" + _course.id;

    http.open("GET", url, true);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        _course.resources = JSON.parse(http.response);
        context.trigger(_course);
      }
    };
    http.send();
  },
  onDownVote: function(resourceId){
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/resource/rating/down/" + resourceId;
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        console.log('sent down');
        context.getResources();
      }
    };
    http.open("POST", url, true);
    http.send();
  },
  onUpVote: function(resourceId) {
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/resource/rating/up/" + resourceId;
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        console.log('sent up');
        context.getResources();
      }
    };
    http.open("POST", url, true);
    http.send();
  },
  onToggleCheck: function(course) {
    console.log('toggle me silly');
  }
});

module.exports = CourseStore;
