/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var mui = require('material-ui');
var Toggle = mui.Toggle;

var _curricula = [];
/*================ CREATE CURRICULA STORE =================*/
var CurriculumStore = Reflux.createStore({
  init: function(){
    this.load();
    // listen to curriculum actions here
    this.listenTo(CurriculumActions.loadCurricula, this.load);
    this.listenTo(CurriculumActions.editCurricula, this.onEdit);
  },
  load: function(){
    // use this to get the curricula data from the database
    var context = this;
    var http = new XMLHttpRequest();
    var url = "https://branchbase.herokuapp.com/api/curriculumview";

    http.open("GET", url, true);
    http.setRequestHeader('X-code-lang', 'javascript'/*placeholder language for now*/);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        console.log(http.response);
        _curricula = http.response;
      }
    };
    http.send(null);
  },
  pushChanges: function(curriculum) {
    var http = new XMLHttpRequest();
    var url = "https://branchbase.herokuapp.com/api/curriculumview";
    var context = this;

    http.open("PUSH", url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        context.trigger(_curricula);
      }
    };
    http.send(JSON.stringify(curriculum));
  },
  onEdit: function(curriculum) {
    // console.log("from onEdit in jobStore.jsx");
    for (var i = 0; i < _curricula.length; i++) {
      if(_curricula[i]._id === curriculum._id) {
        _curricula[i].rating = curriculum.rating
        this.trigger(_curricula);
        break;
      }
    }
    this.pushChanges(curriculum);
  }
});

module.exports = CurriculumStore;
