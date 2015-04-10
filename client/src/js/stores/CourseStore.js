/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var mui = require('material-ui');
var Toggle = mui.Toggle;

var _course = {};
/*================ CREATE CURRICULA STORE =================*/
var CourseStore = Reflux.createStore({
  init: function(){
    this.load();
    // listen to course actions here
    this.listenTo(CourseActions.loadCourse, this.load);
    this.listenTo(CourseActions.editCourse, this.onEdit);
  },
  load: function(){
    // use this to get the curricula data from the database
    var context = this;
    var http = new XMLHttpRequest();
    var url = "https://branchbase.herokuapp.com/api/courseview";

    http.open("GET", url, true);
    http.setRequestHeader('X-code-lang', 'javascript'/*placeholder language for now*/);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        console.log(http.response);
        _course = http.response;
      }
    };
    http.send(null);
  },
  pushChanges: function(course) {
    var http = new XMLHttpRequest();
    var url = "https://branchbase.herokuapp.com/api/courseview";
    var context = this;

    http.open("PUSH", url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        context.trigger(_course);
      }
    };
    http.send(JSON.stringify(course));
  },
  onEdit: function(course) {
    // console.log("from onEdit in jobStore.jsx");
    for (var i = 0; i < _course.resources.length; i++) {
      if(_course.resoures[i]._id === course._id) {
        _course.resources[i].rating = course.rating;
        _course.resources[i].isChecked = course.isChecked;
        this.trigger(_course);
        break;
      }
    }
    this.pushChanges(course);
  }
});

module.exports = Course;